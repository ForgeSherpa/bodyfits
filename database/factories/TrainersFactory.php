<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Trainers>
 */
class TrainersFactory extends Factory
{
    private function getRandomTrainerPic(): string
    {
        $rand = rand(1, 5);

        return "gymnist{$rand}.jpg";
    }

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => fake()->name(),
            'age' => rand(1, 100),
            'nationality' => fake()->country(),
            'job' => fake()->jobTitle(),
            'contact' => fake()->phoneNumber(),
            'description' => fake()->paragraph(1),
            'photo' => $this->getRandomTrainerPic(),
        ];
    }
}
