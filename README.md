# Image Handler

A simple and efficient npm package for handling image uploads in Node.js applications. This package provides functions to save, update, and delete images. It allows you to save images in your local project and returns the path for storing in your database, making it easy to fetch them later. Additionally, it specifically handles images by allowing you to specify the image URL. This package utilizes three Node.js modules to manage image storage.
```bash
// This imports the built-in Node.js fs (File System) module, which provides an API for interacting with the file system. You can read, write, and manipulate files and directories using this module.
import fs from 'fs';

// This imports the built-in Node.js path module, which provides utilities for working with file and directory paths.
import path from 'path';

This imports the v4 function from the uuid package, which is used to generate unique identifiers (UUIDs). These identifiers are often used to create unique file names or IDs in databases, ensuring that each entity is distinct.
import { v4 as uuidv4 } from 'uuid';
```

## Installation

You can install the package via npm:

```bash
npm install image-handler-almant

//import
import { saveUrlImage,deleteImage,deleteImage,updateImage} from "image-handler-almant";
```

# Upload a Image
This it take a file image and return the string path

```bash
export async function saveImage(image: File): Promise<string> {
  // Ensure the uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique file name
  const ext = path.extname(image.name);
  const filename = `${uuidv4()}${ext}`;

  // Create the full path to save the image
  const filePath = path.join(uploadsDir, filename);

  // Convert the image Blob into a Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save the file to the public/uploads directory
  fs.writeFileSync(filePath, buffer);

  // Return the file path relative to the public directory
  return `/images/${filename}`;
}

```

It take the url post 
```bash
export async function saveFacebookImage(image: any): Promise<string> {
  try {
    // Ensure the uploads directory exists
    const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
    // Generate a unique file name (you may need to specify the extension)
    const ext = '.jpg'; // Change this based on the actual image type if needed
    const filename = `${uuidv4()}${ext}`;

    // Create the full path to save the image
    const filePath = path.join(uploadsDir, filename);

    // Convert the ArrayBuffer into a Buffer
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Directly convert the ArrayBuffer to Buffer

    // Save the file to the public/uploads directory
   fs.writeFileSync(filePath, buffer);

    // Return the file path relative to the public directory
    return `/images/${filename}`;
  } catch (error) {
    console.error('Error saving image:', error);
    throw error;
  }
}
```

Required the filename
```bash
export async function deleteImage(fileName: string): Promise<void> {
  if (fs.existsSync(fileName)) {
    try {
      fs.unlinkSync(fileName);
    } catch (error) {
      console.log(error);
    }
  }
}
```

When we update our image its good to delete the previously
```bash
export async function updateImage(image: File, oldPath: string): Promise<string> {
  // Ensure the uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'images');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Check if the old path exists
  const oldPathImage = path.join(process.cwd(), oldPath);
  if (fs.existsSync(oldPathImage)) {
    try {
      fs.unlinkSync(oldPathImage);
    } catch (error) {
      console.error(error);
    }
  }

  // Store a new one
  const ext = path.extname(image.name);
  const filename = `${uuidv4()}${ext}`;

  // Create the full path to save the image
  const filePath = path.join(uploadsDir, filename);

  // Convert the image Blob into a Buffer
  const arrayBuffer = await image.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Save the file to the public/uploads directory
  fs.writeFileSync(filePath, buffer);

  // Return the file path relative to the public directory
  return `/images/${filename}`;
}

```