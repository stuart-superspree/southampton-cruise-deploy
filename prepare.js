// One-time prep script. Copies the live HTML demo file from the parent
// "Superspree and Wayfinding" folder into ./public/index.html so it's
// bundled with the deployable folder.
//
// Run from inside southampton-cruise-deploy/:
//   node prepare.js
//
// Re-run any time the live HTML is updated.

const fs = require('fs');
const path = require('path');

const SRC = path.resolve(__dirname, '..', 'Southampton_Cruise_Wayfinding_v1.html');
const DST_DIR = path.join(__dirname, 'public');
const DST = path.join(DST_DIR, 'index.html');

function fail(msg) {
  console.error('\n  ✗ ' + msg + '\n');
  process.exit(1);
}

console.log('\n  Preparing Southampton Cruise Wayfinding for deploy...\n');

if (!fs.existsSync(SRC)) {
  fail('Cannot find source HTML at: ' + SRC +
    '\n  Expected this script to live next to the workspace folder containing the HTML.');
}

try {
  fs.mkdirSync(DST_DIR, { recursive: true });
  fs.copyFileSync(SRC, DST);
} catch (err) {
  fail('Copy failed: ' + err.message);
}

const size = fs.statSync(DST).size;
console.log('  ✓ Copied to public/index.html (' + Math.round(size / 1024) + ' KB)\n');
console.log('  Next steps:');
console.log('    git init');
console.log('    git add .');
console.log('    git commit -m "Initial commit"');
console.log('    git push to GitHub, then connect on https://railway.app\n');
