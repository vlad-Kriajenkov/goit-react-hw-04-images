import css from "./ImageGallery.module.css";

export const ImageGallery = ({ value, openModel }) => {


  return (
    <ul className={css.ImageGallery}>
      {value.map(({ webformatURL, id, tags }) => (
        <li
          className={css.ImageGalleryItem}
          key={id}
          onClick={() => openModel(id)}
        >
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
          />
        </li>
      ))}
    </ul>
  );
};
