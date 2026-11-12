import * as React from 'react';
import { createRoot } from 'react-dom/client';

import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockTitle,
} from './code-block';

const chapters = Array.from(document.querySelectorAll<HTMLElement>('section.chapter'));
const original = document.querySelector<HTMLElement>('nav.chapters');
if (original && chapters.length) {
  const nav = original.cloneNode(true) as HTMLElement;
  nav.className = 'progress';
  nav.setAttribute('aria-label', 'Progression du parcours');
  document.body.append(nav);
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>('a'));
  let current = '';
  let scheduled = false;
  function update() {
    scheduled = false;
    const line = Math.min(window.innerHeight * 0.3, 180);
    let active = '';
    for (const chapter of chapters) if (chapter.getBoundingClientRect().top <= line) active = chapter.id;
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2)
      active = chapters[chapters.length - 1].id;
    if (active === current) return;
    current = active;
    for (const link of links) {
      const selected = link.hash === `#${active}`;
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
      if (selected) nav.scrollLeft = link.offsetLeft - nav.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    }
  }
  function requestUpdate() {
    if (!scheduled) {
      scheduled = true;
      requestAnimationFrame(update);
    }
  }
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  window.addEventListener('hashchange', requestUpdate);
  update();
}

function domChildren(parent: Node): React.ReactNode[] {
  return Array.from(parent.childNodes).map((node, index) => {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
    if (node instanceof HTMLElement && node.tagName === 'SPAN')
      return (
        <span key={index} className={node.className}>
          {domChildren(node)}
        </span>
      );
    return node.textContent;
  });
}
for (const pre of Array.from(document.querySelectorAll<HTMLElement>('section.chapter pre'))) {
  const code = pre.querySelector('code');
  if (!code) continue;
  const text = code.textContent || '';
  const highlighted = domChildren(code);
  const mount = document.createElement('div');
  pre.replaceWith(mount);
  createRoot(mount).render(
    <CodeBlock>
      <CodeBlockHeader>
        <CodeBlockTitle>{pre.dataset.title || 'Code'}</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={text} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent>{highlighted}</CodeBlockContent>
    </CodeBlock>
  );
}
