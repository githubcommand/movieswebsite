import React,{useEffect,useState} from 'react';
import { NavLink } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { API_URL } from './context';
const SingleMovie = () => {
    const {id} = useParams();
  
    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState('');
    
  const getMovies = async (url) => {

    try {
      const res = await fetch(url);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setIsLoading(false);
        setMovie(data);
      }
      else{
        setMovie('');
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
   let timerId= setTimeout(()=>{    getMovies(`${API_URL}&i=${id}`);
},800)
return () => clearTimeout(timerId);
  }, [id]);
  if(isLoading){
    return (
        <div className="movie-section">
<div className='loading'>Loading...</div>
        </div>
    )
  }
console.log(movie)
  return (
    
    <section className="movie-section">
        <div className='movie-card'>
       <figure>
        <img src={movie.Poster} alt=""/>
       </figure>
       <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
       </div>
    </section>
    
  )
}

export default SingleMovie
