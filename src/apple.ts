const TARGET = {
  capacity: "256gb",
  model: "iphone15plus",
};

export type Tile = {
  filters: {
    dimensions: {
      dimensionCapacity: string;
      refurbClearModel: string;
      dimensionColor: string;
    };
  };
};

export const fetchHtml = async () => {
  const response = await fetch(
    "https://www.apple.com/jp/shop/refurbished/iphone",
  );
  return response.text();
};

export const extractBootstrap = (html: string) => {
  const start = html.indexOf("window.REFURB_GRID_BOOTSTRAP");
  if (start === -1) {
    throw new Error("REFURB_GRID_BOOTSTRAP が見つかりませんでした");
  }
  const end = html.indexOf("};", start);

  const bootstrap = html.slice(start, end + 1);

  const jsonText = bootstrap.replace("window.REFURB_GRID_BOOTSTRAP = ", "");

  const data = JSON.parse(jsonText);
  return data;
};

export const findTargetItems = (items: Tile[]) => {
  return items.filter((item) => {
    const { dimensionCapacity, refurbClearModel } = item.filters.dimensions;

    return (
      dimensionCapacity === TARGET.capacity && refurbClearModel === TARGET.model
    );
  });
};
