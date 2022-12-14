import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import "./demo.css";

function Demo() {
  const [show, setShow] = useState(false);
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleOpenWidget = () => {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dpqljq6qr",
        uploadPreset: "mvi5bt39",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    myWidget.open();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="/">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-info nav-search-button"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
      <div className="global-container">
        <h1 className="demo-title">Front End Demo</h1>
        <div className="widget-search-bar-container">
          <input
            type="text"
            className="input-text shadow"
            placeholder="Filter"
            accept="image/*"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            id="upload-widget"
            className="cloudinary-button shadow"
            onClick={handleOpenWidget}
          >
            Upload Image
          </button>
        </div>
        <Row xs={0} md={4} className="g-4">
          {images
            .filter((image) => {
              return search.toLowerCase() === ""
                ? image
                : image.public_id.toLowerCase().includes(search);
            })
            .map((image) => (
              <>
                <Col>
                  <div className="grid card-wrapper">
                    <Card
                      key={image.public_id}
                      style={{
                        marginTop: "30px",
                        marginLeft: "10px",
                        marginBottom: "15px",
                        boxShadow: "0 1px 2px 0",
                      }}
                    >
                      <Card.Body style={{ position: "relative" }}>
                        <Image
                          src={image.url}
                          alt=""
                          fluid
                          roundedCircle
                          style={{ position: "relative" }}
                        />
                        <hr />
                        <Card.Title style={{}}>{image.public_id}</Card.Title>

                        <Card.Text>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua
                        </Card.Text>
                        <button
                          className="read-more-button"
                          onClick={handleShow}
                        >
                          Read More
                        </button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Header closeButton>
                            <Modal.Title>Hire Me!</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            I would make a great edition to your team of
                            Engineers at your company.
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              You're Hired but in Gray
                            </Button>
                            <Button variant="info" onClick={handleClose}>
                              You're Hired
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </Card.Body>
                    </Card>
                  </div>
                </Col>
              </>
            ))}
        </Row>
      </div>
    </>
  );
}

export default Demo;
