import { test, expect } from "@playwright/test";
import { ExcelUtils } from "../utils/ExcelUtils";
import { MiscUtils } from "../utils/MiscUtils";

test('Excel - Read and Update', { tag: '@ExcelTest' }, async () => {
    const excelUtils = new ExcelUtils();
    const miscUtils = new MiscUtils();
    const excelFilePath = 'test-data/ExcelAssessment.xlsx';
    const searchText = 'Price';
    const newValue = await miscUtils.getRandomInt(50, 600);
    const updatedPrice = await excelUtils.updateExcel(excelFilePath, searchText, newValue, 3);
    expect(updatedPrice).toBe(newValue);
});
