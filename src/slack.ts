import type { Tile } from "./apple";

const createSlackMessage = (items: Tile[]) => {
  const itemMessages = items.map((item) => {
    const { dimensionCapacity, refurbClearModel, dimensionColor } =
      item.filters.dimensions;

    return [
      "----------------------------------------------------------------------------------------------------------------------------",
      `タイトル: ${item.title}`,
      `容量: ${dimensionCapacity}`,
      `モデル: ${refurbClearModel}`,
      `色: ${dimensionColor}`,
      `URL: https://www.apple.com/${item.productDetailsUrl}`,
    ].join("\n");
  });

  return [
    "🎉 該当の商品が見つかりました！",
    ...itemMessages,
    "----------------------------------------------------------------------------------------------------------------------------",
  ].join("\n\n");
};

export const notifySlack = async (items: Tile[]) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not set");
  }

  const message = createSlackMessage(items);

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: message,
    }),
  });
};
