import React from 'react';
import Menu from './Menu';

const listMenu = [{
    tituloMenu : "Registro",
}]

const Navegacion = () =>{
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <a className="navbar-brand" href="/#">Diseño Ambiental</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        {
                            listMenu.map(menu => <Menu key={menu.tituloMenu} tituloMenu={menu.tituloMenu} />)
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navegacion;