//Tanish Shah
#include<SFML\Graphics.hpp> //The library needed to make this work
#include<iostream>
#include<cstdlib>
#include<ctime>
#include<string>
int main()
{
	//setting up a random seed for the positions of the point
	srand(time(NULL));

	//loading in fonts
	sf::Font font;
	if (font.loadFromFile("Data/font.ttf") == false)
	{
		std::cout << "failed to laod fonts" <<std::endl;
	}

	//creating the text object
	sf::Text text;
	text.setFont(font);
	text.setFillColor(sf::Color(255, 255, 255));
	text.setString("Score: 0");
	text.setPosition(10, 10);
	text.setCharacterSize(35);
	//variables
	bool left = false;
	bool right = false; 
	int blockSpeedX = 0; 
	int blockSpeedY = 0;
	bool up = false;
	bool down = false;
	int randx = 0;
	int randy = 0;
	int score = 0;
	float mod = 0;
	randx = rand() % 780 + 10;
	randy = rand() % 580 + 10;
	std::string scoreT;
	

	//shapes
	sf::RectangleShape block(sf::Vector2f(60,20));
	block.setPosition(400, 500);
	block.setOrigin(30, 10);
	block.setFillColor(sf::Color(0, 0, 255));

	sf::CircleShape point(5);
	point.setPosition(randx, randy);
	point.setFillColor(sf::Color(255, 255, 255));

	//enemy shapes
	sf::RectangleShape test(sf::Vector2f(60, 20));
	test.setPosition(400, 120);
	test.setOrigin(30, 10);
	test.setFillColor(sf::Color(255, 0, 255));

	sf::RectangleShape test2(sf::Vector2f(60, 20));
	test2.setPosition(200, 500);
	test2.setOrigin(30, 10);
	test2.setFillColor(sf::Color(255, 255, 0));

	sf::RectangleShape test3(sf::Vector2f(60, 20));
	test3.setPosition(200, 200);
	test3.setOrigin(30, 10);
	test3.setFillColor(sf::Color(0, 255, 255));


	sf::RenderWindow window(sf::VideoMode(800, 600), "My Game"); //creating the window using a data constructor
	//videomode is the resolution of the video and the name is the string following
	window.setFramerateLimit(30); //force the frame rate of the game to 30fps
	while (window.isOpen()) //the main game loop
	{
		sf::Event event;
		while(window.pollEvent(event))
		{//procss events
			point.setFillColor(sf::Color(255, 255, 255));
			if (event.type == sf::Event::Closed) //this allows the user to close the screen
			{
				window.close(); //the actual function for closing the screen
			}
			if (event.type == sf::Event::KeyPressed) //checking for key presses
			{
				if (event.key.code == sf::Keyboard::Left)
				{
					left = true;
				}
				if (event.key.code == sf::Keyboard::Right)
				{
					right = true;
				}
				if (event.key.code == sf::Keyboard::Up)
				{
					up = true;
				}
				if (event.key.code == sf::Keyboard::Down)
				{
					down = true;
				}
			
			}
			
			if (event.type == sf::Event::KeyReleased) //checking for key releases
			{
				if (event.key.code == sf::Keyboard::Left)
				{
					left = false;
				}
				
				if (event.key.code == sf::Keyboard::Right)
				{
					right = false;
				}		
				if (event.key.code == sf::Keyboard::Up)
				{
					up = false;
				}
				if (event.key.code == sf::Keyboard::Down)
				{
					down = false;
				}
				
			}
			//Speed Modifications 
			if (block.getPosition().x > test.getPosition().x)
			{
				test.move(1 + mod, 0);
			
			}
			if (block.getPosition().x < test.getPosition().x)
			{
				test.move(-1 - mod, 0);
				
			}
		

			//
			if (block.getPosition().x > test2.getPosition().x)
			{
				test2.move(1+mod, 0);

			}
			if (block.getPosition().x < test2.getPosition().x)
			{
				test2.move(-1-mod, 0);

			}
	
			if (block.getPosition().x > test3.getPosition().x)
			{
				test3.move(1.5 + mod, 0);

			}
			if (block.getPosition().x < test3.getPosition().x)
			{
				test3.move(-1.5 - mod, 0);

			}
			if (block.getPosition().y > test3.getPosition().y)
			{
				test3.move(0, 1.5 + mod);

			}
			if (block.getPosition().y < test3.getPosition().y)
			{
				test3.move(0, -1.5 - mod);

			}
			
			if (left == true)
			{
				blockSpeedX = -5;
				
			}
			if (right == true)
			{
				blockSpeedX = 5;
				
			}
			if (right == true && left == true)
			{
				blockSpeedX = 0;
			
			}
			if(right == false && left == false)
			{
				blockSpeedX = 0;
			}
			if (down == true)
			{
				blockSpeedY = 5;

			}
			if (up == true)
			{
				blockSpeedY = -5;

			}
			if (down == true && up == true)
			{
				blockSpeedY = 0;

			}
			if (down == false && up == false)
			{
				blockSpeedY = 0;
			}
	
			//checking for collisions
			block.move(blockSpeedX, 0);
			if (block.getPosition().x < 30 || block.getPosition().x>770)
			{
				block.move(-blockSpeedX, 0);
			}
			block.move(0, blockSpeedY);
			if (block.getPosition().y < 10 || block.getPosition().y>590)
			{
				block.move(0, -blockSpeedY);
			}
			if (block.getGlobalBounds().intersects(point.getGlobalBounds()) == true)
			{
				point.setRadius(0);
				randx = (rand() % 780) + 15;
				randy = (rand() & 580) + 15;
				point.setPosition(randx, randy);
				point.setRadius(5);
				score++;
				mod = (float) score / 10;
				scoreT = std::to_string(score);
				text.setString("Score: " + scoreT);
			}
			if (block.getGlobalBounds().intersects(test.getGlobalBounds()) == true ||
				block.getGlobalBounds().intersects(test2.getGlobalBounds()) == true ||
				block.getGlobalBounds().intersects(test3.getGlobalBounds()) == true)
			{
				point.setRadius(0);
				block.setSize(sf::Vector2f(0, 0));
				test.setSize(sf::Vector2f(0, 0));
				test2.setSize(sf::Vector2f(0, 0));
				test3.setSize(sf::Vector2f(0, 0));
				text.setString("Game Over");
			}
		
		
			
		//now we do the rendering of the objects
			window.clear(); //clear the display
			window.draw(text);
			window.draw(block);
			window.draw(test2);
			window.draw(test);
			window.draw(test3);
			window.draw(point);
		
		//mow we draw things
			window.display(); //display the renderings
			
		}
	}
	return 0;
}
