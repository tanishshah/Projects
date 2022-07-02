#include"hitlist.h"

// constructors and desturctors
Hitlist::Hitlist() {
	this->elements = std::vector<std::shared_ptr<Hittable>>();
}

Hitlist::Hitlist(std::shared_ptr<Hittable> element) {
	this->elements.push_back(element);
}

Hitlist::Hitlist(Hitlist& hitlist) {
	this->elements = hitlist.elements;
}

Hitlist::~Hitlist(){}

// utilities
void Hitlist::clear() {
	this->elements.clear();
}

void Hitlist::insert(std::shared_ptr<Hittable> element) {
	this->elements.push_back(element);
}

void Hitlist::pop() {
	this->elements.pop_back();
}

// override the hit function
bool Hitlist::hit(Ray& ray, double t_min, double t_max, super_record& srecord) {
	bool did_hit = false;
	super_record srecord2;
	double t = t_max;

	for (auto& element : this->elements) {
		if (element->hit(ray, t_min, t, srecord2)) {
			did_hit = true;
			t = srecord.h.t;
			srecord.h = srecord2.h;
			srecord.m = srecord2.m;
		}
	}

	return did_hit;
}