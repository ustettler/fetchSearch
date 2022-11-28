import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

export default function App() {

    const [jsonResult,setJsonResult] = useState([]);

    useEffect(()=>{

    },[])

    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh"}}>
            <Autocomplete
                id="player_demo"
                getOptionLabel={(jsonResult)=> `${jsonResult.title}` }
                options={jsonResult}
                sx={{ width : 300 } }
                isOptionEqualToValue={(option,value)=>
                    option.title === value.title
                }
                noOptionsText={"No Data Found !"}
                renderOption={(props,jsonResult)=>(
                    <Box component={'li'} {...props} key={jsonResult.url}>
                        {jsonResult.title}
                    </Box>
                )}
                renderInput={(params)=> <TextField onChange={(event)=>{
                    let val = event.target.value;
                    fetch(`https://hn.algolia.com/api/v1/search?query=${val}`)
                        .then((response)=> response.json())
                        .then((json)=> {
                            setJsonResult(json.hits)
                            // console.log(json.hits);
                        });
                }
                } {...params} label={"Please Search Here..."} onFocus={()=> setJsonResult([]) }  /> }
            />
        </div>
    );
}