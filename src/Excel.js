import * as XLSX from "xlsx";

function exportarExcel() {

    const tabla = document.querySelector(".tabla_financiera");

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.table_to_sheet(tabla);

    // 📌 ancho de columnas
    worksheet["!cols"] = [
        { wch: 8 },
        { wch: 15 },
        { wch: 15 },
        { wch: 18 },
        { wch: 12 },
        { wch: 18 },
        { wch: 18 }
    ];

    const range = XLSX.utils.decode_range(worksheet["!ref"]);

    for (let R = range.s.r; R <= range.e.r; R++) {
        for (let C = range.s.c; C <= range.e.c; C++) {

            const cell = XLSX.utils.encode_cell({ r: R, c: C });

            if (!worksheet[cell]) continue;

            // 🧠 ENCABEZADO
            if (R === 0) {
                worksheet[cell].s = {
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
                // 📊 CUERPO DE TABLA
                worksheet[cell].s = {
                    alignment: {
                        horizontal: "center"
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

    XLSX.utils.book_append_sheet(workbook, worksheet, "Amortizacion");

    XLSX.writeFile(workbook, "tabla_amortizacion.xlsx");
}

export default exportarExcel;