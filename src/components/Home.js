import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import heel from "../images/logo2.png";
import wallpaper from "../images/wallpaper.jpeg";

import sneakersJSON from "../sneakers.json";

const Home = () => {
  const [shoePics, setShoePics] = React.useState([]);

  const navigate = useNavigate();

  const options = {
    method: "GET",
    url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
    params: { limit: "10" },
    headers: {
      "X-RapidAPI-Key": "8145a0d66fmsh967b9729537d0f7p1aaab0jsncb9dccfb2e32",
      "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
    },
  };

  const getShoes = async () => {
    let response = await axios.request(options);
    let allShoes = response.data.results;

    // allShoes.sort((a, b) => {
    //   return a.releaseDate.localeCompare(b.releaseDate);
    // });

    // console.log(response.data.results);

    setShoePics(response.data.results);
  };

  React.useEffect(function () {
    getShoes();
  }, []);

  const token = localStorage.getItem("token");

  // console.log(shoePics[0].id);

  return (
    <div className="home-page">
      <Navbar token={token} />
      <div className="home-1">
        <hr className="home-line" />
        <img className="logo" src={heel} alt="Logo" />
        <hr className="home-line-right" />
        <h1 className="home-title">
          Stay Fresh <br /> From <br /> Heel2Toe
        </h1>
        <img className="wallpaper-home" src={wallpaper} alt="Wallpaper" />
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
