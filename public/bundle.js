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

const expresionMonto$2=/^\d+(\.\d{1,2})?$/;
const expresionInteres$2=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo$2= /^(?:[1-9]|1\d|20)$/;

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


        if(!expresionMonto$2.test(inputMonto.value)){

            document.querySelector('.simples__error1').classList.add('active');
        }
        if(!expresionInteres$2.test(inputInteres.value)){
            
            document.querySelector('.simples__error2').classList.add('active');
        }
        if(!expresionPeriodo$2.test(inputPeriodo.value)){
            
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

const expresionMonto$1=/^\d+(\.\d{1,2})?$/;
const expresionInteres$1=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo$1= /^(?:[1-9]|1\d|10)$/;


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

        if(!expresionMonto$1.test(inputMonto.value)){

            document.querySelector('.compuestos__error1').classList.add('active');
        }

        if(!expresionInteres$1.test(inputInteres.value)){
            
            document.querySelector('.compuestos__error2').classList.add('active');
        }

        if(!expresionPeriodo$1.test(inputPeriodo.value)){
            
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

const expresionMonto=/^\d+(\.\d{1,2})?$/;
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

     if(!expresionMonto.test(inputMonto.value)){

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
        let periodos=parseFloat(inputPeriodo.value);

        let interesReal=(interes/360/100)*30;
        const pagoMensual = (montoInicial * interesReal) / (1 - Math.pow(1 + interesReal, -periodos));
        

        console.log(formatoMoneda.format(pagoMensual));
});
