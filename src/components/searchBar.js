import React from 'react';


export default function SearchBar({ props }){
    return(
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
                  onChange={e => props.setQuery(e.target.value)}
                  value={props.query}
                  />
                <div class="input-group-append">
                  <button className="btn btn-outline-danger" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={props.search}>
                    <SearchIcon style={{color:'#fff'}}/>
                  </button>
                </div>
            </div>
          </div>
        </div>
    )
}