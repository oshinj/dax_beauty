import React, {useEffect, useState} from 'react'
import { SRLWrapper } from 'simple-react-lightbox'

const axios = require('axios');

function Movies(props) {
  const [ids] = useState(
    ["tt1201607", "tt1707386", "tt0903624", "tt2278388", "tt3896198", "tt1386697", "tt7286456", "tt4777008",
    "tt6394270", "tt6266538", "tt4555426", "tt1392190", "tt0790636", "tt1007029", "tt0780653"]
  );

  const [movies, setMovies] = useState([])

  const [shouldRender] = useState(true)

  const options = {
    caption: {
      showCaption: true
    },
  }

  useEffect(() => {
    ids.forEach(function(id) {
      axios.get('https://www.omdbapi.com/?i= '+ id + '&apikey=242f83a1')
        .then(function (response) {
          var movie = {
            id: id,
            poster: response.data.Poster,
            name: response.data.Title,
            synopsis: response.data.Plot,
            director: response.data.Director,
            imdb: response.data.imdbRating,
            meta: response.data.Metascore
          }
          setMovies(movies => [...movies, movie])
        })
    })
  }, [shouldRender, ids])

  function genCaption(movie) {
    return "---Title--- " + movie.name + "\n---Director--- "
            + movie.director + "\n---IMDB Rating--- " + movie.imdb;
  }

  return(
    <div>
      <h2>Movies Recognized for their Styling Teams</h2>
      <SRLWrapper options="options">
        <div className="movgal">
          {movies.map((movie, index) => (
            <img src={movie.poster} className="movg" alt={genCaption(movie)} key={index}></img>
          ))}
        </div>
      </SRLWrapper>
    </div>
  );
}

export default Movies;