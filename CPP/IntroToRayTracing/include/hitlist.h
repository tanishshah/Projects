# pragma once
#include"hittable.h"

class Hitlist : public Hittable {
	private:
		// vector to store the elements that are hittable
		std::vector<std::shared_ptr<Hittable>> elements;

	public:
		// constructors and destructors
		Hitlist();
		Hitlist(std::shared_ptr<Hittable> element);
		Hitlist(Hitlist& hitlist);
		~Hitlist();

		// utility functions
		void clear();
		void insert(std::shared_ptr<Hittable> element);
		void pop();

		// overwritten hit function
		bool hit(Ray& ray, double t_min, double t_max, super_record& srecord) override;
};