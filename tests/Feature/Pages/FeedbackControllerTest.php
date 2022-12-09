<?php

namespace Tests\Feature\Pages;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class FeedbackControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * @test
     *
     * @return void
     */
    public function feedbackIsRendered()
    {
        $this->get('/feedback')->assertStatus(200);
    }

    /**
     * @test
     */
    public function userCanSubmitFeedback()
    {
        $response = $this->post('/feedback', [
            'title' => 'Website bagus',
            'content' => 'Pasti yang buat kelompok 2',
        ]);

        $response->assertRedirect()->assertSessionHas('status', 'success');
    }

    /**
     * @test
     */
    public function userFeedbackValidationError()
    {
        $response = $this->post('/feedback');

        $response->assertRedirect()->assertSessionHasErrors(['title', 'content']);
    }
}
