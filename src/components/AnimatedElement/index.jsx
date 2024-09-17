import React from "react";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

const AnimatedElement = ({ children }) => {
  const [ref, inView] = useInView({
    triggerOnce: false, // Animar apenas uma vez
    threshold: 0, // Quando 50% do elemento estiver visível
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0, // Altera a opacidade conforme o elemento entra na tela
    transform: inView ? "translateX(0)" : "translateX(20%)", // Move o elemento para a posição final
    config: { duration: 800 },
  });

  return (
    <animated.div ref={ref} style={animation}>
      {children}
    </animated.div>
  );
};

export default AnimatedElement;
