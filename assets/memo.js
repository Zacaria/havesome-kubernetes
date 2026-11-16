if (navigator.clipboard && window.isSecureContext) {
  document.querySelectorAll('.memo-commands figure').forEach((figure) => {
    const code = figure.querySelector('code');
    const label = figure.querySelector('figcaption');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'memo-copy';
    button.textContent = 'Copier';
    button.setAttribute('aria-label', `Copier : ${label.textContent}`);
    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(code.textContent);
        button.textContent = 'Copié';
      } catch {
        button.textContent = 'Sélectionnez la commande pour la copier';
      }
    });
    figure.append(button);
  });
}
