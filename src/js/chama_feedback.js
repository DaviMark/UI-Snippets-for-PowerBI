
document.addEventListener("DOMContentLoaded", function () {
  const trigger = document.getElementById('feedback-notify');
  if (!trigger) return;

  const notyf = new Notyf({
    duration: 10000,
    position: { x: 'left', y: 'bottom' },
    dismissible: true,
    ripple: false,
    types: [
      {
        type: 'feedback',
        background: 'linear-gradient(135deg, #111827, #374151)',
        icon: {
          className: 'bi bi-chat-dots-fill',
          tagName: 'i',
          text: ''
        }
      }
    ]
  });

  setTimeout(() => {
    const toast = notyf.open({
      type: 'feedback',
      message: `
        <div style="cursor:pointer">
          <div style="
            font-weight:700;
            font-size:14.5px;
            margin-bottom:4px;
          ">
            Quer deixar um comentário?
          </div>

          <div style="
            font-size:13px;
            line-height:1.45;
            opacity:0.9;
          ">
            Compartilhe sua opinião e ajude a melhorar a experiência.
          </div>
        </div>
      `
    });

    // Clique leva para a seção de comentários
    toast.on('click', () => {
      window.location.href = '/src/pages/comentarios.html';
    });

  }, 1200);
});

