#include"utils.h"

/*
* function to generate a random double
* useing real distribution and knuth_b generator
*/
double rand_double() {
	std::uniform_real_distribution<double> range(0.0, 1.0);
	std::knuth_b gen;
	return range(gen);
}

// different generator
double rand_double(std::mt19937& mt) {
	std::uniform_real_distribution<double> range(0.0, 1.0);
	return range(mt);
}

// random double with range
double rand_double(double r_min, double r_max) {
	std::uniform_real_distribution<double> range(r_min, r_max);
	std::mt19937 gen;
	return range(gen);
}

// utility function to cllamp colour computation
double clamp(double val, double min, double max) {
	if (val < min) return min;
	if (val > max) return max;
	return val;
}

// generate a random vector in range
glm::vec3 rand_vec(double r_min, double r_max) {
	return glm::vec3(rand_double(r_min, r_max), rand_double(r_min, r_max), rand_double(r_min, r_max));
}

// keep generating a random unit vector until inside the unit sphere
glm::vec3 in_unit_sphere() {
	for (int i = 0; i < 2000; ++i) {
		glm::vec3 v = rand_vec(-1, 1);
		if (pow(v.x, 2) + pow(v.y, 2) + pow(v.z, 2) >= 1)continue;
		return v;
	}
	return glm::vec3(0, 0, 0);
}

// generate a random vector using unit 
glm::vec3 rand_vec() {
	return in_unit_sphere();
}

// check if the normal is in the same hemisphere
glm::vec3 in_hemisphere(const glm::vec3& normal) {
	glm::vec3 usv = rand_vec();
	usv = glm::dot(usv, normal) > 0.0 ? usv : usv * -1.0f;
	return usv;
}