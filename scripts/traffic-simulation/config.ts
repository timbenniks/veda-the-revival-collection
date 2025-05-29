import path from 'path';

export const CONFIG = {
  // Website configuration
  baseUrl: 'https://veda-the-revival-collection-production.eu-contentstackapps.com',
  sitemapUrl: 'https://veda-the-revival-collection-production.eu-contentstackapps.com/sitemap.xml',

  // Visitor behavior configuration
  concurrentVisitors: Number(process.env.CONCURRENT_VISITORS) || 3, // Number of concurrent visitors/browsers
  totalVisitors: Number(process.env.TOTAL_VISITORS) || 10, // Total number of visitors to simulate
  visitsPerVisitor: Number(process.env.VISITS_PER_VISITOR) || 5, // Number of page visits per visitor
  minTimeOnPage: Number(process.env.MIN_TIME_ON_PAGE) || 600, // Minimum time on page in ms (5 seconds)
  maxTimeOnPage: Number(process.env.MAX_TIME_ON_PAGE) || 1200, // Maximum time on page in ms (30 seconds)
  scrollProbability: Number(process.env.SCROLL_PROBABILITY) || 0.8, // 80% chance to scroll on a page
  clickProbability: Number(process.env.CLICK_PROBABILITY) || 0.6, // 60% chance to click on interactive elements

  // Browser configuration
  headless: process.env.HEADLESS === 'true', // Set to true for headless mode (no visible browser)
  slowMo: Number(process.env.SLOW_MO) || 100, // Slow down Playwright operations by this amount of ms

  // Collection preferences - higher weight means more likely to be visited
  collectionWeights: {
    'digital-dawn': 2,
    'elegant-rebellion': 1.5,
    'urban-armor': 1,
    'charmed-revival': 1.2,
  },

  // Product type preferences - higher weight means more likely to be visited
  productTypeWeights: {
    'ring': 1,
    'necklace': 1,
    'bracelet': 1,
    'earrings': 15, // Much higher weight for earrings
  },

  // Category preferences - higher weight means more likely to be visited
  categoryWeights: {
    'rings': 1,
    'necklaces': 1,
    'bracelets': 1,
    'earrings': 15, // Much higher weight for earrings
  },

  // Browse method weights - higher weight means more likely to be used
  browseMethodWeights: {
    'by-collection': 1, // Browse by collection (Digital Dawn, Urban Armor, etc.)
    'by-category': 3,   // Increased preference for category browsing to favor earrings category
  },

  // Logging configuration
  logDirectory: path.join(process.cwd(), 'logs'),
  logFile: process.env.LOG_FILE || 'visitor-simulation.log',
}; 