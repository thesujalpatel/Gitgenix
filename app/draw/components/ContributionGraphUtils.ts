// Utility functions for ContributionGraph grid positioning

export const createDynamicGridStyles = (positions: number[]) => {
  const style = document.createElement('style');
  style.id = 'contribution-graph-dynamic-styles';
  
  // Remove existing dynamic styles
  const existingStyle = document.getElementById('contribution-graph-dynamic-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  let css = '';
  
  // Generate month label positioning classes
  positions.forEach((position, index) => {
    css += `.month-label-${index} { grid-column-start: ${position}; }\n`;
  });
  
  // Generate weekday label positioning classes
  for (let i = 0; i < 7; i++) {
    css += `.weekday-label-${i} { grid-row-start: ${i + 2}; grid-column-start: 1; }\n`;
  }
  
  style.textContent = css;
  document.head.appendChild(style);
};

export const getCellGridClasses = (col: number, row: number) => {
  return `col-${col} row-${row}`;
};

export const generateCellGridCSS = (totalCells: number) => {
  const style = document.createElement('style');
  style.id = 'contribution-cell-grid-styles';
  
  // Remove existing cell grid styles
  const existingStyle = document.getElementById('contribution-cell-grid-styles');
  if (existingStyle) {
    existingStyle.remove();
  }
  
  let css = '';
  
  // Generate all possible cell positioning classes
  for (let i = 0; i < totalCells; i++) {
    const col = Math.floor(i / 7) + 2;
    const row = (i % 7) + 2;
    css += `.col-${col}.row-${row} { grid-column-start: ${col}; grid-row-start: ${row}; }\n`;
  }
  
  style.textContent = css;
  document.head.appendChild(style);
};
