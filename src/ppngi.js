import renderGasto from "./renderGasto";

//Expresiones regulares
const expresionTasa=/^(?:150(?:\.0{1,2})?|(?:[1-9]?\d)(?:\.\d{1,2})?)$/;
const expresionPago=/^\d+(\.\d{1,2})?$/;
const expresionConcepto=/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,50}$/;
const expresionMonto = /^-?\d+(\.\d{1,2})?$/; 
//Primer formulario
const primerFormulario=document.getElementById('formFechas');

//Tasa de interes
const tasaInput=document.getElementById('tasaInteres');
//PPNGI
const ppngiInput=document.getElementById('ultimoPpng');

//Variables globales
  let fechaArray=[];

    let fechaInicio;
    let fechaFin;
    let tasa;
    let ppngi;

//Evento del primer formulario
primerFormulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    //Sacamos las 2 fechas
    const fecha1=document.getElementById('fechaInicio')
    const fecha2=document.getElementById('fechaFin');

    //Primero quitamos las clases para los errores en caso de que no existan errores
    document.getElementById('tasa__inputs').classList.remove('active-error')
    document.getElementById('ppngi__inputs').classList.remove('active-error')
    document.getElementById('fecha_inicio').classList.remove('active-error')
    document.getElementById('fecha_fin').classList.remove('active-error')

    //Verificamos si tiene errores los datos que ingresa el cliente 
    if(!expresionTasa.test(tasaInput.value)){
        document.getElementById('tasa__inputs').classList.add('active-error');
    }

    if(!expresionPago.test(ppngiInput.value)){
        document.getElementById('ppngi__inputs').classList.add('active-error')
    }

    if(fecha1.value==='' || fecha2.value===''){

        document.getElementById('fecha_inicio').classList.add('active-error')
        document.getElementById('fecha_fin').classList.add('active-error')
        return
    }

    document.getElementById('formFechas').classList.remove('active')
    document.getElementById('formMovimientos').classList.add('active');  


    fechaInicio= new Date(fecha1.value+"T00:00:00");
    fechaFin=new Date(fecha2.value+"T00:00:00");
    tasa=parseFloat(tasaInput.value);
    ppngi= parseFloat(ppngiInput.value);

    let fechaActual=new Date(fechaInicio);
    fechaActual.setDate(fechaActual.getDate()+1);

  

    while(fechaActual<=fechaFin){
        
        fechaArray.push({
            fecha:new Date(fechaActual),
            saldo:ppngi
        });
        
        fechaActual.setDate(fechaActual.getDate()+1)
    }
})



//Evento del segundo formulario
const segundoFormulario=document.getElementById('formMovimientos');

segundoFormulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    //Sacamos los datos de los inputs
    const inputConcepto=document.getElementById('movConcepto').value;
    const inputMonto=document.getElementById('movMonto').value;
    const inputfecha=document.getElementById('movFecha').value;

    //Quitando los errores
    document.getElementById('ppngi-concepto').classList.remove('active-error');
    document.getElementById('ppngi-monto').classList.remove('active-error');
    document.getElementById('ppngi-fecha').classList.remove('active-error')

    //Errores
    if(!expresionConcepto.test(inputConcepto)){
        document.getElementById('ppngi-concepto').classList.add('active-error');
    }
    if(!expresionMonto.test(inputMonto)){
        document.getElementById('ppngi-monto').classList.add('active-error');
    }
    if(inputfecha===""){
        document.getElementById('ppngi-fecha').classList.add('active-error')
        return
    }
    const monto=parseFloat(inputMonto);

        //Se inicia proceso para renderizar cada uno de los gastos
        renderGasto(inputConcepto,monto,inputfecha)

    document.getElementById('movFecha').value="";
    document.getElementById('movConcepto').value="";
    document.getElementById('movMonto').value="";
})