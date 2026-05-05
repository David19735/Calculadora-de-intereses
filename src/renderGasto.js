const renderGasto=(concepto,monto,fecha)=>{


      //El formato de la moneda
    const formatoMoneda=new Intl.NumberFormat('es-MX',{
                style:'currency',
                currency:'MXN',
                maximumFractionDigits:2,
                minimumFractionDigits:2
        })

        let colorClass="";

        if(monto<0){
            colorClass="rojo"
        }
        else{
            colorClass="verde"
        }


    const plantilla=`
         <div class="item">
                <span>${fecha}</span>
                <span>${concepto}</span>
                <span class="ppngi-monto ${colorClass}">${formatoMoneda.format(monto)}</span>
        </div>
    `;

        document.getElementById('listaBody').innerHTML+=plantilla;

}


export default renderGasto;