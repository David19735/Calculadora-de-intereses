//Cambio de css a los enlaces

const contenedorEnlaces=document.querySelector('.enlaces');


contenedorEnlaces.addEventListener('click',(e)=>{

    e.preventDefault()

    //A qué enlace le estoy dando click
    const enlaceClickeado=e.target;

    //Enlace con su Id
    const idEnlace=enlaceClickeado.id;

    const contenedorForm=document.querySelectorAll('.contenedor_form')
    

    if([...enlaceClickeado.classList].includes('active')){
        //Verifico si tiene la clase, si la tiene, no hago nada
        return
    }
    else{

        //Hago un bucle de todos los enlaces, buscando cuál tiene la clase active para removerla
        const enlaces=document.querySelectorAll('.enlace')

        //Hago un bucle de todos los contenedores
        contenedorForm.forEach((contenedor)=>{

            //Le quito la clase "active" a cada uno de los contenedores
            contenedor.classList.remove('active')

            //Cada enlace tiene su id ligada con el mismo nombre de la clase del contenedor, si son iguales tanto su id con su clase le pone la clase "active"
            if([...contenedor.classList].includes(idEnlace)){
                contenedor.classList.add('active')
            }
        })

        enlaces.forEach((enlace)=>{
            if([...enlace.classList].includes('active')){
                enlace.classList.remove('active')
            }
        })
        


        //Al enlace que le doy click, le agrego la clase active
        enlaceClickeado.classList.add('active')
    }
})