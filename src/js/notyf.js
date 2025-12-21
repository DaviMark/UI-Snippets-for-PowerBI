document.addEventListener("DOMContentLoaded", function () {
  const notyf = new Notyf({
    duration: 8000,
    position: { x: 'right', y: 'top' },
    dismissible: true,
    ripple: false,
    types: [
      {
        type: 'update',
        background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
        icon: {
          className: 'bi bi-lightning-charge-fill',
          tagName: 'i',
          text: ''
        }
      }
    ]
  });

  setTimeout(() => {
    const notif = notyf.open({
      type: 'update',
      message: `
        <div style="
          max-width: 880px;
          width: 100%;
          cursor: pointer;
        ">
          <div style="
            font-weight: 700;
            font-size: 15.5px;
            margin-bottom: 6px;
          ">
            Nota de atualização 4.0
          </div>

          <div style="
            font-size: 13.5px;
            line-height: 1.5;
            opacity: 0.95;
          ">
            1. Visuais Customizados, apenas importar e usar como um componente padrão.
            2. Novos visuais Premium como Kanban entre outros<br>
            3. Capas animadas em HTML + CSS para páginas iniciais<br>
            4. Storytelling aprimorado com seções dinâmicas e elementos de narrativa visual
          </div>
        </div>
      `
    });

    document.querySelector('.notyf__toast').addEventListener('click', () => {
      window.location.href = '/src/pages/visuais_premium.html';
    });

  }, 1000);
});
