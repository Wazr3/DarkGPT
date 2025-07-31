// assets/chat.js
// Gère l'affichage des messages et l'envoi dans le chat DarkGPT

// Chat DarkGPT : Q/R fixes, avatar et nom IA

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('chat-form');
  const input = document.getElementById('chat-input');
  const messages = document.getElementById('chat-messages');

  // Q/R fixes
  const QA = [
    { q: /qui(\s+)?(es|êtes)[ -]?(tu|vous)/i, a: "Je suis l'IA <b>DarkGPT</b>, ton assistant virtuel." },
    { q: /comment tu t'appelles|ton nom/i, a: "Je m'appelle <b>DarkGPT</b>." },
    { q: /que peux[- ]?tu faire|tes capacités|tu sais faire quoi/i, a: "Je peux répondre à tes questions, discuter et t'aider sur de nombreux sujets !" },
    { q: /bonjour|salut|coucou/i, a: "Bonjour à toi ! Comment puis-je t'aider ?" },
    { q: /qui est le meilleur|qui est le boss/i, a: "C'est toi le boss ici !" },
    { q: /merci|thanks/i, a: "Avec plaisir !" },
    { q: /quel âge|age as[- ]?tu/i, a: "Je n'ai pas d'âge, je suis une intelligence artificielle." },
    { q: /qui a créé|créateur/i, a: "J'ai été créée par un développeur passionné pour t'aider !" },
    { q: /aide|help/i, a: "Pose-moi une question, je ferai de mon mieux pour t'aider." },
    { q: /ta couleur préférée/i, a: "Le rouge néon, bien sûr !" },
    { q: /bye|au revoir|à bientôt/i, a: "À bientôt ! N'hésite pas à revenir me parler." },
    // Ajoute d'autres Q/R ici
  ];

  function getIAResponse(text) {
    for (const pair of QA) {
      if (pair.q.test(text)) return pair.a;
    }
    return "Je n'ai pas compris ta question, mais je suis là pour discuter !";
  }

  window.addMessage = function addMessage(text, sender = 'user') {
    const msg = document.createElement('div');
    msg.className = 'chat-message ' + sender;
    if (sender === 'ia') {
      msg.innerHTML = `
        <div class=\"ia-avatar\">
          <img src=\"https://api.dicebear.com/7.x/bottts/svg?seed=DarkGPT&backgroundColor=ff003c,1a0000\" alt=\"Avatar IA\" />
        </div>
        <div class=\"ia-msg-content\">
          <span class=\"ia-name\">DarkGPT</span>
          <span>${text}</span>
        </div>
      `;
    } else {
      msg.innerHTML = `<span class=\"user-name\">Vous :</span><span>${text}</span>`;
    }
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
  }

  // Message d'accueil automatique
  addMessage("Bonjour, que puis-je faire pour vous ?", 'ia');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    setTimeout(() => {
      addMessage(getIAResponse(text), 'ia');
    }, 600);
  });
});
