import React from 'react';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    marginTop: theme.spacing(0.5),
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  medium:{
    marginTop: theme.spacing(0.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  bullet: {
    display: 'inline-block',
    margin: '2px',
    transform: 'scale(0.8)',
  },
  large: {
    marginTop: theme.spacing(0.5),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));



export default function CardWeather({ weather }){
  const classes = useStyles();
  const bull = <span>•</span>
    return(
      <div className="row mb-4" style={{display:'flex',justifyContent:'center'}}>
      <div className="col-lg-5 col-sm-10">
      <div class="card border-0">
        <div className="card-header" style={{backgroundColor:'#f44336'}}>
          <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>WEATHER FINDER</h5>
        </div>
       <div className="card-body">
       <div className="location d-flex flex-row flex-wrap">
         <div className="city">{weather.name}, {weather.country}</div>
         <div className="flag">
           <img className="flag-icon" src={`https://www.countryflags.io/${weather.country}/flat/32.png`}/>
           {/* <Avatar alt= {weather.country} src={`https://disease.sh/assets/img/flags/${weather.country.toLowerCase()}.png`} className={classes.medium}/> */}
         </div>
       </div>

       <div className="date">
         {weather.localTime}
       </div>
       
       <div className="description">
         {weather.description}
       </div>


       <div className="weather" >
         <div style={{display:'flex', flexDirection:'row'}}>
          {weather.WeatherIcon(weather.description, weather.day)}
           <div className="temp">
             {weather.temp}{weather.unit}
           </div>
         </div>  
       </div>

       <div className="maxMinTemps">
         <div className="maxTemp">
           Day {weather.maxTemp}{weather.unit}
         </div>
         <div className="arrow-icon">
           <ArrowUpwardIcon style={{fontSize:'20'}}/>
         </div>
         <div className="minTemp">
           Night {weather.minTemp}{weather.unit}
         </div>
         <div className="arrow-icon">
           <ArrowDownwardIcon style={{fontSize:'20'}}/>
         </div>
       </div>

       <div className="bottomStats">
         <div className="humidity" style={{marginRight: 15}}>
           Humidity: {weather.humidity}%
         </div>
          <div className="precipitation">
            Precip: {weather.precipitation}%
          </div>
       </div>

      <div className="sunrise-sunset">
        <div className="timings" style={{marginRight: 15, display:'flex',flexDirection:'row'}}>
          Sunrise/Sunset:
          <div style={{marginLeft:5}}>
            {weather.sunrise}, {weather.sunset}
          </div>
        </div>
      </div>

      <div className="wind">
        <div style={{marginRight:15, display:'flex',flexDirection:'row'}}>
          Wind:
          <div style={{marginLeft:5}}>
            {weather.windSpeed} {weather.unit2}, {weather.direction}
          </div>
        </div>
      </div>

       <div>
       </div>
       </div>

       <div style={{marginTop:10}} className="row d-flex justify-content-center">
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
    )
}