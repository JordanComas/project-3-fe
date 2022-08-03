import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import useWindowSize from "./WindowSize";
import heel from "../images/logo2.png";
import wallpaper from "../images/wallpaper.jpeg";
import sneakersJSON from "../sneakers.json";

const Home = () => {
  const [shoePics, setShoePics] = React.useState([]);

  const navigate = useNavigate();
  const size = useWindowSize();

  const options = {
    method: "GET",
    url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": process.env.REACT_APP_SHOE_API,
      "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
    },
  };

  const getShoes = async () => {
    let response = await axios.request(options);

    //This is to sort the shoes by release date
    // let allShoes = response.data.results;
    // allShoes.sort((a, b) => {
    //   return a.releaseDate.localeCompare(b.releaseDate);
    // });

    setShoePics(response.data.results);
  };

  React.useEffect(function () {
    getShoes();
  }, []);

  const token = localStorage.getItem("token");

  return (
    <div className="home-page">
      <Navbar token={token} />
      <div className="home-1">
        <hr className="home-line" />
        <img className="logo" src={heel} alt="Logo" />
        <hr className="home-line-right" />
        {size.width <= 428 ? (
          <img
            className="wallpaper-home"
            src="https://wallpapersflix.com/wp-content/uploads/2021/08/Air-Jordan-Wallpaper.jpeg"
            alt="Wallpaper"
          />
        ) : (
          <img className="wallpaper-home" src={wallpaper} alt="Wallpaper" />
        )}
      </div>

      <h1 className="new-shoes">Newest Releases</h1>
      <div className="home-2">
        {sneakersJSON.map((shoe) => {
          return (
            <Link key={shoe.id} to={`/shoes/${shoe.id}`} className="new-home">
              <img src={shoe.image} alt="No Image Available" />
              <p>{shoe.name}</p>
            </Link>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
