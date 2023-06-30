import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';

const ImageContext = createContext();

const useImages = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [count, setcount] = useState(9);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [noResultsToShow, setNoResultsToShow] = useState(false);
  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setPage(prevPage => prevPage + 1);
    let url;
    const apiKey = '10e39868768af1480b8aa89c3efe73fa';
    if (searchText.length === 0)
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&safe_search=3&api_key=10e39868768af1480b8aa89c3efe73fa&format=json&nojsoncallback=1&per_page=${count}&page=${page}`;
    else
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&text=${searchText}&safe_search=3&format=json&nojsoncallback=1&per_page=${count}&page=${page}`;
    const { data } = await axios.get(url);
    data.photos.photo.length === 0
      ? setNoResultsToShow(true)
      : setNoResultsToShow(false);
    setImages(prev => [...prev, ...data.photos.photo]);
    console.log(data);
  };

  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <ImageContext.Provider
      value={{
        images,
        loading,
        searchText,
        setSearchText,
        noResultsToShow,
        fetchImages,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { useImages, ImageProvider };
