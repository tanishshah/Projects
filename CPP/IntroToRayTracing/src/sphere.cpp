#include<glm/geometric.hpp>
#include"sphere.h"

// Constructors and destructors
Sphere::Sphere() {
	this->centre = glm::vec3(0.0, 0.0, 0);
	this->radius = 0;
	this->material = nullptr;
}

Sphere::Sphere(const glm::vec3& centre, const double& radius, std::shared_ptr<Material> material) {
	this->radius = radius;
	this->centre = centre;
	this->material = material;
}

Sphere::~Sphere() {}

// Accessors and mutators
glm::vec3 Sphere::get_centre() {
	return this->centre;
}
void Sphere::set_centre(const glm::vec3& centre) {
	this->centre = centre;
}

double Sphere::get_radius() {
	return this->radius;
}
void Sphere::set_radius(const double& radius) {
	this->radius = radius;
}

std::shared_ptr<Material> Sphere::get_material() {
	return this->material;
}

// check whether the sphere was hit or not
bool Sphere::hit(Ray& ray, double t_min, double t_max, super_record& srecord){
	glm::vec3 v = ray.get_origin() - this->centre;
	double a = glm::dot(ray.get_direction(), ray.get_direction());
	double b = 2 * glm::dot(v, ray.get_direction());
	double c = glm::dot(v, v) - pow(this->radius, 2);
	double d = pow(b, 2) - 4 * a * c;
	if (d < 0) return false;
	
	double root = (-b - sqrt(d)) / (2 * a);
	if (root < t_min || root> t_max) {
		root = (-b + sqrt(d)) / (2 * a);
		if (root < t_min || root> t_max) return false;
	}
	srecord.h.t = root;
	srecord.h.point = ray.func(root);
	srecord.h.set_face_normal(ray, (srecord.h.point - this->centre) / (float)this->radius);
	srecord.m = this->material;
	return true;
}
