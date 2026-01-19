<?php
namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Collection;

class JokeService 
{
	protected int $timeout_in_secs;
    protected string $api_url;

    public const CONTENT_TYPE = 'application/json';

    public function __construct()
    {
        $this->timeout_in_secs  = config('api.api_timeout_in_secs', 10);
        $this->api_url          = config('api.jokes_api_url');
    }

    /**
     * Fetch 3 random jokes from the API
     *
     * @return array<int, string>
     */
    public function fetchJokes(): array
    {
        $response = Http::acceptJson()
                    ->timeout($this->timeout_in_secs)
                    ->get($this->api_url)
                    ->throw()
                    ->json();

        return collect($response)
                ->shuffle()
                ->take(3)
                ->map(fn ($joke) => "{$joke['setup']} {$joke['punchline']}")
                ->values()
                ->toArray();
    }
}