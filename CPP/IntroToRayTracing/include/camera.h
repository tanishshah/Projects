#pragma once

#include<glm/vec3.hpp>
#include"ray.h"

class Camera {
	private:
		// member variables
		glm::vec3 origin;
		glm::vec3 llc;  // lower left corner
		glm::vec3 horizontal;
		glm::vec3 vertical;
	public:
		// constructors and destructors
		Camera();
		Camera(double asperct_ratio, double height, double focal_length);
		~Camera();

		// get the ray we are going to use
		Ray get_ray(double u, double v);
};
