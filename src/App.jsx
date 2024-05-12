import { useEffect, useState } from 'react';
import { requestQuery } from './api.js';
import css from './App.module.css';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn.jsx';

function App() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchImagesByQuery() {
      if (query.trim() === '') {
        return;
      }

      setIsLoading(true);

      try {
        const data = await requestQuery(query, page);
        if (page === 1) {
          setImages(data.results);
        } else {
          setImages((prevImages) => [...prevImages, ...data.results]);
        }
        setIsError(false);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchImagesByQuery();
  }, [query, page]);

  const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
  };

  const handleMoreImages = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (imageUrl) => {
    setModalIsOpen(true);
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage message="Oops, there was an error, please try reloading." />}
      {images && <ImageGallery images={images} onImageClick={openModal} />}
      {images && <LoadMoreBtn onClick={handleMoreImages} />}
      <ImageModal isOpen={modalIsOpen} image={selectedImage} onRequestClose={closeModal} />
    </div>
  );
}

export default App;