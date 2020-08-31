import React, { useState, useEffect } from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import SearchIcon from '@material-ui/icons/Search';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


const api= {
  key:"ce50fd0f772786ff9691170871093723",
  base:"https://api.openweathermap.org/data/2.5/weather"
}


function WeatherIcon(description, day){
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

  const getData = async() => {

    if("geolocation" in navigator){
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

          setLoading(true)
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

    else{
      console.log('Location access disabled')
      setLoading(true)
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
    setLoading(true)
    console.log(query)
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
  


  const dateBuilder = (offset) => {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let local_date = new Date()
    let utc = (local_date.getTime() + (local_date.getTimezoneOffset()*60*1000));
    let nd = new Date(utc+(offset*1000))
    let day = nd.getDate()
    let hour = nd.getHours()
    let mins = nd.getMinutes()
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
      <div className="row" style={{display:'flex', marginBottom: 50, justifyContent:'center'}}>
        <div className="col-md-4 col-sm-12">
          <div className="input-group">
            <input 
                id="city"
                name="city"
                type="text" 
                className="form-control" 
                placeholder="Search A City..." 
                aria-label="Enter a city" 
                aria-describedby="weather-input"
                onChange={e => setQuery(e.target.value)}
                value={query}
                />
              <div class="input-group-append">
                <button className="btn btn-outline-danger" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={search}>
                  <SearchIcon style={{color:'#fff'}}/>
                </button>
              </div>
          </div>
        </div>
      </div>

      <div className="row" style={{display:'flex', justifyContent:'center'}}>
        <div className="col-md-5 col-sm-10">
          <div className="card border-0">
            <div className="card-header" style={{backgroundColor:'#f44336'}}>
              <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>FORECAST FINDER</h5>
            </div>
            <div className="card-body">   
                <div style={{paddingTop:160, paddingBottom:160}}>
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                      <div class="spinner-border text-danger" role="status">
                        <span class="sr-only">Loading...</span>
                      </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
    )
  }

  if(error){
    return(
      <div className="app">
        <div className="container">
        <div className="row" style={{display:'flex', marginBottom: 50, justifyContent:'center'}}>
          <div className="col-md-4 col-sm-12">
            <div className="input-group">
              <input 
                  id="city"
                  name="city"
                  type="text" 
                  className="form-control" 
                  placeholder="Search A City..." 
                  aria-label="Enter a city" 
                  aria-describedby="weather-input"
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  />
                <div class="input-group-append">
                  <button className="btn btn-outline-danger" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={search}>
                    <SearchIcon style={{color:'#fff'}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>

        <div className="row" style={{display:'flex', justifyContent:'center'}}>
          <div className="col-lg-5 col-sm-10">
            <div className="card border-0">
              <div className="card-header" style={{backgroundColor:'#f44336'}}>
                <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>FORECAST FINDER</h5>
              </div>
              <div className="card-body">   
                  <div style={{paddingTop:160, paddingBottom:160}}>
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                        <ErrorOutlineIcon style={{paddingBottom:5, color:'#dc3545'}}/>
                        <h5 className="text-danger" style={{fontWeight:'500', marginLeft:3}}>Please enter a valid city.</h5>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }


  return (
    <div className="app">
      <div className="container">
        <div className="row" style={{display:'flex', marginBottom: 50, justifyContent:'center'}}>
          <div className="col-md-4 col-sm-12">
            <div className="input-group">
              <input 
                  id="city"
                  name="city"
                  type="text" 
                  className="form-control" 
                  placeholder="Search A City..." 
                  aria-label="Enter a city" 
                  aria-describedby="weather-input"
                  onChange={e => setQuery(e.target.value)}
                  value={query}
                  />
                <div class="input-group-append">
                  <button className="btn btn-outline-danger" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={search}>
                    <SearchIcon style={{color:'#fff'}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>

        <div className="row" style={{display:'flex',justifyContent:'center'}}>
         <div className="col-lg-5 col-sm-10">
         <div class="card border-0">
           <div className="card-header" style={{backgroundColor:'#f44336'}}>
             <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>FORECAST FINDER</h5>
           </div>
          <div className="card-body">
          <div className="location">
            <div className="city">{weather.name}, {weather.country}</div>
            <div className="flag">
              <img className="flag-icon" src={`https://www.countryflags.io/${weather.country}/flat/32.png`}/>
            </div>
          </div>

          <div className="date">
            {localTime}
          </div>
          
          <div className="description">
            {weather.description}
          </div>


          <div className="weather" >
            <div style={{display:'flex', flexDirection:'row'}}>
             {WeatherIcon(weather.description, day)}
              <div className="temp">
                {weather.temp}°C
              </div>
            </div>  
          </div>

          <div className="maxMinTemps">
            <div className="maxTemp">
              Day {weather.maxTemp}°C
            </div>
            <div className="arrow-icon">
              <ArrowUpwardIcon style={{fontSize:'20'}}/>
            </div>
            
            <div className="minTemp">
              Night {weather.minTemp}°C
            </div>
            <div className="arrow-icon">
              <ArrowDownwardIcon style={{fontSize:'20'}}/>
            </div>
          </div>

          <div className="bottomStats">
            <div className="precipitation">
              Humidity: {weather.humidity}%
            </div>
          </div>
  
          <div>
          </div>
          </div>

          <div style={{marginTop:20}} className="row d-flex justify-content-center">
            <div className="col-10">
              <hr></hr>
            </div>
          </div>
          <div className="footer">
              <div className="footer-icon">
                  <a className='text-secondary' href="https://github.com/saket2508">
                    <i class="fab fa-github"></i>
                  </a>
              </div>
              <div className="footer-icon">
                <a className='text-secondary' href="https://www.linkedin.com/in/saket-s-narayan-636158149/">
                  <i class="fab fa-linkedin"></i>
                </a>
              </div>
              <div className="footer-icon">
                <a className='text-secondary' href="mailto:saketns@@gmail.com">
                  <i class="far fa-envelope"></i>
                </a>
              </div>
            </div>

        </div>
         </div>
       </div>
      </div>
    </div>
  );
}

export default App;
