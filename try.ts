import lint from './lint';

// Function to lint code blocks preceded by /*tsx*/
async function lintTsxCodeBlocks(code: string): Promise<string> {
    const tsxBlocks = code.match(/\/\*tsx\*\/(.*?)(\/\*tsx\*\/|$)/gs);
  
    if (!tsxBlocks) {
      // If no /*tsx*/ blocks are found, return the original code
      return code;
    }
  
    for (const tsxBlock of tsxBlocks) {
      // Extract the code inside /*tsx*/ comments
      const codeToLint = tsxBlock.replace(/\/\*tsx\*\/(.*)\/\*tsx\*\//s, '$1');
      // Lint the code using prettier
      const lintedCode = await lint(codeToLint);
      // Replace the original code block with the linted code
      code = code.replace(tsxBlock, lintedCode);
    }
  
    return code;
  }