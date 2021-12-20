import React, { useRef, useState } from 'react';
import './App.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import Paginate from './Pagination.js'


import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAawwkMpmzzUkVMOvMG-CVs7n46e0rt6KA",
  authDomain: "movie-review-66240.firebaseapp.com",
  projectId: "movie-review-66240",
  storageBucket: "movie-review-66240.appspot.com",
  messagingSenderId: "1070015534426",
  appId: "1:1070015534426:web:974e23a24a5651db590f63",
  measurementId: "G-TKCL7LLJFW"
})


const firestore = firebase.firestore();



function App() {

  return (<>
  <h1>Movie Board</h1>

      <div>
      <Movies></Movies>
      <Paginate></Paginate>
      </div>

      

  </>)









function Movies() {
  const dummy = useRef();
  const moviesRef = firestore.collection('movies');
  const query = moviesRef.orderBy('createdAt').limit(25);

  const [movies] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  const [formRating, setFormRating] = useState('');
  console.log(movies);
  const sendMessage = async (e) => {
    e.preventDefault();



    await moviesRef.add({
      movie: formValue,
      rating: formRating,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),

    })

    setFormValue('');
    setFormRating('');

  }
  return (<>
  <form onSubmit={sendMessage}>

    <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="Please add your movie name!" />
    <input value={formRating} onChange={(e) => setFormRating(e.target.value)} placeholder="Rating: 1-10 (ex: 8/10)" />
    <br></br>
    <button type="submit" disabled={!formValue}>Submit</button>

  </form>
  <main>
  <div className='cont'>
    {movies && movies.map(movie => <Movie key={movie.id} message={movie} />)}
    <span ref={dummy}></span>
    </div>
  </main>
  </>)

}

function Movie(props){
  const {movie, rating, id} = props.message;
  console.log(props);
  const deleteClick = async(e) =>{
    e.preventDefault();
  firestore.collection("movies").doc(id).delete();

  }
  const [formRating, setFormRating] = useState('');
  let update = true;
  const updateClick = async(e) =>{
    e.preventDefault();
    console.log("Update");

    update = false;
    console.log(update);
    const movieRef = firestore.collection('movies').doc(id);
    const res = await movieRef.update({rating: formRating});

  }
  return(
    <>

      <div className='movie'>
      {(update === true) ?
      <form>
      <input value={formRating} onChange={(e) => setFormRating(e.target.value)} placeholder="Rating: 1-10 (ex: 8/10)" />
      </form> : <></>}
        <button onClick={updateClick}>Update</button>
        <p>{movie}</p>
        <p>{rating}</p>
        <button onClick={deleteClick}>Delete</button>
      </div>

    </>
  )

}
}




export default App;