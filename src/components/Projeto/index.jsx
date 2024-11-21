import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import { Row, Col, Modal } from "react-bootstrap";
import Header from "../Header";
import { motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import fotos from '../../DATA/fotos.json'

console.log(fotos)

export default function Projeto({ setSelectedItem }) {
  const expandedContentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [carouselImages, setCarouselImages] = useState([]);
  const [projetoImages, setProjetoImages] = useState([]);
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const carouselImgs = fotos.filter((foto) => foto.Categoria === "Carousel")
        setCarouselImages(carouselImgs)

        const projetoImgs = fotos.filter((foto) => foto.Categoria === "Projeto")
        setProjetoImages(projetoImgs)
      } catch (error) {
        console.error("Error fetching images:", error);
      }

    };
    fetchImages();
    if (expanded && expandedContentRef.current) {
      expandedContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expanded]);

  useEffect(() => {
    const loadImage = (url) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, url]);
      };
    };

    projetoImages.forEach((item) => {
      loadImage(item.url);
    });
  }, [projetoImages]);

  const handleClick = () => {
    setSelectedItem(null);
    setExpanded(false);
  };

  const handleVerMenosClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setExpanded(false);
    }, 200);
  };

  const handleCardClick = (img) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImg("");
  };

  return (
    <>
      <motion.div
        className="content projeto"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inner-content">
          <Header handleClick={handleClick} color={"white"} />
          <Row className="d-flex-justify-space-around">
            <Carousel>
              {carouselImages.map((item) => (
                <Carousel.Item key={item.id}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                  >
                    <img
                      loading="lazy"
                      alt={item.title}
                      width="100%"
                      src={item.url}
                    />
                  </motion.div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Row>
          <Row style={{ minHeight: "48px" }}>
            <Col className="d-flex-justify-space-around p-0 mt-2">
              {expanded ? (
                ""
              ) : (
                <button
                  onClick={() => setExpanded(!expanded)}
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    borderRadius: "15px",
                    padding: "5px 20px 5px 20px",
                  }}
                >
                  Ver Mais
                </button>
              )}
            </Col>
          </Row>
        </div>
      </motion.div>
      <motion.div
        ref={expandedContentRef}
        className="content1 back2"
        style={{ display: expanded ? "block" : "none" }}
        transition={{ duration: 0.5 }}
      >
        <Row className="scroll-component p-0">
          {projetoImages.map((item) => (
            <Col
              className="d-flex justify-content-center mb-3"
              md={6}
              lg={4}
              xl={3}
              xxl={3}
              key={item.id}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
              >
                <Card
                  className="cd"
                  style={{
                    backgroundImage: `url(${item.url})`,
                    opacity: loadedImages.includes(item.url) ? 1 : 0,
                    transition: "opacity 0.5s ease",
                  }}
                  onClick={() => handleCardClick(item.url)}
                >
                  <Card.Body>
                    <div>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.subtitle}</Card.Text>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
        <Row>
          <Col className="d-flex-justify-space-around p-0 mt-2">
            <button
              onClick={handleVerMenosClick}
              style={{
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "15px",
                padding: "5px 20px 5px 20px",
              }}
            >
              Ver Menos
            </button>
          </Col>
        </Row>
      </motion.div>
      <Modal show={showModal} onHide={closeModal} className="modal-content">
        <Modal.Body className="modal-projetos">
          <img src={selectedImg} alt="Imagem" />
        </Modal.Body>
      </Modal>
    </>
  );
}
