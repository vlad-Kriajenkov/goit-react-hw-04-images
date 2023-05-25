import axios from "axios";
axios.defaults.baseURL = "https://pixabay.com/api";
export const getImages = async (name) => {
  const response = await axios.get(
    `/?key=36301115-d902ecdbc846e058a95b611fc&q=${name}&image_type=photo&per_page=10`
  );

  return response.data;
};
export const loudeMoore = async (name, page)=>{
  console.log(name, page);
  const response = await axios.get(
    `/?key=36301115-d902ecdbc846e058a95b611fc&q=${name}&image_type=photo&per_page=10&page=${page}`
  );

  return response.data;
}