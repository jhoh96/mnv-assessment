import React, { useEffect, useState } from "react";
import Article from "../components/Article";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Card from "react-bootstrap/Card";
import Offcanvas from "react-bootstrap/Offcanvas";

import "./componentStyle.css";

export default function DataList({ dataArray }) {
  const [apiData, setApiData] = useState([]);
  const [radioValue, setRadioValue] = useState("1");
  const [favList, setFavList] = useState([]);
  const [showFavList, setShowFavList] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const radios = [
    { name: "Detailed View", value: "1" },
    { name: "Simple View", value: "2" },
  ];

  // component did mount test if data received
  useEffect(() => {
    setApiData(dataArray.docs);
  }, [apiData, dataArray]);

  return (
    <div className="data-list">
      <div>
        <ButtonGroup id="toggler">
          {radios.map((radio, key) => (
            <ToggleButton
              key={key}
              id={`radio-${key}`}
              type="radio"
              value={radio.value}
              checked={radioValue === radio.value}
              onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>
      <div className="favourites-list">
        <Button
          variant="outline-info"
          onClick={() => setShowFavList(!showFavList)}
        >
          Toggle Favourites List
        </Button>
        {showFavList ? (
          <ListGroup defaultActiveKey="#link1">
            {/* <ListGroup.Item action href="#link1">
            </ListGroup.Item> */}
            {favList.map((item, key) => (
              <ListGroup.Item
                key={key}
                action
                href={item.web_url}
                target="_blank"
              >
                {item.headline.main}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <p />
        )}
      </div>
      <div className="toggle-view">
        {radioValue === "2" ? (
          <ListGroup as="ol" numbered>
            {apiData.map((item, key) => (
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
                key={key}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    {item.headline.main.split(" ").slice(0, 30).join(" ") + "."}
                  </div>
                </div>
                <Button
                  href={item.web_url}
                  target="_blank"
                  variant="outline-info"
                >
                  More Info
                </Button>
              </ListGroup.Item>
            ))}
            &nbsp;
          </ListGroup>
        ) : (
          apiData.map((item, key) => (
            <Card className="results-cards" key={key}>
              <Article
                article={item}
                favList={favList}
                setFavList={setFavList}
              />
              <>
                <Button variant="primary" onClick={handleShow} className="me-2">
                  View Images related to this article
                </Button>
                <Offcanvas placement="bottom" show={show} onHide={handleClose}>
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Images</Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    {item.multimedia.map((article, key) => (
                      <img
                        key={key}
                        alt={item.headline}
                        src={`https://www.nytimes.com/${article.url}`}
                      />
                    ))}
                  </Offcanvas.Body>
                </Offcanvas>
              </>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
