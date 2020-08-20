import React, {useState} from "react"
import axios from "axios"
import {useHistory} from "react-router-dom"

const movieUpdateIntialValue = {
    
    title: '',
    director: '',
    metascore: "",
    stars: "",
  }

  

export default  ({setMovieList}) => {
    const [movieValue, setMovieValue] = useState(movieUpdateIntialValue)

console.log(movieValue)

    const update = (event) => {
        const {name, value} = event.target

        setMovieValue({
            ...movieValue,
            [name]: value
        })
    }

   
    const {push} = useHistory()

    const getMovieList = () => {
        axios
          .get("http://localhost:5000/api/movies")
          .then(res => { console.log(res.data)
            setMovieList(res.data)
          })
          .catch(err => console.log(err.response));
      };

    
      
    const submit = (event) =>{
        event.preventDefault()   
        let  stars = movieValue.stars.split(",")
        let newObj = {...movieValue, stars}
        axios
        .post(`http://localhost:5000/api/movies`, newObj)
        .then(res=>{
            getMovieList()
            push("/")
        })
        .catch(err=> console.log("axios POST error", err))
    }

return(
    <div className="save-wrapper">
    <form  onSubmit={submit}  >
        <label htmlFor="title">
            <input
            type="text"
            name="title"
            id="title"
            placeholder="Enter Movie Title"
            value={movieValue.title}
            onChange={update}
             />
        </label>

        <label>
            <input
                type="text"
                name="director"
                id="director"
                placeholder="Enter Movie Director"
                value={movieValue.director}
                onChange={update}
             />
        </label>

        <label>
            <input
            type="number"
            name="metascore"
            id="metascore"
            placeholder="Enter Movie Metascore"
            value={movieValue.metascore}
            onChange={update}
             />
        </label>

        <label>
            <textarea
            rows="4"
             cols="50"
            name="stars"
            id="stars"
            placeholder="Enter Movie Stars, Example: star1, star2, star3"
            value={movieValue.stars}
            onChange={update}
             />
        </label>
        <button type="submit">Submit!</button>
    </form>
    
</div>
)
}