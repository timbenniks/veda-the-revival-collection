#!/bin/bash

# Run traffic simulation with different visitor profiles
# This script simulates different types of visitors with varying preferences

echo "Starting Veda Jewelry traffic simulation with different visitor profiles"

# Install browsers if needed
if [ "$1" == "--install-browsers" ]; then
  echo "Installing Playwright browsers..."
  npm run install-browsers
fi

# Profile 1: Digital Dawn enthusiasts
echo "Running Profile 1: Digital Dawn enthusiasts"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="digital-dawn-visitors.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Digital Dawn enthusiasts
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify collection weights to heavily favor Digital Dawn
  configContent = configContent.replace(
    /collectionWeights: {[^}]+}/s,
    \`collectionWeights: {
    'digital-dawn': 8,
    'elegant-rebellion': 1,
    'urban-armor': 1,
    'charmed-revival': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Digital Dawn enthusiasts');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 2: Elegant Rebellion fans
echo "Running Profile 2: Elegant Rebellion fans"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="elegant-rebellion-visitors.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Elegant Rebellion fans
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify collection weights to heavily favor Elegant Rebellion
  configContent = configContent.replace(
    /collectionWeights: {[^}]+}/s,
    \`collectionWeights: {
    'digital-dawn': 1,
    'elegant-rebellion': 8,
    'urban-armor': 1,
    'charmed-revival': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Elegant Rebellion fans');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 3: Ring shoppers
echo "Running Profile 3: Ring shoppers"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="ring-shoppers.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Ring shoppers
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify product type weights to heavily favor rings
  configContent = configContent.replace(
    /productTypeWeights: {[^}]+}/s,
    \`productTypeWeights: {
    'ring': 8,
    'necklace': 1,
    'bracelet': 1,
    'earrings': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Ring shoppers');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 4: Necklace shoppers
echo "Running Profile 4: Necklace shoppers"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
LOG_FILE="necklace-shoppers.log" \
node -e "
  const fs = require('fs');
  const path = require('path');
  
  // Create a modified config for Necklace shoppers
  const configPath = path.join(process.cwd(), 'scripts/traffic-simulation/config.ts');
  let configContent = fs.readFileSync(configPath, 'utf8');
  
  // Modify product type weights to heavily favor necklaces
  configContent = configContent.replace(
    /productTypeWeights: {[^}]+}/s,
    \`productTypeWeights: {
    'ring': 1,
    'necklace': 8,
    'bracelet': 1,
    'earrings': 1,
  }\`
  );
  
  // Write to a temporary file
  const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');
  fs.writeFileSync(tempConfigPath, configContent);
  
  console.log('Created temporary config for Necklace shoppers');
" && \
TEMP_CONFIG=true \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts && \
rm scripts/traffic-simulation/temp-config.ts

# Profile 5: Random browsers (longer sessions)
echo "Running Profile 5: Random browsers with longer sessions"
HEADLESS=true \
TOTAL_VISITORS=5 \
CONCURRENT_VISITORS=2 \
VISITS_PER_VISITOR=8 \
MIN_TIME_ON_PAGE=8000 \
MAX_TIME_ON_PAGE=45000 \
LOG_FILE="random-browsers.log" \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts

echo "All visitor profiles completed!" 