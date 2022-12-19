<?php

namespace Tests\Feature\Pages;

use App\Models\Notes;
use App\Models\User;
use Database\Seeders\UserSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;
use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(UserSeeder::class);
        $this->actingAs(User::first());
    }

    /**
     * A basic feature test example.
     *
     * @test
     *
     * @return void
     */
    public function homeIsRendered()
    {
        $response = $this->get(route('home'));

        $response->assertOk();
    }

    private function addNote()
    {
        $res = $this->postJson(route('notes'), [
            'note' => 'Halo Dunia!',
            'date' => now()->toDateString(),
        ]);
    }

    /**
     * @test
     */
    public function userCanAddNotes()
    {
        $this->addNote();

        $this->assertTrue(Notes::count() > 0, 'Notes nya kok ilang?');
    }

    /**
     * @test
     */
    public function userCanViewNotes()
    {
        $this->addNote();
        $response = $this->getJson(route('notes'));

        $response->assertJson(fn (AssertableJson $json) => $json->count(0, 6));
    }

    /**
     * @test
     */
    public function userAddNoteErrorValidation()
    {
        $response = $this->post(route('notes'));

        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function userCanEditNotes()
    {
        $this->addNote();

        define('ISI_NOTE', 'baru!!');

        $this->put(route('notes'), [
            'note' => ISI_NOTE,
            'date' => now()->toDateString(),
        ]);

        $this->assertTrue(Notes::first()->note === ISI_NOTE, 'Ndak sama :(');
    }

    /**
     * @test
     */
    public function userEditNoteValidation()
    {
        $res = $this->put(route('notes'));

        $res->assertInvalid();
    }

    /**
     * @test
     */
    public function userCanDeleteNote()
    {
        $this->addNote();

        $this->delete(route('notes'), ['date' => now()->toDateString()]);
        $this->assertTrue(Notes::count() === 0, 'Yah ndak kedelete.');
    }
}
