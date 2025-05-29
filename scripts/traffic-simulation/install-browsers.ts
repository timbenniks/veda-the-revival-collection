import { chromium, firefox } from '@playwright/test';

async function installBrowsers() {
  console.log('Installing Playwright browsers...');

  try {
    // Install Chromium
    console.log('Installing Chromium...');
    await chromium.launch();
    console.log('Chromium installed successfully');

    // Install Firefox
    console.log('Installing Firefox...');
    await firefox.launch();
    console.log('Firefox installed successfully');

    console.log('All browsers installed successfully');
  } catch (error) {
    console.error('Error installing browsers:', error);
    process.exit(1);
  }
}

// Run the installation
installBrowsers(); 