const fs = require('fs').promises;
const path = require('path');

// Function to read the JSON file
async function readJsonFile(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading or parsing JSON file:', err);
        throw err;
    }
}

// Function to log details with indentation
function logIndented(indent, ...messages) {
    console.log(' '.repeat(indent) + messages.join(' '));
}

// Function to convert duration to a readable format
function formatDuration(ms) {
    return `${Math.floor(ms / 1000)}s ${ms % 1000}ms`;
}

// Function to process and log test results
function processTestResults(testResults) {
    if (!testResults || !Array.isArray(testResults.suites)) {
        console.error('Invalid test results format');
        return;
    }
    testResults.suites.forEach(suite => processSuite(suite, 0));
}

function processSuite(suite, indent) {
    logIndented(indent, `Suite: ${suite.title}`);
    (suite.suites || []).forEach(subSuite => processSuite(subSuite, indent + 2));
    (suite.specs || []).forEach(spec => processSpec(spec, indent + 2));
}

function processSpec(spec, indent) {
    logIndented(indent, `Spec: ${spec.title}`);
    (spec.tests || []).forEach(test => processTest(test, indent + 2));
}

function processTest(test, indent) {
    logIndented(indent, `Test: ${test.title} - Status: ${test.status}`);
    (test.results || []).forEach(result => processResult(result, indent + 2));
}

function processResult(result, indent) {
    logIndented(indent, `Result: ${result.status} - Duration: ${formatDuration(result.duration)}`);
    result.errors.forEach(({ message }) => logIndented(indent + 2, `Error: ${message}`));
    result.stdout.forEach(({ text }) => logIndented(indent + 2, `Stdout: ${text}`));
    result.stderr.forEach(({ text }) => logIndented(indent + 2, `Stderr: ${text}`));
    result.attachments.forEach(({ name, path }) => {
        logIndented(indent + 2, `Attachment: ${name}, Path: ${path}`);
    });
}

// Usage
(async () => {
    try {
        const filePath = path.join(__dirname, '../', 'test-results.json');
        const testResults = await readJsonFile(filePath);
        processTestResults(testResults);
    } catch (err) {
        console.error('Failed to process test results:', err);
    }
})();
