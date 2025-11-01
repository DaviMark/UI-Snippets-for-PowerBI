document.addEventListener("DOMContentLoaded", () => {

  // ABRIR/FECHAR CÓDIGO
  document.querySelectorAll(".toggle-code").forEach(btn => {
    btn.addEventListener("click", () => {
      const block = btn.closest(".component-block");
      const codePanel = block.querySelector(".code-panel");

      if (codePanel.classList.contains("d-none")) {
        codePanel.classList.remove("d-none");
        btn.textContent = "Fechar código";
      } else {
        codePanel.classList.add("d-none");
        btn.textContent = "Abrir código";
      }
    });
  });

  // ALTERNAR HTML / POWER BI
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

  // COPIAR CÓDIGO
  document.querySelectorAll(".copy-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const code = btn.closest(".code-panel").querySelector("pre:not(.d-none) code");
      navigator.clipboard.writeText(code.textContent.trim());
      btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#00ff99" viewBox="0 0 16 16"><path d="M13.485 1.929L6 9.414 2.515 5.929 1.1 7.343l4.9 4.9L14.9 3.343z"/></svg>';
      setTimeout(() => {
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#ccc" viewBox="0 0 16 16">
          <path d="M10 1.5v1H3a1 1 0 0 0-1 1v9h1v-9h7V1.5z"/>
          <path d="M5 4.5A1.5 1.5 0 0 0 3.5 6v8A1.5 1.5 0 0 0 5 15.5h7A1.5 1.5 0 0 0 13.5 14V6A1.5 1.5 0 0 0 12 4.5H5zM5 6h7v8H5V6z"/>
        </svg>`;
      }, 1500);
    });
  });
});
