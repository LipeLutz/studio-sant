import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap'; // Certifique-se de importar o Carousel corretamente
import { motion } from 'framer-motion';

const CarouselArtDesign = ({ quadroImages }) => {
  const [selectedId, setSelectedId] = useState(null); // Estado para armazenar o item clicado

  const handleClick = (id) => {
    setSelectedId(id); // Atualiza o id do item clicado
  };

  return (
    <div>
      {/* Renderiza os ícones e define o clique */}
      {quadroImages.map((images) => (
        <button key={images.id} onClick={() => handleClick(images.id)}>
          {images.Nome}
        </button>
      ))}

      <Carousel>
        {quadroImages.map((images) => {
          let carrosselData = [];

          if (images.id !== selectedId) {
            return null; // Se não for o item selecionado, não renderiza
          }

          // Determina qual carrossel usar
          if (images.id === '72') {
            carrosselData = carrosselBroto;
          } else if (images.id === '81') {
            carrosselData = carrosselNona;
          } else if (images.id === '82') {
            carrosselData = carrosselQuadro1;
          } else if (images.Nome === 'capa-quadro2') {
            carrosselData = carrosselQuadro2;
          }

          // Renderiza o carrossel correspondente
          return carrosselData.map((item, index) => (
            <Carousel.Item key={index}>
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
          ));
        })}
      </Carousel>
    </div>
  );
};

export default CarouselArtDesign;
