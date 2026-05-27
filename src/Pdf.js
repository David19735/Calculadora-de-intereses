import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

 function exportarPDF() {

    const tabla = document.querySelector(".tabla_financiera");

    const clon = tabla.cloneNode(true);

    // 📌 forzar estilos inline (IMPORTANTE)
    clon.style.width = "100%";
    clon.style.borderCollapse = "collapse";
    clon.style.fontFamily = "sans-serif";

    const thTd = clon.querySelectorAll("th, td");

    thTd.forEach(el => {
        el.style.border = "1px solid #000";
        el.style.padding = "8px";
        el.style.textAlign = "center";
        el.style.fontSize = "12px";
    });

    const th = clon.querySelectorAll("th");

    th.forEach(el => {
        el.style.backgroundColor = "#1e293b";
        el.style.color = "white";
        el.style.fontWeight = "bold";
    });

    const opciones = {
        margin: 0.5,
        filename: "tabla_amortizacion.pdf",
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "landscape"
        }
    };

    html2pdf()
        .set(opciones)
        .from(clon)
        .save();
}

export default exportarPDF;