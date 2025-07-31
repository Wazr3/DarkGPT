// Vérification de la clé dans VALID_KEYS (importé via assets/keys.js)
const loginBtn = document.getElementById('login-btn');
const keyInput = document.getElementById('key-input');
const errorMsg = document.getElementById('error-msg');

function animateRedirect() {
  document.body.style.transition = 'opacity 0.7s cubic-bezier(.4,2,.6,1)';
  document.body.style.opacity = 0;
  setTimeout(() => {
    window.location.href = 'ia.html';
  }, 700);
}

loginBtn.addEventListener('click', () => {
  const key = keyInput.value.trim();
  if (typeof VALID_KEYS !== 'undefined' && Array.isArray(VALID_KEYS) && VALID_KEYS.includes(key)) {
    errorMsg.textContent = '';
    try {
      localStorage.setItem('darkgpt_licence', key);
      // Pour compatibilité, on stocke aussi sous darkgpt_key
      localStorage.setItem('darkgpt_key', key);
    } catch(e){}
    animateRedirect();
  } else {
    errorMsg.textContent = 'Clé invalide. Essayez encore.';
    keyInput.value = '';
    keyInput.focus();
  }
});

keyInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    loginBtn.click();
  }
});
