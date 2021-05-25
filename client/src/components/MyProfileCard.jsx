import React, { useContext } from "react";
import "../styles/profileCard.css";
import MyArticles from "./MyArticles";
import PostArticle from "./PostArticle";
import { ReactReduxContext } from "react-redux";
import images from "../utils/avatarImages";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Snackbar from "@material-ui/core/Snackbar";
import defaultProfilePicture from "../images/avatar/defaultAvatar.png"


export default function MyProfileCard() {
  const [openSnackArticlePosted, setOpenSnackArticlePosted] =
    React.useState(false);

  const loggedUserData = useContext(ReactReduxContext);
  const currentUser = loggedUserData.store.getState();
  // console.log(currentUser);

  const handleCloseSnackArticlePosted = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackArticlePosted(false);
  };

  return (
    <div>
      <div id="container">
        <div className="product-details">
          <h1>{currentUser.profile.userName}</h1>
          <h4>{currentUser.profile.email}</h4>
          <h4>total posts: 4</h4>
          <div className="control">
            <PostArticle
              changeSnackStateArticlePosted={(snackStateArticlePosted) =>
                setOpenSnackArticlePosted(snackStateArticlePosted)
              }
            />
            {/* <button> */}
          </div>
        </div>
        <div className="product-image">
          <img
            src={images[`${currentUser.profile.profilePicture}`]}
            alt={defaultProfilePicture}
          />
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
      <MyArticles />
    </div>
  );
}
