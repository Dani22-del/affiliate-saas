import fs from 'fs';
const f = 'dist/assets/' + fs.readdirSync('dist/assets').find((f: string) => f.endsWith('.js'));
const content = fs.readFileSync(f, 'utf8');
const search = (term: string) => {
  const index = content.indexOf(term);
  if (index !== -1) {
    console.log(content.substring(Math.max(0, index - 50), index + 50));
  }
};
search('"fetch"');
search("'fetch'");
search('defineProperty');
