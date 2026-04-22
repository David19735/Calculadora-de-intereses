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
        let periodos=parseFloat(inputPeriodo.value)

        let interesReal=(interes/360/100)*30;
        const pagoMensual = (montoInicial * interesReal) / (1 - Math.pow(1 + interesReal, -periodos));
        

        console.log(formatoMoneda.format(pagoMensual))
})