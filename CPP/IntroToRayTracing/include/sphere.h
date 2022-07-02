# pragma once
#include"hittable.h"
#include"material.h"

class Sphere : public Hittable {
	private:
		glm::vec3 centre;  // represent the centre of the sphere
		double radius;  // the radius of the sphere
		std::shared_ptr<Material> material;

	public:
		// constructors and desturctors
		Sphere();
		~Sphere();
		Sphere(const glm::vec3& centre, const double& radius, std::shared_ptr<Material> material);

		// accessors and mutators
		glm::vec3 get_centre();
		void set_centre(const glm::vec3& centre);

		double get_radius();
		void set_radius(const double& radius);

		std::shared_ptr<Material> get_material();

		// whether the sphere was hit or not, overwritten from the hittable class
		bool hit(Ray& ray, double t_min, double t_max, super_record& srecord) override;
};