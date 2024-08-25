import ExcelJs from 'exceljs';

export class ExcelUtils {
    async readExcel(worksheet, searchText, rowNum = -1, colNum = -1) {
        let output = { row: -1, column: -1 };
        worksheet.eachRow((row, rowNumber) => {
            row.eachCell((cell, colNumber) => {
                if (cell.value === searchText) {
                    output.row = rowNum > 0 ? rowNum : rowNumber;
                    output.column = colNum > 0 ? colNum : colNumber;
                }
            })
        })
        return output;
    }

    async updateExcel(filePath, searchText, newValue, rowNum = -1, colNum = -1, excelWorksheet = 'Sheet1') {
        const workbook = new ExcelJs.Workbook();
        await workbook.xlsx.readFile(filePath);
        const worksheet = workbook.getWorksheet(excelWorksheet);
        const output = await this.readExcel(worksheet, searchText, rowNum, colNum);
        const cell = worksheet.getCell(output.row, output.column);
        cell.value = newValue;
        await workbook.xlsx.writeFile(filePath);
        return cell.value;
    }
}