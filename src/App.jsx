import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Card from "./components/Card";
import Principal from "./components/Principal";
import Video from "./components/Video";
import React, { useState } from "react";

function App() {
  const [componenteAtivo, setComponenteAtivo] = useState(1);

  const handleTimeout = () => {
    setComponenteAtivo((prevComponenteAtivo) => prevComponenteAtivo + 1);
  };

  return (
    <>
      <main>
        <div>
          {componenteAtivo === 1 && <Card onTimeout={handleTimeout} />}
          {componenteAtivo === 2 && (
            <Video onTimeout={handleTimeout} showSkipButton={true} />
          )}
          {componenteAtivo === 3 && <Principal />}
        </div>
      </main>
    </>
  );
}

export default App;
