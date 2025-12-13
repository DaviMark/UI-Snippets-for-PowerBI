const FEEDBACK_URL = 'https://script.google.com/macros/s/AKfycbzJ47LMSwAJWW9XtYsMswegAGZ613xFrfKQfybAnkDSTlSxTQyhKqNEgiNIRlwQhQLJ/exec';

const notyf = new Notyf({
  duration: 3500,
  position: { x: 'right', y: 'top' }
});

let ordemFeedback = 'new';

/* =======================
   INIT
======================= */
document.addEventListener('DOMContentLoaded', () => {
  const nomeSalvo = localStorage.getItem('feedback_nome');
  if (nomeSalvo && document.getElementById('feedbackName')) {
    document.getElementById('feedbackName').value = nomeSalvo;
  }

  bindOrdenacao();
  carregarFeedbacks();
});

/* =======================
   FORMATAR DATA (ROBUSTO)
======================= */
function formatarDataExibicao(valor) {
  if (!valor) return '';

  // Já está no formato dd/mm/yyyy
  if (typeof valor === 'string' && /^\d{2}\/\d{2}\/\d{4}$/.test(valor)) {
    return valor;
  }

  // ISO ou Date
  const data = new Date(valor);
  if (isNaN(data.getTime())) return String(valor);

  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

/* =======================
   ENVIO DE FEEDBACK
======================= */
document.getElementById('sendFeedback')?.addEventListener('click', async () => {
  const btn = document.getElementById('sendFeedback');
  const nomeInput = document.getElementById('feedbackName');
  const comentarioInput = document.getElementById('feedbackMessage');

  const nome = nomeInput.value.trim();
  const comentario = comentarioInput.value.trim();

  if (!nome || !comentario) {
    notyf.error('Preencha nome e comentário');
    return;
  }

  btn.disabled = true;
  btn.innerText = 'Enviando...';

  localStorage.setItem('feedback_nome', nome);

  const payload = new URLSearchParams({
    nome,
    comentario,
    data: formatarDataExibicao(new Date())
  });

  try {
    await fetch(FEEDBACK_URL, {
      method: 'POST',
      body: payload
    });

    comentarioInput.value = '';

    const modalEl = document.getElementById('feedbackModal');
    if (modalEl) {
      bootstrap.Modal.getInstance(modalEl)?.hide();
    }

    notyf.success('Feedback enviado com sucesso. Obrigado por contribuir');

    carregarFeedbacks();

  } catch (err) {
    console.error(err);
    notyf.error('Erro ao enviar feedback');
  } finally {
    btn.disabled = false;
    btn.innerText = 'Enviar';
  }
});

/* =======================
   CARREGAR FEEDBACKS
======================= */
async function carregarFeedbacks() {
  const loading = document.getElementById('feedbackLoading');
  const container = document.getElementById('feedbackList');
  if (!container) return;

  try {
    if (loading) loading.style.display = 'flex';
    container.innerHTML = '';

    const res = await fetch(FEEDBACK_URL);
    let dados = await res.json();

    if (ordemFeedback === 'old') {
      dados = dados.slice().reverse();
    }

    if (loading) loading.style.display = 'none';

    if (!dados.length) {
      container.innerHTML = `
        <div style="
          text-align: center;
          padding: 36px 16px;
          border: 1px dashed #e5e7eb;
          border-radius: 18px;
          background: linear-gradient(180deg, #ffffff, #fafafa);
        ">
          <div style="
            font-size: 16px;
            font-weight: 700;
            color: #111827;
            margin-bottom: 6px;
          ">
            Seja o primeiro a comentar
          </div>

          <div style="
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
            max-width: 420px;
            margin: 0 auto;
          ">
            Sua opinião pode inspirar outros e ajudar a evoluir a plataforma.
            Compartilhe sua experiência com a comunidade.
          </div>
        </div>

      `;
      return;
    }

    dados.forEach(item => {
      const card = document.createElement('div');

      card.innerHTML = `
        <div class="comment-card">
          <div class="comment-avatar">
            ${item.nome.slice(0, 2).toUpperCase()}
          </div>

          <div class="comment-content">
            <span class="comment-date">
              ${formatarDataExibicao(item.data)}
            </span>

            <div class="comment-header">
              <span class="comment-name">${item.nome}</span>
            </div>

            <div class="comment-text">
              ${item.comentario}
            </div>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    if (loading) loading.style.display = 'none';
    console.error('Erro ao carregar feedbacks', err);
  }
}

/* =======================
   ORDENACAO
======================= */
function bindOrdenacao() {
  document.querySelectorAll('.feedback-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document
        .querySelectorAll('.feedback-order-btn')
        .forEach(b => b.classList.remove('is-active'));

      btn.classList.add('is-active');
      ordemFeedback = btn.dataset.order;
      carregarFeedbacks();
    });
  });
}
