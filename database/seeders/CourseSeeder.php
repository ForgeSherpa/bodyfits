<?php

namespace Database\Seeders;

use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    private function builder($title, $desc, $categoryid, $photo = null)
    {
        return ['title' => $title, 'description' => $desc, 'trainer_id' => Trainers::factory()->create(), 'category_id' => $categoryid, 'photo' => $photo];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = [
            $this->builder('Biceps Course', 'The biceps are in front of the upper arm. Its function is to pull and stretch the elbow.', 2),
            $this->builder('Triceps Course', 'The triceps are located on the back and side of the upper arm. The triceps are useful for straightening the arms.', 2),
            $this->builder('Chest Course', 'This movement trains several muscles at once. Starting from the chest muscles, triceps, and also the shoulders at once. 
            As well as training the strength of muscle tissue. The chest muscles consist of 4 parts, namely the pectoralis major, pectoralis minor, serratus anterior, and subclavius ​​muscles.', 2),
            $this->builder('Leg Course', 'daily sessions where we only train the leg muscles, 
            without training the muscles of other body parts to train the leg and thigh muscles, namely the quadriceps, hamstring and calf muscles..', 2),
            $this->builder('ABS Course', 'The abs are the muscles around the stomach and navel. These abs are also often referred to as a "six-pack." 
            Having well-developed abdominal muscles is not only a marker of fitness, it enhances athletic performance, makes you more attractive, and allows you to focus on working other muscle parts.', 2),
        ];

        foreach ($collections as $collection) {
            Courses::create($collection);
        }
    }
}
