## Laravel Random Jokes App
This Laravel 12 project demonstrates a small web and API application that fetches 3 random programming jokes from an external API, with authentication handled via Breeze and Sanctum.

It includes:
- Blade front-end with logout button
- /api/jokes endpoint protected with Sanctum
- JokeService to fetch, shuffle, and return jokes
- User seeder with API token for testing
- Pest tests for API endpoint

## Requirements
- PHP 8.1+
- Laravel 12
- Composer

## Installation
1. Clone the repository
2. Install PHP dependencies (Laravel 12, Sanctum, Breeze)
3. Setup .env file
4. Generate application key
5. Configure .env for database and API
6. Run migrations and seed the default user
7. Install or setup frontend dependencies (Bootstrap, Jquery)

## User Credentials
1. The seeder creates a default user:
**bless.delapaz@gmail.com / PassAdmin1234***

## API
1. Returns 3 random jokes, Protected by auth:sanctum and returns JSON
**API will be available at http://localhost:8000/api/jokes**

```json
{
    "data": [
        "Why do Java programmers wear glasses? Because they don't C#.",
        "Why did the programmer bring a ladder to work? They heard the code needed to be debugged from a higher level.",
        "Hey, wanna hear a joke? Parsing HTML with regex."
    ]
}
```

## Routes
- /login – Login page
- /register – Register page
- /dashboard – Protected page that serves the random jokes
- Logout button in upper-right corner

## Usage
Blade page (Jokes)
1. Log in with seeded user.
2. Go to the jokes page (dashboard)
3. Click Refresh Jokes to fetch 3 random jokes from the API.
4. Logout using the button on the upper-right corner.

## Testing (PEST)
Run all tests:
```php
php artisan test
```

## ENV File
```php
API_LIMIT=60
MAXATTEMPTS=5
API_TIMEOUT_IN_SECS=10
```

