import json
import numpy as np
import tensorflow as tf
from PIL import Image
import os

class LeafPredictor:
    def __init__(self, models_path="./"):
        self.models_path = models_path
        self.leaf_model = None
        self.disease_model = None
        self.classes = []

    def load_models(self):
        """Loads models and classes once at startup."""
        self.leaf_model = tf.keras.models.load_model(os.path.join(self.models_path, "leaf_validator_final.keras"))
        self.disease_model = tf.keras.models.load_model(os.path.join(self.models_path, "disease_classifier_final.keras"))
        
        with open(os.path.join(self.models_path, "disease_classes.json"), "r") as f:
            self.classes = json.load(f)
        
        return len(self.classes)

    def parse_label(self, label: str):
        """
        Parses class string like 'papaya__leaf__disease__ringspot_virus' into category and disease.
        """
        parts = label.split("__")
        category = parts[0].replace("_", " ").title()
        
        if "healthy" in label:
            disease = "Healthy"
        elif "disease__" in label:
            # Extract everything after 'disease__'
            disease_part = label.split("disease__")[-1]
            disease = disease_part.replace("_", " ").title()
        else:
            # Fallback for other cases (e.g. strawberry__leaf__disease__damaged)
            disease = parts[-1].replace("_", " ").title()
            
        return category, disease

    def predict_leaf(self, img: Image.Image):
        """Validates if image is a leaf."""
        img_resized = img.resize((224, 224)).convert("RGB")
        img_arr = np.array(img_resized, dtype=np.float32)
        img_preprocessed = tf.keras.applications.mobilenet_v2.preprocess_input(img_arr)
        img_batch = np.expand_dims(img_preprocessed, axis=0)
        
        score = self.leaf_model.predict(img_batch, verbose=0)[0][0]
        return float(score)

    def predict_disease(self, img: Image.Image):
        """Classifies disease if leaf is detected."""
        img_resized = img.resize((240, 240)).convert("RGB")
        img_arr = np.array(img_resized, dtype=np.float32)
        img_preprocessed = tf.keras.applications.efficientnet.preprocess_input(img_arr)
        img_batch = np.expand_dims(img_preprocessed, axis=0)
        
        preds = self.disease_model.predict(img_batch, verbose=0)[0]
        idx = np.argmax(preds)
        confidence = float(preds[idx])
        label = self.classes[idx]
        
        category, disease = self.parse_label(label)
        
        return category, disease, confidence
