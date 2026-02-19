// ============================================
// CONFIGURAÇÃO DO FIREBASE
// ============================================

const firebaseConfig = {
  apiKey: "AIzaSyCABn9XHvjrFCbbeHT_0gHFaF5uGlKLUWM",
  authDomain: "dashboard-nasdaq-pro.firebaseapp.com",
  projectId: "dashboard-nasdaq-pro",
  storageBucket: "dashboard-nasdaq-pro.firebasestorage.app",
  messagingSenderId: "325405049429",
  appId: "1:325405049429:web:a0289dc4f604fee1d20adc"
};

// Inicializa Firebase
firebase.initializeApp(firebaseConfig);

// Exporta referências úteis
const auth = firebase.auth();
const db = firebase.firestore();
// Storage desabilitado (requer plano pago)
// const storage = firebase.storage();

// Função auxiliar: Verificar se usuário está autenticado
function verificarAutenticacao(callback) {
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = 'login.html';
      return;
    }
    callback(user);
  });
}

// Função auxiliar: Verificar se usuário foi aprovado
async function verificarAprovacao(uid) {
  const doc = await db.collection('users').doc(uid).get();
  if (!doc.exists) return false;
  return doc.data().aprovado === true;
}

// Função auxiliar: Verificar se é admin
async function verificarAdmin(uid) {
  const doc = await db.collection('users').doc(uid).get();
  if (!doc.exists) return false;
  return doc.data().role === 'admin';
}

console.log('✅ Firebase configurado e pronto para uso');
