<?php
//TO RUN: php artisan test

use App\Models\User;
use Laravel\Sanctum\Sanctum;

it('denies unauthenticated users', function () 
{
    $this->getJson('/api/jokes')->assertStatus(401);
});


it('returns 3 random jokes for authenticated user', function () 
{
    //Create user
    $user = User::factory()->create();

    //Authenticate via Sanctum
    Sanctum::actingAs($user);

    //Call API
    $response = $this->getJson('/api/jokes');

    //Assertions
    $response->assertStatus(200)
        ->assertJsonStructure([
            'data'
        ]);

    expect($response->json('data'))->toHaveCount(3);
});
