import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";

import searchwall from "../images/searchwall2.png";
import heel from "../images/logo2.png";

const Shoes = () => {
  const [shoesArr, setShoesArr] = React.useState([]);
  const [shoesName, setShoesname] = React.useState("");
  const [shoesColorway, setShoescolorway] = React.useState("");
  const [shoesBrand, setShoesBrand] = React.useState("");
  const [shoesSku, setShoesSku] = React.useState("");
  const [flag, setFlag] = React.useState(false);

  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (flag) {
      getShoes();
    }
  }, [page, flag]);

  const [status, setStatus] = React.useState("");
  // const params = useParams();

  const getShoes = async (e, overRide = false) => {
    if (e) {
      e.preventDefault();
    }

    const options = {
      method: "GET",
      url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
      params: {
        limit: "12",
        page: overRide ? 0 : page,
        name: shoesName,
        colorway: shoesColorway,
        sku: shoesSku,
        brand: shoesBrand,
      },
      headers: {
        "X-RapidAPI-Key": "8145a0d66fmsh967b9729537d0f7p1aaab0jsncb9dccfb2e32",
        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
      },
    };

    setLoading(true);

    const newObj = {};

    Object.keys(options.params).forEach((key) => {
      if (options.params[key]) {
        newObj[key] = options.params[key];
      }
    });
    console.log("new obj", newObj);

    options.params = newObj;

    console.log("submit", shoesBrand, shoesColorway, shoesName);
    let response = await axios.request(options);

    if (response.data.results.length <= 0) {
      setStatus("No shoes Found");
      setLoading(false);
    } else {
      setStatus("");

      console.log(response.data.results);
      setShoesArr(response.data.results);

      setTimeout(() => {
        window.scrollTo({
          top: 820,
          behavior: "smooth",
        });
      }, 10);
      setLoading(false);
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="search-page">
      <Navbar token={token} />
      <div className="search-1">
        <hr className="home-line" />
        <Link to="/">
          <img className="logo" src={heel} alt="Logo" />
        </Link>
        <hr className="home-line-right" />
      </div>
      <Link to="shoes-display">Bottom</Link>
      <img className="search-wall" src={searchwall} alt="wallpaper" />
      <form
        onSubmit={(e) => {
          getShoes(e, true);
          setPage(0);
        }}
      >
        <h1>SNEAKERS</h1>
        {/* <div> */}
        <input
          className="search-input"
          type="text"
          placeholder="Name of shoe..."
          onChange={(e) => setShoesname(e.target.value)}
        />
        <div className="find-btn">
          <button>Find</button>
        </div>
        <div className="search-status">
          <p>{status}</p>
        </div>
        {/* </div> */}
        <br />

        <h2>FILTERS</h2>
        <div>
          <input
            type="text"
            placeholder="Color..."
            onChange={(e) => setShoescolorway(e.target.value)}
          />
          <input
            type="text"
            placeholder="Brand..."
            onChange={(e) => setShoesBrand(e.target.value)}
          />
          <input
            type="text"
            placeholder="Sku..."
            onChange={(e) => setShoesSku(e.target.value)}
          />
        </div>
      </form>

      <div className="shoes-display">
        <div className="btn-section">
          <div className="back-btn">
            <button
              disabled={page <= 0 || loading}
              onClick={(e) => {
                setFlag(true);
                setPage(page - 1);
              }}
            >
              &#x3c;
            </button>
          </div>
          <p>{page}</p>
          <div className="next-btn">
            <button
              disabled={shoesArr.length < 12 || loading}
              onClick={(e) => {
                setFlag(true);
                setPage(page + 1);
              }}
            >
              &#62;
            </button>
          </div>
        </div>
        {shoesArr.map((brr) => {
          return (
            <div key={brr.id} className="shoe-sections">
              <Link to={`/shoes/${brr.id}`}>
                <img
                  src={
                    brr.image.thumbnail ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1200px-No_image_available.svg.png"
                  }
                  alt="No Image Available"
                />
                <h3>{brr.name}</h3>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shoes;
