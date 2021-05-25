import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { ReactReduxContext } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import "../styles/postArticleIPfields.css";
import Snackbar from "@material-ui/core/Snackbar";
import "../styles/dropDown.css";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    color: "black",
    backgroundColor: "#FFF8F2",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({
  changeSnackState,
  changeSnackStateArticlePosted,
}) {
  const [openSnackFields, setOpenSnackFields] = React.useState(false);
  const location = useLocation();

  const handleCloseSnackFields = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackFields(false);
  };

  const loggedUserData = useContext(ReactReduxContext);
  const currentUser = loggedUserData.store.getState();
  // console.log(currentUser);
  const history = useHistory();

  //for article
  const [articleData, setArticleData] = useState({
    articleTitle: "",
    articleBody: "",
    articleImage: "",
  });

  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setArticleData({ ...articleData, [name]: value });
  };

  function countWords(str) {
    str = str.replace(/(^\s*)|(\s*$)/gi, "");
    str = str.replace(/[ ]{2,}/gi, " ");
    str = str.replace(/\n /, "\n");
    return str.split(" ").length;
  }

  //  const minReadMin = (totalCount/238);

  const PostArticle = async (e) => {
    e.preventDefault();
    const { articleTitle, articleBody, articleImage } = articleData;

    const uploadedBy = currentUser.profile.id;
    const readTime = Math.round((countWords(articleBody) / 190 / 10) * 10) + 1;
    const res = await fetch("/postArticle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        articleTitle,
        articleBody,
        articleImage,
        uploadedBy,
        readTime,
      }),
    });

    const data = await res.json();

    if (res.status === 422 || !data) {
      setOpenSnackFields(true);
      console.log(data.error);
    } else {
      // window.alert("article posted!");
      console.log("article posted!");
      // console.log(location.pathname);
      // setOpenSnack(true);
      handleClose();
      changeSnackStateArticlePosted(true);
      setArticleData({
        articleTitle: "",
        articleBody: "",
        articleImage: "",
      });
      if(location.pathname === '/home'){
        history.push('/myprofile')
      }else{

        history.push("/home");
      }
    }
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    if (currentUser.isLoggedIn === false) {
      // window.alert("pleaseLogin")
      changeSnackState(true);
      // setOpenSnackLogin(true);
      // history.push('/login');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="#FFF8F2" onClick={handleClickOpen}>
        Post an article...
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} style={{ marginBottom: "20px" }}>
          {/* // fill all the fields snackbar */}
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            // color="#FFF8F2"
            backgroundColor="#FFF8F2"
            open={openSnackFields}
            autoHideDuration={2000}
            onClose={handleCloseSnackFields}
            message="Fields can't be empty"
            action={
              <React.Fragment>
                <IconButton
                  size="small"
                  aria-label="close"
                  color="white"
                  onClick={handleCloseSnackFields}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </React.Fragment>
            }
          />
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Post an article
            </Typography>
            <Button autoFocus color="inherit" onClick={PostArticle}>
              Post
            </Button>
          </Toolbar>
        </AppBar>
        {/* <TextField /> */}
        <form>
          <h3>Title</h3>
          <input
            type="text"
            placeholder="title"
            id="title"
            autoComplete="off"
            required="true"
            name="articleTitle"
            value={articleData.articleTitle}
            onChange={handleInputs}
          ></input>
          <h3>Choose Your Topic</h3>
          <div className="ip_container">
            <div className="ip_select-box">
              <select
                name="articleImage"
                onChange={handleInputs}
                value={articleData.articleImage}
                defaultValue="default"
                placeholder="Select your niche"
              >
                <option value="defaultImage">choose</option>
                <option value="fitness">Health and Fitness</option>
                <option value="finance">Personal Finance</option>
                <option value="fashion">Fashion / Lifestyle</option>
                <option value="tech">Technology / Gaming</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="diy">DIY / Craft</option>
                <option value="pet">Pets / Animals</option>
                <option value="politics">Politics</option>
                <option value="education">Education</option>
                <option value="defaultImage">Other</option>
              </select>
            </div>
          </div>
          <h3>Content area</h3>
          <textarea
            rows="9"
            placeholder="start writing here..."
            id="content"
            autoComplete="off"
            required="true"
            name="articleBody"
            value={articleData.articleBody}
            onChange={handleInputs}
          ></textarea>
        </form>
      </Dialog>
    </div>
  );
}
