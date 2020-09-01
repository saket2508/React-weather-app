import React from 'react';
import SearchIcon from '@material-ui/icons/Search';

export default function SearchBar({ props }){
    return(
        <div className="row" style={{display:'flex', marginBottom: 50, justifyContent:'center'}}>
          <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="input-group">
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
                  />
                <div className="input-group-append">
                  <button className="btn btn-outline-danger" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={props.search}>
                    <SearchIcon style={{color:'#fff'}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>
    )
}