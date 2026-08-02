#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 * Supported operations:
 * - addition (add)
 * - subtraction (subtract)
 * - multiplication (multiply)
 * - division (divide)
 *
 * Usage:
 *   node src/calculator.js <operation> <operand1> <operand2>
 * Examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js subtract 5 1
 *   node src/calculator.js multiply 2 3
 *   node src/calculator.js divide 6 2
 */

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <num1> <num2>');
  console.log('Operations: add, subtract, multiply, divide');
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function main(argv) {
  const op = argv[2];
  const aRaw = argv[3];
  const bRaw = argv[4];

  if (!op || !aRaw || !bRaw) {
    console.error('Error: missing arguments.');
    printUsage();
    process.exit(1);
  }

  const a = toNumber(aRaw);
  const b = toNumber(bRaw);

  if (a === null || b === null) {
    console.error('Error: operands must be valid numbers.');
    process.exit(1);
  }

  let result;

  switch (op.toLowerCase()) {
    case 'add':
      result = a + b;
      break;
    case 'subtract':
      result = a - b;
      break;
    case 'multiply':
      result = a * b;
      break;
    case 'divide':
      if (b === 0) {
        console.error('Error: division by zero.');
        process.exit(1);
      }
      result = a / b;
      break;
    default:
      console.error(`Error: unknown operation "${op}".`);
      printUsage();
      process.exit(1);
  }

  // Print result to stdout (no extra text so it can be used in scripts)
  console.log(result);
  process.exit(0);
}

if (require.main === module) {
  main(process.argv);
}

module.exports = { main, toNumber };