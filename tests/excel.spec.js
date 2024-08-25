import { test, expect } from "@playwright/test";
import { ExcelUtils } from "../utils/excelUtils";
import { MiscUtils } from "../utils/MiscUtils";   

test('Excel - Read and Update', { tag: '@ExcelTest' }, async () => {
    const excelUtils = new ExcelUtils();
    const excelFilePath = 'test-data/ExcelAssessment.xlsx';
    const searchText = 'Price';
    const newValue = new MiscUtils().getRandomInt(50, 600);
    const updatedPrice = await excelUtils.updateExcel(excelFilePath, searchText, newValue, 3);
    expect(updatedPrice).toBe(newValue);
});