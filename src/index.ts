import { fetchHtml, extractBootstrap, findTargetItems } from "./apple";

async function main() {
  try {
    const html = await fetchHtml();
    const data = extractBootstrap(html);
    const items = findTargetItems(data.tiles);
  } catch (error) {
    console.error(error);
  }
}

main();
