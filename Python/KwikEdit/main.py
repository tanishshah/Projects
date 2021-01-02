#Tanish Shah
#KwikEdit program

'''
Note currently for the program to work as desired the KwikEdit.png image is required to be in the same
directory as the main script. This can be changed in the script for the initial image if the user wishes
to do so. 
'''

#imports
import cv2
import numpy as np 
from tkinter import *
from tkinter import ttk
from tkinter import filedialog
from tkinter import simpledialog
from tkinter import messagebox
from tkinter import Canvas
from PIL import Image
from PIL import ImageTk

#The main KwikEdit class
class KwikEdit:
    def __init__(self,root):

        self.image = None
        self.titleImg = None
        self.openedImage = False
        self.openedImage2 = False
        root.title("KwikEdit")
        root.minsize(600,600)
        root.maxsize(600,600)
        mainframe = ttk.Frame(root, padding="3 3 12 12")
        mainframe.grid(column=0, row=0, sticky=(N, W, E, S))
        root.columnconfigure(0, weight=1)
        root.rowconfigure(0, weight=1)

        #The components that will appear on screen
        ttk.Button(mainframe, text="Browse", command = self.browseFile).grid(column=0, row=0, padx = 120)
        ttk.Button(mainframe, text = "Save", command = self.saveImg).grid(column = 1, row = 0, padx = 50)
        ttk.Button(mainframe, text="Edged", command = self.edge).grid(column = 0, row = 2)
        ttk.Button(mainframe, text = "Blur", command = self.blur).grid(column = 1, row = 2)
        ttk.Button(mainframe , text = "Resize", command = self.resize).grid(column = 0, row = 4)
        ttk.Button(mainframe , text = "Blend Images", command = self.blendImg).grid(column = 0, row = 3)
        ttk.Button(mainframe, text = "Rotate", command = self.rotateImg).grid(column = 1, row =4)
        ttk.Button(mainframe, text = "Flip", command = self.flipImg).grid(column = 0, row =5)
        ttk.Button(mainframe, text="Display", command = self.display).grid(column = 1, row = 5)
        ttk.Button(mainframe, text="Join Images", command = self.joinImg).grid(column =1, row = 3)

        #code for setting up the inital image
        self.titleImg = cv2.imread("KwikEdit.png")
        self.titleImg = Image.fromarray(self.titleImg)
        self.titleImg = ImageTk.PhotoImage(self.titleImg)
        self.dp = ttk.Label(image = self.titleImg)
        self.dp.image = self.titleImg
        self.dp.grid(column = 0 ,row = 1)

    #The function to load the base image
    def browseFile(self):
        try:
            self.filename = filedialog.askopenfilename(initialdir = "" , filetype = (("jpeg", "*.jpg"), ("png" ,"*.png"), ("All files" , "*.*")))
            ttk.Label(text = "Opened " + self.filename).grid(column = 0, row = 10)
            self.image = cv2.imread(self.filename)
            self.openedImage =  True
        except:
            messagebox.showinfo("Error", "The operation could not be performed.")

    #Method for displaying images
    def display(self):
        try:
            if self.openedImage == True:
                messagebox.showinfo("Warning", "If the image is too large, the display will show a scaled down version of the image. It will not affect the actual image itself.")
                im1 = self.image  

                #resize the image that is being shown on screen
                height = im1.shape[0]
                width = im1.shape[1]
                xFactor = float(400/width)
                yFactor = float(400/height)
                if xFactor < 1 and yFactor < 1:
                    im1 = cv2.resize(im1, (0,0), fx=xFactor, fy=yFactor)
                elif xFactor < 1:
                    im1 = cv2.resize(im1, (0,0), fx=xFactor, fy=1)  
                elif yFactor < 1:
                    im1= cv2.resize(im1, (0,0), fx=1, fy=yFactor)

                #Converting the image so that it can be displayed by tkinter
                im1 = Image.fromarray(im1)
                im1 = ImageTk.PhotoImage(im1)
                self.dp.configure(image = im1)
                self.dp.image = im1
            else:
                messagebox.showinfo("Error", "No image selected")
        except:
            messagebox.showinfo("Error", "The operation could not be performed")

    #Shows the image using edge detection
    def edge(self):
        try:
            if self.openedImage == False:
                messagebox.showinfo("Error", "No image selected")    
            else:           
                self.image = cv2.Canny(self.image, 50, 100) 
                messagebox.showinfo("Success", "The operation was performed")
        except:
            messagebox.showinfo("Error", "The operation could not be performed.")

    #Funcion for applying an average blur to an image
    def blur (self):
        try:
            if self.openedImage == True:
                inp = int(simpledialog.askstring(title="What should the blur size be?", prompt="Blur size?"))
                self.image = cv2.blur(self.image,(inp,inp))
                messagebox.showinfo("Success", "The operation was performed")
            else:
                messagebox.showinfo("Error", "No image selected")
        except:
            messagebox.showinfo("Error", "The operation could not be performed.")

    #function for resizing the image
    def resize(self):
        try:
            if self.openedImage == True:
                x = float(simpledialog.askstring(title="What size should x be?", prompt="X scale factor?"))
                y = float(simpledialog.askstring(title="What factor would you like to change y by??", prompt="Y scale factor?"))
                self.image = cv2.resize(self.image, (0,0), fx=x, fy=y) 
                messagebox.showinfo("Success", "The operation was performed")
            else:
                messagebox.showinfo("Error", "No image selected")
        except:
            messagebox.showinfo("Error", "The operation could not be performed")
    
    #function for blening images together
    def blendImg(self):
        try:
            if self.openedImage == False:
                messagebox.showinfo("Error", "No image selected")
            else:
                messagebox.showinfo("Warning", "To perform this operation ensure that the size of the two images are the same")
                self.filename2 = filedialog.askopenfilename(initialdir = "" , filetype = (("jpeg", "*.jpg"), ("png" ,"*.png"), ("All files" , "*.*")))
                im2 = cv2.imread(self.filename2)
                weightA = float(simpledialog.askstring(title="Image Weight", prompt="How much should the inital image weigh, from 0 to 1?"))
                if weightA <= 1:
                    weightB = 1 - weightA
                    self.image = cv2.addWeighted(self.image, weightA, im2, weightB, 0)
                    messagebox.showinfo("Success", "The operation was performed")
                else:
                    messagebox.showinfo("Weight Value Error", "The value entered was not in the range.")
        except:
            messagebox.showinfo("Error", "The operation could not be performed")

    #function for joining images together
    def joinImg(self):
        try:
            if self.openedImage == False:
                messagebox.showinfo("Error", "No image selected")
            else:
                messagebox.showinfo("Warning", "To perform this operation ensure that the size of the two images are the same")
                self.filename2 = filedialog.askopenfilename(initialdir = "" , filetype = (("jpeg", "*.jpg"), ("png" ,"*.png"), ("All files" , "*.*")))
                im2 = cv2.imread(self.filename2)
                direction = int(simpledialog.askstring(title="How should the images be joined?", prompt="Would you like to join the images vertically [0] or horizontally [1]?"))
                if direction == 0 or direction == 1:
                    if direction == 0:
                        self.image = cv2.vconcat([self.image, im2])
                    else:
                        self.image = cv2.hconcat([self.image,im2])
                    messagebox.showinfo("Success", "The operation was performed")
                else:
                    messagebox.showinfo("Invalid entry error", "The value entered was not in the range.")
        except:
            messagebox.showinfo("Error", "The operation could not be performed")

    #Function for rotating an image
    def rotateImg(self):
        try: 
            if self.openedImage == False:
                messagebox.showinfo("Error", "No image selected")
            else:
                inp = int(simpledialog.askstring(title="Rotate Image", prompt="How much would you like to rotate the image? 90, 180 or 270 degrees?"))
                if inp != 90 and inp !=180 and inp !=270:
                    messagebox.showinfo("Error", "An incorrect value was entered")
                else:
                    if inp == 90:
                        self.image = cv2.rotate(self.image, cv2.ROTATE_90_CLOCKWISE)
                    elif inp == 180:
                        self.image = cv2.rotate(self.image, cv2.ROTATE_180)
                    else:
                        self.image = cv2.rotate(self.image, cv2.ROTATE_90_COUNTERCLOCKWISE) 
                    messagebox.showinfo("Success", "The operation was performed") 
        except:
            messagebox.showinfo("Error", "The operation could not be performed") 
    
    #Function for flipping the image
    def flipImg(self):
        try:
            if self.openedImage == False:
                messagebox.showinfo("Error", "No image selected")
            else:
                inp = int(simpledialog.askstring(title="Flip Image", prompt="Flip over y-axis [0]. Flip over x-axis [1]. Flip Both [-1]"))
                if inp != 0 and inp != 1 and inp != -1:
                    messagebox.showinfo("Error", "An incorrect value was entered")
                else:
                    if inp == 0:
                        self.image = cv2.flip(self.image,0)
                    elif inp == 1:
                        self.image = cv2.flip(self.image, 1)
                    else:
                        self.image = cv2.flip(self.image, -1) 
                    messagebox.showinfo("Success", "The operation was performed")
        except:
             messagebox.showinfo("Error", "The operation could not be performed")  

    #function for saving the image 
    def saveImg(self):
        try:
            if self.openedImage == True:
                inp = simpledialog.askstring(title="Save image as", prompt="What would you like to name your file as?")
                cv2.imwrite(inp, self.image)
                messagebox.showinfo("Success", "The image was saved successfully")
            else:
                messagebox.showinfo("Error", "No image selected")
        except:
            messagebox.showinfo("Error", "The operation could not be performed")

root = Tk()
KwikEdit(root)
root.mainloop()