import { ImageHandlers } from "./src/index";

(async () => {
  const result = await ImageHandlers.urlHandler.save(
    "https://jpeg.org/images/jpeg-home.jpg",
    "images"
  );
  console.log("Saved to:", result);
})();
