import { copyFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const dist = resolve(root, 'dist');

const animations = [
    {
    source: '999-emergency-service-animation.html',
    destination: '999-emergency-service-animation.html',
    label: '999 National Emergency Service',
  },
  {
    source: 'mount-royal-academy-animation.html',
    destination: 'mount-royal-academy-animation.html',
    label: 'Mount Royal Academy',
  },
  {
    source: 'asta-store-animation.html',
    destination: 'asta-store-animation.html',
    label: 'Asta Store',
  },
];
  
 
await access(dist);

for (const animation of animations) {
  const source = resolve(root, animation.source);
  const destination = resolve(dist, animation.destination);

  await access(source);
  await copyFile(source, destination);
  console.log(`${animation.label} animation copied to dist.`);
}
