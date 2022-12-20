<?php

namespace Tests\Feature\Pages;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        $this->actingAs($user);
    }

    /**
     * A basic feature test example.
     *
     * @test
     *
     * @return void
     */
    public function profileIsRendered()
    {
        $response = $this->get('/');

        $response->assertOk();
    }

    /**
     * @test
     */
    public function userCanChangeName()
    {
        $response = $this->post(route('profile.changeName'), ['name' => 'New Name']);

        $response->assertRedirect()->assertSessionHas('status', 'success');
    }

    /**
     * @test
     */
    public function userChangeNameError()
    {
        $response = $this->post(route('profile.changeName'));

        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function userCanChangeEmail()
    {
        $response = $this->post(route('profile.changeEmail'), ['email' => 'new@email.com']);

        $response->assertRedirect()->assertSessionHas('status', 'success');
    }

    /**
     * @test
     */
    public function userChangeEmailError()
    {
        $response = $this->post(route('profile.changeEmail'));

        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function userChangeEmailUnique()
    {
        $user = User::factory()->create();

        $response = $this->post(route('profile.changeEmail'), ['email' => $user->email]);

        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function userCanChangePhoto()
    {
        Storage::fake('propic');

        $propic = UploadedFile::fake()->image('propic.jpg');

        $response = $this->post(route('profile.changePhoto'), ['photo' => $propic]);

        $response->assertRedirect()->assertSessionHas('status', 'success');
    }

    /**
     * @test
     */
    public function userChangePhotoInvalid()
    {
        $response = $this->post(route('profile.changePhoto'));

        $response->assertInvalid();
    }

    /**
     * @test
     */
    public function userCanDeleteAcccount()
    {
        $this->delete(route('profile.deleteAccount'));

        $this->assertGuest();
    }

    /**
     * @test
     */
    public function userCanChangePassword()
    {
        // buat user lagi karena kita ga punya akses ke user yang sedang login
        // sekarang

        $user = User::factory()->create();

        $password = 'okelaaaaaaa';

        $response = $this->actingAs($user)->post('/profile/changePassword', [
            'old_password' => 'password',
            'new_password' => $password,
            'new_password_confirmation' => $password,
        ]);

        $response->assertRedirect()->assertSessionHas('status', 'success')->assertValid();
    }

    /**
     * @test
     */
    public function userCantChangePasswordDueValidation()
    {
        $response = $this->post('/profile/changePassword', [
            'old_password' => 'aowkowkowkoaowkokfoker',
            'new_password' => 'capek',
            'new_password_confirmation' => 'capekuy',
        ]);

        $response->assertRedirect()->assertSessionHasErrors(['old_password', 'new_password']);
    }

    /**
     * @test
     * */
    public function userDeleteAccount()
    {
        $response = $this->delete('/profile/delete');

        $response->assertRedirect()->assertSessionHas('status', 'success');
        $this->assertGuest();
    }
}
