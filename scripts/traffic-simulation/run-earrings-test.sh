#!/bin/bash

# Run a test that focuses exclusively on earrings traffic
echo "Running earrings-focused traffic simulation"

# Create a temporary config file that heavily favors earrings
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Earrings enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify product type weights to heavily favor earrings
  configContent = configContent.replace(
    /productTypeWeights: {[^}]+}/s,
    \`productTypeWeights: {
    'ring': 0,
    'necklace': 0,
    'bracelet': 0,
    'earrings': 1,
  }\`
  );
  
  // Modify category weights to only browse earrings
  configContent = configContent.replace(
    /categoryWeights: {[^}]+}/s,
    \`categoryWeights: {
    'rings': 0,
    'necklaces': 0,
    'bracelets': 0,
    'earrings': 1,
  }\`
  );
  
  // Force browsing by category most of the time
  configContent = configContent.replace(
    /browseMethodWeights: {[^}]+}/s,
    \`browseMethodWeights: {
    'by-collection': 1,
    'by-category': 4,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config that exclusively focuses on earrings');
"

# Run the simulation with the temporary config
HEADLESS=true \
TOTAL_VISITORS=1000 \
CONCURRENT_VISITORS=3 \
VISITS_PER_VISITOR=5 \
MIN_TIME_ON_PAGE=500 \
MAX_TIME_ON_PAGE=1000 \
LOG_FILE="earrings-focus.log" \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts

# Clean up the temporary config file
rm -f scripts/traffic-simulation/temp-config.ts

echo "Earrings-focused traffic simulation completed!" 