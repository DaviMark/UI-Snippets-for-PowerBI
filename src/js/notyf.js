
  document.addEventListener("DOMContentLoaded", function () {
    const notyf = new Notyf({
      duration: 7000,
      position: { x: 'right', y: 'top' },
      dismissible: true,
      ripple: false,
      types: [
        {
          type: 'update',
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b)', /* amarelo → laranja */
          icon: {
            className: 'bi bi-lightning-charge-fill',
            tagName: 'i',
            text: ''
          }
        }
      ]
    });

    // Exibe a notificação
    setTimeout(() => {
      const notif = notyf.open({
        type: 'update',
        message: `
          <div style="
            font-weight:700; 
            font-size:15px;
            margin-bottom:4px;
            cursor:pointer;
          ">Nota de atualização 2.0</div>
          <div style="font-size:13.5px; opacity:0.9; line-height:1.4; cursor:pointer;">
            1. Inclusão de novos visuais HTML<br>
            2. Visuais PLUS: Gráficos JSON
          </div>
        `
      });

      // Quando o usuário clicar na notificação → redireciona
      document.querySelector('.notyf__toast').addEventListener('click', () => {
        window.location.href = '/src/pages/vs_JSON.html';
      });

    }, 1000);
  });

