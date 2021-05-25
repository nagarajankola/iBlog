import React from "react";
import bannerImage from "../images/home.svg";
import ArticleList from "./ArticleList";
import PostArticle from "./PostArticle";
import IconButton from "@material-ui/core/IconButton";

import CloseIcon from "@material-ui/icons/Close";

import Snackbar from "@material-ui/core/Snackbar";

function Banner() {
  // snackbar for login and article posted
  const [openSnackLogin, setOpenSnackLogin] = React.useState(false);
  const [openSnackArticlePosted, setOpenSnackArticlePosted] =
    React.useState(false);

  const handleCloseSnackLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackLogin(false);
  };

  const handleCloseSnackArticlePosted = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackArticlePosted(false);
  };

  return (
    <div>
      <div className="m-auto content max-width-1 my-2">
        {/* // please Login snackbar */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          // color="#FFF8F2"
          backgroundColor="#FFF8F2"
          open={openSnackLogin}
          autoHideDuration={2000}
          onClose={handleCloseSnackLogin}
          message="Please Login!"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="white"
                onClick={handleCloseSnackLogin}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
        <div className="content-left">
          <h1>The heaven for bloggers</h1>
          <p>
            iBlog is a website which lets you submit an article which upon
            approval will be up on our website and you can get a good amount of
            reach from here!
          </p>
          <p>
            When blogs and blogging began, the original purpose was for
            individuals to share their personal lives online, similar to an
            online journal. Over the last decade, blogging has evolved from
            having more personal to more professional goals. Instead of
            individuals solely blogging for their friends and family, blogging
            began to encompass professionals blogging for the public to promote
            their personal brand and their business. In this post, we’re going
            to look at the typical reasons why people choose to start blogging
            and its benefits.
          </p>
          <div style={{ paddingTop: "3vh" }}>
            <PostArticle
              changeSnackState={(snackState) => setOpenSnackLogin(snackState)}
              changeSnackStateArticlePosted={(snackStateArticlePosted) =>
                setOpenSnackArticlePosted(snackStateArticlePosted)
              }
            />
          </div>
        </div>
        <div className="content-right">
          <img src={bannerImage} alt="iBlog" />
        </div>
      </div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      {/* // posted article snackbar */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        // color="#FFF8F2"
        backgroundColor="#FFF8F2"
        open={openSnackArticlePosted}
        autoHideDuration={2000}
        onClose={handleCloseSnackArticlePosted}
        message="Article Posted"
        action={
          <React.Fragment>
            <IconButton
              size="small"
              aria-label="close"
              color="white"
              onClick={handleCloseSnackArticlePosted}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      <ArticleList />
    </div>
  );
}

export default Banner;
