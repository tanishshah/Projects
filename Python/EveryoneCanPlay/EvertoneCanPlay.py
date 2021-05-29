#Tanish Shah
#Imports
from pynput.keyboard import Key, Controller #https://github.com/moses-palmer/pynput
import serial
import time
import eel #https://github.com/ChrisKnott/Eel
import speech_recognition as sr
import pyaudio
import matlab.engine
import cv2
from PIL import Image

#set up
eel.init('web')
eng = matlab.engine.connect_matlab()

#code for the hardware controller
@eel.expose
def hwController():
    print("activating hw controller") #change the profile as needed
    profile = {"1":"1", "2":"2", "3":"3", "4":"4", "5":"5", "q":"q", "w":"w", "f":"f","b":"b","x":"x","y":"y","m":"m"}
    kb = Controller()
    s = serial.Serial("COM3",9600)
    time.sleep(1)
    while True:
        line = s.readline()
        if line:
            string = line.decode()
            reading = str(string)
            reading.strip()
            reading.replace(" ","")
            r = reading[0]
            try:
                kb.press(profile[r])
                kb.release(profile[r])
            except:
                pass

#code for the audio controller
@eel.expose
def audioController():
    print("starting audio controller")
    recognizer = sr.Recognizer()
    kb = Controller()
    while True:
        with sr.Microphone() as inp:
            speech = recognizer.listen(inp,phrase_time_limit=2.5)
            #change the buttons as needed
            try:
                s = (recognizer.recognize_google(speech)).split()
                for element in s:
                    if element == "backward":
                        kb.press("b")
                        kb.release("b")
                    elif element == "forward":
                        kb.press("f")
                        kb.release("f")
                    elif element == "left":
                        kb.press("l")
                        kb.release("l")
                    elif element == "right" or element =="write":
                        kb.press("r")
                        kb.release("r")
            except:
                pass
            
#code for the video controller
@eel.expose
def videoController():
    print("starting video controller")
    kb = Controller()
    while True:
        cam = cv2.VideoCapture(0) 
        good,image = cam.read()
        if(good):
            cv2.imwrite("temp.png",image)
        cv2.destroyAllWindows()
        cam.release()
        im = Image.open(r"temp.png")
        im2 = matlab.uint8(list(im.getdata()))
        im2.reshape((im.size[0], im.size[1], 3))
        x,y = eng.classifier(im2,nargout=2)
        #print(x)
        if x == "loudspeaker":
            kb.press("0") #change as needed
            kb.release("0")

            
eel.start('index.html', size=(900, 600))  # Start
