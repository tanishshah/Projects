#include"camera.h"

// constructors & destructors
Camera::Camera() {
	this->origin = glm::vec3(0, 0, 0);
	this->horizontal = glm::vec3(32.0 / 9.0, 0, 0);
	this->vertical = glm::vec3(0, 2, 0);
	this->llc = this->origin - this->horizontal / (float)2 - this->vertical / (float)2 - glm::vec3(0, 0, 1);
}

Camera::Camera(double asperct_ratio, double height, double focal_length) {
	this->origin = glm::vec3(0, 0, 0);
	this->horizontal = glm::vec3(asperct_ratio * height, 0, 0);
	this->vertical = glm::vec3(0, height, 0);
	this->llc = this->origin - this->horizontal / (float)2 - this->vertical / (float)2 - glm::vec3(0, 0, focal_length);
}

Camera::~Camera() {}

// get the ray to be sent to pixel colour
Ray Camera::get_ray(double u, double v) {
	return Ray(this->origin, this->llc + this->horizontal * (float)u + this->vertical * (float)v - this->origin);
}
