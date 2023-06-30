import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

// Create a context for the image-related data
const ImageContext = createContext();

// Custom hook to access the image context
const useImages = () => useContext(ImageContext);

// Provider component that holds the image data and provides it to its children
const ImageProvider = ({ children }) => {
  // State variables for count, page, images, loading, search text, results flag, and cached searches
  const [count, setCount] = useState(9);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [noResultsToShow, setNoResultsToShow] = useState(false);
  const [cacheSearch, setCacheSearch] = useState([]);

  useEffect(() => {
    // Fetch images when the component mounts
    fetchImages();
  }, []);

  // Fetches images from the API
  const fetchImages = async () => {
    const url = buildImageUrl({ searchText, count, page });
    const { data } = await axios.get(url);

    setPage(prevPage => prevPage + 1);

    if (data.photos.photo.length === 0) {
      setNoResultsToShow(true);
    } else {
      setNoResultsToShow(false);
      setImages(prev => [...prev, ...data.photos.photo]);
    }
  };

  // Fetches images by search text
  const fetchImagesBySearch = async () => {
    setPage(1);
    setImages([]);

    updateCacheSearch();

    const url = buildImageUrl({ searchText, count, page });
    const { data } = await axios.get(url);

    setImages(data.photos.photo);
  };

  // Updates the cache of search queries
  const updateCacheSearch = () => {
    const cacheSearch = JSON.parse(localStorage.getItem('cacheSearch')) || [];

    if (!cacheSearch.includes(searchText)) {
      const updatedCache = [...cacheSearch, searchText];
      localStorage.setItem('cacheSearch', JSON.stringify(updatedCache));
    } else {
      setCacheSearch(cacheSearch);
    }
  };

  useEffect(() => {
    // Debounce the fetchImagesBySearch function to avoid excessive API calls
    const debouncedFetchImagesBySearch = debounce(fetchImagesBySearch, 700);

    if (searchText.length > 0) {
      debouncedFetchImagesBySearch();
    } else {
      setImages([]);
      fetchImages();
    }
  }, [searchText]);

  // Builds the URL for the Flickr API request
  const buildImageUrl = ({ searchText, count, page }) => {
    const apiKey = '10e39868768af1480b8aa89c3efe73fa';
    const baseUrl = 'https://www.flickr.com/services/rest/';
    const safeSearch = 3;
    const format = 'json';
    const nojsoncallback = 1;
    const perPage = count;
    const method =
      searchText.length === 0
        ? 'flickr.photos.getRecent'
        : 'flickr.photos.search';
    const params = {
      method,
      api_key: apiKey,
      text: searchText,
      safe_search: safeSearch,
      format,
      nojsoncallback,
      per_page: perPage,
      page,
    };

    const queryString = Object.entries(params)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&');

    return `${baseUrl}?${queryString}`;
  };

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
