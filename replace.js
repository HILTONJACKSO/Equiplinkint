const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('src');
files.push('README.md');

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    if (content.includes('EquipLiberia')) {
      content = content.replace(/EquipLiberia/g, 'Equiplink');
      changed = true;
    }
    if (content.includes('equipliberia')) {
      content = content.replace(/equipliberia/g, 'equiplink');
      changed = true;
    }
    if (content.includes('Equip<span className="text-amber-500">Liberia</span>')) {
      content = content.replace(/Equip<span className="text-amber-500">Liberia<\/span>/g, 'Equip<span className="text-amber-500">link<\/span>');
      changed = true;
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    }
  }
});
