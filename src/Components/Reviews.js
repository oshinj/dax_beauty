import React, {useEffect, useState} from 'react';
import '../App.css';
import config from '../config.js'
import { motion } from 'framer-motion'
const firebase = require('firebase')

function Reviews(props) {
  const [state, setState] = useState({
    name: "",
    bio: "",
    review: "",
    public: "No",
    email: "",
    date: ""
  });
  const [errors, setErrors] = useState({
    nerr: "",
    berr: "",
    rerr: "",
  });
  const [data, setData] = useState([])
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(config)
    }

    let ref = firebase.database().ref('posts')

    ref.on('value', snapshot => {
      var dataArray = [];

      snapshot.forEach(function(child) {
        var item = {
          name: child.val().name,
          bio: child.val().bio,
          review: child.val().review,
          public: child.val().public,
          email: child.val().email,
          date: child.val().date
        }
        if (item.public === "Yes")
          dataArray.push(item)
      })
      setData(dataArray)
    })
  }, [shouldRender])

  function handleChange(event) {
    const value = event.target.value;
    let today = Date()
    setState({
      ...state,
      [event.target.name]: value,
      date: today.toString()
    })
  }

  function handleSubmit(event) {
    var valid = false;
    if (state.name === '' || state.review === '') {
      alert("Please fill out your name and review to send a review.")
      return false;
    }
    const nerr =
      (state.name.length < 5 || state.name.length > 20)
        ? 'Name must be between 5 and 20 characters'
        : '';
    const berr =
      (state.bio.length > 100)
        ? 'Description must be less than 100 characters'
        : '';
    const rerr =
      (state.review.length < 15 || state.review.length > 500)
        ? 'Review must be between 15 and 500 characters'
        : '';
    if (nerr === '' && berr === '' && rerr === '')
      valid = true;
    if (valid) {
      firebase.database().ref('posts').push().set(state)
      setShouldRender(!shouldRender)
      setState({
        name: "",
        bio: "",
        review: "",
        public: "No",
        email: "",
        date: ""
      })
      alert("Review successfully sent!");
    }
    setErrors({
      nerr: nerr,
      berr: berr,
      rerr: rerr
    })
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  return (
    <div className="review_display">
      <motion.div initial="hidden" animate="visible" variants={variants} className="form" onSubmit={handleSubmit}>
        <h2>Leave a Review</h2>
        <label>
          What is your name?* <i className="error">{errors.nerr}</i><br/><input className="input" name="name" type="text" value={state.name} onChange={handleChange}/>
        </label>
        <label>
          Offer a short description of yourself: <i className="error">{errors.berr}</i><br/><input className="input" name="bio" type="text" value={state.bio} onChange={handleChange}/>
        </label>
        <label>
          What would you like to share?* <i className="error">{errors.rerr}</i><br/><textarea className="input" name="review" type="text" value={state.review} onChange={handleChange}/>
        </label>
        <label>
          Would you like your name and review to be publicly viewable?<br/>
          <select className="input" name="public" value={state.public} onChange={handleChange}>
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </label>
        <label>
          If you would like me to be able to contact you, what is your email?<br/><input className="input" name="email" type="text" value={state.email} onChange={handleChange}/>
        </label>
        * Required
        <button className="submit" onClick={handleSubmit}>Send Review</button>
      </motion.div>
      <motion.div initial="hidden" animate="visible" variants={variants} className="reviews">
        <h2>Reviews</h2>
        {data.map((post, index) => (
          <motion.div key={index} initial="hidden" animate="visible" transition={{ duration: 0.5 }} variants={variants} className='post'>
            <div className='post-header'>
              {post.date}
            </div>
            <p>{post.name}</p>
            <p><i>{post.bio}</i></p>
            <blockquote>{post.review}</blockquote>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default Reviews;