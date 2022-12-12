<?php

namespace Database\Factories;

use App\Models\Categories;
use App\Models\Trainers;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Courses>
 */
class CoursesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'title' => fake()->title(),
            'trainer_id' => Trainers::factory()->create(),
            'category_id' => Categories::factory()->create(),
            'description' => fake()->paragraph(2),
            'photo' => null
        ];
    }
}
