import { createContext, useState,useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListProvider = ({ children }) => {
  const [watchList, setWatchList] = useState([]);

  const[genreList , setGenreList] = useState([]);

  useEffect(() => {
      let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=b36313c49784d01ba7b1182a8b2724b2`;
  
      fetch(url)
      .then((response) => response.json())
      .then((data) => setGenreList(data.genres || [])); 
        },
      []);

  const toggleWatchList = (movie) => {
    const index = watchList.findIndex((m) => m.id === movie.id);

    if (index === -1) {
      setWatchList([...watchList, movie]);
    } else {
      setWatchList([
        ...watchList.slice(0, index),
        ...watchList.slice(index + 1)
      ]);
    }
  };

  console.log("watchList", watchList);

  return (
    <WatchListContext.Provider
     value={{ watchList, toggleWatchList,genreList }}>
      {children}
    </WatchListContext.Provider>
  );
};