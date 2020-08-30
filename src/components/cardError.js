import React from 'react';

export default function CardError({ props }){
    return(
        <div className="row" style={{display:'flex', justifyContent:'center'}}>
          <div className="col-lg-5 col-sm-10">
            <div className="card border-0">
              <div className="card-header" style={{backgroundColor:'#f44336'}}>
                <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>FORECAST FINDER</h5>
              </div>
              <div className="card-body">   
                  <div style={{paddingTop:100, paddingBottom:100}}>
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                        <ErrorOutlineIcon style={{paddingBottom:5, color:'#dc3545'}}/>
                        <h6 className="text-danger" style={{fontWeight:'500', marginLeft:3}}>Please enter a valid city name</h6>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
}