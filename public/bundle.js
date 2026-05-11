'use strict';

//Cambio de css a los enlaces

const contenedorEnlaces=document.querySelector('.enlaces');


contenedorEnlaces.addEventListener('click',(e)=>{

    e.preventDefault();

    //A qué enlace le estoy dando click
    const enlaceClickeado=e.target;

    //Enlace con su Id
    const idEnlace=enlaceClickeado.id;

    const contenedorForm=document.querySelectorAll('.contenedor_form');
    

    if([...enlaceClickeado.classList].includes('active')){
        //Verifico si tiene la clase, si la tiene, no hago nada
        return
    }
    else {

        //Hago un bucle de todos los enlaces, buscando cuál tiene la clase active para removerla
        const enlaces=document.querySelectorAll('.enlace');

        //Hago un bucle de todos los contenedores
        contenedorForm.forEach((contenedor)=>{

            //Le quito la clase "active" a cada uno de los contenedores
            contenedor.classList.remove('active');

            //Cada enlace tiene su id ligada con el mismo nombre de la clase del contenedor, si son iguales tanto su id con su clase le pone la clase "active"
            if([...contenedor.classList].includes(idEnlace)){
                contenedor.classList.add('active');
            }
        });

        enlaces.forEach((enlace)=>{
            if([...enlace.classList].includes('active')){
                enlace.classList.remove('active');
            }
        });
        


        //Al enlace que le doy click, le agrego la clase active
        enlaceClickeado.classList.add('active');
    }
});

const expresionMonto$3=/^\d+(\.\d{1,2})?$/;
const expresionInteres$2=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo$1= /^(?:[1-9]|1\d|20)$/;

//El formulario
const formulario$2=document.querySelector('.simples1__formulario');


formulario$2.addEventListener('submit',(e)=>{

    
    e.preventDefault();

    //Los valores del formulario
    const inputMonto=document.getElementById('simples_input-monto');
    const inputInteres=document.getElementById('simples_input-tasa');
    const inputPeriodo=document.getElementById('simples_input-periodo');

    //Mensajes de error

        document.querySelector('.simples__error1').classList.remove('active');
        document.querySelector('.simples__error2').classList.remove('active');
        document.querySelector('.simples__error3').classList.remove('active');


        if(!expresionMonto$3.test(inputMonto.value)){

            document.querySelector('.simples__error1').classList.add('active');
        }
        if(!expresionInteres$2.test(inputInteres.value)){
            
            document.querySelector('.simples__error2').classList.add('active');
        }
        if(!expresionPeriodo$1.test(inputPeriodo.value)){
            
            document.querySelector('.simples__error3').classList.add('active');
            return
        }


    const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        });

        const array=[];
        const monto=parseFloat(inputMonto.value);
        const interes=parseFloat(inputInteres.value);
        const periodo=parseFloat(inputPeriodo.value);
        
        document.querySelector('.simples__2--tabla__datos').innerHTML="";

        for (let i= 0; i< periodo; i++) {
            array.push(i+1);            
        }

        
        const graficaAnios=[];
        const graficaMontos=[];

        array.map((_,i)=>{
        
            const anios=i+1;
            const interesSimple=interes/100;
            const interesDato=interesSimple*monto*(i+1);

            graficaAnios.push(anios);
            graficaMontos.push(monto+(interesDato));



            const plantilla=`
        <div class="simples__2--tabla__datos--contenedor">
            <p>${anios}</p>
            <p>${formatoMoneda.format(interesSimple*monto)}</p>
            <p>${formatoMoneda.format(interesDato)}</p>
            <p>${formatoMoneda.format(monto+(interesDato))}</p>
        </div>  
        `;

        document.querySelector('.simples__2--tabla__datos').innerHTML+=plantilla;
        });


        //Datos de la gráfica

        const ctx = document.getElementById('miGrafica');
            
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: graficaAnios,
            datasets: [
            {
                label: 'Monto total',
                data: graficaMontos,
                borderColor: '#2d8cff',
                tension: 0.4
            }
            ]
        },
        options: {
            responsive: true
        }
        });


        });

const expresionMonto$2=/^\d+(\.\d{1,2})?$/;
const expresionInteres$1=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo= /^(?:[1-9]|1\d|10)$/;


const formulario$1=document.querySelector('.compuestos__formulario');

formulario$1.addEventListener('submit',(e)=>{

    e.preventDefault();

    const inputMonto=document.getElementById('compuestos_input-monto');
    const inputInteres=document.getElementById('compuestos_input-tasa');
    const inputPeriodo=document.getElementById('compuestos_input-periodo');
    const inputFrecuencia=document.getElementById('frecuencia');

    
    //Mensajes de error
        document.querySelector('.compuestos__error1').classList.remove('active');
        document.querySelector('.compuestos__error2').classList.remove('active');
        document.querySelector('.compuestos__error3').classList.remove('active');

        if(!expresionMonto$2.test(inputMonto.value)){

            document.querySelector('.compuestos__error1').classList.add('active');
        }

        if(!expresionInteres$1.test(inputInteres.value)){
            
            document.querySelector('.compuestos__error2').classList.add('active');
        }

        if(!expresionPeriodo.test(inputPeriodo.value)){
            
            document.querySelector('.compuestos__error3').classList.add('active');
            return
        }

         const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        });


        //Limpiamos el contenido de las tablas
        document.querySelector('.compuestos__2--tabla__datos').innerHTML="";

           let montoInicial=parseFloat(inputMonto.value);
           let interes=parseFloat(inputInteres.value);
           let periodo=parseFloat(inputPeriodo.value);
           let frecuencia=parseFloat(inputFrecuencia.value);

           
           //Vamos a sacar los datos para la gráfica
            const capitalInicialGrafica=montoInicial;
            const InteresGrafica=interes/100;

            //Este es el total ganado
            const totalGanadoGrafica=capitalInicialGrafica*Math.pow((1+(InteresGrafica/frecuencia)),(frecuencia*periodo));
            //Para los intereses ganados hacemos una resta
            const interesGanadoGanadoGrafica=totalGanadoGrafica-capitalInicialGrafica;

            


           //Este es el número de veces que va a iterar el array
           let numeroDePeriodos=periodo*frecuencia;

           //Creo un array con el número de datos que necesito iterar para un map
            const array=[];

           for (let i= 0;  i<numeroDePeriodos; i++) {
            array.push(i+1);            
           }

           let interesValorReal=(interes/frecuencia)/100;

           document.querySelector('.compuestos__2--periodo').innerHTML="";

           switch(frecuencia){

            case 1:  document.querySelector('.compuestos__2--periodo').innerHTML="Año";
            break;

            case 2: document.querySelector('.compuestos__2--periodo').innerHTML="Semestre";
            break;

            case 4: document.querySelector('.compuestos__2--periodo').innerHTML="Trimestre";
            break;

            case 12: document.querySelector('.compuestos__2--periodo').innerHTML="Mes";
            break;

            default: document.querySelector('.compuestos__2--periodo').innerHTML="Perido";
           }

        array.map((_,i)=>{

            let interesGenerado=montoInicial*interesValorReal;
            let totalGanado=montoInicial+interesGenerado;

    const plantilla=`
        <div class="simples__2--tabla__datos--contenedor">
            <p>${i+1}</p>
            <p>${formatoMoneda.format(montoInicial)}</p>
            <p>${formatoMoneda.format(interesGenerado)}</p>
            <p>${formatoMoneda.format(totalGanado)}</p>
        </div>  
        `;

            montoInicial+=interesGenerado;

            document.querySelector('.compuestos__2--tabla__datos').innerHTML+=plantilla;

        });         

       // 📊 Gráfica con texto en el centro

const ctx = document.getElementById('miGrafica_compuestos').getContext('2d');

// 🔧 Plugin para texto en el centro
const textoCentro = {
  id: 'textoCentro',
  beforeDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;

    ctx.save();

    const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);

    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#1fd3da';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 💰 Monto total
    ctx.fillText(
      `$${total.toLocaleString('es-MX')}`,
      width / 2,
      height / 2 - 10
    );

    // 🏷️ Texto secundario
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#ee1e1e';
    ctx.fillText(
      'Total',
      width / 2,
      height / 2 + 15
    );

    ctx.restore();
  }
};


parseFloat(inputMonto.value);

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Capital Inicial', 'Intereses generados'],
    datasets: [{
      data: [montoInicial, interesGanadoGanadoGrafica],
      backgroundColor: ['#2E7D32', '#F9A825'],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '50%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a,b)=>a+b,0);
            const value = context.raw;
            const porcentaje = ((value / total) * 100).toFixed(1);

            return `$${value.toLocaleString('es-MX')} (${porcentaje}%)`;
          }
        }
      }
    }
  },
  plugins: [textoCentro]
});

});

const expresionMonto$1=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;


const formulario=document.querySelector('.prestamos__contenedor1--formulario');


formulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    //Valores del formulario
    const inputMonto=document.getElementById('prestamos_input-monto');
    const inputInteres=document.getElementById('prestamos_input-tasa');
    const inputPeriodo=document.getElementById('prestamos_frecuencia');

        //Quitar mensajes de error
        document.querySelector('.prestamos__error1').classList.remove('active');
        document.querySelector('.prestamos__error2').classList.remove('active');

     if(!expresionMonto$1.test(inputMonto.value)){

            document.querySelector('.prestamos__error1').classList.add('active');
        }

        if(!expresionInteres.test(inputInteres.value)){
            
            document.querySelector('.prestamos__error2').classList.add('active');

            return
        }

     const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        });

          //Limpiamos el contenido de las tablas
        document.querySelector('.prestamos_tablas').innerHTML="";

        //Sacamos los valores y los transformamos a numeros
        let montoInicial=parseFloat(inputMonto.value);
        let interes=parseFloat(inputInteres.value);
        const periodos=parseFloat(inputPeriodo.value);

        const interesReal=(interes/360/100)*30;
        const pagoMensual = (montoInicial * interesReal) / (1 - Math.pow(1 + interesReal, -periodos));
        
        let array=[];
       for (let i=0; i < periodos; i++) {
        
        array.push(i+1);
       }

       //Datos para la gráfica
        let interesGrafica=0;
        let capitalGrafica=0;
        let ivaGrafica=0;
        let totalGrafica=0;

       //Empezamos el bucle
       array.map((_,i)=>{

        let mes=i+1;
        let interesMensual=montoInicial*interesReal;
        let capital=(pagoMensual-interesMensual);
        let iva=(interesMensual*0.16);
        let pagoTotal=(pagoMensual+iva);
        let saldoPendiente=(montoInicial-capital);

        const plantilla=`
        <div class="prestamos__contenedor2--tabla">
            <p>${mes}</p>
            <p>${formatoMoneda.format(interesMensual)}</p>        
            <p>${formatoMoneda.format(capital)}</p>
            <p>${formatoMoneda.format(pagoMensual)}</p>
            <p>${formatoMoneda.format(iva)}</p>
            <p>${formatoMoneda.format(pagoTotal)}</p>
            <p>${formatoMoneda.format(saldoPendiente)}</p>
            </div>
        `;

        montoInicial-=capital;

        interesGrafica+=interesMensual;
        capitalGrafica+=capital;
        ivaGrafica+=iva;
        totalGrafica+=pagoTotal;


        document.querySelector('.prestamos_tablas').innerHTML+=plantilla;
       });

 const ctx = document.getElementById('miGrafica_prestamos').getContext('2d');

// 🔧 Plugin centro (usa totalGrafica)
const textoCentro = {
  id: 'textoCentro',
  beforeDraw(chart) {
    const { ctx, chartArea: { width, height } } = chart;

    ctx.save();

    ctx.font = 'bold 18px sans-serif';
    ctx.fillStyle = '#1fd3da';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // 💰 TOTAL PAGADO (tu variable)
    ctx.fillText(
      `$${totalGrafica.toLocaleString('es-MX')}`,
      width / 2,
      height / 2 - 10
    );

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#ee1e1e';
    ctx.fillText(
      'Total pagado',
      width / 2,
      height / 2 + 15
    );

    ctx.restore();
  }
};

new Chart(ctx, {
  type: 'doughnut',
  data: {
    labels: ['Capital', 'Intereses', 'IVA'],
    datasets: [{
      data: [capitalGrafica, interesGrafica, ivaGrafica],
      backgroundColor: [
        '#2E7D32', // 🟢 capital
        '#F9A825', // 🟡 intereses
        '#D32F2F'  // 🔴 IVA
      ],
      borderWidth: 0
    }]
  },
  options: {
    cutout: '65%',
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a,b)=>a+b,0);
            const value = context.raw;
            const porcentaje = ((value / total) * 100).toFixed(1);

            return `$${value.toLocaleString('es-MX')} (${porcentaje}%)`;
          }
        }
      }
    }
  },
  plugins: [textoCentro]
});
});

const renderGasto=(concepto,monto,fecha)=>{


      //El formato de la moneda
    const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        });

        let colorClass="";

        if(monto<0){
            colorClass="rojo";
        }
        else {
            colorClass="verde";
        }


    const plantilla=`
         <div class="item">
                <span>${fecha}</span>
                <span>${concepto}</span>
                <span class="ppngi-monto ${colorClass}">${formatoMoneda.format(monto)}</span>
        </div>
    `;

        document.getElementById('listaBody').innerHTML+=plantilla;

};

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
        });

//Evento del primer formulario
primerFormulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    //Sacamos las 2 fechas
    const fecha1=document.getElementById('fechaInicio');
    const fecha2=document.getElementById('fechaFin');

    //Primero quitamos las clases para los errores en caso de que no existan errores
    document.getElementById('tasa__inputs').classList.remove('active-error');
    document.getElementById('ppngi__inputs').classList.remove('active-error');
    document.getElementById('fecha_inicio').classList.remove('active-error');
    document.getElementById('fecha_fin').classList.remove('active-error');

    //Verificamos si tiene errores los datos que ingresa el cliente 
    if(!expresionTasa.test(tasaInput.value)){
        document.getElementById('tasa__inputs').classList.add('active-error');
    }

    if(!expresionPago.test(ppngiInput.value)){
        document.getElementById('ppngi__inputs').classList.add('active-error');
    }

    if(fecha1.value==='' || fecha2.value===''){

        document.getElementById('fecha_inicio').classList.add('active-error');
        document.getElementById('fecha_fin').classList.add('active-error');
        return
    }

    document.getElementById('formFechas').classList.remove('active');
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
        
        fechaActual.setDate(fechaActual.getDate()+1);
    }
    document.querySelector('.ppngi_calculoBtn').classList.add('active');

});



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
    document.getElementById('ppngi-fecha').classList.remove('active-error');

    //Errores
    if(!expresionConcepto.test(inputConcepto)){
        document.getElementById('ppngi-concepto').classList.add('active-error');
    }
    if(!expresionMonto.test(inputMonto)){
        document.getElementById('ppngi-monto').classList.add('active-error');
    }
    if(inputfecha===""){
        document.getElementById('ppngi-fecha').classList.add('active-error');
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
            movimiento.saldo=Math.max(0,movimiento.saldo+monto);
        }
    });


        //Se inicia proceso para renderizar cada uno de los gastos
        renderGasto(inputConcepto,monto,inputfecha);


        //Limpiar cada uno de los inputs
    document.getElementById('movFecha').value="";
    document.getElementById('movConcepto').value="";
    document.getElementById('movMonto').value="";



});


//Generar el calculo de los intereses

document.getElementById('ppngi_calculo').addEventListener('click',(e)=>{

    e.preventDefault();

/*
    let dias;
    let tasaReal;
    let saldoPromedio;
*/

    dias=fechaArray.length;
    tasaReal=parseFloat((tasa/360)/100);

    //Vamos a generar el calculo del saldo promedio diario

    fechaArray.forEach((movimiento)=>{
        saldoPromedio+=parseFloat(movimiento.saldo);
    });

    interesFinal=(saldoPromedio/dias)*(tasaReal*dias);
    let ivaInt=interesFinal*0.16;
    let totalMasIva=interesFinal+ivaInt;


    console.log(totalMasIva);


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

});
