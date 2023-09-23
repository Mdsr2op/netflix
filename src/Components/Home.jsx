import React from 'react'
import {useState,useEffect} from "react"
import "./Home.scss"
import Row from "./Row/Row"
import axios from "axios"
import {BiPlay} from "react-icons/bi"
import {AiOutlinePlus} from "react-icons/ai"

const url = 'https://api.themoviedb.org/3';
const imgUrl = 'https://image.tmdb.org/t/p/w500/'
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Home = () => {

  const[upcomingMovies,setUpcomingMovies] = useState([]);
  const[nowPlayingMovies,setNowPlayingMovies] = useState([]);
  const[popularMovies,setPopularMovies] = useState([]);
  const[topRatedMovies,setTopRatedMovies] = useState([]);

    useEffect(()=>{
    const fetchData = async() => {
    const {data:{results}} = await axios.get(`${url}/movie/${upcoming}`,options); 
    setUpcomingMovies(results);

    };

    const fetchNowPlaying = async() => { 
    const {data:{results}} = await axios.get(`${url}/movie/${nowPlaying}`,options); 

    setNowPlayingMovies(results);

      //remove duplicates
    for(let index = 0; index < nowPlayingMovies.length; index++){
      for(let item of upcomingMovies){
        if(nowPlayingMovies[index].id == item.id){
          nowPlayingMovies.splice(index,1);
          break;
        }
      } 
    }


    //set state
    setNowPlayingMovies(nowPlayingMovies);
    };

    const fetchPopular = async() =>{
      const {data:{results}} = await axios.get(`${url}/movie/${popular}`,options);
      setPopularMovies(results);

    };

    const fetchTopRated = async() =>{
      const {data:{results}} = await axios.get(`${url}/movie/${topRated}`,options);
      setTopRatedMovies(results);
    };

    const options = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NTJkNzU4YWU4MzViMjBlYTc2ZDA2MGFiNjlmNTczNiIsInN1YiI6IjY1MDg0N2M5Mzk0YTg3MDEzOTE2N2Q0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.LIJm719S5HMDCuPjrK7AWgOKcYuUzYPBMiuNlW0ssYw'
      }
    };

  
    fetchData();    
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();

  },[])

  return (
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[3] ? 
        `url(${`${imgUrl}/${popularMovies[3].poster_path}`})` : "rgb(16,16,16)"
      }}>
        <h1>{popularMovies[3].original_title}</h1>
        <p>{popularMovies[3].overview}</p>
      <div>
         <button><BiPlay /> Play</button>
        <button>My List <AiOutlinePlus /></button>
      </div>

        
      </div>


      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlayingMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top rated"} arr={topRatedMovies}/>
      
    </section>
  )
}

export default Home