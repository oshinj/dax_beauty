import React, {useEffect, useState} from 'react'
import Modal from 'react-awesome-modal'
import Select from 'react-select'
import config from '../config.js'

const axios = require('axios');
const firebase = require('firebase');
const d3 = require("d3");

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

  const [aNodes, setANodes] = useState([])

  const [mNodes, setMNodes] = useState([])

  const [links, setLinks] = useState([])

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
      var tempActors = []
      var tempMovies = []
      var tempThing = []
      snapshot.forEach(function(child) {
        var movie = {
          id: child.val().id,
          poster: child.val().poster,
          name: child.val().name,
          synopsis: child.val().synopsis,
          director: child.val().director,
          imdb: child.val().imdb,
          meta: child.val().meta,
          lists: child.val().lists,
          actors: child.val().actors
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
        if (movie['lists'].includes("Graph")) {
          for (var actor in movie['actors']) {
            if (!(tempActors.some(e => e.name === movie['actors'][actor]))) {
              tempActors.push({
                name: movie['actors'][actor],
                group: "actor"
              })
            }
          }
          tempMovies.push({
            name: movie['name'],
            poster: movie['poster'],
            group: "movie"
          })
          tempThing.push(movie.actors)
        }
      })
      setMovies(tempArray)
      setANodes(tempActors)
      setMNodes(tempMovies)
      var tempLinks = []
      var movie2 = {}
      for (movie2 in tempMovies) {
        for (var actor in tempActors) {
          if (tempThing[movie2].includes(tempActors[actor]['name'])) {
            tempLinks.push({
              source: parseInt(movie2),
              target: tempMovies.length + parseInt(actor)
            })
          }
        }
      }
      setLinks(tempLinks)
    })
    setShow(8)
}, [shouldRender])

  function drag(simulation) {
    function dragStarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function dragEnded(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    return d3.drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded)
  }

  function chart(nodes) {
    const width = 1920;
    const height = 1080;

    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));

    const svg = d3.create("svg")
      .attr("viewBox", [0, 0, width, height]);

    const link = svg.append("g")
        .attr("stroke", "#fff")
        .attr("stroke-opacity", 0.6)
        .selectAll("line")
        .data(obj_links)
        .join("line")
        .attr("stroke-width", d => Math.sqrt(d.value));

    var defs = svg.append('svg:defs')

    obj_nodes.forEach(function(d, i) {
      if (d.group === 'movie') {
        defs.append('svg:pattern')
          .attr('id', d.name)
          .append('svg:image')
          .attr('xlink:href', d.poster)
        }
    })

    const fill = (node) => {
      if (node.group === 'movie') // movies
        return "url(#" + node.name + ")"
      return d3.color("lightblue")
    }

    const radius = (node) => {
      if (node.group === 'movie') // movies
        return 100
      return 50
    }

    const simulation = d3.forceSimulation(obj_nodes)
      .force("link", d3.forceLink().links(links).id(d => { return d.index; }).distance(200))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(obj_nodes)
      .join("circle")
      .attr("r", radius)
      .style("fill", fill)
      .attr("className", 'test')
      .call(drag(simulation))
      .text(function(d) { return d.name })

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
    })

    return svg.node()
  }

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
    console.log("Didn't figure this out either... " + value)
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
          actors: response.data.Actors.split(", "),
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
  function doTheThing() {
    const elem = document.getElementById("mysvg");
    elem.appendChild(chart(mNodes.concat(aNodes)))
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
      <button onClick={doTheThing}>Display Graph</button>
      <div id="mysvg">
      </div>
      <div className='footer'>
        <button className={showClass} onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
}

export default Movies;