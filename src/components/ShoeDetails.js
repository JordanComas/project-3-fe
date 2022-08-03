import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { post, get, deleted } from "../services/service";
import TopButton from "./TopButton";
import like from "../images/like.png";

const ShoesDetails = () => {
  const [shoesDet, setShoesDet] = React.useState({});
  const [shoes360, setShoes360] = React.useState([]);
  const [newContent, setNewContent] = React.useState("");
  const [comments, setComments] = React.useState([]);
  const [refresh, setRefresh] = React.useState(false);
  const [likes, setLikes] = React.useState([]);

  const params = useParams();
  const navigate = useNavigate();

  const newId = localStorage.getItem("id");

  React.useEffect(() => {
    getShoesDet();

    window.scrollTo(0, 0);
  }, []);

  React.useEffect(() => {
    getComments();
  }, [refresh]);

  const options = {
    method: "GET",
    url: `https://the-sneaker-database.p.rapidapi.com/sneakers/${params._id}`,
    headers: {
      "X-RapidAPI-Key": "7f80d56842mshb52da311c570f6fp15a4a9jsn5f23c14c23ba",
      "X-RapidAPI-Host": "the-sneaker-database.p.rapidapi.com",
    },
  };

  const getShoesDet = async () => {
    let response = await axios.request(options);

    setShoesDet(response.data.results[0]);
    if (response.data.results[0].image["360"]) {
      setShoes360(response.data.results[0].image[360]);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();

    try {
      const response = await post("/posts/create", {
        content: newContent,
        shoeId: params._id,
      });
      setNewContent("");
      setRefresh(!refresh);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getComments = async () => {
    const response = await get(`/posts/comments/${params._id}`);

    setComments(response.data);
  };

  const likeComment = async (postId) => {
    const response = await post(`/posts/likes/${postId}`, {
      likes: likes,
    });

    setLikes(response);
    setRefresh(!refresh);
  };

  const removeComment = async (postId) => {
    try {
      const response = await deleted(`/posts/delete-comment/${postId}`);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="details-page">
      <Link className="arrow" to="/search">
        &#8592;
      </Link>
      <div>
        <div className="details-img">
          {shoes360.length > 0
            ? shoes360
                .filter((element, index) => {
                  return index % 8 === 0;
                })
                .map((image) => {
                  return (
                    <img
                      key={image}
                      className="image-array"
                      src={
                        image ||
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/No_image_available_600_x_200.svg/1280px-No_image_available_600_x_200.svg.png"
                      }
                      alt="No Image Available"
                    />
                  );
                })
            : shoesDet.image && (
                <img
                  className="image-original"
                  src={
                    shoesDet.image.original ||
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/No_image_available_600_x_200.svg/1280px-No_image_available_600_x_200.svg.png"
                  }
                  alt="No Image Available"
                />
              )}
        </div>
        <div className="details-page-2">
          <div className="shoe-name">
            <h2>{shoesDet.name}</h2>
            <p>Brand: {shoesDet.brand}</p>
            <p>Color: {shoesDet.colorway}</p>
            <p>Release Date: {shoesDet.releaseDate}</p>
            <div className="prices">
              <h4>Retail Price</h4>
              <h4>Resell Price</h4>
            </div>
            <div className="side-side">
              <p>${shoesDet.retailPrice}</p>
              <p>|</p>
              <p>${shoesDet.estimatedMarketValue}</p>
            </div>
            <p>SKU: {shoesDet.sku}</p>
          </div>

          <h2>Buying Options</h2>
          <div>
            <div className="links">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${shoesDet?.links?.stockX}`}
              >
                STOCKX
              </a>
              <br />
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${shoesDet?.links?.goat}`}
              >
                GOAT
              </a>
            </div>
            <form className="comments-section" onSubmit={createComment}>
              <h2>Comments</h2>
              <input
                placeholder="Add a comment..."
                type="textarea"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
              />
              <button>Comment</button>
            </form>
            <div>
              {comments.length > 0 &&
                comments.map((comment) => {
                  // console.log("COMMENT CREATOR", comment);
                  // console.log("USER ID", newId);
                  // console.log("SAME?", comment.creatorId._id === newId);
                  return (
                    <div className="single-comment" key={comment._id}>
                      {comment.creatorId ? (
                        <div className="comment-name">
                          <img
                            className="profile-pic-comment"
                            src={
                              comment.creatorId.profilePic ||
                              "https://st3.depositphotos.com/6672868/13701/v/600/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                            }
                          />
                          <h5>{comment.creatorId.first_name}&nbsp;</h5>
                          <h5>{comment.creatorId.last_name}</h5>
                        </div>
                      ) : (
                        <h5>Deleted Account</h5>
                      )}

                      <p className="comment-content">{comment.content}</p>
                      <div className="like-section">
                        <img
                          className="like-btn"
                          onClick={() => likeComment(comment._id)}
                          src={like}
                          alt="Like"
                        />
                        <p className="likes-num">{comment.likes.length}</p>
                      </div>
                      <div className="remove-btn">
                        {comment.creatorId._id === newId && (
                          <button onClick={() => removeComment(comment._id)}>
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      <TopButton />
    </div>
  );
};

export default ShoesDetails;
