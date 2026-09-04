/**
 * ORVEXA GLOBAL TECH - SECURITY & SOURCE SHIELD JS
 * Enterprise client-side defense: Disables devtools shortcuts, right-click scraping,
 * and text extraction to protect proprietary assets.
 */

(function () {
  'use strict';

  // 1. Disable Right Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
  }, false);

  // 2. Disable DevTools and Source Inspection Shortcuts
  document.addEventListener('keydown', function (e) {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.keyCode === 73)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+J / Cmd+Option+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'J' || e.key === 'j' || e.keyCode === 74)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c' || e.keyCode === 67)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+U / Cmd+Option+U (View Source)
    if ((e.ctrlKey || e.metaKey) && (e.key === 'u' || e.key === 'U' || e.keyCode === 85)) {
      e.preventDefault();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S' || e.keyCode === 83)) {
      e.preventDefault();
      return false;
    }
  }, false);

  // 3. Branded Console Protection Warning
  try {
    const bannerStyle = 'color: #38567d; font-size: 20px; font-weight: bold; text-shadow: 1px 1px 2px black;';
    const warningStyle = 'color: #e2e4de; font-size: 13px; font-weight: normal;';
    console.log('%cORVEXA GLOBAL TECH', bannerStyle);
    console.log('%cProtected Proprietary System. Unauthorized inspection or reverse engineering is monitored.', warningStyle);
  } catch (err) {}
})();
