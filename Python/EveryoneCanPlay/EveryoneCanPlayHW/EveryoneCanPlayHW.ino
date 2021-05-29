//Tanish Shah
//Libraries
#include <CapacitiveSensor.h> //https://github.com/PaulStoffregen/CapacitiveSensor

//Pins
const int bPin1 = 13;
const int bPin2 = 12;
const int bPin3 = 11;
const int bPin4 = 10;
const int VrX = A5; 
const int VrY = A4; 
const int SW = 2;
const int xPin = A0;
const int yPin = A1;
const int zPin = A2;
const int pPin = 7;

CapacitiveSensor   cs = CapacitiveSensor(4,3); //capacitive sensor between pins 4 and 3

//read the button values
void readButtons(){
  if(digitalRead(bPin1) == 1)
    Serial.println("1");
  if(digitalRead(bPin2) == 1)
    Serial.println("2");
  if(digitalRead(bPin3) == 1)
    Serial.println("3");
  if(digitalRead(bPin4) == 1)
    Serial.println("4");
  if(digitalRead(pPin) == 0)
    Serial.println("5");
}

//read the joystick values
void joyStick(){
  int mapX = map(analogRead(VrX), 0, 1023, -512, 512);
  int mapY = map(analogRead(VrY),0,1023,-512,512);
  if(mapX > 50)
    Serial.println("f");
  else if(mapX < -50)
    Serial.println("b");
  if(mapY > 50)
    Serial.println("x");
  else if(mapY < -50)
    Serial.println("y");
}

void rAcc(){
  //Only going to use 2 configurations but you can use more if you want
  if((analogRead(zPin))<300)
    Serial.println("q");
  else if((analogRead(zPin))>380)
    Serial.println("w");
}

//set up everything
void setup() {
  Serial.begin(9600);
  pinMode(bPin1, INPUT);
  pinMode(bPin2, INPUT);
  pinMode(bPin3, INPUT);
  pinMode(bPin4, INPUT);
  pinMode(pPin, INPUT);
  pinMode(SW, INPUT_PULLUP);
  cs.set_CS_AutocaL_Millis(0xFFFFFFFF);   
}

//check the inputs
void loop() {
  readButtons();
  joyStick();
  rAcc();
  if(cs.capacitiveSensor(50) > 500) //change senstivity as needed
    Serial.println("m");
  delay(150);
}
