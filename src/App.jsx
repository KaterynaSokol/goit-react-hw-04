import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import { requestPicturesBySearchValue } from "./services/api";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import Modal from "react-modal";
import axios from "axios";

const App = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  useEffect(() => {
    if (searchTerm === null) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const data = await requestPicturesBySearchValue(searchTerm);
        setImages(data.images);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, [searchTerm]);
  const onSubmit = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}

      <LoadMoreBtn />
      <ErrorMessage />
    </div>
  );
};

export default App;
