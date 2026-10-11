import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Copy index.html to dist/index.html
fs.copyFileSync(path.resolve('index.html'), path.join(distDir, 'index.html'));
console.log('✓ Copied index.html to dist/index.html');

// Copy public directory if exists
const publicDir = path.resolve('public');
if (fs.existsSync(publicDir)) {
  fs.cpSync(publicDir, distDir, { recursive: true });
  console.log('✓ Copied public assets to dist/');
}

console.log('Build completed successfully. Output directory: dist/');
