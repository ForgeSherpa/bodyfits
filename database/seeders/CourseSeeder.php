<?php

namespace Database\Seeders;

use App\Models\Courses;
use App\Models\Trainers;
use Illuminate\Database\Seeder;

class CourseSeeder extends Seeder
{
    private function build(string $title, string $desc, int $categoryid, ?string $photo = null)
    {
        return ['title' => $title, 'description' => $desc, 'trainer_id' => Trainers::factory()->create()->id, 'category_id' => $categoryid, 'photo' => $photo];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = [
            $this->build('Biceps Course', 'The biceps are in front of the upper arm. Its function is to pull and stretch the elbow.', 2, 'biceps.jpg'),
            $this->build('Triceps Course', 'The triceps are located on the back and side of the upper arm. The triceps are useful for straightening the arms.', 2, 'triceps.jpg'),
            $this->build('Chest Course', 'This movement trains several muscles at once. Starting from the chest muscles, triceps, and also the shoulders at once. 
            As well as training the strength of muscle tissue. The chest muscles consist of 4 parts, namely the pectoralis major, pectoralis minor, serratus anterior, and subclavius ​​muscles.', 2, 'chest.webp'),
            $this->build('Leg Course', 'daily sessions where we only train the leg muscles, 
            without training the muscles of other body parts to train the leg and thigh muscles, namely the quadriceps, hamstring and calf muscles..', 2, 'leg.jpg'),
            $this->build('ABS Course', 'The abs are the muscles around the stomach and navel. These abs are also often referred to as a "six-pack." 
            Having well-developed abdominal muscles is not only a marker of fitness, it enhances athletic performance, makes you more attractive, and allows you to focus on working other muscle parts.', 2, 'abs.webp'),
            $this->build('Cardio Basic 1', 'Basic of Cardio', 1, 'cardio1.jpg'),
            $this->build('Cardio Basic 2', 'Basic of Cardio: The Sequel.', 1, 'cardio2.jpeg'),
            $this->build('Kungfu', 'Learn kungfu with panda right now.', 4, 'kungfu.jpg'),
        ];

        foreach ($collections as $collection) {
            Courses::create($collection);
        }
    }
}
