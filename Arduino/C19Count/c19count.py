#Tanish Shah

#imports
from bs4 import BeautifulSoup
import requests
import datetime
import serial
import time

#serial
ser = serial.Serial("COM3",9600)
time.sleep(2)

update = "y"
while update == "y":
   #the current time
   clock = str(datetime.datetime.now().time())
   t = "it is " + clock[0:5]
   t =bytes(t.encode())
   ser.write(t)
   time.sleep(5)
   
   #getting the information and making sure no errors
   req = requests.get("https://www.worldometers.info/coronavirus/")
   print(req.status_code)

   #getting info
   soup = BeautifulSoup(req.text, 'html.parser')
   results = soup.findAll("div", {"class": "maincounter-number"})

   #getting the 3 numbers (total, fatal, and recovered)
   num = 0
   for r in results:
      if num == 0:
         temp = "Total " + r.text
      elif num == 1:
         temp = "Fatal " + r.text
      else:
         temp = "Rec'd " + r.text
      ser.write(bytes(temp.encode()))
      time.sleep(10)
      num = num + 1
   update = input("Continue? [y/n]").lower()

