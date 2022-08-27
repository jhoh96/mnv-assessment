import React, { useState, useEffect, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";

export default function Article(props) {
  const [readMore, setReadMore] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [imageLink, setImageLink] = useState();
  const article = props.article;
  const setFavList = props.setFavList;
  const favList = props.favList;

  const linkName = readMore ? "View Less" : "View More";

  const handleFavList = () => {
    const index = favList.indexOf(article);
    setFavourited(!favourited);
    if (!favList.includes(article)) {
      setFavList([...favList, article]);
    } else {
      setFavList([...favList.filter((_, i) => i !== index)]);
    }
  };

  useEffect(() => {
    try {
      setImageLink(article.multimedia[0].url);
    } catch (err) {
      console.log(err); // sometimes the url comes out null
    }
  }, []);

  return (
    <div>
      <Card.Img
        style={{ width: 300, height: 300 }}
        variant="top"
        src={`https://www.nytimes.com/${imageLink}`}
      />
      <Card.Body>
        <Button variant="link" id="favourite-button" onClick={handleFavList}>
          {favourited ? <BsFillBookmarkFill /> : <BsBookmark />}
        </Button>
        <Card.Title>{article.headline.main}</Card.Title>
        <Card.Text>
          {article.abstract.split(" ").slice(0, 30).join(" ")}
          {readMore
            ? " " +
              article.abstract
                .split(" ")
                .slice(30, article.abstract.length)
                .join(" ")
            : "..."}
          <Button variant="link" onClick={() => setReadMore(!readMore)}>
            {linkName}
          </Button>
        </Card.Text>
        <Button href={article.web_url} target="_blank" variant="primary">
          Read Full Article
        </Button>
      </Card.Body>
    </div>
  );
}
