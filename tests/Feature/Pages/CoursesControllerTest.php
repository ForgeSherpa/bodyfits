<?php

namespace Tests\Feature\Pages;

use App\Models\User;
use Database\Seeders\LessonsSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CoursesControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->actingAs(User::factory()->create());
    }

    /**
     * @test
     * @return void
     */
    public function courseIsRendered()
    {
        $response = $this->get('/courses');

        $response->assertOk();
    }

    public function detailIsRenderedCorrectly()
    {
        $this->seed(LessonsSeeder::class);
        $response = $this->get('/courses/detail/1/lesson/1');

        $response->assertOk();
    }

    public function detailNotFound()
    {
        $response = $this->get('/courses/detail/1/lesson/1');
        $response->assertNotFound();
    }
}
