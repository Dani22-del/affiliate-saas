import fs from 'fs';
const clientCode = fs.readFileSync('node_modules/vite/dist/client/client.mjs', 'utf8');
const search = (term: string) => {
  const index = clientCode.indexOf(term);
  if (index !== -1) {
    console.log(clientCode.substring(Math.max(0, index - 50), index + 50));
  }
}
search('fetch');
