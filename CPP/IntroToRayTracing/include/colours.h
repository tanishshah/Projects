#pragma once

#include<glm/vec3.hpp>
#include<glm/geometric.hpp>
#include<iostream>
#include"ray.h"
#include"hittable.h"
#include"utils.h"

// Define the function for writing the colour out
void write_colour(std::ostream& out, glm::vec3 colour, double num_samples);

// the function for setting the colour of the ray
glm::vec3 ray_colour(Ray& ray, Hittable& hitlist, int depth);