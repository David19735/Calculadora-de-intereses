const expresionMonto=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;


const formulario=document.querySelector('.prestamos__contenedor1--formulario');


formulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    //Valores del formulario
    const inputMonto=document.getElementById('prestamos_input-monto')
    const inputInteres=document.getElementById('prestamos_input-tasa')
    const inputPeriodo=document.getElementById('prestamos_frecuencia')

        //Quitar mensajes de error
        document.querySelector('.prestamos__error1').classList.remove('active')
        document.querySelector('.prestamos__error2').classList.remove('active')

     if(!expresionMonto.test(inputMonto.value)){

            document.querySelector('.prestamos__error1').classList.add('active')
        }

        if(!expresionInteres.test(inputInteres.value)){
            
            document.querySelector('.prestamos__error2').classList.add('active')

            return
        }

     const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        })

          //Limpiamos el contenido de las tablas
        document.querySelector('.prestamos_tablas').innerHTML="";

        //Sacamos los valores y los transformamos a numeros
        let montoInicial=parseFloat(inputMonto.value)
        let interes=parseFloat(inputInteres.value)
        const periodos=parseFloat(inputPeriodo.value)

        const interesReal=(interes/360/100)*30;
        const pagoMensual = (montoInicial * interesReal) / (1 - Math.pow(1 + interesReal, -periodos));
        
        let array=[]
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
       })

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

const miGrafica = new Chart(ctx, {
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
})