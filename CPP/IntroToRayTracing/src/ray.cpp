#include"ray.h"

// constructors and destructors
Ray::Ray() {
	this->direction = glm::vec3(0.0, 0.0, 0.0);
	this->origin = glm::vec3(0.0, 0.0, 0.0);
}

Ray::Ray(const glm::vec3& orig, const glm::vec3& direc) {
	this->direction = direc;
	this->origin = orig;
}

Ray::~Ray(){}

// accessors and mutators for origin
void Ray::set_origin(glm::vec3& orig) {
	this->origin = orig;
	return;
}

glm::vec3 Ray::get_origin() {
	return this->origin;
}

// accessors and mutators for direction
void Ray::set_direction(glm::vec3& direc) {
	this->direction = direc;
	return;
}

glm::vec3 Ray::get_direction() {
	return this->direction;
}

/*  represent the ray as a function(ie give the ray in the form of a + tb
* where a is the starting point (origin) of the ray, b is the direction vector
* and t represents the scale factor
*/
glm::vec3 Ray::func(double t) const{
	return ((this->direction * (float)t) + this->origin);
}