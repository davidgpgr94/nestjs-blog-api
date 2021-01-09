
import * as path from 'path';
import * as fs from 'fs';

export function destPath(rootFolder: string) {
  const today = new Date(Date.now());
  const year = `${today.getFullYear()}`;
  const month = `${today.getMonth() + 1}`;
  const day = `${today.getDate()}`;
  const finalDest = path.join(rootFolder, year, month, day);
  fs.mkdirSync(finalDest, { recursive: true });
  return finalDest;
}

export function finalFilename(originalFilename: string): string {
  const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E9);
  return `${uniquePrefix}-${originalFilename}`;
}
