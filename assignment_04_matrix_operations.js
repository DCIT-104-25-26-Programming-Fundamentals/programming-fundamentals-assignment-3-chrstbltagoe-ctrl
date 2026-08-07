// =============================================================================
// PROGRAMMING FUNDAMENTALS — Assignment 4
// =============================================================================
//
// TASK: Matrix Operations
//
// Write a JavaScript program that performs three operations on matrices
// (2D arrays), each implemented in its own function.
//
// In JavaScript, a matrix is represented as an array of arrays:
//   let matrix = [[1, 2, 3], [4, 5, 6]];   // 2 rows, 3 columns
//
// -----------------------------------------------------------------------------
// HOW TO RUN THIS PROGRAM
// -----------------------------------------------------------------------------
// 1. Install the input library (only once):  npm install readline-sync
// 2. Run the program:                        node assignment_04_matrix_operations.js
//
// -----------------------------------------------------------------------------
// PART A — Transpose a Matrix
// -----------------------------------------------------------------------------
// - Read an M x N matrix from the user.
// - Compute and display its transpose (rows become columns, columns become rows).
//
// Example (2 x 3 input):
//
//   Original Matrix:      Transposed Matrix:
//   1  2  3               1  4
//   4  5  6               2  5
//                         3  6
//
// -----------------------------------------------------------------------------
// PART B — Add Two Matrices
// -----------------------------------------------------------------------------
// - Read two matrices of exactly the same size (M x N).
// - Compute their element-wise sum and display the result.
//
// -----------------------------------------------------------------------------
// PART C — Multiply Two Matrices
// -----------------------------------------------------------------------------
// - Read matrix A of size M x N and matrix B of size N x P.
//   (Number of COLUMNS in A must equal number of ROWS in B.)
// - Compute and display the matrix product A x B (result is M x P).
//
// -----------------------------------------------------------------------------
// EXPECTED INPUT FORMAT
// -----------------------------------------------------------------------------
// When entering a row, the user types all values on one line separated by spaces:
//
//   Enter number of rows: 2
//   Enter number of columns: 3
//   Enter row 1: 1 2 3
//   Enter row 2: 4 5 6
//
// Hint: Use row.split(' ').map(Number) to convert a line of text into an array
// of numbers.
//
// -----------------------------------------------------------------------------
// REQUIREMENTS
// -----------------------------------------------------------------------------
// - Use nested loops for all operations (no external libraries).
// - Each operation must be in its own function (see scaffold below).
// - Display each matrix in a neat, aligned grid format.
// - Tip: Complete Part A first, then Parts B and C.
//

// =============================================================================
// YOUR CODE BELOW — remove the // symbols from the scaffold and fill it in
// =============================================================================

const readlineSync = require('readline-sync');

// Reads an M x N matrix from the user, one row at a time.
function readMatrix(rows, cols, label) {
  const matrix = [];
  console.log(`\nEnter ${label} (${rows} rows, ${cols} columns):`);
  for (let i = 0; i < rows; i++) {
    let row;
    while (true) {
      const line = readlineSync.question(`Enter row ${i + 1}: `);
      row = line.trim().split(/\s+/).map(Number);
      if (row.length !== cols || row.some(Number.isNaN)) {
        console.log(`Please enter exactly ${cols} numbers separated by spaces.`);
      } else {
        break;
      }
    }
    matrix.push(row);
  }
  return matrix;
}

// Prints a matrix in a neat, aligned grid.
function printMatrix(matrix) {
  const width = Math.max(
    ...matrix.flat().map((n) => String(n).length)
  );
  matrix.forEach((row) => {
    console.log(row.map((n) => String(n).padStart(width)).join('  '));
  });
}

// PART A — Transpose
function transposeMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let j = 0; j < cols; j++) {
    const newRow = [];
    for (let i = 0; i < rows; i++) {
      newRow.push(matrix[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// PART B — Addition
function addMatrices(a, b) {
  const rows = a.length;
  const cols = a[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    const newRow = [];
    for (let j = 0; j < cols; j++) {
      newRow.push(a[i][j] + b[i][j]);
    }
    result.push(newRow);
  }

  return result;
}

// PART C — Multiplication
function multiplyMatrices(a, b) {
  const rowsA = a.length;
  const colsA = a[0].length;
  const colsB = b[0].length;
  const result = [];

  for (let i = 0; i < rowsA; i++) {
    const newRow = [];
    for (let j = 0; j < colsB; j++) {
      let sum = 0;
      for (let k = 0; k < colsA; k++) {
        sum += a[i][k] * b[k][j];
      }
      newRow.push(sum);
    }
    result.push(newRow);
  }

  return result;
}

function partA() {
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');
  const matrix = readMatrix(rows, cols, 'the matrix');

  console.log('\nOriginal Matrix:');
  printMatrix(matrix);

  console.log('\nTransposed Matrix:');
  printMatrix(transposeMatrix(matrix));
}

function partB() {
  const rows = readlineSync.questionInt('Enter number of rows: ');
  const cols = readlineSync.questionInt('Enter number of columns: ');

  const a = readMatrix(rows, cols, 'Matrix A');
  const b = readMatrix(rows, cols, 'Matrix B');

  console.log('\nMatrix A:');
  printMatrix(a);
  console.log('\nMatrix B:');
  printMatrix(b);

  console.log('\nA + B:');
  printMatrix(addMatrices(a, b));
}

function partC() {
  const m = readlineSync.questionInt('Enter rows of Matrix A (M): ');
  const n = readlineSync.questionInt('Enter columns of Matrix A / rows of Matrix B (N): ');
  const p = readlineSync.questionInt('Enter columns of Matrix B (P): ');

  const a = readMatrix(m, n, 'Matrix A');
  const b = readMatrix(n, p, 'Matrix B');

  console.log('\nMatrix A:');
  printMatrix(a);
  console.log('\nMatrix B:');
  printMatrix(b);

  console.log('\nA x B:');
  printMatrix(multiplyMatrices(a, b));
}

function main() {
  console.log('Matrix Operations');
  console.log('1. Transpose a Matrix');
  console.log('2. Add Two Matrices');
  console.log('3. Multiply Two Matrices');

  const choice = readlineSync.questionInt('\nChoose an operation (1-3): ');

  if (choice === 1) {
    partA();
  } else if (choice === 2) {
    partB();
  } else if (choice === 3) {
    partC();
  } else {
    console.log('Invalid choice.');
  }
}

main();

