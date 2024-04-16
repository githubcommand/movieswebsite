import React, { useEffect,useState } from "react";

const AppContext = React.createContext();
export const API_URL = `http://www.omdbapi.com/?&apikey=${process.env.REACT_APP_API_KEY}`;
const AppProvider = ({ children }) => {
    const [isLoading,setIsLoading] = useState(true);
    const [movie,setMovie] = useState([]);
    const [isError,setIsError] = useState({show:"false",msg:""});
    const [query, setQuery] = useState('love');
  const getMovies = async (url) => {

    try {
      const res = await fetch(url);
      console.log(res);
      const data = await res.json();
      console.log(data);
      if(data.Response === "True"){
        setIsLoading(false);
        setMovie(data.Search);
        setIsError({show:"false", msg: ""});

      }
      else{
        setIsError({show:"true", msg: data.Error});
        setMovie([]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
   let timerId= setTimeout(()=>{    getMovies(`${API_URL}&s=${query}`);
},800)
return () => clearTimeout(timerId);
  }, [query]);
  return <AppContext.Provider value={{isLoading,isError,movie,query,setQuery}}>{children}</AppContext.Provider>;
};

export { AppContext, AppProvider };

// 7ad95122
