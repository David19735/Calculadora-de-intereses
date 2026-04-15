const expresionMonto=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo= /^(?:[1-9]|1\d|20)$/;

//El formulario
const formulario=document.querySelector('.simples1__formulario');


formulario.addEventListener('submit',(e)=>{

    
    e.preventDefault();

    //Los valores del formulario
    const inputMonto=document.getElementById('simples_input-monto')
    const inputInteres=document.getElementById('simples_input-tasa')
    const inputPeriodo=document.getElementById('simples_input-periodo')

    //Mensajes de error

        document.querySelector('.simples__error1').classList.remove('active')
        document.querySelector('.simples__error2').classList.remove('active')
        document.querySelector('.simples__error3').classList.remove('active')


        if(!expresionMonto.test(inputMonto.value)){

            document.querySelector('.simples__error1').classList.add('active')
        }
        if(!expresionInteres.test(inputInteres.value)){
            
            document.querySelector('.simples__error2').classList.add('active')
        }
        if(!expresionPeriodo.test(inputPeriodo.value)){
            
            document.querySelector('.simples__error3').classList.add('active')
            return
        }


    const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        })

        const array=[];
        const monto=parseFloat(inputMonto.value)
        const interes=parseFloat(inputInteres.value)
        const periodo=parseFloat(inputPeriodo.value);
        
        document.querySelector('.simples__2--tabla__datos').innerHTML="";

        for (let i= 0; i< periodo; i++) {
            array.push(i+1)            
        }

        
        const graficaAnios=[];
        const graficaMontos=[];
        const graficaIntereses=[];

        array.map((_,i)=>{
        
            const anios=i+1;
            const interesSimple=interes/100;
            const interesDato=interesSimple*monto*(i+1);

            graficaAnios.push(anios);
            graficaMontos.push(monto+(interesDato))
            graficaIntereses.push(interesDato)



            const plantilla=`
        <div class="simples__2--tabla__datos--contenedor">
            <p>${anios}</p>
            <p>${formatoMoneda.format(interesSimple*monto)}</p>
            <p>${formatoMoneda.format(interesDato)}</p>
            <p>${formatoMoneda.format(monto+(interesDato))}</p>
        </div>  
        `;

        document.querySelector('.simples__2--tabla__datos').innerHTML+=plantilla;
        })


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


        })