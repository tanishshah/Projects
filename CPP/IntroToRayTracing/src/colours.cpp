#include"colours.h"

// Define the function for writing the colour out
void write_colour(std::ostream& out, glm::vec3 colour, double num_samples) {
	out << int(256 * clamp(sqrt(colour.x / num_samples), 0.0, 0.999)) << ' '
		<< int(256 * clamp(sqrt(colour.y / num_samples), 0.0, 0.999)) << ' '
		<< int(256 * clamp(sqrt(colour.z / num_samples), 0.0, 0.999)) << std::endl;
}

// the function for setting the colour of the ray
glm::vec3 ray_colour(Ray& ray, Hittable& hitlist, int depth) {
	if (depth <= 0) return glm::vec3(0, 0, 0);
	super_record srecord;
	if (hitlist.hit(ray, 0.001, std::numeric_limits<double>::infinity(), srecord)) {
		Ray scatter;
		glm::vec3 force;
		if (srecord.m->scatter(ray, srecord.h, force, scatter)) {
			return force * ray_colour(scatter, hitlist, depth - 1);
		}
		return glm::vec3(0, 0, 0);
	}
	glm::vec3 direction_unitv = glm::normalize(ray.get_direction());
	double t = 0.5 * (direction_unitv.y + 1.0);
	return (glm::vec3(1.0, 1.0, 1.0) * (float)(1.0 - t) + glm::vec3(0.5, 0.7, 1.0) * (float)t);
}
