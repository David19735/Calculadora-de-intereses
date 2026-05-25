import * as XLSX from "xlsx";

function exportarExcel() {

    const tabla = document.querySelector(".tabla_financiera");

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.table_to_sheet(tabla);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Amortizacion");

    XLSX.writeFile(workbook, "tabla_amortizacion.xlsx");
}

export default exportarExcel;