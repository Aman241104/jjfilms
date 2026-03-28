const fs = require('fs');
const path = require('path');

const replacements = {
  "https://images.unsplash.com/photo-1465495910483-e1104d11dc3b": "https://images.unsplash.com/photo-1519225421980-715cb0215aed", // Wedding
  "https://images.unsplash.com/photo-1600607687644-c7171b42498b": "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9", // Real Estate
  "https://images.unsplash.com/photo-1600585154542-637a89557e05": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750"  // Real Estate
};

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    for (const [oldUrl, newUrl] of Object.entries(replacements)) {
      if (content.includes(oldUrl)) {
        content = content.split(oldUrl).join(newUrl);
        changed = true;
      }
    }
    
    if (changed) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});
