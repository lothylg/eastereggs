

/*
    You have movie searches going on all over the place.
    It makes sense to consilidate this into a single
    function that can be called from anywhere.

    searchBy: can either be id or query. 
      Search by id will only return a single response.

    searchValue: the specific id or query being searched against.

    If no result(s) are found this function will always return null
*/
async function searchMovies(searchBy, searchValue){
    const apiKey = 'c5d6f49c';
    const searchParam = (searchBy === "id" ? "i" : "s")

    try {
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&${searchParam}=${searchValue}`;
        const resp = await fetch(url)
        const data = await resp.json() 
        let result = null
        
        if(data?.Search && data.Search.length){
            result = data.Search 
        } else if(data && data !== null) {
            result = data 
        }

        if( result && searchBy === "id" && Array.isArray(result) ){
            result = result[0]
        }
        console.log(result)
        return result
    } catch(err){
        console.log(`Error in search movie service: ${err.message}`)
        throw err
    }
}

async function getRandomMovie() {
    const keywords = ["new", "fire", "back", "dead", "dog", "cat", "dragon", "cops", "law", "detective", "report", "study", "love", "death", "lost", "big", "world", "star", "american", "war"]
    const searchQuery = keywords[Math.floor(Math.random() * keywords.length)];

    try {
        const data = await searchMovies("query", searchQuery)
        console.log(data)
        // FYI: Not receiving a movie back isn't necessarily an error.
        // if (data = null) {
        //     throw new Error('No movies found from OMDb API');
        // }

        const maxMovies = (data.length > 15) ? 15 : data.length - 1;
        const randomMovies = data.slice(0, maxMovies);
        return randomMovies
    } catch(err){
        throw err
    }
}


module.exports = {
    getRandomMovie,
    searchMovies
}