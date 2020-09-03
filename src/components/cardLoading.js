import React from 'react';

export default function CardLoading(){
   return(
    <div className="row mb-3" style={{display:'flex', justifyContent:'center'}}>
    <div className="col-lg-5 col-sm-10">
      <div className="card border-0">
        <div className="card-header" style={{backgroundColor:'#f44336'}}>
          <h5 className="text-center" style={{color:'white',letterSpacing:1.0, paddingTop:10}}>WEATHER FINDER</h5>
        </div>
        <div className="card-body">  
            <div style={{paddingTop:185, paddingBottom:185}}>
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
   )
}