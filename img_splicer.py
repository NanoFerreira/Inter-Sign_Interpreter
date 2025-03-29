#this top imoprt only works in python 3.7
# import pyttsx3

import cv2
from google.cloud import translate_v2


#TTS is working now that python 3.7 is active
# engine = pyttsx3.init()
# engine.say("I will speak this text")
# engine.runAndWait()

# Path to video file 
for i in range(3):
    video_path = input("Enter the path to the video file: ")
    vidObj = cv2.VideoCapture(video_path) 

    # Used as counter variable 
    count = 0

    # checks whether frames were extracted 
    success = 1

    while success: 

        # vidObj object calls read 
        # function extract frames 
        success, image = vidObj.read() 

        # Saves the frames with frame-count
        print(count) 
        if count % 30 in list(range(10, 20)):
            try:
                cv2.imwrite(f"path_name_to_save_{i}_{count}.jpg", image) 
            except:
                print("probably just the end of the file")


        count += 1