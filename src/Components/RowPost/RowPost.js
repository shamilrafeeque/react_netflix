import React,{useEffect,useState} from 'react'
import Youtube from 'react-youtube'
import './RowPost.css'
import {imageUrl,API_KEY} from '../../constants/constants'
import axios from '../../axios'
function RowPost(props) {
    const[movies,setMovies]=useState([])
    const [urlid,setUrlId]=useState('')
    useEffect(()=>{
        axios.get(props.url).then(responce=>{
            console.log(responce.data)
            setMovies(responce.data.results)
        }).catch(err=>{
            // alert('network error')
        })
    },[])
    const opts={
        height:'390',
        width:'100%',
        playerVars:{
            autoplay:1,
        },
    };
    const handleMovie=(id)=>{
        console.log(id)
        axios.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(responce=>{
            if(responce.data.results.length!==0){
                setUrlId(responce.data.results[0])
            }else{
                console.log('Array empty')
            }
        })
    }
  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
            {movies.map((obj)=>
                 <img onClick={()=>handleMovie(obj.id)}  src={`${imageUrl+obj.backdrop_path}`} alt="poster" className={props.isSmall ?'smallPoster' :'poster'}></img>
            )}
           
           


        </div>
       { urlid && <Youtube opts={opts} videoId={urlid.key}/> }
    </div>
  )
}

export default RowPost