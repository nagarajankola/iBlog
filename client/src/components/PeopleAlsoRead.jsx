import React from "react";
import "../styles/utils.css";
import "../styles/style.css";
import "../styles/mobile.css";
import { Link } from "react-router-dom";
import images from "../utils/postImages";
import avatarImages from "../utils/avatarImages";

export default function PeopleAlsoRead({ allArticles }) {
  const randomArticles = [];
  const randomNumbers = () => {
    for (let index = 0; index < 3; index++) {
      const rand = allArticles[Math.floor(Math.random() * allArticles.length)];
      randomArticles.push(rand);
    }
  };
  randomNumbers();
  // console.log(randomArticles);

  return (
    <>
      <div className="home-articles max-width-1 m-auto font2">
        <h2>People Also Read</h2>
        {randomArticles.map((article) => {
          return (
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
                  allArticles: allArticles,
                },
              }}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="home-article">
                <div className="home-article-img">
                  {/* <img src={postImage} alt="article" /> */}
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

                  <span>07 January | {article.readTime} min read</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
