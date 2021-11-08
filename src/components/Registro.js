import React, { useState, Fragment, useRef } from 'react'
import Concepto from './Concepto';
import Trabajos from './Trabajos';
import { jsPDF } from "jspdf";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
import SignatureCanvas from 'react-signature-canvas'

registerLocale('es', es)

const listTrabajosInicial = [
{ id: 1, nombre: "1) Poda pasto", isRealizado: false},
{ id: 2, nombre: "2) Poda Trepadoras", isRealizado: false},
{ id: 3, nombre: "3) Poda Ramas Arbol", isRealizado: false},
{ id: 4, nombre: "4) Poda Arbustos", isRealizado: false},
{ id: 5, nombre: "5) Limpieza Arbustos", isRealizado: false},
{ id: 6, nombre: "6) Enjardinar Trepadoras", isRealizado: false},
{ id: 7, nombre: "7) Fertilizacion", isRealizado: false},
{ id: 8, nombre: "8) Fumigacion", isRealizado: false},
{ id: 9, nombre: "9) Colocacion de Plantas", isRealizado: false},
{ id: 10, nombre: "10) Colocacion de Mulch", isRealizado: false},
{ id: 11, nombre: "11) Retape de Pasto", isRealizado: false},
{ id: 12, nombre: "12) Semilla", isRealizado: false},
{ id: 13, nombre: "13) Deshojado", isRealizado: false},
{ id: 14, nombre: "14) Amarrado", isRealizado: false},
{ id: 15, nombre: "15) Regado", isRealizado: false},
{ id: 16, nombre: "16) Lim/Agua Plantas Interior", isRealizado: false},
{ id: 17, nombre: "17) ¿Tiene SUF Agua el Jardin?", isRealizado: false},
{ id: 18, nombre: "18) Retiro de Basura (Cargo Extra)", isRealizado: false}
]

const Registro = () =>{
    const [informacionFormato, setInformacionFormato] = useState([]);
    const {nombreJardines, nombreCliente, nombreDireccion, ordenDia, 
        trabajosProgramados, comentariosAmbiental, comentariosCliente, 
        nombreRealizo, nombreEnterado} = informacionFormato;
    
    const [conceptos, setConceptos] = useState({});
    const [listConceptos, setListConceptos] = useState([]); 
    const {cantidad, descripcion} = conceptos;

    const [listTrabajos, setListTrabajos] = useState(listTrabajosInicial);

    const [startDate, setStartDate] = useState(new Date());
    const firmaRealizoRef = useRef({});
    const firmaEnteradoRef = useRef({});
    const [firmaRealizo, setFirmaRealizo] = useState("");
    const [firmaEnterado, setFirmaEnterado] = useState("");
    const [idConcepto, setIdConcepto] = useState(1);
    
    const handleAgregarConcepto = () =>{
        
        if(listConceptos.length >=17){
            alert("Maximo 17 conceptos");
            return;
        }

        if(cantidad === '' || cantidad === undefined){
            alert("Debes Ingresar la cantidad");
            return;
        }
        
        if(descripcion === '' || descripcion === undefined){
            alert("Debes Ingresar el concepto");
            return;
        }

        setListConceptos([...listConceptos, conceptos]);
        setConceptos({cantidad: "", descripcion: ""});
        setIdConcepto(idConcepto+1);
    }

    const handleInputChange = (e) => {
        let value = "";
        if(e.target.name === "cantidad"){
            const re = /^[0-9\b]+$/;
            if (e.target.value === '' || re.test(e.target.value)) {
                value = e.target.value;
            }else{
                return;
            }
        }else{
            value = e.target.value;
        }

        const cambiarFormulario = {
            ...conceptos,
            id: idConcepto,
            [e.target.name] : value
        };
        
        setConceptos(cambiarFormulario);
    }

    const handleInputChangeFormato = (e) => {
        
        const cambiarFormulario = {
            ...informacionFormato,
            [e.target.name] : e.target.value
        };
        
        setInformacionFormato(cambiarFormulario);
    }

    const handleEliminar = (conceptoId) => {
        const eliminarConcepto = listConceptos.filter(concepto => concepto.id !== conceptoId);
        setListConceptos(eliminarConcepto);
    }

    const handleIsRealizado = (trabajoId) => {
        const temp = listTrabajos.map((item)=> 
            item.id !== trabajoId ?
            item
            : {
                ...item,
                isRealizado: !item.isRealizado
            }
        );
        setListTrabajos(temp);
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        printDocument();
        
        setConceptos({})
        setListConceptos([]);
        setListTrabajos(listTrabajosInicial);
        setInformacionFormato([]);
        firmaEnteradoRef.current.clear(); saveFirmaEnterado(null);
        firmaRealizoRef.current.clear(); saveFirmaRealizo(null);
    }

    const obtenerDiaSemana = (numeroDia) =>{
        var nombreDia = "";
        switch(numeroDia){
            case 1:
                nombreDia = "Lunes";
            break;
            case 2:
                nombreDia = "Martes";
            break;
            case 3:
                nombreDia = "Miercoles";
            break;
            case 4:
                nombreDia = "Jueves";
            break;
            case 5:
                nombreDia = "Viernes";
            break;
            case 6:
                nombreDia = "Sabado";
            break;
            case 7:
                nombreDia = "Domingo";
            break;
        }
        return nombreDia;
    }

    const printDocument = () => {
        let date = startDate;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let fecha = day+"-"+month+"-"+year+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
        const pdf = new jsPDF();
        /*Titulo*/
        pdf.text("DISEÑO AMBIENTAL", 2, 9);
        /*Fecha*/
        pdf.setFontSize(5);
        pdf.text("DÍA", 126, 4);
        pdf.rect(123, 5, 10, 5);
        pdf.text(day+"", 126, 8);
        pdf.text("MES", 136, 4);
        pdf.rect(133, 5, 10, 5);
        pdf.text(month+"", 136, 8);
        pdf.text("AÑO", 145, 4);
        pdf.rect(143, 5, 10, 5);
        pdf.text(year+"", 145, 8);
        pdf.text("DÍA DE LA SEMANA", 130, 12);
        pdf.rect(123, 10, 30, 5);
        pdf.text(obtenerDiaSemana(date.getDay()), 130, 14);
        /*Folio*/
        pdf.setFontSize(8);
        pdf.text("FOLIO", 188, 9);
        pdf.rect(180, 5, 25, 5);
        pdf.rect(180, 10, 25, 5);
        pdf.text(fecha, 180, 14);
        /*Control mantenimiento */
        pdf.setFillColor(0);
        pdf.rect(2, 17, 203, 6, "F");
        pdf.setTextColor(256);
        pdf.text("CONTROL DE MANTENIMIENTOS", 80, 21);
        pdf.rect(2, 23, 203, 6);
        pdf.rect(2, 29, 203, 6);
        pdf.rect(2, 35, 203, 6);
        pdf.setFontSize(9);
        pdf.setTextColor(0);
        if(informacionFormato.nombreJardines !== undefined){
        pdf.text("JARDÍN: "+informacionFormato.nombreJardines+"", 3, 27);
        }else{
        pdf.text("JARDÍN: ", 3, 27);
        }
        if(informacionFormato.nombreCliente !== undefined){
        pdf.text("CLIENTE: "+informacionFormato.nombreCliente+"", 3, 33);
        }else{
        pdf.text("CLIENTE: ", 3, 33);
        }
        if(informacionFormato.nombreDireccion !== undefined){
        pdf.text("DIRECCIÓN: "+informacionFormato.nombreDireccion+"", 3, 39);
        }else{
        pdf.text("DIRECCIÓN: ", 3, 39);
        }
        /*Orden del dia */
        pdf.text("ORDEN DEL DÍA", 3, 48);
        pdf.line(10, 54, 205, 54); 
        pdf.text((informacionFormato.ordenDia === undefined) ? "" : informacionFormato.ordenDia.substring(0,118)+"", 10, 53);
        pdf.line(11, 59, 205, 59); 
        pdf.text((informacionFormato.ordenDia === undefined) ? "" : informacionFormato.ordenDia.substring(119,239)+"", 11, 58);
        /*Trabajos */
        pdf.text("TRABAJOS REALIZADOS", 2, 74);
        pdf.text("SI", 85, 74);
        pdf.text("NO", 98, 74);
        var positionTrabajos = 80;
        var positionRea = 77;
        listTrabajos.map(trabajo =>{ 
            pdf.text(trabajo.nombre, 2, positionTrabajos)
            pdf.rect(85, positionRea, 4, 4)
            pdf.rect(98, positionRea, 4, 4)
            if(trabajo.isRealizado){
            pdf.line(85, (positionTrabajos+1), 89, positionRea);
            pdf.line(89, (positionTrabajos+1), 85, positionRea);
            }else{
            pdf.line(98, (positionTrabajos+1), 102, positionRea);
            pdf.line(102, (positionTrabajos+1), 98, positionRea);
            }
            positionTrabajos += 5;
            positionRea += 5;
            }
        )
        /*Concepto */
        pdf.setFillColor(0);
        pdf.rect(123, 71, 82, 5, "F");
        pdf.setTextColor(256);
        pdf.text("CANT", 126, 75);
        pdf.text("CONCEPTO", 168, 75);
        pdf.setFillColor(0);
        pdf.setTextColor(0);
        var position = 76;
        let totalConceptos = (listConceptos.length+1);
        listConceptos.map(concepto => {
            pdf.rect(123, position, 17, 5);
            pdf.text(concepto.cantidad, 125, (position+4));
            pdf.rect(140, position, 65, 5);
            pdf.text(concepto.descripcion, 142, (position+4));
            position += 5;    
        })
        for(var x=totalConceptos; x<=17; x++){
        pdf.rect(123, position, 17, 5);
        pdf.rect(140, position, 65, 5);
        position += 5;
        }
        /*Trabajos programados */
        pdf.setTextColor(0);
        pdf.text("TRABAJOS PROGRAMADOS PARA PROXIMO MANTENIMIENTO", 2, 181);
        pdf.line(2, 187, 205, 187); 
        pdf.text((informacionFormato.trabajosProgramados === undefined) ? "" : informacionFormato.trabajosProgramados.substring(0,125)+"", 2, 186);
        pdf.line(2, 192, 205, 192); 
        pdf.text((informacionFormato.trabajosProgramados === undefined) ? "" : informacionFormato.trabajosProgramados.substring(125,250)+"", 2, 191);
        pdf.line(2, 197, 205, 197);
        pdf.text((informacionFormato.trabajosProgramados === undefined) ? "" : informacionFormato.trabajosProgramados.substring(250,375)+"", 2, 196);
        /*Comentarios diseño */
        pdf.setFillColor(0);
        pdf.rect(2, 198, 203, 6, "F");
        pdf.setTextColor(256);
        pdf.text("COMENTARIOS DISEÑO AMBIENTAL", 71, 202);
        pdf.setTextColor(0);
        pdf.line(2, 208, 205, 208); 
        pdf.text((informacionFormato.comentariosAmbiental === undefined) ? "" : informacionFormato.comentariosAmbiental.substring(0,125)+"", 2, 207);
        pdf.line(2, 213, 205, 213); 
        pdf.text((informacionFormato.comentariosAmbiental === undefined) ? "" : informacionFormato.comentariosAmbiental.substring(125,250)+"", 2, 212);
        pdf.line(2, 218, 205, 218);
        pdf.text((informacionFormato.comentariosAmbiental === undefined) ? "" : informacionFormato.comentariosAmbiental.substring(250,375)+"", 2, 217);
        /*Comentarios cliente */
        pdf.setFillColor(0);
        pdf.rect(2, 220, 203, 6, "F");
        pdf.setTextColor(256);
        pdf.text("COMENTARIOS CLIENTE", 82, 224);
        pdf.setTextColor(0);
        pdf.line(2, 230, 205, 230); 
        pdf.text((informacionFormato.comentariosCliente === undefined) ? "" : informacionFormato.comentariosCliente.substring(0,125)+"", 2, 229);
        pdf.line(2, 235, 205, 235); 
        pdf.text((informacionFormato.comentariosCliente === undefined) ? "" : informacionFormato.comentariosCliente.substring(125,250)+"", 2, 234);
        pdf.line(2, 240, 205, 240);
        pdf.text((informacionFormato.comentariosCliente === undefined) ? "" : informacionFormato.comentariosCliente.substring(250,375)+"", 2, 239);
        /*Realizo */
        pdf.setTextColor(0);
        pdf.text("REALIZÓ:", 2, 254);
        pdf.text("NOMBRE: ", 2, 260);
        pdf.line(25, 260, 92, 260);
        pdf.text((informacionFormato.nombreRealizo === undefined) ? "" : informacionFormato.nombreRealizo+"", 25, 259); 
        pdf.text("FIRMA: ", 2, 275);
        pdf.line(20, 275, 92, 275);
        if(firmaRealizo !== ""){
        pdf.addImage(firmaRealizo,'PNG', 35, 264, 15, 10, 'firma encargado');
        }
        /*Enterado */
        pdf.text("ENTERADO: CLIENTE O ENCARGADO", 109, 254);
        pdf.text("NOMBRE: ", 109, 260);
        pdf.line(125, 260, 200, 260);  
        pdf.text((informacionFormato.nombreEnterado === undefined) ? "" : informacionFormato.nombreEnterado+"", 125, 259); 
        pdf.text("FIRMA: ", 109, 275);
        pdf.line(125, 275, 200, 275);
        if(firmaEnterado !== ""){
        pdf.addImage(firmaEnterado,'PNG', 135, 264, 15, 10, 'firma enterado');
        }
        /*Guardar PDF */
        pdf.save("Formato"+fecha+".pdf");
        window.location.reload(true);
    }    

    const saveFirmaRealizo = (signature) => {
        setFirmaRealizo(signature);
    }

    const saveFirmaEnterado = (signature) => {
        setFirmaEnterado(signature);
    }

    return(
        <section id="registro">
            <h1>Registro de informacion</h1>
            <div className="card">
            <div className="card-body">
                    <form className="row g-3 needs-validation" onSubmit={handleSubmit}>
                        <div className="col-12">
                            <label htmlFor="jardin" className="form-label">Fecha Registro</label>
                            <DatePicker locale="es" className="form-control" dateFormat="dd-MM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="nombreJardines" className="form-label">Jardin</label>
                            <input type="text" className="form-control" value={nombreJardines} name="nombreJardines" id="nombreJardines" placeholder="Nombre de Jardín" onChange={handleInputChangeFormato} />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="nombreCliente" className="form-label">Cliente</label>
                            <input type="text" className="form-control" id="nombreCliente" value={nombreCliente} name="nombreCliente" onChange={handleInputChangeFormato} placeholder="Nombre del Cliente" />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="nombreDireccion" className="form-label">Direccion</label>
                            <input type="text" className="form-control" id="nombreDireccion" value={nombreDireccion} name="nombreDireccion" onChange={handleInputChangeFormato} placeholder="Nombre de la direccion" />
                        </div>
                        <div className="col-md-12">
                            <label htmlFor="ordenDia" className="form-label">Orden del dia</label>
                            <textarea type="text" className="form-control" value={ordenDia} name="ordenDia" onChange={handleInputChangeFormato} id="ordenDia" />
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <label className="form-label">Trabajos Realizados</label>
                            {
                                listTrabajos.map(trabajo => <Trabajos key={trabajo.id} trabajo={ trabajo } handleIsRealizado={handleIsRealizado}/>)
                            }
                        </div>
                        <div className="col-md-12 col-sm-12">
                            <div className="row">
                                <div className="col-4">
                                    <label htmlFor="cantidad" className="form-label">Cantidad</label>
                                    <input type="text" value={cantidad} name="cantidad" className="form-control" id="cantidad" onChange={handleInputChange} />
                                </div>
                                <div className="col-7">
                                    <label htmlFor="descripcion" className="form-label">Concepto</label>
                                    <div className="input-group">
                                        <input type="text" value={descripcion} name="descripcion" className="form-control" id="descripcion" onChange={handleInputChange} />
                                        <button className="btn btn-success" type="button" onClick={handleAgregarConcepto} id="msgErrorBtn">Agregar</button>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Cantidad</th>
                                            <th scope="col">Concepto</th>
                                            <th scope="col">Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listConceptos.map(concepto => <Concepto key={concepto.id} tipoConcepto={concepto} conceptoElimina={handleEliminar}/>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <label htmlFor="proximoMantenimientos" className="form-label">Trabajos programados para proximo mantenimiento</label>
                            <textarea type="text" className="form-control" value={trabajosProgramados} name="trabajosProgramados" onChange={handleInputChangeFormato} id="proximoMantenimientos" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="comentariosAmbiental" className="form-label">Comentarios diseño Ambiental</label>
                            <textarea type="text" className="form-control" value={comentariosAmbiental} name="comentariosAmbiental" onChange={handleInputChangeFormato} id="comentariosAmbiental" />
                        </div>
                        <div className="col-12">
                            <label htmlFor="comentariosCliente" className="form-label">Comentarios Cliente</label>
                            <textarea type="text" className="form-control" value={comentariosCliente} name="comentariosCliente" onChange={handleInputChangeFormato} id="comentariosCliente" />
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="nombreRealizo" className="form-label">Nombre Realizo</label>
                            <input type="text" className="form-control" id="nombreRealizo" placeholder="Nombre de quien Realizo" value={nombreRealizo} name="nombreRealizo" onChange={handleInputChangeFormato} />
                            <label htmlFor="firmaRealizo" className="form-label">Firma Realizo</label>
                            <SignatureCanvas penColor='black' ref={firmaRealizoRef} 
                                canvasProps={{width: 500, height: 200,style:{"border":"1px solid #000000"}, className: 'sigCanvas form-control'}} 
                                minWidth={2} maxWidth={3} 
                                onEnd={()=>(
                                    saveFirmaRealizo(firmaRealizoRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                )}
                            />
                            <button className="btn btn-success col-12" type="button" onClick={() => {firmaRealizoRef.current.clear(); saveFirmaRealizo(null);}}>Limpiar Firma</button>
                        </div>
                        <div className="col-sm-12 col-md-6">
                            <label htmlFor="nombreEnterado" className="form-label">Nombre Enterado</label>
                            <input type="text" className="form-control" id="nombreEnterado" placeholder="Nombre del Enterado" value={nombreEnterado} name="nombreEnterado" onChange={handleInputChangeFormato} />
                            <label htmlFor="firmaEnterado" className="form-label">Firma Enterado</label>
                            <SignatureCanvas ref={firmaEnteradoRef} 
                                penColor='black' 
                                canvasProps={{width: 500, height: 200,style:{"border":"1px solid #000000"}, className: 'sigCanvas form-control'}} 
                                minWidth={2} maxWidth={3} 
                                onEnd={()=>(
                                    saveFirmaEnterado(firmaEnteradoRef.current.getTrimmedCanvas().toDataURL("image/png"))
                                )}
                            />
                            <button className="btn btn-success col-12" type="button" onClick={() => {firmaEnteradoRef.current.clear(); saveFirmaEnterado(null);}}>Limpiar Firma</button>
                        </div>
                        <div className="col-12">
                            <button className="btn btn-success col-12" type="submit">Generar Formato</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Registro;