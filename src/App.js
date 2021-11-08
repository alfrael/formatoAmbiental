import React from "react";
import Registro from "./components/Registro";
import Navegacion from "./components/Navegacion";

function App() {
  return (
    <>
    <Navegacion/>
    <div className="container">
      <Registro/>
    </div>
    </>
  );
}

export default App;