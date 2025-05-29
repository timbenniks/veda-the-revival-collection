import { chromium, firefox } from '@playwright/test';
import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';
import { CONFIG as ConfigType } from './config';

// Import config from the correct location
let CONFIG: typeof ConfigType;
const tempConfigPath = path.join(process.cwd(), 'scripts/traffic-simulation/temp-config.ts');

if (fs.existsSync(tempConfigPath)) {
  // Use temporary config if it exists
  CONFIG = require('./temp-config').CONFIG;
  console.log('Using temporary config file');
} else {
  // Use standard config
  CONFIG = require('./config').CONFIG;
  console.log('Using standard config file');
}

// Ensure log directory exists
if (!fs.existsSync(CONFIG.logDirectory)) {
  fs.mkdirSync(CONFIG.logDirectory, { recursive: true });
}

// Logger
const logger = {
  log: (message: string) => {
    const timestamp = new Date().toISOString();
    const logMessage = `${timestamp} - ${message}`;
    console.log(logMessage);
    fs.appendFileSync(path.join(CONFIG.logDirectory, CONFIG.logFile), logMessage + '\n');
  }
};

// Types
interface SitemapUrl {
  loc: string[];
  lastmod: string[];
  changefreq: string[];
  priority: string[];
}

interface GroupedUrls {
  home: string[];
  collections: Record<string, string[]>;
  products: Record<string, Record<string, string[]>>;
  other: string[];
}

// Parse sitemap and extract URLs
async function getSitemapUrls(): Promise<string[]> {
  try {
    const response = await axios.get(CONFIG.sitemapUrl);
    const result = await parseStringPromise(response.data);
    const urls = result.urlset.url.map((url: SitemapUrl) => url.loc[0]);
    return urls;
  } catch (error) {
    logger.log(`Error fetching sitemap: ${error}`);
    return [];
  }
}

// Group URLs by collection and product type
function groupUrlsByType(urls: string[]): GroupedUrls {
  const grouped: GroupedUrls = {
    home: [],
    collections: {},
    products: {},
    other: [],
  };

  for (const url of urls) {
    const urlPath = url.replace(CONFIG.baseUrl, '');

    // Home page
    if (urlPath === '/' || urlPath === '') {
      grouped.home.push(url);
      continue;
    }

    // Our story page
    if (urlPath === '/our-story') {
      grouped.other.push(url);
      continue;
    }

    // Collection pages
    if (urlPath.match(/^\/products\/[^/]+$/)) {
      const collection = urlPath.split('/').pop() || '';
      if (!grouped.collections[collection]) {
        grouped.collections[collection] = [];
      }
      grouped.collections[collection].push(url);
      continue;
    }

    // Product pages
    if (urlPath.match(/^\/products\/[^/]+\/[^/]+$/)) {
      const parts = urlPath.split('/');
      const collection = parts[2];
      const product = parts[3];

      // Determine product type (ring, necklace, bracelet, earrings)
      let productType = 'other';

      if (product.includes('ring')) {
        productType = 'ring';
      } else if (product.includes('necklace') || product.includes('choker') || product.includes('pendant') || product.includes('collar')) {
        productType = 'necklace';
      } else if (product.includes('bracelet') || product.includes('cuff') || product.includes('band')) {
        productType = 'bracelet';
      } else if (product.includes('earrings') || product.includes('stud') || product.includes('hoop')) {
        productType = 'earrings';
      }

      if (!grouped.products[collection]) {
        grouped.products[collection] = {};
      }

      if (!grouped.products[collection][productType]) {
        grouped.products[collection][productType] = [];
      }

      grouped.products[collection][productType].push(url);
      continue;
    }

    // Other pages
    grouped.other.push(url);
  }

  return grouped;
}

// Weighted random selection based on weights
function weightedRandom<T>(items: T[], weights: Record<string, number>, defaultWeight = 1): T {
  const itemsWithWeights = items.map((item) => ({
    item,
    weight: weights[String(item)] || defaultWeight
  }));

  const totalWeight = itemsWithWeights.reduce((sum, { weight }) => sum + weight, 0);
  let random = Math.random() * totalWeight;

  for (const { item, weight } of itemsWithWeights) {
    random -= weight;
    if (random <= 0) {
      return item;
    }
  }

  return items[0]; // Fallback
}

// Generate a random visitor journey
function generateVisitorJourney(groupedUrls: GroupedUrls, visitsCount: number): string[] {
  const journey: string[] = [];

  // Start from home page
  journey.push(groupedUrls.home[0]);

  // Get available collections
  const collections = Object.keys(groupedUrls.collections);

  // Choose a primary collection for this visitor using weighted selection
  const primaryCollection = weightedRandom(
    collections,
    CONFIG.collectionWeights
  );

  // Add collection page
  journey.push(groupedUrls.collections[primaryCollection][0]);

  // Get available product types for this collection
  const productTypes = Object.keys(groupedUrls.products[primaryCollection] || {});

  // Choose a primary product type using weighted selection
  const primaryProductType = weightedRandom(
    productTypes,
    CONFIG.productTypeWeights,
    1
  );

  // Add products of the primary type from the primary collection
  const primaryProducts = groupedUrls.products[primaryCollection]?.[primaryProductType] || [];

  if (primaryProducts.length > 0) {
    // Shuffle products to get random ones
    const shuffledProducts = [...primaryProducts].sort(() => Math.random() - 0.5);

    // Add products to journey (at least 1, but no more than visitsCount-2)
    const productsToAdd = Math.min(
      Math.max(1, Math.floor(Math.random() * (visitsCount - 2)) + 1),
      shuffledProducts.length
    );

    for (let i = 0; i < productsToAdd; i++) {
      journey.push(shuffledProducts[i]);
    }
  }

  // If we need more pages, add from other collections or other pages
  while (journey.length < visitsCount) {
    // Decide what to do next
    const nextAction = Math.random();

    if (nextAction < 0.4) {
      // 40% chance: Visit another product from the same collection but different type
      const otherProductTypes = productTypes.filter(pt => pt !== primaryProductType);

      if (otherProductTypes.length > 0) {
        const randomType = weightedRandom(
          otherProductTypes,
          CONFIG.productTypeWeights,
          1
        );

        const typeProducts = groupedUrls.products[primaryCollection]?.[randomType] || [];

        if (typeProducts.length > 0) {
          journey.push(typeProducts[Math.floor(Math.random() * typeProducts.length)]);
          continue;
        }
      }
    } else if (nextAction < 0.7) {
      // 30% chance: Visit another collection
      const otherCollections = collections.filter(c => c !== primaryCollection);

      if (otherCollections.length > 0) {
        const randomCollection = weightedRandom(
          otherCollections,
          CONFIG.collectionWeights
        );

        // First visit the collection page
        if (Math.random() < 0.7 && journey.length < visitsCount - 1) {
          journey.push(groupedUrls.collections[randomCollection][0]);
        }

        // Then visit a product from that collection
        const collectionProductTypes = Object.keys(groupedUrls.products[randomCollection] || {});

        if (collectionProductTypes.length > 0) {
          const randomType = weightedRandom(
            collectionProductTypes,
            CONFIG.productTypeWeights,
            1
          );

          const typeProducts = groupedUrls.products[randomCollection]?.[randomType] || [];

          if (typeProducts.length > 0) {
            journey.push(typeProducts[Math.floor(Math.random() * typeProducts.length)]);
            continue;
          }
        }
      }
    } else if (nextAction < 0.85 && groupedUrls.other.length > 0) {
      // 15% chance: Visit an "other" page
      journey.push(groupedUrls.other[Math.floor(Math.random() * groupedUrls.other.length)]);
    } else {
      // 15% chance: Go back to home
      journey.push(groupedUrls.home[0]);
    }
  }

  return journey;
}

// Simulate a visitor browsing the site
async function simulateVisitor(visitorId: number, journey: string[]) {
  // Alternate between Chrome and Firefox for different visitors
  const browser = visitorId % 2 === 0
    ? await chromium.launch({ headless: CONFIG.headless, slowMo: CONFIG.slowMo })
    : await firefox.launch({ headless: CONFIG.headless, slowMo: CONFIG.slowMo });

  // Create a unique context for this visitor
  const context = await browser.newContext({
    userAgent: `VedaSimulatedVisitor/${visitorId}`,
    viewport: {
      width: 1280 + Math.floor(Math.random() * 300),
      height: 720 + Math.floor(Math.random() * 200)
    },
  });

  const page = await context.newPage();

  try {
    logger.log(`Visitor ${visitorId} started journey`);

    for (let i = 0; i < journey.length; i++) {
      const url = journey[i];
      logger.log(`Visitor ${visitorId} navigating to: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle' });

      // Random time on page
      const timeOnPage = Math.floor(
        Math.random() * (CONFIG.maxTimeOnPage - CONFIG.minTimeOnPage) + CONFIG.minTimeOnPage
      );

      // Scroll behavior
      if (Math.random() < CONFIG.scrollProbability) {
        // Scroll down to a random position
        await page.evaluate(() => {
          const scrollDepth = Math.random() * document.body.scrollHeight * 0.8;
          window.scrollTo({
            top: scrollDepth,
            behavior: 'smooth'
          });
        });

        await page.waitForTimeout(1000);

        // Sometimes scroll more
        if (Math.random() > 0.5) {
          await page.evaluate(() => {
            const currentScroll = window.scrollY;
            const maxScroll = document.body.scrollHeight;
            const newScroll = Math.min(currentScroll + (Math.random() * 500), maxScroll * 0.9);

            window.scrollTo({
              top: newScroll,
              behavior: 'smooth'
            });
          });

          await page.waitForTimeout(1000);
        }

        // Sometimes scroll back up
        if (Math.random() > 0.7) {
          await page.evaluate(() => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });
        }
      }

      // Click on interactive elements
      if (Math.random() < CONFIG.clickProbability) {
        try {
          // Try to find and click on elements based on page type
          if (url.includes('/products/') && !url.includes('/products/digital-dawn') &&
            !url.includes('/products/elegant-rebellion') && !url.includes('/products/urban-armor') &&
            !url.includes('/products/charmed-revival')) {
            // Product detail page - click on product images, size selectors, etc.
            const productSelectors = [
              'img[alt*="product"]',
              'button:not([disabled])',
              '[role="button"]',
              '.product-image',
              '.product-gallery img',
              '.size-selector button',
              '.color-selector button'
            ];

            for (const selector of productSelectors) {
              const elements = await page.$$(selector);
              if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                await randomElement.click().catch(() => { });
                await page.waitForTimeout(1000);
                break;
              }
            }
          } else if (url.includes('/products/') && (url.includes('/products/digital-dawn') ||
            url.includes('/products/elegant-rebellion') || url.includes('/products/urban-armor') ||
            url.includes('/products/charmed-revival'))) {
            // Collection page - click on product cards
            const collectionSelectors = [
              '.product-card',
              '.product-card img',
              '.product-title',
              '.collection-item a',
              '.product-link'
            ];

            for (const selector of collectionSelectors) {
              const elements = await page.$$(selector);
              if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];

                // Don't actually navigate by clicking, as we want to follow our journey
                // Just simulate the click for tracking purposes
                await page.evaluate((el) => {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  // Highlight the element to simulate hover
                  el.style.outline = '2px solid rgba(255, 255, 0, 0.5)';
                  setTimeout(() => { el.style.outline = ''; }, 500);
                }, randomElement);

                await page.waitForTimeout(1000);
                break;
              }
            }
          }
        } catch (error) {
          // Ignore errors from interaction attempts
        }
      }

      await page.waitForTimeout(timeOnPage);
    }

    logger.log(`Visitor ${visitorId} completed journey`);
  } catch (error) {
    logger.log(`Error with visitor ${visitorId}: ${error}`);
  } finally {
    await browser.close();
  }
}

// Main function
async function main() {
  logger.log('Starting visitor simulation');

  try {
    // Get sitemap URLs
    const urls = await getSitemapUrls();
    logger.log(`Fetched ${urls.length} URLs from sitemap`);

    // Group URLs by type
    const groupedUrls = groupUrlsByType(urls);

    // Log grouped URLs info
    const collections = Object.keys(groupedUrls.collections);
    logger.log(`Found ${collections.length} collections: ${collections.join(', ')}`);

    for (const collection of collections) {
      const productTypes = Object.keys(groupedUrls.products[collection] || {});
      const productCounts = productTypes.map(type =>
        `${type}: ${groupedUrls.products[collection]?.[type]?.length || 0}`
      );
      logger.log(`Collection "${collection}" has products: ${productCounts.join(', ')}`);
    }

    // Start visitor simulations in batches
    let completedVisitors = 0;

    while (completedVisitors < CONFIG.totalVisitors) {
      const batchSize = Math.min(CONFIG.concurrentVisitors, CONFIG.totalVisitors - completedVisitors);
      const visitors = [];

      for (let i = 0; i < batchSize; i++) {
        const visitorId = completedVisitors + i + 1;
        const journey = generateVisitorJourney(groupedUrls, CONFIG.visitsPerVisitor);
        logger.log(`Visitor ${visitorId} journey: ${journey.map(url => url.replace(CONFIG.baseUrl, '')).join(' -> ')}`);
        visitors.push(simulateVisitor(visitorId, journey));
      }

      await Promise.all(visitors);
      completedVisitors += batchSize;
      logger.log(`Completed ${completedVisitors}/${CONFIG.totalVisitors} visitor simulations`);
    }

    logger.log('All visitor simulations completed');

  } catch (error) {
    logger.log(`Error in main process: ${error}`);
  }
}

// Run the simulation
main(); 