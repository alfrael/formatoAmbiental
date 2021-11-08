import React from 'react'

const Concepto = ({ tipoConcepto, conceptoElimina }) => {
    return (
        <tr>
            <th scope="row">{tipoConcepto.id}</th>
            <td>{tipoConcepto.cantidad}</td>
            <td>{tipoConcepto.descripcion}</td>
            <td><button type="button" className="btn btn-danger" onClick={()=> conceptoElimina(tipoConcepto.id)}>Eliminar</button></td>
        </tr>
    );
}

export default Concepto;