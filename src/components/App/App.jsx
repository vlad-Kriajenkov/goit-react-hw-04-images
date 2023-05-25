import React, { Component } from "react";
import css from "./App.module.css";
import Searchbar from "../Searchbar/Searchbar";
import { ImageGallery } from "components/ImageGallery/ImageGallery";
import * as API from "../../services/api";
import { Button } from "components/Button/Button";
import { InfinitySpin } from "react-loader-spinner";
import Modal from "components/Modal/Modal";

class App extends Component {
  state = {
    nameImg: "",
    images: [],
    page: 1,
    stateInfo: "base",
    modal: false,
    imgModal: [],
  };
  onSubmit = async (name) => {
    try {
      this.setState({
        nameImg: name,
        page: 1,
        stateInfo: "pending",
      });
      const imagesArr = await API.getImages(name);
      this.setState((prevState) => ({
        images: imagesArr.hits,
        page: prevState.page + 1,
        stateInfo: "resolvd",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  loudeMore = async () => {
    const { nameImg, page } = this.state;

    try {
      const imagesArr = await API.loudeMoore(nameImg, page);
      this.setState((prevState) => ({
        images: [...prevState.images, ...imagesArr.hits],
        page: prevState.page + 1,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  toggelModal = (idModal) => {
    const { images } = this.state;
    const newImgModal = images.filter(image => image.id === idModal )
    this.setState({
      imgModal: newImgModal,
      modal: !this.state.modal,
    });
 
  };

  render() {
    const { images, stateInfo, modal,imgModal } = this.state;
    if (stateInfo === "base") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
        </div>
      );
    }
    if (stateInfo === "pending") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          <InfinitySpin width="200" color="#4fa94d" />
        </div>
      );
    }
    if (stateInfo === "resolvd") {
      return (
        <div className={css.App}>
          <Searchbar onSubmit={this.onSubmit} />
          <ImageGallery value={images} openModel={this.toggelModal} />
          {modal && <Modal onClose={this.toggelModal} imgModal={imgModal} />}
          <Button onLoudeMore={this.loudeMore} />
        </div>
      );
    }
  }
}

export default App;
