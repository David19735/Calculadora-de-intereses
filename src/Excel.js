
import * as XLSX from "xlsx";

function exportarExcel() {
    const tablaInfo = document.querySelector(".tabla_inf_excpdf");
    const tablaAmortizacion = document.querySelector(".tabla_financiera");

    // Validar que existan ambas tablas
    if (!tablaInfo || !tablaAmortizacion) {
        console.error("No se encontraron las tablas para exportar.");
        return;
    }

    const workbook = XLSX.utils.book_new();

    // 1. Exportar la tabla informativa
    const worksheet = XLSX.utils.table_to_sheet(tablaInfo);

    // 2. Agregar la tabla de amortización desde la fila 4 (A4)
    XLSX.utils.sheet_add_dom(worksheet, tablaAmortizacion, {
        origin: "A4"
    });

    // 3. Ancho de las columnas
    worksheet["!cols"] = [
        { wch: 15 },
        { wch: 18 },
        { wch: 15 },
        { wch: 18 },
        { wch: 12 },
        { wch: 18 },
        { wch: 18 }
    ];

    // 4. Corregir el formato del interés
    // La tabla informativa tiene:
    // A1: Capital | B1: Tasa de interés | C1: Periodo
    // A2: valor del capital | B2: interés | C2: periodo

    const celdaInteres = worksheet["B2"];

    if (celdaInteres && celdaInteres.t === "n") {
        // Si Excel almacena 0.52, mostrar 52%
        celdaInteres.z = "0%";
    } else if (celdaInteres) {
        // Si se importó como texto, conservar el porcentaje
        celdaInteres.v = String(celdaInteres.v).replace(
            /^0\.(\d+)$/,
            (_, decimales) => `${Number("0." + decimales) * 100}%`
        );
        celdaInteres.t = "s";
    }

    // 5. Obtener el rango de celdas
    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    // Fila 1: encabezado informativo
    // Fila 4: encabezado de amortización
    const filasEncabezado = [0, 3];

    // 6. Aplicar estilos
    for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {

            const celda = XLSX.utils.encode_cell({
                r: R,
                c: C
            });

            if (!worksheet[celda]) continue;

            if (filasEncabezado.includes(R)) {
                // Encabezados
                worksheet[celda].s = {
                    font: {
                        bold: true,
                        color: { rgb: "FFFFFF" }
                    },
                    fill: {
                        fgColor: { rgb: "1F4E79" }
                    },
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            } else {
                // Celdas de datos
                worksheet[celda].s = {
                    alignment: {
                        horizontal: "center",
                        vertical: "center"
                    },
                    border: {
                        top: { style: "thin" },
                        bottom: { style: "thin" },
                        left: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        }
    }

    // 7. Agregar la hoja al libro
    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Amortizacion"
    );

    // 8. Exportar el archivo
    XLSX.writeFile(
        workbook,
        "tabla_amortizacion.xlsx"
    );
}

export default exportarExcel;
