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

    let min;
    let max;

    //Variables para el calculo de los intereses

    let dias;
    let tasaReal;
    let saldoPromedio=0;
    let interesFinal;

    //Formato moneda
    const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        })

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


        //Transformamos las fechas en string para generar el mínimo y el máximo en el calendario
    min=fechaActual.toISOString().split('T')[0];
    max=fechaFin.toISOString().split('T')[0];

    document.getElementById('movFecha').min=min;
    document.getElementById('movFecha').max=max;
  

    while(fechaActual<=fechaFin){
        
        fechaArray.push({
            fecha:new Date(fechaActual),
            saldo:ppngi
        });
        
        fechaActual.setDate(fechaActual.getDate()+1)
    }
    document.querySelector('.ppngi_calculoBtn').classList.add('active');

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

    let fechaMovimiento=new Date(inputfecha+"T00:00:00");

    //Ahora recortamos la fecha mínima en el calendario apartir del nuevo movimiento
    min=fechaMovimiento.toISOString().split('T')[0];

    //Aqui agregamos la fecha mínima
    document.getElementById('movFecha').min=min;

    //Generamos el proceso para el cambio de los saldos diarios

    fechaArray.forEach((movimiento)=>{
        if(movimiento.fecha>=fechaMovimiento){
            movimiento.saldo=Math.max(0,movimiento.saldo+monto)
        }
    })


        //Se inicia proceso para renderizar cada uno de los gastos
        renderGasto(inputConcepto,monto,inputfecha)


        //Limpiar cada uno de los inputs
    document.getElementById('movFecha').value="";
    document.getElementById('movConcepto').value="";
    document.getElementById('movMonto').value="";



})


//Generar el calculo de los intereses

document.getElementById('ppngi_calculo').addEventListener('click',(e)=>{

    e.preventDefault()

/*
    let dias;
    let tasaReal;
    let saldoPromedio;
*/

    dias=fechaArray.length;
    tasaReal=parseFloat((tasa/360)/100);

    //Vamos a generar el calculo del saldo promedio diario

    fechaArray.forEach((movimiento)=>{
        saldoPromedio+=parseFloat(movimiento.saldo)
    })

    interesFinal=(saldoPromedio/dias)*(tasaReal*dias);
    let ivaInt=interesFinal*0.16;
    let totalMasIva=interesFinal+ivaInt;


    console.log(totalMasIva)


    document.getElementById('interesGenerado').innerHTML=formatoMoneda.format(interesFinal);
    document.getElementById('ivaGenerado').innerHTML=formatoMoneda.format(ivaInt);
    document.getElementById('totalNeto').innerHTML=formatoMoneda.format(totalMasIva);    

    document.getElementById('ppngi_calculo').classList.remove('active');


    // Creación de gráfica
    const labels = fechaArray.map(item => {
    const fecha = new Date(item.fecha);

    return `${String(fecha.getDate()).padStart(2, '0')}/${
        String(fecha.getMonth() + 1).padStart(2, '0')
    }/${fecha.getFullYear()}`;
});

const data = fechaArray.map(item => item.saldo);

const ctx = document.getElementById('graficaSaldo');

new Chart(ctx, {
    type: 'line',
    data: {
        labels,
        datasets: [{
            label: 'Saldo diario',
            data,
            borderColor: '#22c55e',
            backgroundColor: 'rgba(34,197,94,0.15)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 7,
            pointBackgroundColor: '#22c55e',
            pointBorderColor: '#fff',
            pointBorderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,

        interaction: {
            mode: 'index',
            intersect: false
        },

        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                    font: {
                        size: 14
                    }
                }
            },
            tooltip: {
                enabled: true,
                backgroundColor: '#111',
                titleColor: '#22c55e',
                bodyColor: '#fff',
                padding: 12,
                displayColors: false
            }
        },

        scales: {
            x: {
                ticks: {
                    color: '#bbb',
                    maxRotation: 45,
                    minRotation: 45
                },
                grid: {
                    color: 'rgba(255,255,255,0.05)'
                }
            },
            y: {
                ticks: {
                    color: '#bbb'
                },
                grid: {
                    color: 'rgba(255,255,255,0.05)'
                }
            }
        },

        elements: {
            line: {
                borderWidth: 3
            }
        }
    }
});

})