import React, { Component } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");
export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };
  handelClickBackDrop = (e) => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const imgModal = this.props.imgModal;

    return createPortal(
      <div className={css.Overlay} onClick={this.handelClickBackDrop}>
        <div className={css.Modal}>
          <img src={imgModal[0].largeImageURL} alt={imgModal[0].tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
