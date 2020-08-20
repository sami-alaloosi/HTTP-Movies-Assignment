import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";


function Movie({ addToSavedList, setMovieList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const {push} = useHistory()

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => { console.log(res.data)
        setMovieList(res.data)
      })
      .catch(err => console.log(err.response));
  };

  const deleteAxios = (id) => {
    axios
    .delete(`http://localhost:5000/api/movies/${id}`)
    .then(
      res=> {
        getMovieList()
        push("/")
      }
    )
    .catch(err => console.log(err))
  }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

     <button onClick={()=>push(`/update-movie/${params.id}`)} >Update</button>

     <button onClick={()=>deleteAxios(params.id)}>Delete</button>

      <div className="save-button" onClick={saveMovie}>
      
      
        Save
      </div>
    </div>
  );
}

export default Movie;
