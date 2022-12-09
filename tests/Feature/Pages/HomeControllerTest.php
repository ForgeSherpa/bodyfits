<?php

namespace Tests\Feature\Pages;

use Tests\TestCase;

class HomeControllerTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @test
     *
     * @return void
     */
    public function homeIsRendered()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
