import numpy as np
from PIL import Image
import io
import base64
import tensorflow as tf
from lime import lime_image as lime_lib
from skimage.segmentation import mark_boundaries, slic

def pil_to_base64(img: Image.Image) -> str:
    """Converts PIL Image to base64 PNG string."""
    buffered = io.BytesIO()
    img.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{img_str}"

def get_lime_dark_focus(model, img: Image.Image, target_size=(240, 240), num_samples=200):
    """
    Generates LIME explanation and returns a 'dark focus' view.
    """
    # Step 1: Image resize + RGB convert
    img_resized = img.resize(target_size).convert("RGB")
    img_arr = np.array(img_resized, dtype=np.uint8)

    # Step 2: Predict function for LIME
    def predict_fn(images):
        batch = images.astype(np.float32)
        batch = tf.keras.applications.efficientnet.preprocess_input(batch.copy())
        preds = model.predict(batch, verbose=0)
        return preds

    # Step 3: SLIC segmentation (exact specs)
    def segmentation_fn(image):
        return slic(image, n_segments=80, compactness=15, sigma=1, start_label=0)

    # Step 4: Generate LIME explanation
    explainer = lime_lib.LimeImageExplainer()
    explanation = explainer.explain_instance(
        img_arr,
        predict_fn,
        top_labels=1,
        hide_color=0,
        num_samples=num_samples,
        random_seed=42,
        segmentation_fn=segmentation_fn,
    )

    top_label = explanation.top_labels[0]

    # Get mask for top label
    _, mask = explanation.get_image_and_mask(
        top_label,
        positive_only=True,
        num_features=15,
        hide_rest=False,
    )

    # Step 5: Dark focus image generation (exact specs)
    # Start with the original uint8 image array
    img_float = img_arr.copy().astype(np.float32)
    
    # Set pixels where mask == 0 to pixel * 0.15
    img_float[mask == 0] = img_float[mask == 0] * 0.15

    # Apply mark_boundaries (yellow borders)
    # mark_boundaries expects float 0-1
    result_float = mark_boundaries(
        img_float / 255.0,
        mask,
        color=(1, 1, 0),
        outline_color=(1, 0.7, 0)
    )

    # Convert result (float 0-1) back to uint8 by multiplying by 255
    final_img = Image.fromarray((result_float * 255).astype(np.uint8))
    
    return final_img