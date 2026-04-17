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

           let montoInicial=parseFloat(inputMonto.value)
           let interes=parseFloat(inputInteres.value)
           let periodo=parseFloat(inputPeriodo.value)
           let frecuencia=parseFloat(inputFrecuencia.value)
        

           //Este es el número de veces que va a iterar el array
           let numeroDePeriodos=periodo*frecuencia;

           //Creo un array con el número de datos que necesito iterar para un map
            const array=[];

           for (let i= 0;  i<numeroDePeriodos; i++) {
            array.push(i+1)            
           }

           let interesValorReal=(interes/frecuencia)/100;


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


})