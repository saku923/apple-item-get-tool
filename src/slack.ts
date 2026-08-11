import type { Tile } from "./apple";

export const notifySlack = async (items: Tile[]) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error("SLACK_WEBHOOK_URL is not set");
  }

  const message = items
    .map((item) => {
      const { dimensionCapacity, refurbClearModel, dimensionColor } =
        item.filters.dimensions;

      const itemMessage = `
            -------------------------------
            タイトル: ${item.title}
            容量: ${dimensionCapacity}
            モデル: ${refurbClearModel}
            色: ${dimensionColor}
            URL: https://www.apple.com/${item.productDetailsUrl}
        `;

      return itemMessage;
    })
    .join("\n");

  await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: `🎉 該当の商品が見つかりました！\n${message}\n-------------------------------`,
    }),
  });
};
