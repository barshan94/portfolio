import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('src/pages/index.astro');
if (!fs.existsSync(file)) {
  console.error('Could not find src/pages/index.astro. Run this script from your portfolio project root.');
  process.exit(1);
}

const source = fs.readFileSync(file, 'utf8');
const lines = source.split(/\r?\n/);
const stack = [];
const blocks = [];

for (let i = 0; i < lines.length; i++) {
  const trimmed = lines[i].trim();
  let match;

  if ((match = trimmed.match(/^\{#if\s+(.+)\}$/))) {
    const block = { type: 'if', line: i, hasElse: false, hasFinalElse: false };
    stack.push(block);
    blocks.push(block);
  } else if ((match = trimmed.match(/^\{#each\s+(.+?)\s+as\s+([A-Za-z_$][\w$]*)(?:\s*,\s*([A-Za-z_$][\w$]*))?\}$/))) {
    const block = { type: 'each', line: i };
    stack.push(block);
    blocks.push(block);
  } else if (/^\{:else(?:\s+if\s+.+)?\}$/.test(trimmed)) {
    if (!stack.length || stack[stack.length - 1].type !== 'if') {
      console.error(`Unexpected else directive at line ${i + 1}; no file was changed.`);
      process.exit(1);
    }
    stack[stack.length - 1].hasElse = true;
    if (trimmed === '{:else}') stack[stack.length - 1].hasFinalElse = true;
  } else if (trimmed === '{/if}' || trimmed === '{/each}') {
    const expected = trimmed === '{/if}' ? 'if' : 'each';
    const block = stack.pop();
    if (block) block.endLine = i;
    if (!block || block.type !== expected) {
      console.error(`Mismatched closing directive at line ${i + 1}; no file was changed.`);
      process.exit(1);
    }
  }
}

if (stack.length) {
  console.error('Found an unclosed template block; no file was changed.');
  process.exit(1);
}

const transformed = lines.map((line, i) => {
  const trimmed = line.trim();
  const indent = line.match(/^\s*/)[0];
  let match;

  if ((match = trimmed.match(/^\{#if\s+(.+)\}$/))) {
    const block = blocks.find((item) => item.type === 'if' && item.line === i);
    return `${indent}{${match[1]}${block.hasElse ? ' ? (' : ' && ('}`;
  }
  if ((match = trimmed.match(/^\{:else\s+if\s+(.+)\}$/))) {
    return `${indent}) : ${match[1]} ? (`;
  }
  if (trimmed === '{:else}') return `${indent}) : (`;
  if (trimmed === '{/if}') {
    const block = blocks.find((item) => item.type === 'if' && item.endLine === i);
    return indent + (block?.hasElse && !block.hasFinalElse ? ') : null}' : ')}');
  }

  if ((match = trimmed.match(/^\{#each\s+(.+?)\s+as\s+([A-Za-z_$][\w$]*)(?:\s*,\s*([A-Za-z_$][\w$]*))?\}$/))) {
    const index = match[3] ? `, ${match[3]}` : '';
    return `${indent}{${match[1]}.map((${match[2]}${index}) => (`;
  }
  if (trimmed === '{/each}') return `${indent}))}`;
  return line;
}).join('\n');

if (/\{#(?:if|each)\b|\{\/(?:if|each)\}|\{:else\b/.test(transformed)) {
  console.error('Some Svelte-style directives remain; no file was changed.');
  process.exit(1);
}

const backup = `${file}.pre-astro-fix.bak`;
if (fs.existsSync(backup)) {
  console.error(`Backup already exists at ${backup}; refusing to overwrite it. No file was changed.`);
  process.exit(1);
}
fs.copyFileSync(file, backup);
fs.writeFileSync(file, transformed, 'utf8');
console.log('Converted Astro template control-flow syntax.');
console.log(`Backup saved: ${path.relative(process.cwd(), backup)}`);
console.log(`Converted ${blocks.filter((b) => b.type === 'if').length} conditional blocks and ${blocks.filter((b) => b.type === 'each').length} loops.`);
console.log('Next run: npm run build');
