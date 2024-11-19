import { ImageHandlers } from ".";

async function main() {
  const customDir = 'image';
  const imageUrl = 'https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D';

  const urlSaved = await ImageHandlers.urlHandler.save(imageUrl, customDir);
  console.log('URL image saved at:', urlSaved);
}

main().catch(console.error);
