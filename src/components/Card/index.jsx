import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import "./index.css";
import Logo from "../Logo";

function Card({ onTimeout }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      onTimeout();
    }, 2000);

    return () => clearTimeout(timeout);
  }, [onTimeout]);

  return (
    <>
      <AnimatePresence>
        <div className="content">
          <motion.div
            className="content-container"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
              delay: 0.5,
              type: "tween",
            }}
          >
            <Logo />
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
}

export default Card;
