import { useState } from "react";
import css from "./Searchbar.module.css";
import { BiSearch } from "react-icons/bi";

export default function Searchbar({ onSubmit }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name);
    setName("");
  };
  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <BiSearch />
        </button>

        <input
          className={css.SearchFormInput}
          value={name}
          onChange={handleChange}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}
