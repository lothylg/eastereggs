
document.addEventListener('DOMContentLoaded', async () => {
    const apiKey = 'c5d6f49c';
    const selectedMovie = JSON.parse(localStorage.getItem('selectedMovie'));

    if (selectedMovie) {
        const query = selectedMovie.Title;
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(query)}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            // Here we know the id of the movie on the page
            // Discussions for each movie are tied to the movie id 
            const resp = await fetch(`/api/discussion?movie=${data.imdbID}`)
            const discussions = await resp.json()

            if (data.Response === "True") {
                renderMovieDetails(data);
            } else {
                alert('Movie details not found!');
            }
        } catch (error) {
            console.error('Error fetching the movie details:', error);
        }
    }

});

function renderMovieDetails(movie) {
    const discussionContainer = document.getElementById('discussion-container');

    discussionContainer.innerHTML = `
        <img src="${movie.Poster}" alt="${movie.Title} Poster" class="movie-poster">
        <div class="movie-details">
            <h2>${movie.Title}</h2>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Rated:</strong> ${movie.Rated}</p>
            <p><strong>Runtime:</strong> ${movie.Runtime}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Writer:</strong> ${movie.Writer}</p>
            <p><strong>Actors:</strong> ${movie.Actors}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Awards:</strong> ${movie.Awards}</p>
            <p><strong>Box Office:</strong> ${movie.BoxOffice}</p>
        </div>
    `;
}

function startDiscussion() {
    const topic = document.getElementById('topic-input').value;

    if (topic) {
        localStorage.setItem('discussionTopic', topic);
        window.location.href = 'discussion_topic.html'; // Need to create another page that hosts the topics being discussed.
    } else {
        alert('Please enter a topic to start a discussion.');
    }
}

function searchMoviesFromDiscussion() {
    const query = document.getElementById('search-input').value;

    if (query) {
        localStorage.setItem('searchQuery', query);
        window.location.href = 'index.html';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        localStorage.setItem('searchQuery', query);
        window.location.href = 'index.html';
    }
}
