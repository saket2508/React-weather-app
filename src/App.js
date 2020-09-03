import React, { useState, useEffect } from 'react';
import CardLoading from './components/cardLoading';
import CardWeather from './components/cardWeather';
import CardError from './components/cardError';
import SearchBar from './components/searchBar';
import UnitOptions from './components/unitOptions';
import { deepOrange } from '@material-ui/core/colors';


const api= {
  key:"ce50fd0f772786ff9691170871093723",
  base:"https://api.openweathermap.org/data/2.5/forecast"
}


const WeatherIcon = (description, day) => {
  console.log(day)
  if(description==="Clear"){
    if(day){
      console.log('Should display')
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
  else if(description==="Drizzle"){
    return(
      <div className="Drizzle">
          <i class="fas fa-cloud-rain"></i>
      </div>
    )
  }
  else if(description==="Rain"){
    return(
      <div className="Rain">
          <i class="fas fa-cloud-showers-heavy"></i>
      </div>
    )
  }
  else if(description==="Thunderstorm"){
    return(
      <div className="Thunderstorm">
          <i class="fas fa-cloud-showers-heavy"></i>
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
    precipitation:0,
    description: "",
    sunrise:"",
    sunset:"",
    windSpeed:0,
    forecast:[],
    direction:"",
  }

  const [ query, setQuery ] = useState('');
  const [ coordinates, setCoordinates ] = useState({lat:0,lon:0})
  const [ day, setDay ] = useState(false)
  const [ error, setError ] = useState(false);
  const [ weather, setWeather] = useState(initialState);
  const [ loading, setLoading]= useState(false);
  const [ localTime, setLocalTime ] = useState("")
  const [ system, setSystem ] = useState("metric")
  const [ unit, setUnit ] = useState("°C")
  const [ unit2, setUnit2 ] = useState("km/h")

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
          let res = await fetch(`${api.base}?lat=${latitude}&lon=${longitude}&units=${system}&appid=${api.key}`)
          let result = await res.json()
          console.log(result)
          console.log('Sunrise- '+getTime(result.city.sunrise, result.city.timezone))
          console.log('Sunset- '+getTime(result.city.sunset, result.city.timezone))
          
          let direction = checkWindDirection(result.list[0].wind.deg)

          if(system==="metric"){
            setWeather({
              name: result.city.name,
              country: result.city.country,
              temp: (result.list[0].main.temp).toFixed(0),
              minTemp: (result.list[0].main.temp_min).toFixed(0),
              maxTemp: (result.list[0].main.temp_max).toFixed(0),
              feelsLike: (result.list[0].main.feels_like).toFixed(0),
              humidity: result.list[0].main.humidity,
              description: result.list[0].weather[0].main,
              precipitation: ((result.list[0].pop)*100).toFixed(0),
              sunrise:getTime(result.city.sunrise, result.city.timezone),
              sunset:getTime(result.city.sunset, result.city.timezone),
              windSpeed: ((result.list[0].wind.speed)*3.6).toFixed(0),
              direction: direction
            })
          }
          else{
            setWeather({
              name: result.city.name,
              country: result.city.country,
              temp: (result.list[0].main.temp).toFixed(0),
              minTemp: (result.list[0].main.temp_min).toFixed(0),
              maxTemp: (result.list[0].main.temp_max).toFixed(0),
              feelsLike: (result.list[0].main.feels_like).toFixed(0),
              humidity: result.list[0].main.humidity,
              description: result.list[0].weather[0].main,
              precipitation: ((result.list[0].pop)*100).toFixed(0),
              sunrise:getTime(result.city.sunrise, result.city.timezone),
              sunset:getTime(result.city.sunset, result.city.timezone),
              windSpeed: (result.list[0].wind.speed).toFixed(0),
              direction: direction
            })
          }
          console.log(dateBuilder(result.city.timezone))
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
        let res = await fetch(`${api.base}?q=Mumbai&units=${system}c&appid=${api.key}`)
        let result = await res.json()
        console.log(result)
        let direction = checkWindDirection(result.list[0].wind.deg)
        if(system==="metric"){
          setWeather({
            name: result.city.name,
            country: result.city.country,
            temp: (result.list[0].main.temp).toFixed(0),
            minTemp: (result.list[0].main.temp_min).toFixed(0),
            maxTemp: (result.list[0].main.temp_max).toFixed(0),
            feelsLike: (result.list[0].main.feels_like).toFixed(0),
            humidity: result.list[0].main.humidity,
            description: result.list[0].weather[0].main,
            precipitation: ((result.list[0].pop)*100).toFixed(0),
            sunrise:getTime(result.city.sunrise, result.city.timezone),
            sunset:getTime(result.city.sunset, result.city.timezone),
            windSpeed: ((result.list[0].wind.speed)*3.6).toFixed(0),
            direction: direction,
          })
        }
        else{
          setWeather({
            name: result.city.name,
            country: result.city.country,
            temp: (result.list[0].main.temp).toFixed(0),
            minTemp: (result.list[0].main.temp_min).toFixed(0),
            maxTemp: (result.list[0].main.temp_max).toFixed(0),
            feelsLike: (result.list[0].main.feels_like).toFixed(0),
            humidity: result.list[0].main.humidity,
            description: result.list[0].weather[0].main,
            precipitation: ((result.list[0].pop)*100).toFixed(0),
            sunrise:getTime(result.city.sunrise, result.city.timezone),
            sunset:getTime(result.city.sunset, result.city.timezone),
            windSpeed: (result.list[0].wind.speed).toFixed(0),
            direction: direction,
        })
        }
        // console.log('Sunrise- '+getTime(result.city.sunrise, result.city.timezone))
        // console.log('Sunset- '+getTime(result.city.sunset, result.city.timezone))

        console.log(dateBuilder(result.city.timezone))
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
    if(query!==""){
      setLoading(true)
      if(!query.includes(",")){
        try{
          let res= await fetch(`${api.base}?q=${query}&units=${system}&appid=${api.key}`)
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
            let short = query
            setQuery('')
            setLoading(false)
            console.log('Sunrise- '+getTime(result.city.sunrise, result.city.timezone))
            console.log('Sunset- '+getTime(result.city.sunset, result.city.timezone))
            dateBuilder(result.city.timezone)
  
            if(result.city.name.length>15){
              result.city.name = short
            }
            let direction = checkWindDirection(result.list[0].wind.deg)
            if(system==="metric"){
              setWeather({
                name: result.city.name,
                country: result.city.country,
                temp: (result.list[0].main.temp).toFixed(0),
                minTemp: (result.list[0].main.temp_min).toFixed(0),
                maxTemp: (result.list[0].main.temp_max).toFixed(0),
                feelsLike: (result.list[0].main.feels_like).toFixed(0),
                humidity: result.list[0].main.humidity,
                description: result.list[0].weather[0].main,
                precipitation: ((result.list[0].pop)*100).toFixed(0),
                sunrise:getTime(result.city.sunrise, result.city.timezone),
                sunset:getTime(result.city.sunset, result.city.timezone),
                windSpeed: ((result.list[0].wind.speed)*3.6).toFixed(0),
                direction:direction
              })
            }
            else{
              setWeather({
                name: result.city.name,
                country: result.city.country,
                temp: (result.list[0].main.temp).toFixed(0),
                minTemp: (result.list[0].main.temp_min).toFixed(0),
                maxTemp: (result.list[0].main.temp_max).toFixed(0),
                feelsLike: (result.list[0].main.feels_like).toFixed(0),
                humidity: result.list[0].main.humidity,
                description: result.list[0].weather[0].main,
                precipitation: ((result.list[0].pop)*100).toFixed(0),
                sunrise:getTime(result.city.sunrise, result.city.timezone),
                sunset:getTime(result.city.sunset, result.city.timezone),
                windSpeed: (result.list[0].wind.speed).toFixed(0),
                direction: direction,
              })
            }
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
        let country_code = query.slice(-2)
        let city_name = query.slice(0,-3)
        try{
          let res= await fetch(`${api.base}?q=${city_name},${country_code}&units=${system}&appid=${api.key}`)
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
            let short = query
            setQuery('')
            setLoading(false)
            console.log('Sunrise- '+getTime(result.city.sunrise, result.city.timezone))
            console.log('Sunset- '+getTime(result.city.sunset, result.city.timezone))
            dateBuilder(result.city.timezone)
  
            if(result.city.name.length>15){
              result.city.name = short
            }
            let direction = checkWindDirection(result.list[0].wind.deg)
            if(system==="metric"){
              setWeather({
                name: result.city.name,
                country: result.city.country,
                temp: (result.list[0].main.temp).toFixed(0),
                minTemp: (result.list[0].main.temp_min).toFixed(0),
                maxTemp: (result.list[0].main.temp_max).toFixed(0),
                feelsLike: (result.list[0].main.feels_like).toFixed(0),
                humidity: result.list[0].main.humidity,
                description: result.list[0].weather[0].main,
                precipitation: ((result.list[0].pop)*100).toFixed(0),
                sunrise:getTime(result.city.sunrise, result.city.timezone),
                sunset:getTime(result.city.sunset, result.city.timezone),
                windSpeed: ((result.list[0].wind.speed)*3.6).toFixed(0),
                direction: direction
              })
            }
            else{
              setWeather({
                name: result.city.name,
                country: result.city.country,
                temp: (result.list[0].main.temp).toFixed(0),
                minTemp: (result.list[0].main.temp_min).toFixed(0),
                maxTemp: (result.list[0].main.temp_max).toFixed(0),
                feelsLike: (result.list[0].main.feels_like).toFixed(0),
                humidity: result.list[0].main.humidity,
                description: result.list[0].weather[0].main,
                precipitation: ((result.list[0].pop)*100).toFixed(0),
                sunrise:getTime(result.city.sunrise, result.city.timezone),
                sunset:getTime(result.city.sunset, result.city.timezone),
                windSpeed: (result.list[0].wind.speed).toFixed(0),
                direction:direction
              })
            }
            console.log(result)
          }
        }
        catch(error){
          console.log('Could not get data from API.')
          console.log(error)
          setLoading(false)
        }
      }
    }
    else{
      console.log("Could not accept input")
    }
   
  }


  const getTime = (time, offset) =>{
    let local_date = new Date(time*1000)
    let utc = (local_date.getTime() + (local_date.getTimezoneOffset()*60*1000));
    let nd = new Date(utc+(offset*1000))
    console.log(nd.toLocaleTimeString())
    let suffix = nd.toLocaleTimeString().slice(-2)
    let time_nd = nd.toLocaleTimeString().slice(0,5)
    if(time_nd.slice(-1)===":"){
      time_nd = time_nd.slice(0,-1)
    }
    console.log(time_nd+' '+suffix)
    return (time_nd+' '+suffix)
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
      console.log("It's night")
    }
    else{
      setDay(true)
      console.log("It's day")
    }
    
    let time = nd.toLocaleTimeString().slice(0,5)
    if(time.slice(-1)===":"){
      time = time.slice(0,-1)
    }

    console.log(time+' '+suffix)
    setLocalTime(month+" "+ day + ", "+ time+' '+suffix)
  }


  const checkWindDirection = (deg) => {
    let direction=""
    if(deg>=0 && deg<45){
      direction = "E"
    }
    else if(deg>=45 && deg<90){
      direction = "NE"
    }
    else if(deg===90){
      direction = "N"
    }
    else if(deg>90 && deg<=135){
      direction = "NW"
    }
    else if(deg>135 && deg<=180){
      direction = "W"
    }
    else if(deg>180 && deg<=225){
      direction = "SW"
    }
    else if(deg>225 && deg<=270){
      direction = "S"
    }
    else if(deg>270 && deg<=315){
      direction = "SE"
    }
    else{
      direction = "E"
    }
    return direction
  }

  const handleChange = (event) => {
    setSystem(event.target.value)
    if(event.target.value==="imperial"){
      console.log('imperial')
      setUnit("°F")
      setUnit2("mph")
      setWeather(weather => ({
        ...weather,
        temp: (((weather.temp)*1.8)+32).toFixed(0),
        minTemp: (((weather.minTemp)*1.8)+32).toFixed(0),
        maxTemp: (((weather.maxTemp)*1.8)+32).toFixed(0),
        windSpeed: ((weather.windSpeed)*0.63).toFixed(0)
      }))
    }
    else{
      console.log('metric')
      console.log('imperial')
      setUnit("°C")
      setUnit2("km/h")
      setWeather(weather => ({
        ...weather,
        temp: (((weather.temp)-32)*0.56).toFixed(0),
        minTemp: (((weather.minTemp)-32)*0.56).toFixed(0),
        maxTemp: (((weather.maxTemp)-32)*0.56).toFixed(0),
        windSpeed: ((weather.windSpeed)*1.6).toFixed(0)
      }))
    }
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
        <UnitOptions {...{
          props:{
            handleChange:handleChange,
            unit: system
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
        <UnitOptions {...{
          props:{
            handleChange:handleChange,
            unit: system
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
      <UnitOptions {...{
          props:{
            handleChange:handleChange,
            unit: system
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
          precipitation: weather.precipitation,
          day: day,
          sunrise: weather.sunrise,
          sunset: weather.sunset,
          WeatherIcon: WeatherIcon,
          unit: unit,
          windSpeed: weather.windSpeed,
          unit2: unit2,
          direction:weather.direction,
         }
       }}/>
      </div>
    </div>
  );
}

export default App;
