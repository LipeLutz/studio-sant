import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./index.css";
import { Row, Col, Modal } from "react-bootstrap";
import Header from "../Header";
import { motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import fotos from '../../DATA/fotos.json';
//import { CarouselArtDesign } from '../Carousel/CarouselArtDesign'

export default function Projeto({ setSelectedItem }) {
  const expandedContentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [quadroImages, setQuadroImages] = useState([]);
  const [carrosselBroto, setCarrosselBroto] = useState([])
  const [carrosselNona, setCarrosselNona] = useState([])
  const [carrosselQuadro1, setCarrosselQuadro1] = useState([])
  const [carrosselQuadro2, setCarrosselQuadro2] = useState([])
  const [selectedId, setSelectedId] = useState(null); // Estado para armazenar o item clicado

  const [loadedImages, setLoadedImages] = useState([])

  console.log(selectedImg)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = fotos.filter((foto) => foto.Categoria === "capa")
        const broto = fotos.filter(foto => foto.Categoria === 'carrossel-broto')
        const nona = fotos.filter(foto => foto.Categoria === 'carrossel-nona')
        const quadro1 = fotos.filter(foto => foto.Categoria === 'capa-quadro1')
        const quadro2 = fotos.filter(foto => foto.Categoria === 'capa-quadro2')
        /*
        const response = await axios.get(
          "https://663e5f4de1913c4767977256.mockapi.io/Quadros"
        );
        const carouselImgs = response.data;
        */
        setQuadroImages(images);
        setCarrosselBroto(broto)
        setCarrosselNona(nona)
        setCarrosselQuadro1(quadro1)
        setCarrosselQuadro2(quadro2)
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

  const handleClick2 = (id) => {
    setSelectedId(id); // Atualiza o id do item clicado
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
        className="content quadro"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <div className="inner-content">
          <Header handleClick={handleClick} color={"white"} />

          <div className="div-img-jhorran">
            <img src="https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/principal-webp/jpeg-optimizer_ARTE-E-GALERIA_baixa.webp?raw=true" alt="" />
          </div>

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
          {quadroImages.map((item) => (
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
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Body>
          <Carousel className="carousel-imgs">
            {quadroImages.map((images) => {
              if (selectedImg === 'https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20BROTO%2001.jpg?raw=true') {
                return (
                  carrosselBroto.map((broto) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}

                      >
                        <img
                          loading="lazy"
                          className="imgCarousel"
                          src={broto.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }

              if (selectedImg === 'https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20NONA%2001.jpg?raw=true') {
                return (
                  carrosselNona.map((nona) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        <img
                          loading="lazy"
                          alt={nona.title}
                          src={nona.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }
            })}
          </Carousel>
          <div>
            <img loading="lazy" width="100%" src={
              selectedImg === "https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20BROTO%2001.jpg?raw=true" 
              || selectedImg === "https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20NONA%2001.jpg?raw=true" 
              ? ''  // Não exibe a imagem se for Mesa Broto ou Mesa Nona
              : selectedImg  // Exibe qualquer outra imagem
            } />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

/*

{quadroImages.map((images) => {
              if (images.id === '72') {
                return (
                  carrosselBroto.map((broto) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        
                        <img
                          loading="lazy"
                          alt={broto.title}
                          width="100%"
                          src={broto.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }

              if (images.id === '81') {
                return (
                  carrosselNona.map((nona) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        {console.log(nona)}
                        <img
                          loading="lazy"
                          alt={nona.title}
                          src={nona.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }

              if (images.id === '82') {
                return (
                  carrosselQuadro1.map((quadro1) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        <img
                          loading="lazy"
                          alt={quadro1.title}
                          width="100%"
                          src={quadro1.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }

              if (images.Nome === 'capa-quadro2') {
                return (
                  carrosselQuadro2.map((quadro2) => (
                    <Carousel.Item>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 2 }}
                      >
                        <img
                          loading="lazy"
                          alt={quadro2.title}
                          width="100%"
                          src={quadro2.url}
                        />
                      </motion.div>
                    </Carousel.Item>
                  ))
                )
              }
            })}*/
