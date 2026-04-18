const expresionMonto=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo= /^(?:[1-9]|1\d|10)$/;


const formulario=document.querySelector('.compuestos__formulario');

formulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    const inputMonto=document.getElementById('compuestos_input-monto')
    const inputInteres=document.getElementById('compuestos_input-tasa')
    const inputPeriodo=document.getElementById('compuestos_input-periodo')
    const inputFrecuencia=document.getElementById('frecuencia');

    
    //Mensajes de error
        document.querySelector('.compuestos__error1').classList.remove('active')
        document.querySelector('.compuestos__error2').classList.remove('active')
        document.querySelector('.compuestos__error3').classList.remove('active')

        if(!expresionMonto.test(inputMonto.value)){

            document.querySelector('.compuestos__error1').classList.add('active')
        }

        if(!expresionInteres.test(inputInteres.value)){
            
            document.querySelector('.compuestos__error2').classList.add('active')
        }

        if(!expresionPeriodo.test(inputPeriodo.value)){
            
            document.querySelector('.compuestos__error3').classList.add('active')
            return
        }

         const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        })


        //Limpiamos el contenido de las tablas
        document.querySelector('.compuestos__2--tabla__datos').innerHTML="";

           let montoInicial=parseFloat(inputMonto.value)
           let interes=parseFloat(inputInteres.value)
           let periodo=parseFloat(inputPeriodo.value)
           let frecuencia=parseFloat(inputFrecuencia.value)

           
           //Vamos a sacar los datos para la gráfica
            const capitalInicialGrafica=montoInicial;
            const InteresGrafica=interes/100;
            const periodoGrafica=periodo;
            const frecuenciaGrafica=frecuencia;

            //Este es el total ganado
            const totalGanadoGrafica=capitalInicialGrafica*Math.pow((1+(InteresGrafica/frecuencia)),(frecuencia*periodo));
            //Para los intereses ganados hacemos una resta
            const interesGanadoGanadoGrafica=totalGanadoGrafica-capitalInicialGrafica;

            


           //Este es el número de veces que va a iterar el array
           let numeroDePeriodos=periodo*frecuencia;

           //Creo un array con el número de datos que necesito iterar para un map
            const array=[];

           for (let i= 0;  i<numeroDePeriodos; i++) {
            array.push(i+1)            
           }

           let interesValorReal=(interes/frecuencia)/100;

           document.querySelector('.compuestos__2--periodo').innerHTML=""

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

        })         

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


const capital = parseFloat(inputMonto.value);
const intereses = interesGanadoGanadoGrafica;

const miGrafica = new Chart(ctx, {
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

})