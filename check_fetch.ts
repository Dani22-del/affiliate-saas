import fs from 'fs';
const files = ['dist/assets/' + fs.readdirSync('dist/assets').find(f => f.endsWith('.js'))];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const index = content.indexOf('fetch=');
  if (index !== -1) {
    console.log(content.substring(Math.max(0, index - 50), index + 50));
  }
  const index2 = content.indexOf('fetch =');
  if (index2 !== -1) {
    console.log(content.substring(Math.max(0, index2 - 50), index2 + 50));
  }
  const index3 = content.indexOf('.fetch=');
  if (index3 !== -1) {
    console.log(content.substring(Math.max(0, index3 - 50), index3 + 50));
  }
});
