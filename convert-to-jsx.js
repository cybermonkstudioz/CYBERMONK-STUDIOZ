const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to find all TypeScript files
function findTypeScriptFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip node_modules and other unnecessary directories
      if (!['node_modules', '.git', '.next', 'build', 'dist'].includes(file)) {
        findTypeScriptFiles(filePath, fileList);
      }
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Function to convert TypeScript to JavaScript
function convertFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove TypeScript type annotations
    content = content
      // Remove type annotations from function parameters
      .replace(/(\([^)]*):\s*([^{=,)]+)(?=[),])/g, '$1')
      // Remove type annotations from variables
      .replace(/(const|let|var)\s+([a-zA-Z0-9_]+)\s*:\s*([a-zA-Z0-9_<>\[\]\{\}|]+)\s*=/g, '$1 $2 =')
      // Remove interface and type definitions
      .replace(/\b(interface|type)\s+([a-zA-Z0-9_]+)\s*[\s\S]*?\}(?=\s*[;=]|$)/g, '')
      // Remove import types
      .replace(/import\s*type\s+\{([^}]+)\}\s+from\s+['"]([^'"]+)['"]/g, '')
      // Update .tsx imports to .jsx
      .replace(/\.tsx(['"])/g, '.jsx$1')
      // Update .ts imports to .js
      .replace(/\.ts(['"])/g, '.js$1');
    
    // Create new file path with .jsx extension
    const newFilePath = filePath.endsWith('.tsx') 
      ? filePath.replace(/\.tsx$/, '.jsx')
      : filePath.replace(/\.ts$/, '.js');
    
    // Write the converted content to the new file
    fs.writeFileSync(newFilePath, content);
    console.log(`Converted: ${filePath} -> ${newFilePath}`);
    
    // Remove the original TypeScript file
    fs.unlinkSync(filePath);
    
    return true;
  } catch (error) {
    console.error(`Error converting ${filePath}:`, error);
    return false;
  }
}

// Main function
function main() {
  console.log('Starting TypeScript to JavaScript conversion...');
  
  // Get all TypeScript files
  const tsFiles = findTypeScriptFiles(process.cwd());
  console.log(`Found ${tsFiles.length} TypeScript files to convert.`);
  
  // Convert each file
  let successCount = 0;
  tsFiles.forEach(file => {
    if (convertFile(file)) {
      successCount++;
    }
  });
  
  console.log(`\nConversion complete!`);
  console.log(`Successfully converted ${successCount} of ${tsFiles.length} files.`);
  
  // Update package.json to remove TypeScript dependencies
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      // Remove TypeScript dependencies
      const tsDeps = [
        'typescript',
        '@types/node',
        '@types/react',
        '@types/react-dom',
        '@types/jest',
        '@typescript-eslint/parser',
        '@typescript-eslint/eslint-plugin'
      ];
      
      // Remove from dependencies and devDependencies
      ['dependencies', 'devDependencies'].forEach(depType => {
        if (packageJson[depType]) {
          tsDeps.forEach(dep => {
            if (packageJson[depType][dep]) {
              delete packageJson[depType][dep];
              console.log(`Removed ${dep} from ${depType}`);
            }
          });
        }
      });
      
      // Update package.json
      fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
      console.log('Updated package.json');
      
      // Remove tsconfig.json
      const tsConfigPath = path.join(process.cwd(), 'tsconfig.json');
      if (fs.existsSync(tsConfigPath)) {
        fs.unlinkSync(tsConfigPath);
        console.log('Removed tsconfig.json');
      }
    }
  } catch (error) {
    console.error('Error updating project configuration:', error);
  }
  
  console.log('\nNote: You may need to manually review and fix some type-related code.');
  console.log('Please run `npm install` to update your dependencies.');
}

// Run the conversion
main();
