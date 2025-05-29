#!/bin/bash

# Run a quick test with a single visitor
echo "Running quick test with a single visitor"

HEADLESS=false \
TOTAL_VISITORS=1 \
CONCURRENT_VISITORS=1 \
VISITS_PER_VISITOR=3 \
MIN_TIME_ON_PAGE=3000 \
MAX_TIME_ON_PAGE=5000 \
LOG_FILE="quick-test.log" \
npx ts-node --project scripts/traffic-simulation/tsconfig.json scripts/traffic-simulation/simulate-visitors.ts

echo "Quick test completed!" 