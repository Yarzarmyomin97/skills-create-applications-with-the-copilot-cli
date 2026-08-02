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
  console.log('Operations: add, subtract, multiply, divide, mod, pow, sqrt');
  console.log('Notes: sqrt takes a single operand: node src/calculator.js sqrt 9');
}

function toNumber(value) {
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

// Pure arithmetic functions exported for unit testing
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('division by zero');
  }
  return a / b;
}

// Additional arithmetic functions
function modulo(a, b) {
  if (b === 0) {
    throw new Error('modulo by zero');
  }
  return a % b;
}

function power(base, exponent) {
  return Math.pow(base, exponent);
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('square root of negative number');
  }
  return Math.sqrt(n);
}

function main(argv) {
  const op = argv[2];
  const aRaw = argv[3];
  const bRaw = argv[4];

  if (!op) {
    console.error('Error: missing operation.');
    printUsage();
    process.exit(1);
  }

  const opLower = op.toLowerCase();
  let a = null;
  let b = null;

  // sqrt is single-operand; others require two operands
  if (opLower === 'sqrt' || opLower === 'squareroot' || opLower === 'square-root') {
    if (!aRaw) {
      console.error('Error: missing operand for sqrt.');
      printUsage();
      process.exit(1);
    }
    a = toNumber(aRaw);
    if (a === null) {
      console.error('Error: operand must be a valid number.');
      process.exit(1);
    }
  } else {
    if (!aRaw || !bRaw) {
      console.error('Error: missing arguments.');
      printUsage();
      process.exit(1);
    }
    a = toNumber(aRaw);
    b = toNumber(bRaw);
    if (a === null || b === null) {
      console.error('Error: operands must be valid numbers.');
      process.exit(1);
    }
  }

  let result;

  switch (opLower) {
    case 'add':
      result = add(a, b);
      break;
    case 'subtract':
      result = subtract(a, b);
      break;
    case 'multiply':
      result = multiply(a, b);
      break;
    case 'divide':
      try {
        result = divide(a, b);
      } catch (err) {
        console.error('Error: division by zero.');
        process.exit(1);
      }
      break;
    case 'mod':
    case 'modulo':
      try {
        result = modulo(a, b);
      } catch (err) {
        console.error('Error: modulo by zero.');
        process.exit(1);
      }
      break;
    case 'pow':
    case 'power':
      result = power(a, b);
      break;
    case 'sqrt':
    case 'squareroot':
    case 'square-root':
      try {
        result = squareRoot(a);
      } catch (err) {
        console.error('Error: square root of negative number.');
        process.exit(1);
      }
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

module.exports = { main, toNumber, add, subtract, multiply, divide, modulo, power, squareRoot };