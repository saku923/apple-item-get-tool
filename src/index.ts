const TARGET = {
  capacity: "256gb",
  model: "iphone15",
};

async function main() {
  try {
    const response = await fetch(
      "https://www.apple.com/jp/shop/refurbished/iphone",
    );
    const html = await response.text();
    const start = html.indexOf("window.REFURB_GRID_BOOTSTRAP");
    if (start === -1) {
      throw new Error("REFURB_GRID_BOOTSTRAP が見つかりませんでした");
    }
    const end = html.indexOf("};", start);

    const bootstrap = html.slice(start, end + 1);

    const jsonText = bootstrap.replace("window.REFURB_GRID_BOOTSTRAP = ", "");

    const data = JSON.parse(jsonText);

    const items = data.tiles;
    items.forEach((item: any) => {
      console.log(item.filters.dimensions);
      if (
        item.filters.dimensions.dimensionCapacity === TARGET.capacity &&
        item.filters.dimensions.refurbClearModel === TARGET.model
      ) {
        console.log("該当の商品が見つかりました！");
        console.log(item.filters.dimensions.dimensionCapacity);
        console.log(item.filters.dimensions.refurbClearModel);
      }
    });
  } catch (error) {
    console.error(error);
  }
}

main();
