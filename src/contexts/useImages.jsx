import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { debounce } from 'lodash';

const ImageContext = createContext();

const useImages = () => useContext(ImageContext);

const ImageProvider = ({ children }) => {
  const [count, setCount] = useState(9);
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

  const fetchImagesBySearch = async () => {
    setPage(1);
    setImages([]);

    updateCacheSearch();

    const url = buildImageUrl({ searchText, count, page });
    const { data } = await axios.get(url);

    setImages(data.photos.photo);
  };

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
    const debouncedFetchImagesBySearch = debounce(fetchImagesBySearch, 700);

    if (searchText.length > 0) {
      debouncedFetchImagesBySearch();
    } else {
      setImages([]);
      fetchImages();
    }
  }, [searchText]);

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
