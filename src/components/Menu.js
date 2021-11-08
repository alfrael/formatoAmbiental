import React from 'react';

const Menu = ({ tituloMenu }) =>{
    return(
        <li className="nav-item" >
            <a className="nav-link active" aria-current="page" href={"#"+tituloMenu.toLowerCase()}>{tituloMenu}</a>
        </li>
    );
}

export default Menu;