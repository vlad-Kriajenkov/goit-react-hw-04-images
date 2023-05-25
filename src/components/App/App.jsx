import { useState, useEffect } from "react";
import css from "./App.module.css";
import Searchbar from "../Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import * as API from "../../services/api";
import { Button } from "components/Button/Button";
import { InfinitySpin } from "react-loader-spinner";
import Modal from "components/Modal/Modal";

export default function App() {
  const [nameImg, setNameImg] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [stateRender, setStateRender] = useState("base");
  const [modal, setModal] = useState(false);
  const [imgModal, setImgModal] = useState([]);

  const onSubmit = async (name) => {
    try {
      setNameImg(name);
      setPage(1);
      setStateRender("pending");
      const imagesArr = await API.getImage(name);
      setImages(imagesArr.hits);
      setPage((preState) => preState + 1);
      setStateRender("resolvd");
    } catch (error) {
      console.log(error);
    }
  };

  const loudeMore = async () => {
    try {
      const imagesArr = await API.getImage(nameImg, page);
      setImages((prevImg) => [...prevImg, ...imagesArr.hits]);
      setPage((prePage) => prePage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  const toggelModal = (idModal) => {
    const newImgModal = images.filter((image) => image.id === idModal);
    setImgModal(newImgModal);
    setModal(!modal);
  };

  if (stateRender === "base") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
      </div>
    );
  }
  if (stateRender === "pending") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        <InfinitySpin width="200" color="#4fa94d" />
      </div>
    );
  }
  if (stateRender === "resolvd") {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={onSubmit} />
        <ImageGallery value={images} openModel={toggelModal} />
        {modal && <Modal onClose={toggelModal} imgModal={imgModal} />}
        <Button onLoudeMore={loudeMore} />
      </div>
    );
  }
}
