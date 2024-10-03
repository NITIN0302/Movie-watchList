import {useEffect, useState} from "react"

function getMovieData(name){
    const [data, setData] = useState([]);
    useEffect(() => {
        async function fetchData(){
            const response = await fetch(`http://www.omdbapi.com/?s=${name}&apikey=4bc6021a`);
            const val = await response.json();
            const result = await val.Search;
            setData(result);
        }
        fetchData();
    },[name])
    return data
}

export default getMovieData