const expresionMonto=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo= /^(?:[1-9]|1\d|20)$/;


const formulario=document.querySelector('.compuestos__formulario');

formulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    const inputMonto=document.getElementById('compuestos_input-monto')
    const inputInteres=document.getElementById('compuestos_input-tasa')
    const inputPeriodo=document.getElementById('compuestos_input-periodo')

    
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

        


})