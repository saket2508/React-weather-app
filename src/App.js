import React, { useState, useEffect } from 'react';
import CardLoading from './components/cardLoading';
import CardWeather from './components/cardWeather';
import CardError from './components/cardError';
import SearchBar from './components/searchBar';

const api= {
  key:"ce50fd0f772786ff9691170871093723",
  base:"https://api.openweathermap.org/data/2.5/weather"
}


const WeatherIcon = (description, day) => {
  if(description==="Clear"){
    if(day){
      return(
        <div className="Clear">
            <i class="fas fa-sun"></i>
        </div>
      )
    }
    else{
      return(
        <div className="Night">
            <i class="fas fa-moon"></i>
        </div>
      )
    }
  }
  else if(description.includes("Rain") || description==="Drizzle"){
    return(
      <div className="Rain">
          <i class="fas fa-cloud-rain"></i>
      </div>
    )
  }
  else if(description==="Clouds"){
    if(day){
     return(
      <div className="Clouds-morning">
      <i class="fas fa-cloud"></i>
    </div>
     )
    }
    else{
      return(
        <div className={description}>
            <i class="fas fa-cloud"></i>
        </div>
      )
    }
  }
  else{
    return(
      <div className={description}>
          <i class="fas fa-smog"></i>
      </div>
    )
  }
}

function App() {

  const initialState= {
    name:"",
    country: "",
    temp: 0,
    minTemp: 0,
    maxTemp: 0,
    feelsLike:0,
    humidity: 0,
    description: ""
  }

  const [ query, setQuery ] = useState('');
  const [ coordinates, setCoordinates ] = useState({lat:0,lon:0})
  const [ day, setDay ] = useState(false)
  const [ error, setError ] = useState(false);
  const [ weather, setWeather] = useState(initialState);
  const [ loading, setLoading]= useState(false);
  const [ localTime, setLocalTime ] = useState("")

  useEffect(() => {
    getData()
  },[])


  const getLocationData = async() => {
    console.log('Location access enabled')
      try{
        await navigator.geolocation.getCurrentPosition(async(position) => {
          console.log(position)
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
  
          const latitude = (position.coords.latitude).toFixed(1)
          const longitude = (position.coords.longitude).toFixed(1)
          
          setCoordinates({
            lat: Number(latitude),
            lon: Number(longitude)
          })

          //console.log(coordinates)

          //setLoading(true)
          let res = await fetch(`${api.base}?lat=${latitude}&lon=${longitude}&units=metric&appid=${api.key}`)
          let result = await res.json()
          console.log(result)
          setWeather({
            name: result.name,
            country: result.sys.country,
            temp: (result.main.temp).toFixed(0),
            minTemp: (result.main.temp_min).toFixed(0),
            maxTemp: (result.main.temp_max).toFixed(0),
            feelsLike: (result.main.feels_like).toFixed(0),
            humidity: result.main.humidity,
            description: result.weather[0].main
          })

          console.log(dateBuilder(result.timezone))
          setQuery('')
          setLoading(false)
        });
      }
      catch(error){
        console.log(error)
        setError(true)
        setLoading(false)
      }
  }

  const getData = async() => {
    setLoading(true)
    if("geolocation" in navigator){
      getLocationData()
    }

    else{
      console.log('Location access disabled')
      //setLoading(true)
      try{
        let res = await fetch(`${api.base}?q=Mumbai&units=metric&appid=${api.key}`)
        let result = await res.json()
        console.log(result)
        setWeather({
          name: result.name,
          country: result.sys.country,
          temp: (result.main.temp).toFixed(0),
          minTemp: (result.main.temp_min).toFixed(0),
          maxTemp: (result.main.temp_max).toFixed(0),
          feelsLike: (result.main.feels_like).toFixed(0),
          humidity: result.main.humidity,
          description: result.weather[0].main
        })
        
        console.log(dateBuilder(result.timezone))
        setQuery('')
        setLoading(false)
      }
      catch(error){
        console.log(error)
        setError(true)
        setLoading(false)
      }
    }
  }

  const search = async() => {

    console.log(query)
    if(query!=""){
      setLoading(true)
      try{
        let res= await fetch(`${api.base}?q=${query}&units=metric&appid=${api.key}`)
        let result = await res.json()
        if(result.cod==="404"){
          console.log('Could not get data from API.')
          setError(true)
          setQuery('')
          setLoading(false)
        }
        else{
          if(error){
            setError(false)
          }
          setQuery('')
          setLoading(false)
          dateBuilder(result.timezone)
          setWeather({
            name: result.name,
            country: result.sys.country,
            temp: (result.main.temp).toFixed(0),
            minTemp: (result.main.temp_min).toFixed(0),
            maxTemp: (result.main.temp_max).toFixed(0),
            feelsLike: (result.main.feels_like).toFixed(0),
            humidity: result.main.humidity,
            description: result.weather[0].main
          })
          console.log(result)
        }
      }
      catch(error){
        console.log('Could not get data from API.')
        console.log(error)
        setLoading(false)
      }
    }
    else{
      console.log("Could no accept input")
    }
   
  }
  


  const dateBuilder = (offset) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    //let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let local_date = new Date()
    let utc = (local_date.getTime() + (local_date.getTimezoneOffset()*60*1000));
    let nd = new Date(utc+(offset*1000))
    let day = nd.getDate()
    let hour = nd.getHours()
    let month = months[nd.getMonth()]
    console.log(nd.toLocaleTimeString())
    let suffix = nd.toLocaleTimeString().slice(-2)

    if(hour > 18 || hour < 6){
      setDay(false)
    }
    else{
      setDay(true)
    }
    
    let time = nd.toLocaleTimeString().slice(0,5)
    if(time.slice(-1)===":"){
      time = time.slice(0,-1)
    }

    console.log(time+' '+suffix)
    setLocalTime(month+" "+ day + ", "+ time+' '+suffix)
  }

  if(loading){
    return(
      <div className="app">
      <div className="container">
        <SearchBar {...{
          props:{
            search: search,
            query: query,
            setQuery: setQuery, 
          }
        }}/>
        <CardLoading/>
      </div>
    </div>
    )
  }

  if(error){
    return(
      <div className="app">
        <div className="container">
        <SearchBar {...{
          props:{
            search: search,
            query: query,
            setQuery: setQuery, 
          }
        }}/>
          <CardError/>
        </div>
      </div>
    )
  }


  return (
    <div className="app">
      <div className="container">
      <SearchBar {...{
          props:{
            search: search,
            query: query,
            setQuery: setQuery, 
          }
        }}/>
       <CardWeather {...{
         weather:{
          name: weather.name,
          country: weather.country,
          localTime: localTime,
          description: weather.description,
          temp: weather.temp,
          maxTemp: weather.maxTemp,
          minTemp: weather.minTemp,
          humidity: weather.humidity,
          day: weather.day,
          WeatherIcon: WeatherIcon,
         }
       }}/>
      </div>
    </div>
  );
}

export default App;
