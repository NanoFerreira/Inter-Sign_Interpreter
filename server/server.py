from flask import Flask, request, jsonify
from moviepy import VideoFileClip
import os

app = Flask(__name__)

# Route to handle MP4 file upload and return a response
@app.route('/upload', methods=['POST'])
def upload_file():
    # Check if a file is part of the request
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']
    
    # If no file is selected
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and file.filename.endswith('.mp4'):
        # Save the file temporarily
        filepath = os.path.join('uploads', file.filename)
        os.makedirs('uploads', exist_ok=True)
        file.save(filepath)

        # Process the MP4 file using moviepy
        try:
            video = VideoFileClip(filepath)
            duration = video.duration  # Get video duration in seconds
            video.close()  # Close the video clip to free up resources
            return jsonify({'message': f'Video duration: {duration} seconds'}), 200
        except Exception as e:
            return jsonify({'error': f'Error processing the video: {str(e)}'}), 500
    else:
        return jsonify({'error': 'Invalid file format. Please upload an MP4 file.'}), 400

if __name__ == '__main__':
    app.run(debug=True)