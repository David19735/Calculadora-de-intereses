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

const expresionMonto$1=/^\d+(\.\d{1,2})?$/;
const expresionInteres$1=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo$1= /^(?:[1-9]|1\d|20)$/;

//El formulario
const formulario$1=document.querySelector('.simples1__formulario');


formulario$1.addEventListener('submit',(e)=>{

    
    e.preventDefault();

    //Los valores del formulario
    const inputMonto=document.getElementById('simples_input-monto');
    const inputInteres=document.getElementById('simples_input-tasa');
    const inputPeriodo=document.getElementById('simples_input-periodo');

    //Mensajes de error

        document.querySelector('.simples__error1').classList.remove('active');
        document.querySelector('.simples__error2').classList.remove('active');
        document.querySelector('.simples__error3').classList.remove('active');


        if(!expresionMonto$1.test(inputMonto.value)){

            document.querySelector('.simples__error1').classList.add('active');
        }
        if(!expresionInteres$1.test(inputInteres.value)){
            
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

const expresionMonto=/^\d+(\.\d{1,2})?$/;
const expresionInteres=/^\d+(\.\d{1,2})?$/;
const expresionPeriodo= /^(?:[1-9]|1\d|20)$/;


const formulario=document.querySelector('.compuestos__formulario');

formulario.addEventListener('submit',(e)=>{

    e.preventDefault();

    const inputMonto=document.getElementById('compuestos_input-monto');
    const inputInteres=document.getElementById('compuestos_input-tasa');
    const inputPeriodo=document.getElementById('compuestos_input-periodo');

    
    //Mensajes de error
        document.querySelector('.compuestos__error1').classList.remove('active');
        document.querySelector('.compuestos__error2').classList.remove('active');
        document.querySelector('.compuestos__error3').classList.remove('active');

        if(!expresionMonto.test(inputMonto.value)){

            document.querySelector('.compuestos__error1').classList.add('active');
        }

        if(!expresionInteres.test(inputInteres.value)){
            
            document.querySelector('.compuestos__error2').classList.add('active');
        }

        if(!expresionPeriodo.test(inputPeriodo.value)){
            
            document.querySelector('.compuestos__error3').classList.add('active');
            return
        }

        


});
