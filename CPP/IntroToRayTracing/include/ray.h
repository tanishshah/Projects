#pragma once

#include<glm/vec3.hpp>

class Ray {
	private:
		glm::vec3 origin;  // the origin position of the ray
		glm::vec3 direction;  // the direction that the ray is travelling

	public:
		// constructors and destructors
		Ray();
		Ray(const glm::vec3& orig, const glm::vec3& direction);
		~Ray();

		// accessors and mutators for the origin
		glm::vec3 get_origin();
		void set_origin(glm::vec3& orig);

		// accessors and mutators for the direction
		glm::vec3 get_direction();
		void set_direction(glm::vec3& direc);

		// get the vector representing the ray
		glm::vec3 func(double t) const;
};
