import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import Item from "../../components/Item";
import SobreComponent from "../../components/Sobre";
import ContatoComponent from "../../components/Contato";
import ProjetoComponent from "../../components/Projeto";
import GaleriaComponent from "../../components/Art";
import fotos from '../../DATA/fotos.json'

function Principal() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [principalImages, setPrincipalImages] = useState([]);

  //teste

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const principalImgs = fotos.filter((
          (foto) => foto.Categoria === 'Principal'
        )) 
        setPrincipalImages(principalImgs);
        /*
        const response = await axios.get(
          "https://663e5f4de1913c4767977256.mockapi.io/Imagens"
        );
        // Filtrando apenas as imagens com a categoria "Principal"
        const principalImgs = response.data.filter(
          (image) => image.Categoria === "Principal"
        );
        */
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  const handleItemClick = (itemId) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
    console.log(itemId);
  };

  return (
    <div className="container">
      <div>
        {principalImages.map((image) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Item
              key={image.id}
              id={image.id}
              img={image.url}
              title={image.Titulo}
              isSelected={selectedItem === image.id}
              onClick={handleItemClick}
            />
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {selectedItem && (
          <>
            {selectedItem === "1" && (
              <ProjetoComponent setSelectedItem={setSelectedItem} />
            )}
            {selectedItem === "2" && (
              <SobreComponent setSelectedItem={setSelectedItem} />
            )}
            {selectedItem === "3" && (
              <GaleriaComponent setSelectedItem={setSelectedItem} />
            )}
            {selectedItem === "4" && (
              <ContatoComponent setSelectedItem={setSelectedItem} />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Principal;
