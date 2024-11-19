import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import { Row, Col, Modal } from "react-bootstrap";
import Header from "../Header";
import { motion } from "framer-motion";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import fotos from '../../DATA/fotos.json';
import { register } from "swiper/element";
//import { CarouselArtDesign } from '../Carousel/CarouselArtDesign'

register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { Swiper, SwiperSlide } from "swiper/react";

export default function Projeto({ setSelectedItem }) {
  const expandedContentRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedImg, setSelectedImg] = useState("");
  const [quadroImages, setQuadroImages] = useState([]);
  const [imgIndex, setImgIndex] = useState(0 )
  const [carrosselBroto, setCarrosselBroto1] = useState([])
  const [carrosselNona, setCarrosselNona] = useState([])

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
        setCarrosselBroto1(broto)
        setCarrosselNona(nona)
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
    }, 200);
  };

  const handleCardClick = (img) => {
    setSelectedImg(img);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedImg("");
    setImgIndex(0)
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
        <Modal.Body className="BodyModalArtDesign">
          <div>
            {selectedImg === 'https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20NONA%2001.jpg?raw=true' && (
              <div className="modalArtDesign">
                <div className="divCarouselImgArtDesign">
                  <span class="material-symbols-outlined" onClick={() => setImgIndex(imgIndex <= 0 ? 3 : imgIndex - 1)}>
                    arrow_back_ios
                  </span>
                  <img src={carrosselNona[imgIndex].url} alt="" className="imgCarouselArt" />
                  <span class="material-symbols-outlined" onClick={() => setImgIndex(imgIndex >= 3 ? 0 : imgIndex + 1)}>
                    arrow_forward_ios
                  </span>
                </div>
                <div className="sideTextModal">

                  <h1>MESA DE CENTRO NONA</h1>
                  <p>
                    A mesa de centro nona, traz um contraponto bem sutil entre peso e leveza.
                    Fica bem perceptível os materiais usados, como o peso do mármore nacional branco com cinza repartidos em nove pedaços e intercalados entre polidos
                    e fosco. Criando assim, um interesse no topo da mesa e, ao mesmo tempo, sendo ele encaixado em uma caixa folheada natural de nogueira, topos em
                    meia esquadria e chanfrados, levando uma sofisticação ao objeto; à leveza se diz pelo fato da mesa não estar diretamente em contato com o piso, pois
                    ela tem uma base de 40x40x5 cm que traduz esta sensação de flutuar
                  </p>
                  <p>Consultar opções de materiais pois o produto possui outras variações de cores.</p>
                  Medidas:
                  <ul>
                    <li>L 120 x P 120 x A 30cm</li>
                    <li>L 100 x P 100 x A 30cm</li>
                    <li>L 90 x P 90 x A 30cm</li>
                  </ul>
                  <p>
                    <a href="https://3dwarehouse.sketchup.com/model/e4d43c35-6582-4092-ae77-cd2fcb666c11/Mesa-de-Centro-nona-design-brasileiro">
                      Blocos 3D disponível (link)
                    </a>
                  </p>
                </div>
              </div>

            )}

            {selectedImg === 'https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20BROTO%2001.jpg?raw=true' && (
              <div className="modalArtDesign">
                <div className="divCarouselImgArtDesign">
                  <span class="material-symbols-outlined" onClick={() => setImgIndex(imgIndex <= 0 ? 2 : imgIndex - 1)}>
                    arrow_back_ios
                  </span>
                  <img src={carrosselBroto[imgIndex].url} alt="" className="imgCarouselArt" />
                  <span class="material-symbols-outlined" onClick={() => setImgIndex(imgIndex >= 2 ? 0 : imgIndex + 1)}>
                    arrow_forward_ios
                  </span>
                </div>
                <div className="sideTextModal">
                  <h1>MESA LATERAL BROTO</h1>
                  <p>
                    Nosso país é um dos mais ricos em cultura, dividido em 5 regiões diferentes nós temos um leque
                    imenso de diversificação...
                    Apresento a mesa broto, embasada nada mais que na nossa brasilidade, nas nossas raízes, nossa culinária!
                  </p>
                  <p>
                    O topo do mobiliário é fabricado em mármore polido, no formato de um grão de feijão, acoplado nele temos um círculo de madeira
                    natural que serve de apoio para apoiar o seu drink de preferência.
                    Ela é toda sustentada por uma haste em inox cromado trazendo uma leveza para o grão.
                  </p>
                  <p>
                    Sua base de sustentação é feita toda em concreto mas com a opção de ser em madeira natural, assim temos 2
                    possibilidade, uma quente com o tom terroso da madeira trazendo um aconchego e uma fria com o
                    tom acinzentado do cimento trazendo uma sobriedade para a mesa.
                  </p>
                  <p>Consultar opções de materiais pois o produto possui outras variações de cores.</p>
                  <p>Medidas: L 25 x P 30 x A 47 cm</p>
                  <p>
                    <a href="https://3dwarehouse.sketchup.com/model/9f6b195f-3751-4976-b52a-43d6534de146/Mesa-Broto-Design-brasileiro">
                      Blocos 3D disponível (link)
                    </a>
                  </p>
                </div>
              </div>

            )}
          </div>

          <div className="divImgQuadros">
            <img loading="lazy" width="100%" src={
              selectedImg === "https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20BROTO%2001.jpg?raw=true"
                || selectedImg === "https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20NONA%2001.jpg?raw=true"
                ? ''
                : selectedImg
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
            })}
              
            
            
            
            
            
            
            
            
            
            
            
            
            <span class="material-symbols-outlined">
                    arrow_back_ios
                  </span>
                  <img src="https://github.com/LipeLutz/imagens-projeto-jhorran/blob/main/carrosel-arte-e-design/MESA%20NONA%2001.jpg?raw=true" alt="" className="imgCarouselArt" />
                  <span class="material-symbols-outlined">
                    arrow_forward_ios
                  </span>
            
            
            
            
            
            
            
            
            
            
            
            
            
            */
