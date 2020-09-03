import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Tooltip from '@material-ui/core/Tooltip';


export default function SearchBar({ props }){
    return(
        <div className="row" style={{display:'flex', marginBottom: 20, marginTop:40, justifyContent:'center'}}>
          <div className="col-lg-4 col-md-6 col-sm-8">
            <div className="input-group input-group-sm">
  
                <input 
                    id="city"
                    name="city"
                    type="text" 
                    className="form-control" 
                    placeholder="Search..." 
                    aria-label="Enter a city" 
                    aria-describedby="weather-input"
                    onChange={e => props.setQuery(e.target.value)}
                    value={props.query}
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    data-html="true"
                    title="If you don't see the place you searched for, try adding its country code or zip code at the end. Ex: Alberta, CA "
                    />
      
                <div className="input-group-append">
                  <button className="btn btn-custom" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={props.search}>
                    <SearchIcon style={{color:'#fff', fontSize:'20'}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>
    )
}