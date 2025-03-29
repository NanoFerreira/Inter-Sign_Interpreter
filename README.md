# Inter-Sign Interpreter
 
A React Native mobile application that interprets sign language into text, supporting multiple languages.
 
## Installation
 
### Prerequisites
 
- Node.js (v14 or higher)
- npm or yarn
- Python 3.8 or higher
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)
 
### Backend Setup
 
1. Navigate to the backend directory:
 
```bash
cd Inter-Sign_Interpreter
```
 
2. Create and activate a virtual environment:
 
```bash
python -m venv venv
source venv/bin/activate  # On macOS/Linux
# or
.\venv\Scripts\activate  # On Windows
```
 
3. Install Python dependencies:
 
```bash
pip install -r requirements.txt
```
 
4. Start the Flask server:
 
```bash
python app.py
```
 
The backend server will run on `http://localhost:8082`
 
### Frontend Setup
 
1. Navigate to the frontend directory:
 
```bash
cd frontend
```
 
2. Install Node.js dependencies:
 
```bash
npm install
# or
yarn install
```
 
3. Install iOS dependencies (macOS only):
 
```bash
cd ios
pod install
cd ..
```
 
4. Start the Metro bundler:
 
```bash
npm start
# or
yarn start
```
 
5. Run the app:
 
- For iOS:
 
```bash
npm run ios
# or
yarn ios
```
 
- For Android:
 
```bash
npm run android
# or
yarn android
```
 
## Project Structure
 
```
Inter-Sign_Interpreter/
├── Inter-Sign_Interpreter/    # Backend directory
│   ├── app.py                 # Flask server
│   ├── Scripts.py            # Training scripts
│   ├── Frames2/              # Training data
│   └── hello2/               # Testing data
└── frontend/                 # React Native app
    ├── app/                  # App source code
    │   ├── screens/         # Screen components
    │   ├── navigation/      # Navigation setup
    │   └── resources/       # Images and other resources
    ├── ios/                 # iOS specific files
    └── android/             # Android specific files
```
 
## Features
 
- Sign language video upload
- Real-time interpretation
- Multi-language support (English, Portuguese, Spanish)
- User-friendly interface
- Video playback controls
 
## Usage
 
1. Launch the app
2. Navigate through the onboarding screens
3. Select a video from your photo library
4. Process the video to get the interpretation
5. Switch between languages to see different translations
 
## Contributing
 
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
 
## License
 
This project is licensed under the MIT License - see the LICENSE file for details.
