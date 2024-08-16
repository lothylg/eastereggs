document.addEventListener('DOMContentLoaded', () => {
    const previousSearchQuery = localStorage.getItem('searchQuery');
});

async function searchMovies(query = null) {
    const searchQuery = query || document.getElementById('search-input').value;
    window.location.href = `/search?q=${searchQuery}`;
}

function viewMovie(imdbID) {
    window.location.href = `/movie/${imdbID}`;
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        const query = document.getElementById('search-input').value;
        localStorage.setItem('searchQuery', query);
        searchMovies();
    }
}


