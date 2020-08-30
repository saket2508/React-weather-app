import React from 'react';

export default function CardWeather({ props }){
    return(
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

          <div className="date">{localTime}</div>
          <div className="description">
            {weather.description}
          </div>

          <div className="weather" >
            <div style={{display:'flex', flexDirection:'row'}}>
              <div className="sunny">
              </div>
              <div className="temp">
                {weather.temp}°
              </div>
            </div>  
          </div>

          <div className="maxMinTemps">
            <div className="maxTemp">
              Day {weather.maxTemp}°
            </div>
            <div className="arrow-icon">
              <ArrowUpwardIcon/>
            </div>
            <div className="minTemp">
              Night {weather.minTemp}°
            </div>
            <div className="arrow-icon">
              <ArrowDownwardIcon/>
            </div>
          </div>
          <div>     
          </div>
          </div>
        </div>
         </div>
       </div>
    )
}