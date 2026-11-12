import { build } from 'esbuild';
await build({entryPoints:['src/main.tsx'], bundle:true, minify:true, format:'iife', jsx:'automatic', target:['es2020'], outfile:'assets/site.js', define:{'process.env.NODE_ENV':'"production"'}});
