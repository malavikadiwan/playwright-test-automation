import ExcelJs from 'exceljs';
import { expect } from "@playwright/test";

export class ExcelUtils {
    constructor(maxSheets = 10) {
        this.maxSheets = maxSheets;
    }

    async readExcel(worksheet, searchText, rowNum = -1, colNum = -1) {
        let output = { row: -1, column: -1 };
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output = {
                        row: rowNum > 0 ? rowNum : rowNumber,
                        column: colNum > 0 ? colNum : colNumber
                    };
                }
            });
        });
        return output;
    }

    async updateExcel(filePath, searchText, newValue, rowNum = -1, colNum = -1, excelWorksheet = 'Sheet1') {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(excelWorksheet);
        if (!worksheet) throw new Error(`Worksheet ${excelWorksheet} not found`);

        // Find the cell with the search text
        const { row, column } = await this.readExcel(worksheet, searchText, rowNum, colNum);
        if (row === -1 || column === -1) throw new Error(`Text "${searchText}" not found in the worksheet`);

        worksheet.getCell(row, column).value = newValue; // Update cell value
        await workbook.xlsx.writeFile(filePath);
        return newValue;
    }

    async saveDataToExcel(filePath, data, baseSheetName = 'Sheet') {
        if (!data || data.length === 0) throw new Error('No data provided');

        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath).catch(() => { }); // Read existing file if it exists

        const sheetCount = workbook.worksheets.length;
        const sheetName = sheetCount < this.maxSheets ? `${baseSheetName}_${sheetCount + 1}` : workbook.worksheets[0].name;

        if (sheetCount >= this.maxSheets) workbook.removeWorksheet(workbook.worksheets[0].id); // Remove oldest sheet if maxSheets exceeded

        const worksheet = workbook.addWorksheet(sheetName);
        worksheet.columns = Object.keys(data[0]).map(key => ({ header: key, key: key, width: 20 }));
        data.forEach(item => worksheet.addRow(item));

        try {
            await workbook.xlsx.writeFile(filePath);
            console.log(`Data saved to ${filePath} in sheet ${sheetName}`);
            return sheetName;
        } catch (error) {
            console.error(`Failed to save data to Excel file: ${error.message}`);
            throw error;
        }
    }

    async assertDataWrittenToExcel(filePath, expectedData, sheetName) {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(sheetName);

        if (!worksheet) throw new Error(`Sheet ${sheetName} not found in ${filePath}`);

        const headers = worksheet.getRow(1).values.slice(1); // Get headers from the first row
        const actualData = worksheet.getSheetValues().slice(2); // Skip the header row and the first empty row

        const actualDataFormatted = actualData.map(row => {
            const rowData = {};
            headers.forEach((header, index) => {
                rowData[header] = row[index + 1]; // Map row values to headers
            });
            return rowData;
        });

        expect(actualDataFormatted).toEqual(expectedData);
        console.log(`Data in sheet ${sheetName} matches expected data`);
    }
}
