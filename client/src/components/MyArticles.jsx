import React, { useContext } from "react";
import "../styles/utils.css";
import "../styles/style.css";
import "../styles/mobile.css";
import { Link, useHistory } from "react-router-dom";
import { ReactReduxContext } from "react-redux";
import { useState, useEffect, useReducer } from "react";
import images from "../utils/postImages";
import avatarImages from "../utils/avatarImages";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import empty from "../images/empty.webp";

export default function MyArticles() {
  // let  [,setState]=useState();
  const [openSnackDeleteArticle, setOpenSnackDeleteArticle] =
    React.useState(false);

  // redux
  const loggedUserData = useContext(ReactReduxContext);
  const currentUser = loggedUserData.store.getState();
  // console.log(currentUser.profile.id);

  // const history = useHistory();

  const [articleList, setArticleList] = useState([]);
  const [deletedArticleId, setDeletedArticleId] = useState("");

  // this is to force update the component
  // const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const handleCloseSnackDeleteArticle = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackDeleteArticle(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const res = await fetch("/allarticles", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        // console.log(articleList);
        setArticleList(data.allArticles);
      });
    // console.log(articleList);
  };

  const deleteArticle = async (id) => {
    const res = await fetch("/deleteArticle", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });

    if (res.status === 204) {
      setDeletedArticleId(id);
      console.log(deletedArticleId);
      // forceUpdate();
      fetchArticles();
      setOpenSnackDeleteArticle(true);
    } else {
      console.log("error!");
    }
  };
  const onlyMyArticleList = [];
  for (let index = 0; index < articleList.length; index++) {
    if (
      currentUser.profile.id === articleList[index].uploadedBy._id &&
      deletedArticleId !== articleList[index]._id
    )
      onlyMyArticleList.push(articleList[index]);
  }
  console.log("this");
  console.log(onlyMyArticleList.length);
  console.log(onlyMyArticleList);
  console.log("this");
  return onlyMyArticleList.length === 0 ? (
    <>
      <div
        className="home-articles max-width-1 m-auto font2"
        style={{ alignContent: "center", backgroundColor: "white" }}
      >
        <h2>My Articles</h2>
      </div>
      <div className="max-width-1 m-auto font2 nothingToShow">
        <img src={empty}></img>
      </div>
    </>
  ) : (
    <>
      <div className="home-articles max-width-1 m-auto font2">
        <h2>My Articles</h2>
        {onlyMyArticleList.map((article) => {
          if (
            currentUser.profile.id === article.uploadedBy._id &&
            deletedArticleId !== article._id
          )
            return (
              <div className="home-article">
                <Link
                  to={{
                    pathname: "/blogpost",
                    state: {
                      articleImage: article.articleImage,
                      articleTitle: article.articleTitle,
                      articleBody: article.articleBody,
                      readTime: article.readTime,
                      userName: article.uploadedBy.userName,
                      profilePicture: article.uploadedBy.profilePicture,
                      allArticles: articleList,
                    },
                  }}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div className="home-article-img">
                    {/* <img src={postImage} alt="article" /> */}
                    <img
                      src={images[`${article.articleImage}`]}
                      alt="article"
                    />
                  </div>
                </Link>
                <div className="home-article-content font1">
                  <Link
                    to={{
                      pathname: "/blogpost",
                      state: {
                        articleImage: article.articleImage,
                        articleTitle: article.articleTitle,
                        articleBody: article.articleBody,
                        readTime: article.readTime,
                        userName: article.uploadedBy.userName,
                        profilePicture: article.uploadedBy.profilePicture,
                        allArticles: articleList,
                      },
                    }}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <a>
                      <h4>{article.articleTitle}</h4>
                    </a>
                  </Link>
                  <div className="post-info">
                    <div className="profilepicture">
                      <img
                        src={
                          avatarImages[`${article.uploadedBy.profilePicture}`]
                        }
                        alt="Avatar"
                        style={{ borderRadius: "50%", width: "50px" }}
                      />
                    </div>
                    <div>{article.uploadedBy.userName}</div>
                  </div>
                  <div className="buttondate">
                    <span>
                      {article.uploadedTime.substring(0, 10)} |{" "}
                      {article.readTime} min read
                    </span>
                    {/* <button >  */}
                    <a
                      class="myButton"
                      name="delete"
                      onClick={() => deleteArticle(article._id)}
                      value={article._id}
                    >
                      Delete
                    </a>
                    {/* </button> */}
                  </div>
                </div>
              </div>
            );
        })}
      </div>
      {/* // deleted article snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        backgroundColor="#FFF8F2"
        open={openSnackDeleteArticle}
        autoHideDuration={2000}
        onClose={handleCloseSnackDeleteArticle}
        message="Article Deleted"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnackDeleteArticle}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </>
  );
}
