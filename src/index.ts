import { fetchHtml, extractBootstrap, findTargetItems } from "./apple";
import { notifySlack } from "./slack";

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

        console.log("-------------------------------");
        console.log("タイトル:", item.title);
        console.log("容量:", dimensionCapacity);
        console.log("モデル:", refurbClearModel);
        console.log("色:", dimensionColor);
        console.log("URL:", `https://www.apple.com/${item.productDetailsUrl}`);
      });

      await notifySlack(items);
    }
  } catch (error) {
    console.error(error);
  }
}

main();
