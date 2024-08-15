document.addEventListener('DOMContentLoaded', () => {
    const previousSearchQuery = localStorage.getItem('searchQuery');

    if (previousSearchQuery) {
        searchMovies(previousSearchQuery);
    }
});

async function searchMovies(query = null) {
    const apiKey = 'c5d6f49c';
    const searchQuery = query || document.getElementById('search-input').value;
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.Response === "True") {
            renderMovies(data.Search);
        } else {
            alert('No movies found!');
        }
    } catch (error) {
        console.error('Error fetching the movie data:', error);
    }
}

function renderMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.className = 'movie';
        
        movieElement.innerHTML = `
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
        
        movieElement.addEventListener('click', () => {
            localStorage.setItem('selectedMovie', JSON.stringify(movie));
            window.location.href = 'discussion.html';
        });

        movieContainer.appendChild(movieElement);
    });

    localStorage.setItem('searchQuery', searchQuery);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        localStorage.setItem('searchQuery', query);
        searchMovies();
    }
}