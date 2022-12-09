<?php

namespace Tests\Feature\Pages;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
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
     * @test
     * @return void
     */
    public function profileIsRendered()
    {
        $response = $this->get('/');

        $response->assertStatus(200)->assertSee('BodyFits');
    }

    /**
     * @test
     */
    public function userCanUpdateProfile()
    {
        $response = $this->put('/profile', [
            'name' => 'delvin',
            'email' => 'delvinganteng@mail.com'
        ]);

        $response->assertRedirect('/profile')->assertSessionHas('status', 'success');
    }

    /**
     * @test
     */
    public function userUpdateProfileErrorValidation()
    {
        // buat random user
        $dummyUser = User::factory()->create();
        $user = User::factory()->create();

        // make email si random user (duplikat)
        $response = $this->actingAs($user)->put('/profile', [
            // 'name' => 'delvin',
            'email' => $dummyUser->email
        ]);

        // cek ada ga error terkait email.
        $response->assertSessionHasErrors(['email', 'name']);
    }

    /**
     * @test
     */
    public function userCanChangePassword()
    {
        // buat user lagi karena kita ga punya akses ke user yang sedang login
        // sekarang

        $user = User::factory()->create();

        $password = "okelaaaaaaa";

        $response = $this->actingAs($user)->put('/profile/changePassword', [
            'old_password' => 'password',
            'new_password' => $password,
            'new_password_confirmation' => $password
        ]);

        $response->assertRedirect()->assertSessionHas('status', 'success')->assertValid();
    }

    /**
     * @test
     */
    public function userCantChangePasswordDueValidation()
    {
        $response = $this->put('/profile/changePassword', [
            'old_password' => 'aowkowkowkoaowkokfoker',
            'new_password' => 'capek',
            'new_password_confirmation' => 'capekuy'
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
