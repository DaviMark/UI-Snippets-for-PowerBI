document.addEventListener("DOMContentLoaded", () => {
  const notyf = new Notyf({
    duration: 2500,
    position: {
      x: 'right',
      y: 'bottom'
    },
    types: [
      {
        type: 'success',
        background: '#129e58ff',
        icon: {
          className: 'fas fa-check',
          tagName: 'i',
          text: ''
        }
      }
    ]
  });

  // Alternar entre HTML e Power BI
  document.querySelectorAll(".toggle-view").forEach(btn => {
    btn.addEventListener("click", () => {
      const block = btn.closest(".component-block");
      block.querySelectorAll(".toggle-view").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const htmlCode = block.querySelector(".html-code").parentElement;
      const powerbiCode = block.querySelector(".powerbi-code").parentElement;

      if (btn.dataset.type === "html") {
        htmlCode.classList.remove("d-none");
        powerbiCode.classList.add("d-none");
      } else {
        htmlCode.classList.add("d-none");
        powerbiCode.classList.remove("d-none");
      }
    });
  });

  // Copiar código + feedback visual com Notyf
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const codeBlock = btn.closest(".code-panel").querySelector("pre:not(.d-none) code");
      const textToCopy = codeBlock.textContent.trim();

      navigator.clipboard.writeText(textToCopy).then(() => {
        notyf.success('Código copiado com sucesso!');
      }).catch(() => {
        notyf.error('Erro ao copiar o código.');
      });
    });
  });

  // Mostrar e ocultar código
  document.querySelectorAll(".toggle-code").forEach(button => {
    button.addEventListener("click", () => {
      const section = button.closest(".component-block");
      const codePanel = section.querySelector(".code-panel");

      codePanel.classList.toggle("d-none");
      button.textContent = codePanel.classList.contains("d-none") ? "Abrir código" : "Fechar código";
    });
  });
});
