import * as babelParser from '@babel/parser';
import traverse from '@babel/traverse';
import * as fs from 'fs';
import { File } from '@babel/types';
import lint from './lint';

//read tsxCode from ts file
var tsxCode : string = fs.readFileSync('ExhibitA.ts', 'utf8');

// parse the tsxCode to AST
const ast : File  = babelParser.parse(tsxCode, {
  sourceType: 'module',
  plugins: ['jsx', 'typescript'],
});



const tsxTemplateLiterals: string[] = [];

traverse(ast, {
  TemplateLiteral(path) {
    const comments = path.node.leadingComments;
    if (
      comments &&
      comments.some((comment) => comment.value.trim() === 'tsx')
    ) {
        //console.log('Found a tsx comment');
      if (path.node.start != null &&path.node.end != null ) {
        tsxTemplateLiterals.push(tsxCode.substring(path.node.start+1, path.node.end-1));
      } else { 
        throw new Error('Invalid start or end');
      }

      
    }
  },
});

async function lintTsxTemplateLiterals() {
    for (const templateLiteral of tsxTemplateLiterals) {
      const lintedCode = await lint(templateLiteral);
      tsxCode = tsxCode.replace(templateLiteral, lintedCode);
    }
  
    try {
        await fs.promises.writeFile('outputFile.tsx', tsxCode, 'utf-8');
        console.log('File written successfully!');
      } catch (error) {
        console.error('Error writing file:', error);
      }
  }

lintTsxTemplateLiterals();