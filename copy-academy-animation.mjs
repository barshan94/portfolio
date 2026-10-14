import { copyFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const source = resolve(root, 'mount-royal-academy-animation.html');
const destination = resolve(root, 'dist', 'mount-royal-academy-animation.html');

await access(source);
await access(resolve(root, 'dist'));

await copyFile(source, destination);
console.log('Mount Royal Academy animation copied to dist.');
