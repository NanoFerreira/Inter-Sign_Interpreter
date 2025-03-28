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


# def translate_text(target: str, text: str) -> dict:
#     """Translates text into the target language.

#     Target must be an ISO 639-1 language code.
#     See https://g.co/cloud/translate/v2/translate-reference#supported_languages
#     """
#     from google.cloud import translate_v2 as translate

#     translate_client = translate.Client.from_service_account_json("key_location")

#     if isinstance(text, bytes):
#         text = text.decode("utf-8")

#     # Text can also be a sequence of strings, in which case this method
#     # will return a sequence of results for each text.
#     result = translate_client.translate(text, target_language=target)

#     print("Text: {}".format(result["input"]))
#     print("Translation: {}".format(result["translatedText"]))
#     print("Detected source language: {}".format(result["detectedSourceLanguage"]))

#     return result

# print(translate_text("en", "Hola, como estás?"))



