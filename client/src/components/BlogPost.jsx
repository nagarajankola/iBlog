import React, { useLayoutEffect } from "react";
import { useLocation } from "react-router";
import "../styles/blogPost.css";
import PeopleAlsoRead from "./PeopleAlsoRead";
import images from "../utils/bannerImages";
import avatarImages from "../utils/avatarImages";

export default function BlogPost() {
  // getting values using location
  const location = useLocation();
  const {
    articleImage,
    articleTitle,
    articleBody,
    readTime,
    userName,
    profilePicture,
    allArticles,
  } = location.state;
  // console.log(profilePicture);

  // Scroll to top if path changes
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    // console.log(location.pathname);
  });

  return (
    <div>
      <div className="post-img">
        <img src={images[`${articleImage}`]} alt="" />
      </div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <div className="m-auto blog-post-content max-width-2 m-auto my-2">
        <h1 className="font1">{articleTitle}</h1>
        <div className="blogpost-meta">
          <div className="author-info" style={{ display: "flex" }}>
            <div>
              <img
                src={avatarImages[`${profilePicture}`]}
                alt="Avatar"
                style={{ borderRadius: "50%", width: "50px" }}
              />
            </div>
            <div>
              <div>
                <b>{userName}</b>
              </div>
              <div>04 January. {readTime} min read</div>
            </div>
          </div>
        </div>
        <p className="font1">{articleBody}</p>
      </div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
      <PeopleAlsoRead allArticles={allArticles} />
    </div>
  );
}
