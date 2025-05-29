# Veda Jewelry Website Traffic Simulation

This folder contains scripts to simulate visitor traffic on the Veda Jewelry website. The simulation creates realistic browsing patterns to help populate your personalization engine with user behavior data.

## Features

- Simulates multiple concurrent visitors
- Creates realistic browsing patterns based on the sitemap
- Supports weighted preferences for collections and product types
- Logs all visitor activity for analysis
- Configurable visitor behavior (time on page, scrolling, clicking)

## Requirements

- Node.js 18+
- NPM or Yarn

## Installation

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx ts-node scripts/traffic-simulation/install-browsers.ts
```

## Configuration

Edit the `config.ts` file to customize the simulation:

- `concurrentVisitors`: Number of browsers to run simultaneously
- `totalVisitors`: Total number of visitors to simulate
- `visitsPerVisitor`: Number of pages each visitor will browse
- `headless`: Set to `true` for invisible browsers, `false` to watch the simulation
- `collectionWeights`: Adjust to make certain collections more popular
- `productTypeWeights`: Adjust to make certain product types more popular

## Running the Simulation

```bash
npx ts-node scripts/traffic-simulation/simulate-visitors.ts
```

## Logs

All visitor activity is logged to `logs/visitor-simulation.log`. Each log entry includes:

- Timestamp
- Visitor ID
- Page URL
- Action performed

## Example Visitor Journey

A typical visitor journey might look like:

1. Visit homepage
2. Browse a collection page (e.g., Digital Dawn)
3. View 2-3 products from that collection
4. Possibly visit another collection
5. View 1-2 products from the second collection
6. Possibly visit the "Our Story" page

## Customizing Visitor Behavior

To customize how visitors interact with the site, modify the `simulateVisitor` function in `simulate-visitors.ts`. You can add more complex behaviors such as:

- Adding items to cart
- Submitting forms
- Filtering products
- Using search functionality

## Troubleshooting

If you encounter issues:

1. Check the log file for error messages
2. Ensure the website is accessible
3. Try reducing `concurrentVisitors` if you experience performance issues
4. Make sure you have installed the Playwright browsers
