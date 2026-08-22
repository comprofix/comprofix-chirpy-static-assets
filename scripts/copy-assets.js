const fs = require('fs');
const path = require('path');

// Paths
const root = path.resolve(__dirname, '..');
const nodeModules = path.join(root, 'node_modules');
const pkgJsonPath = path.join(root, 'package.json');
const assetsRoot = path.join(root, 'assets/js');

// Load dependencies
const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
const dependencies = Object.keys(pkgJson.dependencies || {});

// Helpers
function copyFile(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`Copied file: ${src} → ${dest}`);
}

function copyFolder(src, dest) {
  if (!fs.existsSync(src)) return;
  fs.mkdirSync(dest, { recursive: true });
  fs.readdirSync(src, { withFileTypes: true }).forEach(entry => {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolder(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  });
}

// Main logic
dependencies.forEach(pkg => {
  const pkgPath = path.join(nodeModules, pkg);
  const targetFolder = path.join(assetsRoot, pkg.replace('@', '').replace('/', '-'));

  if (!fs.existsSync(pkgPath)) {
    console.warn(`Package not found: ${pkg}`);
    return;
  }

  // Copy main/module files
  const depPkgJsonPath = path.join(pkgPath, 'package.json');
  if (fs.existsSync(depPkgJsonPath)) {
    const depPkg = JSON.parse(fs.readFileSync(depPkgJsonPath, 'utf-8'));
    ['main', 'module'].forEach(key => {
      if (depPkg[key]) {
        const src = path.join(pkgPath, depPkg[key]);
        if (fs.existsSync(src)) {
          const dest = path.join(targetFolder, path.basename(depPkg[key]));
          copyFile(src, dest);
        }
      }
    });
  }

  // Copy common folders
  ['dist', 'locale', 'plugin', 'webfonts', 'css'].forEach(folder => {
    const srcFolder = path.join(pkgPath, folder);
    if (fs.existsSync(srcFolder)) {
      const destFolder = path.join(targetFolder, folder);
      copyFolder(srcFolder, destFolder);
    }
  });

  console.log(`✅ Finished processing: ${pkg}`);
});

// Font packages: copied into static/fonts (served directly, not via the
// Hugo asset pipeline), keeping upstream file names as shipped by each
// package rather than the JS-lib layout above.
const staticFontsRoot = path.join(root, 'static/fonts');
const fontPackages = [
  { pkg: 'lato-font', srcDir: 'fonts', destDir: 'lato-font' },
  { pkg: 'source-sans', srcDir: 'WOFF2/TTF', destDir: 'source-sans' },
];

fontPackages.forEach(({ pkg, srcDir, destDir }) => {
  const srcPath = path.join(nodeModules, pkg, srcDir);
  const destPath = path.join(staticFontsRoot, destDir);

  if (!fs.existsSync(srcPath)) {
    console.warn(`Font package source not found: ${pkg}/${srcDir}`);
    return;
  }

  fs.rmSync(destPath, { recursive: true, force: true });
  copyFolder(srcPath, destPath);
  console.log(`✅ Finished processing font package: ${pkg}`);
});

console.log('🎉 All npm assets copied into Hugo-compatible structure.');
