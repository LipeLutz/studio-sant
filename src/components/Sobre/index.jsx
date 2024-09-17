import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import { motion } from "framer-motion";
import Header from "../Header";
import { Row, Col } from "react-bootstrap";
import YouTube from "react-youtube";
import Card from "react-bootstrap/Card";

export default function Sobre({ setSelectedItem }) {
  const expandedContentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [perfilImages, setPerfilImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          "https://663e5f4de1913c4767977256.mockapi.io/Imagens"
        );
        // Filtrando apenas as imagens com a categoria "Principal"
        const perfilImgs = response.data.filter(
          (image) => image.Categoria === "Perfil"
        );
        console.log(perfilImgs);
        setPerfilImages(perfilImgs);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchImages();

    if (expanded && expandedContentRef.current) {
      expandedContentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [expanded]);

  const handleClick = () => {
    setSelectedItem(null);
    setExpanded(false);
  };

  const handleVerMenosClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      setExpanded(false);
    }, 300);
  };

  return (
    <>
      <motion.div
        className="content sobre"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inner-content">
          <Header handleClick={handleClick} />
          <Row className="d-flex-justify-space-between p-0 m-0">
            <Col sm={12} md={12} lg={5} className="p-0 m-0">
              <p
                style={{
                  fontSize: "20px", //tava 16px
                  margin: "0px",
                  fontWeight: "300", //tava sem
                }}
              >
                “Você é o protagonista” <br />
                <br />
                Somos um escritório jovem que prezamos em retratar a sua
                personalidade no seu projeto em um olhar contemporaneo.
                <br />
                <br /> Buscamos transformar desejos em realidade através de um
                design inovador.
                <br />
                <br /> Construímos histórias e laços juntos, tornando essa
                experiência mais que memorável...
              </p>
            </Col>
            <Col md={5} className="d-flex justify-content-end p-0 m-0">
              <YouTube
                videoId="84oBrArWcM0"
                opts={{
                  width: "550px",
                  height: "300px",
                  playerVars: {
                    mute: 0,
                    autoplay: 1,
                    controls: 1,
                    fs: 1,
                    color: "white",
                    loop: 0,
                    rel: 0,
                  },
                }}
              />
            </Col>
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
        <Row className="p-0">
          {perfilImages.map((item) => (
            <Col
              className="d-flex justify-content-center mb-3"
              md={6}
              lg={4}
              xl={3}
              xxl={3}
              key={item.id}
            >
              <Card
                className="cd"
                style={{
                  backgroundImage: `url(${item.url})`,
                }}
              >
                <Card.Body>
                  <Card.Title>{item.Nome}</Card.Title>
                  <Card.Text>{item.Titulo}</Card.Text>
                </Card.Body>
              </Card>
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
    </>
  );
}
