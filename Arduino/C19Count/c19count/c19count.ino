//Tanish Shah
//Arduino Code for the COVID tracking project

//libraries
#include <LiquidCrystal.h> 

//create lcd object
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

//holds value for message to be displayed
String number;

//setup the lcd and serial monitor
void setup()
{
  Serial.begin(9600); 
  lcd.begin(16, 2);
  lcd.setCursor(0, 0); 
}

//get the value over the serial port from python
String read() {
    while (!Serial.available()); 
    String str = "";
    while (Serial.available()) {
        str += (char) Serial.read(); //you need to type cast as python only allows bytes to be sent
        delay(10);
    }
    return str;
}

//printing the message
void loop()
{
  number = read();
  lcd.print(number);
  delay(5000);
  lcd.clear();
  lcd.setCursor(0, 0);
}
