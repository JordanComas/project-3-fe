import React, { useRef } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import useWindowSize from "./WindowSize";
import searchwall from "../images/searchwall2.png";
import heel from "../images/logo2.png";

const Shoes = () => {
  const [shoesArr, setShoesArr] = React.useState([]);
  const [shoesName, setShoesname] = React.useState("");
  const [shoesColorway, setShoescolorway] = React.useState("");
  const [shoesBrand, setShoesBrand] = React.useState("");
  const [shoesSku, setShoesSku] = React.useState("");
  // const [flag, setFlag] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [status, setStatus] = React.useState("");

  let [searchParams, setSearchParams] = useSearchParams();
  let name = searchParams.get("name");
  let pageNum = searchParams.get("pageNum");
  let color = searchParams.get("color");
  let brand = searchParams.get("brand");
  let sku = searchParams.get("sku");

  const size = useWindowSize();
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (flag) {
  //     getShoes();
  //   }
  // }, [page, flag]);

  React.useEffect(() => {
    if (name || sku || brand) {
      getShoes(name, pageNum, color, brand, sku);
    }
  }, [pageNum, name, color, brand, sku]);

  const getShoes = async (name, pageNum = 0, color, brand, sku) => {
    const options = {
      method: "GET",
      url: "https://the-sneaker-database.p.rapidapi.com/sneakers",
      params: {
        limit: "12",
        page: pageNum,
        name: name,
        colorway: color,
        sku: sku,
        brand: brand,
      },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_SHOE_API,
        "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
      },
    };

    // process.env.REACT_APP_SHOE_API;

    setLoading(true);

    const newObj = {};

    Object.keys(options.params).forEach((key) => {
      if (options.params[key]) {
        newObj[key] = options.params[key];
      }
    });
    // console.log("new obj", newObj);

    options.params = newObj;

    // console.log("submit", shoesBrand, shoesColorway, shoesName);
    let response = await axios.request(options);

    if (response.data.results.length <= 0) {
      setStatus("No shoes Found");
      setLoading(false);
    } else {
      setStatus("");

      // console.log("RESPONSE?", response.data.results);
      setShoesArr(response.data.results);

      // if (size.width > 428) {
      //   setTimeout(() => {
      //     window.scrollTo({
      //       top: 820,
      //       behavior: "smooth",
      //     });
      //   }, 10);
      // } else {
      //   setTimeout(() => {
      //     window.scrollTo({
      //       top: 950,
      //       behavior: "smooth",
      //     });
      //   }, 10);
      // }
      setTimeout(() => {
        executeScroll();
      }, 10);
    }
    setLoading(false);
  };

  const myRef = useRef(null);

  const executeScroll = () =>
    myRef.current.scrollIntoView({
      behavior: "smooth",
    });

  const setParams = (e) => {
    e.preventDefault();

    setSearchParams({
      name: shoesName,
      pageNum: page,
      color: shoesColorway,
      brand: shoesBrand,
      sku: shoesSku,
    });
  };

  //   setTimeout(() => {
  //     myRef.current.scrollIntoView({
  //       behavior: "smooth",
  //     });
  //   }, 10);
  // };

  const token = localStorage.getItem("token");

  return (
    <div className="search-page">
      <Navbar token={token} />
      {/* <div className="search-1">
        <hr className="home-line" />
        <Link to="/">
          <img className="logo" src={heel} alt="Logo" />
        </Link>
        <hr className="home-line-right" />
      </div> */}
      {/* <Link to="shoes-display">Bottom</Link> */}
      {size.width <= 428 ? (
        <img
          className="search-wall"
          src="https://i.pinimg.com/originals/3c/9e/e0/3c9ee03155be1f1250a5877b15a01971.png"
          alt="wallpaper"
        />
      ) : (
        <img className="search-wall" src={searchwall} alt="wallpaper" />
      )}

      <form onSubmit={setParams}>
        <h1>SNEAKERS</h1>
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
      {/* <button style={{ zIndex: 1 }} onClick={executeScroll}>
        Scroll
      </button> */}
      <div
        ref={myRef}
        className={shoesArr.length > 0 ? "shoes-display" : "shoes-display-off"}
      >
        {/* <button onClick={refreshPage}>Reload</button> */}
        <div className="btn-section">
          <div className="back-btn">
            <button
              disabled={pageNum <= 0 || loading}
              onClick={() =>
                setSearchParams({ name: name, pageNum: Number(pageNum) - 1 })
              }
            >
              &#x3c;
            </button>
          </div>
          <p>{pageNum}</p>
          <div className="next-btn">
            <button
              disabled={shoesArr.length < 12 || loading}
              onClick={() => {
                setSearchParams({ name: name, pageNum: Number(pageNum) + 1 });
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
