import React from 'react';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

export default function CardError(){
    return(
        <div className="row mb-4" style={{display:'flex', justifyContent:'center'}}>
          <div className="col-lg-5 col-sm-10">
            <div className="card border-0">
              <div className="card-header" style={{backgroundColor:'#f44336'}}>
                <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>WEATHER FINDER</h5>
              </div>
              <div className="card-body">   
                  <div style={{paddingTop:185, paddingBottom:185}}>
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'center'}}>
                        <ErrorOutlineIcon style={{paddingBottom:5, color:'#dc3545'}}/>
                        <h5 className="text-danger" style={{fontWeight:'500', marginLeft:3}}>Please enter a valid city...</h5>
                      </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
    )
}