#pragma once
#include<random>
#include<glm/vec3.hpp>
#include<glm/gtx/norm.hpp>

/*
* function to generate a random double
* useing real distribution and knuth_b generator
*/
double rand_double();

// different generator
double rand_double(std::mt19937& mt);

// random double with range
double rand_double(double r_min, double r_max);

// utility function to cllamp colour computation
double clamp(double val, double min, double max);

// generate a random vector in range
glm::vec3 rand_vec(double r_min, double r_max);

// keep generating a random unit vector until inside the unit sphere
glm::vec3 in_unit_sphere();

// generate a random vector using unit 
glm::vec3 rand_vec();

// check if the normal is in the same hemisphere
glm::vec3 in_hemisphere(const glm::vec3& normal);