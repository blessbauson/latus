@extends('layouts.default')

@section('content')
    <div class="container">
        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button class="btn btn-primary" type="submit"
                style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
                Logout
            </button>
        </form>

        <div class="container">
            <h1>Random Jokes</h1>
            <br clear="all"/><br/>

            <ul id="jokes"></ul>
            <br clear="all"/><br/>

            <button class="btn btn-secondary" id="refresh-jokes">Refresh Jokes</button>
        </div>
    </div>
@endsection

@section('scripts')
    <script>
        $(document).ready(function() {
            const $jokesList = $('#jokes');
         
            async function loadJokes() {
                $jokesList.empty(); // clear previous jokes
                $jokesList.append('<li>Loading jokes...</li>');

                try {
                    const token     = document.querySelector('meta[name="api-token"]').content;
                    const response  = await fetch('/api/jokes', {
                                        headers: {
                                            'Accept': 'application/json',
                                            'Authorization': 'Bearer ' + token
                                        }
                                    });
                    const result    = await response.json();

                    $jokesList.empty(); // remove loading message

                    result.data.forEach(joke => {
                        $jokesList.append('<li>' + (joke.joke ?? joke) + '</li>');
                    });

                } catch (error) {
                    $jokesList.html('<li>Failed to load jokes.</li>');
                    console.error('Error fetching jokes:', error);
                }
            }

            // Load jokes on page load
            loadJokes();

            // Bind refresh button
            $('#refresh-jokes').click(loadJokes);
        });
    </script>
@endsection