<?php

namespace Database\Seeders;

use App\Models\Lessons;
use Illuminate\Database\Seeder;

class LessonsSeeder extends Seeder
{
    private function buildText(int $courseId, string $title, string $content = null, string $length)
    {
        return ['course_id' => $courseId, 'title' => $title, 'type' => 'text', 'content' => $content, 'link' => null, 'length' => $length];
    }

    private function buildVideo(int $courseId, string $title, string $link, string $length)
    {
        return ['course_id' => $courseId, 'title' => $title, 'type' => 'video', 'content' => null, 'link' => $link, 'length' => $length];
    }

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $collections = [
            $this->buildVideo(courseId: 1, title: 'Complete Biceps', link: 'https://www.youtube.com/embed/rhblIiwTXRs', length: '18 Minutes'),
            $this->buildText(courseId: 1, title: 'Biceps Explained', content: '1. Close the Chin-Up Grip
            This movement is performed in a hanging pose while holding a horizontal bar. The distance between the right and left hands is about 15 cm. Perform a hanging motion with straight arms. 
            Head straight ahead, then pull your hands up to lift your chin above the iron. Then straighten back like the initial pose.
            2. Number of Rows Reversed
            This movement still uses iron that crosses horizontally for hanging. The difference from the previous movement in this movement is using a towel as a handle. 
            Hang 2 towels by the handles, then hold the towels with your right and left hands and arms straight. When ready to hang, then pull the two towels so that both hands are bent as shown below. 
            After bending your arms back, straighten your arms to their original position, straight up, depending on the towel.
            3. Dumbbell bicep curls
            Hold a dumbbell in each hand. Straighten your arms down while holding dumbbells. Next, bend your arms by lifting the dumbbells up. 
            Do not shift the position of the upper hand, just move the lower hand up so that the dumbbell is held at shoulder height. Then slowly lower back to the starting position.', length: '3 Minutes'),
            $this->buildVideo(courseId: 2, title: 'Triceps Complete', link: 'https://www.youtube.com/embed/XtFUovn_VBo', length: '14 Minutes'),
            $this->buildText(courseId: 2, title: 'Triceps Explained', content: "1. Tricep Dips
            This movement does not require any tools except a chair. Sit on a firm chair. Place your palms on either side of your waist and straighten your legs as shown below.
            Then slowly bend your elbows to 90 degrees while lowering your body towards the floor, then push your body back up by pushing your arms to lift your body back to its original position. 
            If you still can't do this movement, you can bend your legs to help support your body weight.
            2. Close Grip Push Ups
            This movement is done without any tools. First, the initial stance is like a push-up, but the difference is that the distance between the right and left hands does not go over the shoulder, but inside the shoulder. 
            Head down to the floor and hold it in your stomach. Begin lowering the body by bending the elbows. And stop when your arms are parallel to the floor and then return to the starting position.
            3. Seated Overhead Drumbell Extension
            This technique uses dumbbells. Sit on a chair and lift the barbell above your head. Hold 1 barbell with both hands. Move the dumbbell down over the back of your head until your elbows bend. 
            Then return to the hands-over-head position holding the dumbbells. You can also do a variation by holding different dumbbells in your right and left hands and moving them in the same motion.", length: '5 Minutes'),
            $this->buildVideo(courseId: 3, title: 'Chest Training Video', link: 'https://www.youtube.com/embed/OBScpXh6VGs', length: '13 Minutes'),
            $this->buildText(courseId: 3, title: 'Chest Explained', content: "1. BARBELL BENCH PRESS
            This exercise seems to have become a basic exercise, yes, as a way to build body muscles. The movement begins by lying on a bench with your legs bent and flat on the floor. 
            The position of the barbell bar must be right in front of your eyes, then lift the barber bar with your hands wider than your shoulders.
            2. MACHINE CHEST PRESS
            Fitness equipment Machine chest press is a tool to train the Pectoralis muscles or the middle of the chest. The focus of the exercise is like using a Bench Press Flat fitness tool, but with a forward thrust.
            The advantage is that the shape of the grip allows for a vertical or horizontal thrust which exerts different pressure effects on the pectoral muscles. 
            This tool is very suitable for beginners because it is quite easy to use.
            3. DUMBBELL FLYES
            This dumbbell flyes movement is also effective for training the chest muscles, it's just that the level of difficulty is quite high. 
            For beginners it is usually not recommended to do this movement if you really can't control the load. 
            The problem that often arises is that even with a light load, you cannot focus the movement on the chest muscles. Most still rely on the shoulder muscles when doing flyes.", length: '5 Minutes'),
            $this->buildVideo(courseId: 4, title: 'Leg Basic', link: 'https://www.youtube.com/embed/whlS08AiiBk', length: '10 Minutes'),
            $this->buildVideo(courseId: 5, title: 'Abs Basic', link: 'https://www.youtube.com/embed/wx0t9DxLL9U', length: '8 Minutes'),
            $this->buildText(courseId: 6, title: 'Cardio Ez Pz', content: 'Untuk cardio, ya cukup cardio.', length: '5 Seconds'),
            $this->buildText(courseId: 7, title: 'Cardio Part 2', content: 'Selamat datang di cardio part 2 guys guys ku sekalian aokwokwowk', length: '10 Seconds'),
            $this->buildText(courseId: 8, title: 'Kungfu Panda', content: 'And we got kungfu pandaaaaa huh yeahhh kungfuuu pandaaaaa', length: '20 Seconds'),
        ];
        // Lessons::factory(100)->create();
        foreach ($collections as $collection) {
            Lessons::create($collection);
        }
    }
}
