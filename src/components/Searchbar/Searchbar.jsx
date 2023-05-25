import React, { Component } from "react";
import css from "./Searchbar.module.css";
import { BiSearch } from "react-icons/bi";

class Searchbar extends Component {
  state = {
    value: "",

  };

  handleChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({
      value: "",
    });
  };
  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <BiSearch />
          </button>

          <input
            className={css.SearchFormInput}
            value={this.state.value}
            onChange={this.handleChange}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
