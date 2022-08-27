import React, { useState } from "react";
import Axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DataList from "./DataList";

// css imports
import "bootstrap/dist/css/bootstrap.min.css";
import "./componentStyle.css";

const API_KEY = "wTwRh7Blb0nUPWPWvHQCWVupJSoQBqeu";

export default function InputForm() {
  const [apiData, setApiData] = useState([]); // Store API return JSON in array state
  const [textInput, setTextInput] = useState(""); // User Keyword Input state
  const [dataLoaded, setDataLoaded] = useState(false);
  const [pagination, setPagination] = useState("0");

  const handleClick = () => {
    try {
      Axios.get(
        `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${textInput}&page=${pagination}&api-key=${API_KEY}`
      )
        .then((response) => {
          const data = [response.data.response];
          setApiData(...data);
          setDataLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  };

  const handlePagination = () => {
    alert("죄송합니다. Pagination은 Could not implement :(" + "\n");
  };

  return (
    <div>
      {dataLoaded ? (
        <div className='data-list'>
          <DataList dataArray={apiData} />
          <Button onClick={handlePagination}>Load More Articles</Button>
        </div>
      ) : (
        <div className="input-form">
          <InputGroup>
            <Form.Control
              placeholder="Enter Keyword here"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <Button variant="outline-secondary" onClick={handleClick}>
              Search
            </Button>
          </InputGroup>
        </div>
      )}
    </div>
  );
}
