import { motion, AnimatePresence } from "framer-motion";
import ImgProjeto from './asset/PROJETO.jpg'
import "./index.css";
function Item({ title, id, isSelected, onClick, img }) {

  return (
    <motion.div
      className="item"
      onClick={() => onClick(id)}
      style={{ backgroundImage: `url(${img})` }}
    >
      <h1 className="text">{title}</h1>
    </motion.div>
  );
}

export default Item;
