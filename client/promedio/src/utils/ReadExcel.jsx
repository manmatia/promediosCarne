import * as XLSX from 'xlsx';

export const readExcelFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });

      // Procesar el contenido del archivo Excel
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      // Convertir el array en el formato deseado de objetos JSON
      const formattedData = jsonData.slice(1).map(row => ({
        "corte": row[0],
        "kilos": row[1].toString(),
        "precio_venta": row[2].toString()
      }));

      resolve(formattedData);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsArrayBuffer(file);
  });
};
