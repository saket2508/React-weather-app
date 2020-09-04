import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function AlertInfo(props){
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SearchBar({ props }){

    const classes = useStyles();
    const [ alert, setAlert ] = useState(true)

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert(false);
    };

    return(
        <React.Fragment>
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
                    />
      
                <div className="input-group-append">
                  <button className="btn btn-custom" type="submit" id="weather input" style={{backgroundColor:'#f44336'}} onClick={props.search}>
                    <SearchIcon style={{color:'#fff', fontSize:'20'}}/>
                  </button>
                </div>
                
            </div>
          </div>
        </div>

        <div>
          <Snackbar transitionDuration={{enter:3000}} open={alert} onClose={handleClose}>
          <AlertInfo onClose={handleClose} severity="info" color="error">
            Tip: If you don't see the place you searched for, try adding its country or zip code at the end, Ex: Alberta, CA
          </AlertInfo>
        </Snackbar>
        </div>
        </React.Fragment>
    )
}