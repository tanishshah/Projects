#include <Key.h>
#include<Keypad.h>
//the library for the rtc
#include <RTClib.h>
#include "RTClib.h"

RTC_DS3231 rtc;

char daysOfTheWeek[7][12] = {"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"};
byte theHour, theMinute, aHour = 23, aMinute = 18; //defining variables and set the alarm here
char guess;
const byte rows = 4; 
const byte cols = 4; 
int ledPin = 13;
int i = 0;
int c = 0;

char* pass = "123";

int guessPosition = 0;
bool state = true;
char keys[rows][cols] = {
  {'1', '2', '3', 'A'},
  {'4', '5', '6', 'B'},
  {'7', '8', '9', 'C'},
  {'*', '0', '#', 'D'}
};

byte rowPins[rows] = {9, 8, 7, 6}; 
byte colPins[cols] = {5, 4, 3, 2}; 

Keypad kpd = Keypad(makeKeymap(keys), rowPins, colPins, rows, cols); 



void setup() {


  Serial.begin(9600);

  delay(3000); // wait for console opening

  if (! rtc.begin()) {
    Serial.println("Couldn't find RTC");
    while (1);
  }

  if (rtc.lostPower()) {
    Serial.println("RTC lost power, lets set the time!");
    // following line sets the RTC to the date & time this sketch was compiled
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
    // This line sets the RTC with an explicit date & time, for example to set
    // January 21, 2014 at 3am you would call:
    // rtc.adjust(DateTime(2014, 1, 21, 3, 0, 0));
  }
  pinMode(ledPin,OUTPUT);
}

void loop() {
   DateTime now = rtc.now();


   
   theHour = now.hour();
   theMinute = now.minute();
    

   if (theHour ==aHour && theMinute == aMinute && state == true&& i==0){
     state = false;
     if (state == false){
       Serial.println("ALARM 1");
       digitalWrite(ledPin, HIGH);
     }
     state = true;
    } 
   
   while(state == true){
      char guess = kpd.getKey();
      if (guess){
        Serial.println("*");
   }
      if (guess == pass[guessPosition]){
        guessPosition++;  
        c++;
      if (guessPosition == 3){
        Serial.println("Alarm Disarmed");
        i = 1;
        digitalWrite(ledPin, LOW);
        break;
    }
      }

      
      if (theHour != aHour || theMinute != aMinute && state == false){
        Serial.println("ALARM 2");
        digitalWrite(ledPin, HIGH);
        state = true;
      }

   }
      
  
}
  
