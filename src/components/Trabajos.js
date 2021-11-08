import React from 'react'

const Trabajos = ({ trabajo, handleIsRealizado }) => {
    return (
        <div className="form-check form-switch">
            <input className="form-check-input" role="switch" type="checkbox" value="" checked={ trabajo.isRealizado } onChange={()=> handleIsRealizado(trabajo.id)} id="invalidCheck"/>
            <label className="form-check-label" for="invalidCheck">
                {trabajo.nombre}
            </label>
        </div>
    )
}

export default Trabajos;