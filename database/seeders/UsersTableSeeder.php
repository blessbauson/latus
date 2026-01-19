<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    const DT = '2026-01-19 00:00:00';

    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();

        // Create a user
        $user = User::create([
            'id'                => 1,
            'name'              => 'Bless Bauson',
            'email'             => 'bless.delapaz@gmail.com',
            'password'          => '$2y$10$zCFkT01MQCFKa0VMqQwmeOT84v5OFykkpGrYQTYJPufk74JwyvR5e', //Default password is : PassAdmin1234*
            'created_at'        => self::DT,
            'updated_at'        => self::DT
        ]);

        // Generate a token for this user
        $token = $user->createToken('api-token')->plainTextToken;
        $this->command->info("API token for {$user->email}: $token");
    }
}
