const expresionTasa=/^(?:150(?:\.0{1,2})?|(?:[1-9]?\d)(?:\.\d{1,2})?)$/;
const expresionPago=/^\d+(\.\d{1,2})?$/;
const expresionConcepto=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
const expresionMonto=/^\d+(\.\d{1,2})?$/;
 
//Primer formulario
const primerFormulario=document.getElementById('formFechas');

//Tasa de interes
const tasaInput=document.getElementById('tasaInteres');
//PPNGI
const ppngiInput=document.getElementById('ultimoPpng');


primerFormulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    //Sacamos las 2 fechas
    const fecha1=document.getElementById('fechaInicio')
    const fecha2=document.getElementById('fechaFin');

    //Primero quitamos las clases para los errores en caso de que no existan errores
    document.getElementById('tasa__inputs').classList.remove('active-error')
    document.getElementById('ppngi__inputs').classList.remove('active-error')

    //Verificamos si tiene errores los datos que ingresa el cliente 
    if(!expresionTasa.test(tasaInput.value)){
        document.getElementById('tasa__inputs').classList.add('active-error');
    }

    if(!expresionPago.test(ppngiInput.value)){
        document.getElementById('ppngi__inputs').classList.add('active-error')
    }

    if(fecha1.value==='' || fecha2.value===''){
        return
    }

    document.getElementById('formFechas').classList.remove('active')
    document.getElementById('formMovimientos').classList.add('active');  
})


const segundoFormulario=document.getElementById('formMovimientos');

segundoFormulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    //Sacamos los datos de los inputs
    const inputConcepto=document.getElementById('movConcepto')
    const inputMonto=document.getElementById('movMonto')
    const inputfecha=document.getElementById('movFecha')

    //Quitando los errores
    document.getElementById('ppngi-concepto').classList.remove('active-error');
    document.getElementById('ppngi-monto').classList.remove('active-error');
    document.getElementById('ppngi-fecha').classList.remove('active-error')

    //Errores
    if(!expresionConcepto.test(inputConcepto.value)){
        document.getElementById('ppngi-concepto').classList.add('active-error');
    }
    if(!expresionMonto.test(inputMonto.value)){
        document.getElementById('ppngi-monto').classList.add('active-error');
    }
    if(inputfecha.value===""){
        document.getElementById('ppngi-fecha').classList.add('active-error')
        return
    }

    
})