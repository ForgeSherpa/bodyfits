<?php

namespace Database\Factories;

use App\Models\Courses;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lessons>
 */
class LessonsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $pretype = ['text', 'video'][rand(0, 1)];

        return [
            'course_id' => Courses::factory()->create(),
            'type' => $pretype,
            'content' => $pretype === 'text' ? fake()->paragraph(10) : null,
            'link' => $pretype === 'video' ? 'https://www.youtube.com/embed/4y--LHV6VuM' : null,
            'length' => '5 Minutes',
            'title' => fake()->title(),
        ];
    }
}
