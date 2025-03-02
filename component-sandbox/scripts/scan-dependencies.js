const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const electricUiPath = path.resolve(__dirname, '../../electric-ui-project');
const sandboxPath = path.resolve(__dirname, '..');

// Function to get installed packages
function getInstalledPackages(packageJsonPath, nodeModulesPath) {
  try {
    // Read package.json
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    
    // Combine dependencies and devDependencies
    const allDependencies = {
      ...(packageJson.dependencies || {}),
      ...(packageJson.devDependencies || {})
    };
    
    // Check which packages are actually installed
    const installedPackages = {};
    
    for (const [name, version] of Object.entries(allDependencies)) {
      const packagePath = path.join(nodeModulesPath, name);
      if (fs.existsSync(packagePath)) {
        // Try to get the actual installed version
        try {
          const installedPackageJson = JSON.parse(
            fs.readFileSync(path.join(packagePath, 'package.json'), 'utf8')
          );
          installedPackages[name] = {
            declaredVersion: version,
            installedVersion: installedPackageJson.version,
            location: packagePath
          };
        } catch (err) {
          installedPackages[name] = {
            declaredVersion: version,
            installedVersion: 'unknown',
            location: packagePath
          };
        }
      }
    }
    
    return installedPackages;
  } catch (error) {
    console.error(`Error scanning dependencies: ${error.message}`);
    return {};
  }
}

// Scan Electric UI project
console.log('Scanning Electric UI project dependencies...');
const electricUiPackages = getInstalledPackages(
  path.join(electricUiPath, 'package.json'),
  path.join(electricUiPath, 'node_modules')
);

// Scan Component Sandbox project
console.log('Scanning Component Sandbox dependencies...');
const sandboxPackages = getInstalledPackages(
  path.join(sandboxPath, 'package.json'),
  path.join(sandboxPath, 'node_modules')
);

// Generate report
const report = {
  timestamp: new Date().toISOString(),
  electricUi: {
    packageCount: Object.keys(electricUiPackages).length,
    packages: electricUiPackages
  },
  sandbox: {
    packageCount: Object.keys(sandboxPackages).length,
    packages: sandboxPackages
  }
};

// Write report to file
const reportPath = path.join(sandboxPath, 'dependency-report.json');
fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

console.log(`Dependency scan complete. Found ${report.electricUi.packageCount} packages in Electric UI and ${report.sandbox.packageCount} packages in Component Sandbox.`);
console.log(`Report saved to ${reportPath}`);
