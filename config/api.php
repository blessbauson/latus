<?php
    return [
        'app_key'                       => env('APP_KEY'),
        'api_timeout_in_secs'           => env('API_TIMEOUT_IN_SECS', 10),
        'api_limit'                     => env('API_LIMIT', 60),
        'max_attempts'                  => env('MAXATTEMPTS', 5),
        'paginate_limit'                => env('PAGINATE_LIMIT', 3),
        'jokes_api_url'                 => "https://official-joke-api.appspot.com/jokes/programming/ten/"
    ];