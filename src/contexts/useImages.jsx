import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

const ImageContext = createContext();

const useImages = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [count, setcount] = useState(9);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [noResultsToShow, setNoResultsToShow] = useState(false);
  const [cacheSearch, setCacheSearch] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    let url;
    setPage(prevPage => prevPage + 1);
    const apiKey = '10e39868768af1480b8aa89c3efe73fa';
    if (searchText.length === 0) {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&safe_search=3&api_key=10e39868768af1480b8aa89c3efe73fa&format=json&nojsoncallback=1&per_page=${count}&page=${page}`;
    } else {
      url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&text=${searchText}&safe_search=3&format=json&nojsoncallback=1&per_page=${count}&page=${page}`;
    }
    const { data } = await axios.get(url);
    data.photos.photo.length === 0
      ? setNoResultsToShow(true)
      : setNoResultsToShow(false);

    // setImages(data.photos.photo);

    setImages(prev => [...prev, ...data.photos.photo]);
    console.log(data);
  };

  const fetchImagesBySearch = async () => {
    setPage(1);
    setImages([]);

    const cacheSearch = JSON.parse(localStorage.getItem('cacheSearch')) || [];
    if (!cacheSearch.includes(searchText)) {
      let updatedCache = [...cacheSearch, searchText];
      localStorage.setItem('cacheSearch', JSON.stringify(updatedCache));
    } else {
      setCacheSearch(cacheSearch);
    }

    let url;
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=10e39868768af1480b8aa89c3efe73fa&text=${searchText}&safe_search=3&format=json&nojsoncallback=1&per_page=${count}&page=${page}`;
    const { data } = await axios.get(url);
    console.log(cacheSearch);
    setImages(data.photos.photo);
  };

  useEffect(() => {
    const debouncedFetchImagesBySearch = debounce(fetchImagesBySearch, 700);
    if (searchText.length > 0) debouncedFetchImagesBySearch();
    if (searchText.length === 0) {
      setImages([]);
      fetchImages();
    }
  }, [searchText]);

  return (
    <ImageContext.Provider
      value={{
        images,
        loading,
        searchText,
        setSearchText,
        noResultsToShow,
        fetchImages,
        cacheSearch,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export { useImages, ImageProvider };
