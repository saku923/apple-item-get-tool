import { fetchHtml, extractBootstrap, findTargetItems } from "./apple";

async function main() {
  try {
    const html = await fetchHtml();
    const data = extractBootstrap(html);
    const items = findTargetItems(data.tiles);

    if (!items || items.length === 0) {
      console.log("該当の商品が見つかりませんでした。");
    } else {
      console.log("該当の商品が見つかりました！");

      items.forEach((item) => {
        const { dimensionCapacity, refurbClearModel, dimensionColor } =
          item.filters.dimensions;

        console.log(dimensionCapacity);
        console.log(refurbClearModel);
        console.log(dimensionColor);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

main();
