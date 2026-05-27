import exportarExcel from './Excel.js'
import exportarPDF from './Pdf.js'

const botonExcel=document.getElementById('excelExport');
const botonPdf=document.getElementById('pdfExport')

botonExcel.addEventListener('click',(e)=>{

    if(botonExcel){
        exportarExcel()
    }
})


botonPdf.addEventListener('click',(e)=>{

    if(botonPdf){

        exportarPDF()
    }
})