from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from PIL import Image
import io
import base64
import cv2
import os
from Scripts import train_MLM, build_testing_dataset, build_training_dataset
import pandas as pd
import tempfile

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Global variable to store the trained model
model = None

@app.route('/train', methods=['POST'])
def train():
    try:
        global model
        # Build datasets
        build_training_dataset()
        build_testing_dataset()
        # Train the model
        model = train_MLM()
        return jsonify({"message": "Model trained successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not trained yet"}), 400

        if 'video' not in request.files:
            return jsonify({"error": "No video file provided"}), 400

        video_file = request.files['video']
        
        # Save the video temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_video:
            video_file.save(temp_video.name)
            video_path = temp_video.name

        # Open the video file
        cap = cv2.VideoCapture(video_path)
        
        # Read frames and process them
        predictions = []
        while cap.isOpened():
            ret, frame = cap.read()
            if not ret:
                break

            # Convert frame to grayscale
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            
            # Resize frame to match model input size (28x28)
            resized = cv2.resize(gray, (28, 28))
            
            # Normalize the frame
            normalized = resized / 255.0
            
            # Flatten the frame
            flattened = normalized.flatten()
            
            # Create DataFrame with the same structure as training data
            df = pd.DataFrame([flattened], columns=[f'pixel{i+1}' for i in range(784)])
            
            # Make prediction
            prediction = model.predict(df)
            predictions.append(prediction[0])

        # Clean up
        cap.release()
        os.unlink(video_path)

        # Get the most common prediction
        if predictions:
            final_prediction = max(set(predictions), key=predictions.count)
            return jsonify({
                "prediction": final_prediction,
                "confidence": predictions.count(final_prediction) / len(predictions)
            }), 200
        else:
            return jsonify({"error": "No frames could be processed"}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port, debug=True) 