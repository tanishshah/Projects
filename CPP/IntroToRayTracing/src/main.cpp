// main file for the raytracer

#include <iostream>
#include<glm/vec3.hpp>

#include"colours.h"
#include"ray.h"
#include"hitlist.h"
#include"sphere.h"
#include"camera.h"
#include"material.h"

int main()
{
    // image settings
    const double aspect_ratio = 16.0f / 9.0f;
    const int img_width = 150;
    const int img_height = int(img_width / aspect_ratio);

    // camera settings
    Camera camera;
    int samples = 1;

    // elements going in the image
    Hitlist hitlist;

    auto gnd = std::make_shared<Lambertian>(glm::vec3(0.7, 0.7, 0.0));
    auto cen = std::make_shared<Dielectric>(1.5);

    hitlist.insert(std::make_shared<Sphere>(glm::vec3(0.0, 0.0, -1.0), 0.5, cen));
    hitlist.insert(std::make_shared<Sphere>(glm::vec3(0.0, -100.5, -1.0), 100.0, gnd));

    // rendering the image
    std::cout << "P3\n" << img_width << ' ' << img_height << "\n255\n";

    for (int j = img_height - 1; j >= 0; --j) {
        for (int i = 0; i < img_width; ++i) {
            glm::vec3 pixel_colour;
            for (int k = 0; k < samples; ++k) {
                double u = double(i + rand_double()) / (img_width - 1);
                double v = double(j + rand_double()) / (img_height - 1);
                Ray ray = camera.get_ray(u, v);
                pixel_colour += ray_colour(ray, hitlist, 40);
            }
            write_colour(std::cout, pixel_colour, (double)samples);
        }
    }
    return 0;
}

