#pragma once


#include<glm/vec3.hpp>
#include<glm/geometric.hpp>
#include<memory>
#include"hit_record.h"
#include"material.h"
#include"ray.h"

typedef struct super_record{
	hit_record h;
	std::shared_ptr<Material> m;
}super_record;

class Hittable {
	public:
		// function that will represent when hits occur or not
		virtual bool hit(Ray& ray, double t_min, double t_max, super_record& srecord) { return true; }
};