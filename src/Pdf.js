import html2pdf from "html2pdf.js";

function exportarPDF() {

    const elemento = document.querySelector(".tabla_contenedor");

    const opciones = {
        margin: 0.5,
        filename: "tabla_amortizacion.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "landscape" }
    };

    html2pdf()
        .set(opciones)
        .from(elemento)
        .save();
}

export default exportarPDF;