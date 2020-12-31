//Tanish Shah
//Arduino Catch Game using 8*8 Led matrix

#include <LedControl.h>
//https://github.com/wayoda/LedControl

LedControl lc = LedControl(12,11,10,1); //set up the 8*8 display
byte sadFace[8]= {B00111100,B01000010,B10100101,B10000001,B10011001,B10100101,B01000010,B00111100}; //makes a sad face on display
byte happyFace[8]= {B00111100,B01000010,B10100101,B10000001,B10100101,B10011001,B01000010,B00111100}; //makes a happy face on display

//joystick variables
int VrX = A1; 
int VrY = A2; 
int SW = 2;
int mapX = 1; 
int xPos = 0;

//ball variables
int ballX = 0; 
int ballY = 0;
int ballSpeed = 1000; 
int oldX = 0;

//player vairables
int playerX = 3;
int playerY = 7;
int randFactor = 0;

void setup() {
  lc.shutdown(0,false);
  // Set brightness I would not recommend going higher than two as it is very bright
  lc.setIntensity(0,1);
  lc.clearDisplay(0);  
  randomSeed(analogRead(0));
  pinMode(VrX, INPUT);
  pinMode(VrY, INPUT);
  pinMode(SW, INPUT_PULLUP);

}

//function for reseting the ball to the top row of the matrix
void resetBall() {
  ballX = random(0,2147483647)%8; //set random pos for ball
  lc.setLed(0,0,ballX,1);
  ballY = 0;
}

//function for having the ball decrease rows
void moveBall(){
    lc.setLed(0,ballY,ballX,0);
    ballY++;
    lc.setLed(0,ballY,ballX,1);
}

//function for moving the player left and right
void movePlayer(){
    randFactor = random(0,2147483647)%2;
    xPos= analogRead(1);
    //joystick controls can be fined tuned more
    mapX = map(xPos, 0, 1023, 0, 5);
    lc.setLed(0,playerY,playerX,1);
    oldX = playerX;
    if(mapX < 2 && playerX >1 && randFactor ==1 ){
      playerX-= 2;
    }
    else if(mapX < 2 && playerX > 2 && randFactor ==0 ){
      playerX-= 3;
    }
    else if(mapX < 2 && playerX != 0){
      playerX--;
    }
    else if(mapX > 3 && playerX <6 && randFactor == 1){
      playerX+=2; 
    }
    else if(mapX > 3 && playerX <5 && randFactor == 0){
      playerX+=3; 
    }
    else if(mapX > 3 && playerX !=7){
      playerX++; 
    }
   lc.setLed(0,playerY,oldX,0);
   lc.setLed(0,playerY,playerX,1);
   moveBall();

}
//function to make a new game
void newGame(){
  lc.clearDisplay(0);
  ballSpeed = 1000;
  playerX = 3;
  playerY = 7;
  lc.setLed(0,playerY,playerX,1);
  resetBall();
}

void playGame(){
  movePlayer();

  if(ballY == 7)
  {
    if(ballX == playerX)
    {
      resetBall();
      ballSpeed -= 50;
      delay(ballSpeed);
    }
    else //ball not caught -> losing condition
    {
      for(int i = 0; i<8;i++)
      {
        lc.setRow(0,i,sadFace[i]);
      }
      delay(3000);
      newGame();
    }
  }
  //winning condition
  else if(ballSpeed <50) //increase this to make it easier to win
  {
    for(int i = 0; i<8;i++)
    {
      lc.setRow(0,i,happyFace[i]);
    }
    delay(3000);
    newGame();
  }
  else{
    delay(ballSpeed);
  }
}
void loop(){
  playGame();
}
