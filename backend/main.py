from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from PIL import Image
import io
import os

from predictor import LeafPredictor
from lime_explainer import get_lime_dark_focus, pil_to_base64

# Initialize predictor
predictor = LeafPredictor(models_path="./")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load models once at startup
    num_classes = predictor.load_models()
    print(f"Server started. Loaded {num_classes} disease classes.")
    yield
    # Cleanup if needed

app = FastAPI(lifespan=lifespan)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "LeafScan Backend Running 🚀"}


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "classes_loaded": len(predictor.classes) if predictor.classes else 0
    }

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Validate file type
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # Read image
        contents = await file.read()
        img = Image.open(io.BytesIO(contents)).convert("RGB")
        
        # 1. Leaf Validation
        leaf_score = predictor.predict_leaf(img)
        is_leaf = leaf_score > 0.01
        
        if not is_leaf:
            return {
                "is_leaf": False,
                "leaf_confidence": leaf_score,
                "error": "Not a leaf image"
            }
        
        # 2. Disease Prediction
        category, disease, confidence = predictor.predict_disease(img)
        
        # 3. LIME Explanation
        # Using the disease model for explanation
        lime_img = get_lime_dark_focus(predictor.disease_model, img)
        lime_base64 = pil_to_base64(lime_img)
        
        return {
            "is_leaf": True,
            "leaf_confidence": leaf_score,
            "disease": disease,
            "category": category,
            "confidence": round(confidence, 2),
            "lime_image": lime_base64
        }
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
