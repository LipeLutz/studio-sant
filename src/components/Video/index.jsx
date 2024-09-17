import { motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
import "./index.css";
import YouTube from "react-youtube";

function Video({ onTimeout, showSkipButton }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoEnd = () => onTimeout();
      video.addEventListener("ended", handleVideoEnd);
      return () => video.removeEventListener("ended", handleVideoEnd);
    }
  }, [onTimeout]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ width: "100vw", height: "100vh", overflow: "hidden" }}
    >
      <YouTube
        className="full"
        videoId="5Gdbf0Hjzcw"
        opts={{
          width: "470px",
          height: "264px",
          playerVars: {
            mute: 1,
            autoplay: 1,
            controls: 1,
            fs: 1,
            color: "white",
            loop: 0,
            rel: 0,
          },
        }}
        onEnd={onTimeout}
      />
      {showSkipButton && (
        <button
          onClick={onTimeout}
          style={{
            position: "absolute",
            bottom: "60px",
            right: "20px",
            padding: "5px",
            borderRadius: "5px",
            backgroundColor: "rgb(255,255,255,0.1)",
            color: "white",
          }}
        >
          Pular Vídeo
        </button>
      )}
    </motion.div>
  );
}

export default Video;
