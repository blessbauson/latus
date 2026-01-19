<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\JokeService;
use Illuminate\Http\JsonResponse;

class JokesController extends Controller
{

    public function __construct(
        protected JokeService $jokeService
    ) {}

    public function index(): JsonResponse
    {
        $jokes = $this->jokeService->fetchJokes();

        return response()->json([
            'data' => $jokes
        ]);
    }
}
