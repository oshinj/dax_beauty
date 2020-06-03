import React, {useEffect, useState} from 'react'
import { SRLWrapper } from 'simple-react-lightbox'
import Modal from 'react-awesome-modal'
import Select from 'react-select'
import config from '../config.js'

const axios = require('axios');
const firebase = require('firebase')

function Movies(props) {
  const [movVisible, setMovVisible] = useState(false)

  const [listVisible, setListVisible] = useState(false)

  const [picVisible, setPicVisible] = useState(false)

  const [lightPic, setLightPic] = useState("")

  const [lightMovie, setLightMovie] = useState({
    id: "",
    name: "",
    director: "",
    imdb: "",
    lists: []
  })

  const [newId, setNewId] = useState("")

  const [searchText, setSearch] = useState("")

  const [listTitle, setListTitle] = useState("")

  const [ids, setIds] = useState([]);

  const [lists, setLists] = useState([])

  const [currList, setCurrList] = useState("All")

  const [movies, setMovies] = useState([])

  const [show, setShow] = useState(8)

  const [showClass, setShowClass] = useState("loadMore")

  const [shouldRender, setShouldRender] = useState(true)

  const options = {
    caption: {
      showCaption: true
    },
  }

  const [doptions, setDoptions] = useState([])

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    let id_ref = firebase.database().ref('imdb_ids')
    let movie_ref = firebase.database().ref('movies')
    let list_ref = firebase.database().ref('lists')

    id_ref.on('value', snapshot => {
      var tempArray = []
      snapshot.forEach(function(child) {
        tempArray.push(child.val())
      })
      setIds(tempArray)
    })

    list_ref.on('value', snapshot => {
      var tempArray = []
      var optDict = []
      snapshot.forEach(function(child) {
        tempArray.push(child.val())
        var opt = {
          value: child.val(),
          label: child.val()
        }
        optDict.push(opt)
      })
      setLists(tempArray)
      setDoptions(optDict)
    })

    movie_ref.on('value', snapshot => {
      var tempArray = []
      snapshot.forEach(function(child) {
        var movie = {
          id: child.val().id,
          poster: child.val().poster,
          name: child.val().name,
          synopsis: child.val().synopsis,
          director: child.val().director,
          imdb: child.val().imdb,
          meta: child.val().meta,
          lists: child.val().lists
        }
        if (searchText !== "") {
          if (child.val().name.includes(searchText)) {
            tempArray.push(movie)
          }
        }
        else {
          if (child.val().lists.includes(currList)) {
            tempArray.push(movie)
          }
        }
      })
      setMovies(tempArray)
    })
}, [shouldRender])

  function openMovModal() {
    setMovVisible(true)
  }

  function closeMovModal() {
    setMovVisible(false)
  }

  function openListModal() {
    setListVisible(true)
  }

  function closeListModal() {
    setListVisible(false)
  }

  async function openPicModal(movie) {
    await setLightPic(movie.poster)
    await setLightMovie(movie)
    setPicVisible(true)
  }

  function closePicModal() {
    setPicVisible(false)
  }

  function handleChange(event) {
    const value = event.target.value;
    if (event.target.name === 'movid') {
      setNewId(value)
    } else if (event.target.name === 'listTitle') {
      setListTitle(value)
    } else {
      setSearch(value)
    }
  }

  function handleListChange(event) {
    var value = event.value
    setCurrList(value)
    setShouldRender(!shouldRender)
  }

  function addList(event) {
    let movie_ref = firebase.database().ref('movies')
    var value = event.value
    // lightMovie.lists.push(value)
    // movie_ref.child(lightMovie.id).update(lightMovie)
    // setShouldRender(!shouldRender)
    console.log("Didn't figure this out either..." + value)
  }

  function handleSubmitSearch(event) {
    setShouldRender(!shouldRender)
  }

  function handleSubmitList(event) {
    let list_ref = firebase.database().ref('lists')
    list_ref.push().set(listTitle)
    alert("List created")
    setListTitle("")
  }

  function handleSubmitID(event) {
    let id_ref = firebase.database().ref('imdb_ids')

    if (!(ids.includes(newId))) {
        id_ref.push().set(newId)
        ids.push(newId)
        addMovieInfo(newId)
        alert("New movie added")
    }
    else {
      alert("Movie already part of collection")
    }

    setNewId("")
  }

  function addMovieInfo(id) {
    let movie_ref = firebase.database().ref('movies')
    axios.get('https://www.omdbapi.com/?i= '+ id + '&apikey=242f83a1')
      .then(function (response) {
        var movie = {
          poster: response.data.Poster,
          name: response.data.Title,
          synopsis: response.data.Plot,
          director: response.data.Director,
          imdb: response.data.imdbRating,
          meta: response.data.Metascore,
          lists: ['All']
        }
        setMovies(movies => [...movies, movie])
        movie_ref.child(id).set(movie)
      })
    if (show < (movies.length + 1)) {
      setShowClass('loadMore')
    }
  }

  function genCaption(movie) {
    return "---Title--- " + movie.name + "\n---Director--- "
            + movie.director + "\n---IMDB Rating--- " + movie.imdb;
  }

  function loadMore() {
    var temp = show + 8
    setShow(temp)
    if (temp >= movies.length) {
      setShowClass('loadMoreInvis')
    }
  }

  function deleteMovie(movie) {
    // let id_ref = firebase.database().ref('imdb_ids')
    // let movie_ref = firebase.database().ref('movies')
    //
    // var id = movie.id
    // id_ref.on('value', function(snapshot){
    //   snapshot.forEach(function(child){
    //     if (child.val() === id) {
    //       child.remove()
    //     }
    //   })
    // })
    // movie_ref.child(id).set(null)
    setPicVisible(false)
    console.log("Didn't get delete to work...sorry")
  }

  return(
    <div>
      <div className="lists">
        <h2>Movies Recognized for their Styling Teams</h2>
        <Select name='chooseList' className='chooseList' options={doptions} value={currList} onChange={handleListChange} />
      </div>
      <div className="listActions">
        <input className='movieButton' type='button' value='Add Movie' onClick={ () => openMovModal()} />
        <input className='movieButton' type='button' value='Create List' onClick={ () => openListModal()} />
        <input className='movieSearch' type='text' value={searchText} onChange={handleChange} placeholder="Movie Title"/>
        <input className='movieButton' type='button' value='Search' onClick={handleSubmitSearch} />
      </div>
      <Modal visible={movVisible} width='50%' height='50%' onClickAway={() => closeMovModal()}>
        <div className='modalForm'>
          <h2>Add a new movie</h2>
          <label>Movie ID<br/><input style={{width: '5vw'}} className='input' name='movid' type='text' value={newId} onChange={handleChange}/><br/></label>
          <p>Please input the imbdID of the movie</p>
          <button style={{width: '6vw'}} className="submit" onClick={handleSubmitID}>Add Movie</button>
        </div>
      </Modal>
      <Modal visible={listVisible} width='50%' height='50%' onClickAway={() => closeListModal()}>
        <div className='modalForm'>
          <h2>Create a new list</h2>
          <label>List Title<br/><input style={{width: '8vw'}} className='input' name='listTitle' type='text' value={listTitle} onChange={handleChange}/><br/></label>
          <p>Please enter a name for the new list</p>
          <button style={{width: '6vw'}} className='submit' onClick={handleSubmitList}>Create List</button>
        </div>
      </Modal>
      <div className="movgal">
        {movies.slice(0, show).map((movie, index) => (
          <img src={movie.poster} className="movg" alt={genCaption(movie)} key={index} onClick={() => openPicModal(movie)}></img>
        ))}
      </div>
      <Modal visible={picVisible} width= '50%' height='70%' onclickAway={() => closePicModal()}>
        <div className="lightbox">
          <div className='imageStuff'>
            <img src={lightPic} className="lightboximg2"></img>
          </div>
          <div className='movInfo'>
            <button className="closeMod" onClick={() => closePicModal()}>Close</button>
            <h2>{lightMovie.name}</h2>
            <p>Director: {lightMovie.director}</p>
            <p>IMDB Rating: {lightMovie.imdb}</p>
            <div className='boxOptions'>
              <button onClick={() => deleteMovie(lightMovie)}>Delete Movie</button>
              <Select name='chooseList' className='chooseList' options={doptions.filter(function(item){return !lightMovie.lists.includes(item);})} value={currList} onChange={addList} />
            </div>
          </div>
        </div>
      </Modal>
      <div className='footer'>
        <button className={showClass} onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
}

export default Movies;