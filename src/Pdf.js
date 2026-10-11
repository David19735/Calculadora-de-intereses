import html2pdf from "html2pdf.js/dist/html2pdf.min.js";

function exportarPDF() {

    // Seleccionar las dos tablas originales
    const tabla = document.querySelector(".tabla_financiera");
    const tablaInfo = document.querySelector(".tabla_inf_excpdf");

    // Verificar que existan ambas tablas
    if (!tabla || !tablaInfo) {
        console.error("No se encontró alguna de las tablas.");
        return;
    }

    // Clonar las tablas
    const clon = tabla.cloneNode(true);
    const clonInfo = tablaInfo.cloneNode(true);

    // Crear contenedor exclusivo para el PDF
    const contenedor = document.createElement("div");

    contenedor.style.width = "100%";
    contenedor.style.fontFamily = "sans-serif";
    contenedor.style.backgroundColor = "#ffffff";
    contenedor.style.boxSizing = "border-box";

    // Estilos de la tabla financiera
    clon.style.display = "table";
    clon.style.width = "100%";
    clon.style.borderCollapse = "collapse";
    clon.style.fontFamily = "sans-serif";
    clon.style.pageBreakInside = "auto";
    clon.style.breakInside = "auto";

    // Estilos de la tabla informativa
    clonInfo.style.display = "table";
    clonInfo.style.visibility = "visible";
    clonInfo.style.width = "60%";
    clonInfo.style.borderCollapse = "collapse";
    clonInfo.style.fontFamily = "sans-serif";
    clonInfo.style.marginBottom = "15px";
    clonInfo.style.pageBreakInside = "avoid";
    clonInfo.style.breakInside = "avoid";

    // Aplicar estilos a las dos tablas
    [clonInfo, clon].forEach(tablaClonada => {

        // Estilos de las celdas
        const thTd = tablaClonada.querySelectorAll("th, td");

        thTd.forEach(el => {
            el.style.border = "1px solid #000";
            el.style.padding = "8px";
            el.style.textAlign = "center";
            el.style.fontSize = "12px";
            el.style.overflowWrap = "break-word";
            el.style.boxSizing = "border-box";
        });

        // Estilos de encabezados
        const th = tablaClonada.querySelectorAll("th");

        th.forEach(el => {
            el.style.backgroundColor = "#1e293b";
            el.style.color = "#ffffff";
            el.style.fontWeight = "bold";
        });

        // Evitar dividir filas entre páginas
        const filas = tablaClonada.querySelectorAll("tr");

        filas.forEach(fila => {
            fila.style.pageBreakInside = "avoid";
            fila.style.breakInside = "avoid";
        });

        // Mantener el encabezado de la tabla como encabezado
        const thead = tablaClonada.querySelector("thead");

        if (thead) {
            thead.style.display = "table-header-group";
        }
    });

    // Agregar las tablas al contenedor
    contenedor.appendChild(clonInfo);
    contenedor.appendChild(clon);

    // Opciones de generación del PDF
    const opciones = {
        margin: 0.4,
        filename: "tabla_amortizacion.pdf",

        image: {
            type: "jpeg",
            quality: 1
        },

        html2canvas: {
            scale: 2,
            useCORS: true,
            scrollY: 0,
            windowWidth: document.documentElement.scrollWidth
        },

        jsPDF: {
            unit: "in",
            format: "letter",
            orientation: "landscape"
        },

        pagebreak: {
            mode: ["css", "legacy"],
            avoid: ["tr"]
        }
    };

    // Generar el PDF
    html2pdf()
        .set(opciones)
        .from(contenedor)
        .save();
}

export default exportarPDF;
