# pragma once
#include<glm/geometric.hpp>
#include"hit_record.h"
#include"ray.h"
#include"utils.h"

class Material {
	public:
		virtual bool scatter(Ray& i_ray, hit_record& hrecord, glm::vec3& force, Ray& s_ray) { return 0; }
};

class Lambertian : public Material {
	private:
		glm::vec3 albedo;
	public:
		Lambertian(glm::vec3 c) : albedo(c) {}
		bool scatter(Ray& i_ray, hit_record& hrecord, glm::vec3& force, Ray& s_ray) override {
			glm::vec3 direc = hrecord.normal + glm::normalize(rand_vec());
			direc = abs(direc.x + direc.y + direc.z) < 1e-5 ? hrecord.normal : direc;
			s_ray = Ray(hrecord.point, direc);
			force = albedo;
			return true;
		}
};

class Metal : public Material {
	private:
		glm::vec3 albedo;
		glm::vec3 reflect(glm::vec3& v, glm::vec3& n) {
			return v - (n * (glm::dot(v, n)) * 2.0f);
		}
	public:
		Metal(glm::vec3 c) : albedo(c) {}
		bool scatter(Ray& i_ray, hit_record& hrecord, glm::vec3& force, Ray& s_ray) override {
			glm::vec3 nv = glm::normalize(i_ray.get_direction());
			glm::vec3 reflected = this->reflect(nv, hrecord.normal);
			Ray r(hrecord.point, reflected);
			s_ray = r;
			force = albedo;
			return (glm::dot(hrecord.normal, s_ray.get_direction()) > 0);
		}
};

class Dielectric : public Material {
	private:
		double index_of_refraction;
		glm::vec3 refract(glm::vec3& uv, glm::vec3& n, double ratio) {
			double cos_theta = fmin(glm::dot(uv * -1.0f, n), 1.0);
			glm::vec3 ro_perp = (uv + n * (float)cos_theta) * float(ratio);
			glm::vec3 ro_para = n * (float)(-1 * sqrt(fabs(1.0 - (pow(ro_perp.x, 2) + pow(ro_perp.y, 2) + pow(ro_perp.z, 2)))));
			return ro_perp + ro_para;
		}
		glm::vec3 reflect(glm::vec3& v, glm::vec3& n) {
			return v - (n * (glm::dot(v, n)) * 2.0f);
		}
		double reflectance(double cosine, double ref) {
			double r0 = (1 - ref) / (1 + ref);
			r0 = pow(r0, 2);
			return (r0 + (1 - r0) * pow((1 - cosine), 5));
		}
	public:
		Dielectric(double ir) : index_of_refraction(ir) {}
		bool scatter(Ray& i_ray, hit_record& hrecord, glm::vec3& force, Ray& s_ray) override{
			force = glm::vec3(1.0, 1.0, 1.0);
			double rr = hrecord.front_face ? (1.0 / this->index_of_refraction) : this->index_of_refraction;
			glm::vec3 ud = glm::normalize(i_ray.get_direction());
			
			double cos_theta = fmin(glm::dot(ud * -1.0f, hrecord.normal), 1.0);
			double sin_theta = sqrt(1.0 - pow(cos_theta, 2));
			bool can_refract = rr * sin_theta <= 1.0;
			glm::vec3 d; // to replace direction
			d = can_refract && this->reflectance(cos_theta, rr) > rand_double() ? this->refract(ud, hrecord.normal, rr)
				: this->reflect(ud, hrecord.normal);

			s_ray = Ray(hrecord.point, d);
			return true;
		}
};