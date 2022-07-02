#pragma once
#include"ray.h"
#include<glm/vec3.hpp>
#include<glm/geometric.hpp>
#include<memory>

typedef struct hit_record {
	glm::vec3 point = glm::vec3(0, 0, 0);
	glm::vec3 normal = glm::vec3(0, 0, 0);
	double t = 0;
	bool front_face = false;

	inline void set_face_normal(Ray& ray, const glm::vec3& outward) {
		front_face = glm::dot(ray.get_direction(), outward) < 0;
		if (front_face) normal = outward;
		else normal = outward * -1.0f;
	}
} hit_record;