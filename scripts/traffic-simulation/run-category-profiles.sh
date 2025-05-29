#!/bin/bash

# Run traffic simulation with different category-based visitor profiles
# This script simulates different types of visitors browsing by category

echo "Starting Veda Jewelry traffic simulation with category-based visitor profiles"

# Install browsers if needed
if [ "$1" == "--install-browsers" ]; then
  echo "Installing Playwright browsers..."
  npm run install-browsers
fi

# Profile 1: Earrings enthusiasts
echo "Running Profile 1: Earrings enthusiasts"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="earrings-enthusiasts.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Earrings enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify category weights to heavily favor earrings
  configContent = configContent.replace(
    /categoryWeights: {[^}]+}/s,
    \`categoryWeights: {
    'rings': 1,
    'necklaces': 1,
    'bracelets': 1,
    'earrings': 10,
  }\`
  );
  
  // Force browsing by category
  configContent = configContent.replace(
    /browseMethodWeights: {[^}]+}/s,
    \`browseMethodWeights: {
    'by-collection': 0,
    'by-category': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Earrings enthusiasts');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 2: Rings enthusiasts
echo "Running Profile 2: Rings enthusiasts"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="rings-enthusiasts.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Rings enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify category weights to heavily favor rings
  configContent = configContent.replace(
    /categoryWeights: {[^}]+}/s,
    \`categoryWeights: {
    'rings': 10,
    'necklaces': 1,
    'bracelets': 1,
    'earrings': 1,
  }\`
  );
  
  // Force browsing by category
  configContent = configContent.replace(
    /browseMethodWeights: {[^}]+}/s,
    \`browseMethodWeights: {
    'by-collection': 0,
    'by-category': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Rings enthusiasts');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 3: Necklaces enthusiasts
echo "Running Profile 3: Necklaces enthusiasts"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="necklaces-enthusiasts.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Necklaces enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify category weights to heavily favor necklaces
  configContent = configContent.replace(
    /categoryWeights: {[^}]+}/s,
    \`categoryWeights: {
    'rings': 1,
    'necklaces': 10,
    'bracelets': 1,
    'earrings': 1,
  }\`
  );
  
  // Force browsing by category
  configContent = configContent.replace(
    /browseMethodWeights: {[^}]+}/s,
    \`browseMethodWeights: {
    'by-collection': 0,
    'by-category': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Necklaces enthusiasts');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 4: Bracelets enthusiasts
echo "Running Profile 4: Bracelets enthusiasts"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="bracelets-enthusiasts.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Bracelets enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify category weights to heavily favor bracelets
  configContent = configContent.replace(
    /categoryWeights: {[^}]+}/s,
    \`categoryWeights: {
    'rings': 1,
    'necklaces': 1,
    'bracelets': 10,
    'earrings': 1,
  }\`
  );
  
  // Force browsing by category
  configContent = configContent.replace(
    /browseMethodWeights: {[^}]+}/s,
    \`browseMethodWeights: {
    'by-collection': 0,
    'by-category': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Bracelets enthusiasts');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

echo "All category-based visitor profiles completed!" 