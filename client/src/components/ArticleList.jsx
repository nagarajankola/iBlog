import React from "react";
import "../styles/utils.css";
import "../styles/style.css";
import "../styles/mobile.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import images from "../utils/postImages";
import avatarImages from "../utils/avatarImages";
import loading from "../images/loadingg.svg";


export default function ArticleList() {
  // list of all articles state 
  const [articleList, setArticleList] = useState([]);

  useEffect(async () => {
    // console.log(articleList);
    const res = await fetch("https://iblog-nagraj.herokuapp.com/allarticles 200!", {
      method: "GET",
      
    })
      .then((response) => response.json())
      .then((data) => {
        setArticleList(data.allArticles);
      });
    // console.log(articleList.length);
  },[]);

  return (
    (articleList.length === 0)?
    <div className="home-articles max-width-1 m-auto font2" style={{alignContent:"center"}}>
    <h2>Featured Articles</h2>
    <div className="max-width-1 m-auto font2 nothingToShow">
        <img src={loading} ></img>
      </div>
    </div>
    :
    <div>
      <div className="home-articles max-width-1 m-auto font2">
        <h2>Featured Articles</h2>

        {articleList.map((article) => {
          return (
            <Link
              to={{pathname : "/blogpost", state:{
                articleImage :article.articleImage,
                articleTitle :article.articleTitle,
                articleBody : article.articleBody,
                readTime :article.readTime,
                userName :article.uploadedBy.userName,
                profilePicture :article.uploadedBy.profilePicture,
                allArticles: articleList,
              }}} 
              style={{ textDecoration: "none", color: "black" }}
              
            >
              <div className="home-article">
                <div className="home-article-img">
                  <img src={images[`${article.articleImage}`]} alt="article" />
                </div>
                <div className="home-article-content font1">
                  <a>
                    <h3>{article.articleTitle}</h3>
                  </a>
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
                  <span>{article.uploadedTime.substring(0,10)} | {article.readTime} min read</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
