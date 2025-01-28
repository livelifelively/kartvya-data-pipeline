import path from "path";
import fs from "fs";

export const copyFilesWithStructure = (sourceDir: string, targetDir: string, fileNames: string[]) => {
  fileNames.forEach((fileName) => {
    // Construct the full path of the source file
    const sourceFilePath = path.join(sourceDir, fileName);

    // Check if the source file exists
    if (!fs.existsSync(sourceFilePath)) {
      console.error(`Source file does not exist: ${sourceFilePath}`);
      return;
    }

    // Get the relative directory path of the file
    const relativeDir = path.dirname(fileName);

    // Create the target directory structure
    const targetDirPath = path.join(targetDir, relativeDir);
    fs.mkdirSync(targetDirPath, { recursive: true });

    // Construct the target file path
    const targetFilePath = path.join(targetDirPath, path.basename(fileName));

    // Copy the file
    fs.copyFileSync(sourceFilePath, targetFilePath);
    console.log(`Copied ${sourceFilePath} to ${targetFilePath}`);
  });
};
