// Tanish Shah
//Sketch containing the code for my prototype of a garduino project which will measure soil temp, soil moisture, light recieved by the plant, and ambient temperature and humidity
//note that this project isn't complete as while the monitoring works most inputs haven't been converted to standard units 

/*the dht11 library 
https://www.arduinolibraries.info/libraries/dht-sensor-library
https://github.com/adafruit/DHT-sensor-library
*/

//set up for the dht11 
#include<dht.h> // include the library for the dht11 sensor
#define dhtPin 3 // The pin which the digital signal from the sensor is connected to the board

dht DHT; //creating the dht object for the library
int data; // the int which will read the signal from the sensor
float ambTemp; // the variable which will hold the ambtemp value
float humid; // holds the humidity value


//set up for the water level sensor

const int waterPin = A5; // the pin which we are hooking up the water sensor to 
int  waterLevel ; // will hold the value for the water level

//set up for the thermistor 


const int thermPin = A2; // the pin which the thermistor is connected to
float soilTemp; // this will record the value of the soil temperature


// set up for the ldr
const int lightPin = A0;
float light; // the variable that will measure how much light there is

void setup() {
  Serial.begin(9600); // start the serial monitor 
}


void loop() {
  
  // dht11 main code
  int data = DHT.read11(dhtPin); // telling the arduino to read the data from the signal pin
  ambTemp = DHT.temperature; // getting the value of the temperature
  humid = DHT.humidity; // getting the value of the humidity
  Serial.println("ambient temperature is ");// printing in the serial monitor what the temp is
  Serial.println(ambTemp); // actually printing the temp
  Serial.println("the humidity is "); // telling what the humidity is on a new line
  Serial.println(humid); //actually printing the humidity
  delay(1000); // delaying the program by 5seconds to not get to many valuse
  
  //waterlevel sensor main code
  waterLevel = analogRead(waterPin); //reading the value from the watersensor
  Serial.println(" The water level is "); //writing to the serial monitor
  Serial.println(waterLevel); //giving the actual value of the water level
  delay(1000);
  
  //thermistor main code
  soilTemp = analogRead(thermPin); // getting the data from the thermistor
  soilTemp = (10000*soilTemp)/(1023/soilTemp); // converting the value from the thermistor to a resistance value
  Serial.println(" the soil temp is ");// saying what the soil temp is
  Serial.println(soilTemp); //printing the resistance value of the thermistor
  delay (1000);

  //lightdependent resistor main code
  light = analogRead(lightPin); //getting the data from the ldr
  Serial.println(" the light meausurement is "); // saying how much light there is
  Serial.println(light); //printing the resistance value of the ldr
  delay(1000);
}
