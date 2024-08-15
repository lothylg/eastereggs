


async function searchMovies(){
    const apiKey = 'c5d6f49c';
    const searchQuery = "";
    const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${searchQuery}`;

    const resp = await fetch(url)
    const data = await resp.json() 
    return data;
}


module.exports = {
    searchMovies
}