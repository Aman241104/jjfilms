const fs = require('fs');
const https = require('https');

const urls = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d",
  "https://images.unsplash.com/photo-1519741497674-611481863552",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
  "https://images.unsplash.com/photo-1583939003579-730e3918a45a",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
  "https://images.unsplash.com/photo-1465495910483-e1104d11dc3b",
  "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed",
  "https://images.unsplash.com/photo-1520854221256-17451cc331bf",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b",
  "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68",
  "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
  "https://images.unsplash.com/photo-1600585154542-637a89557e05",
  "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8",
  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.request(url + "?q=80&w=200", { method: 'HEAD' }, (res) => {
      if (res.statusCode >= 400) {
        console.log(`ERROR ${res.statusCode}: ${url}`);
      }
      resolve();
    }).on('error', (err) => {
      console.log(`ERROR ${err.message}: ${url}`);
      resolve();
    }).end();
  });
}

async function main() {
  console.log("Checking images...");
  for (const url of urls) {
    await checkUrl(url);
  }
  console.log("Done.");
}

main();
