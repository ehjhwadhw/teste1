// Configuração dos tipos de notificação
const notificationConfig = {
  administracao: {
    title: 'Administração',
    color: 'hsl(45, 100%, 50%)',
    glowColor: 'hsl(45, 100%, 50%)',
    bgGlow: 'rgba(255, 200, 0, 0.15)',
  },
  policia: {
    title: 'Polícia',
    color: 'hsl(210, 100%, 50%)',
    glowColor: 'hsl(210, 100%, 50%)',
    bgGlow: 'rgba(0, 100, 255, 0.15)',
  },
  mecanica: {
    title: 'Mecânica',
    color: 'hsl(40, 100%, 45%)',
    glowColor: 'hsl(40, 100%, 45%)',
    bgGlow: 'rgba(255, 170, 0, 0.15)',
  },
  hospital: {
    title: 'Hospital',
    color: 'hsl(0, 80%, 55%)',
    glowColor: 'hsl(0, 80%, 55%)',
    bgGlow: 'rgba(255, 60, 60, 0.15)',
  },
  ilegal: {
    title: 'Ilegal',
    color: 'hsl(0, 70%, 40%)',
    glowColor: 'hsl(0, 70%, 40%)',
    bgGlow: 'rgba(180, 40, 40, 0.15)',
  },
  atencao: {
    title: 'Atenção',
    color: 'hsl(120, 70%, 45%)',
    glowColor: 'hsl(120, 70%, 45%)',
    bgGlow: 'rgba(60, 200, 60, 0.15)',
  },
  convite: {
    title: 'CONVITE',
    color: 'hsl(45, 100%, 50%)',
    glowColor: 'hsl(45, 100%, 50%)',
    bgGlow: 'rgba(255, 200, 0, 0.15)',
  },
  sucesso: {
    title: 'SUCESSO!',
    color: 'hsl(120, 70%, 45%)',
    glowColor: 'hsl(120, 70%, 45%)',
    bgGlow: 'rgba(60, 200, 60, 0.15)',
  },
  rota: {
    title: 'ROTA MARCADA',
    color: 'hsl(210, 100%, 50%)',
    glowColor: 'hsl(210, 100%, 50%)',
    bgGlow: 'rgba(0, 100, 255, 0.15)',
  },
  rotaFinalizada: {
    title: 'ROTA FINALIZADA',
    color: 'hsl(120, 70%, 45%)',
    glowColor: 'hsl(120, 70%, 45%)',
    bgGlow: 'rgba(60, 200, 60, 0.15)',
  },
  erro: {
    title: 'ERRO',
    color: 'hsl(0, 80%, 55%)',
    glowColor: 'hsl(0, 80%, 55%)',
    bgGlow: 'rgba(255, 60, 60, 0.15)',
  }
};

// Array para armazenar notificações ativas
let notifications = [];

// Gerar ID único
function generateId() {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// SVG do ícone info inline (não precisa de arquivo externo)
const infoIconSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M12 16v-4"/>
    <path d="M12 8h.01"/>
  </svg>
`;

// Criar elemento de notificação
function createNotificationElement(id, type, message) {
  const config = notificationConfig[type];
  if (!config) return null;
  
  const notification = document.createElement('div');
  notification.className = 'notification-item';
  notification.id = `notification-${id}`;
  notification.style.boxShadow = `
    0 0 12px ${config.bgGlow},
    inset 0 0 20px ${config.bgGlow},
    0 2px 12px rgba(0, 0, 0, 0.5)
  `;

  notification.innerHTML = `
    <!-- Borda animada -->
    <div class="notification-border" style="
      background: conic-gradient(from 0deg, ${config.color} 0deg, ${config.color} var(--border-progress), transparent var(--border-progress));
      box-shadow: 0 0 15px ${config.glowColor};
    "></div>

    <!-- Ícone com efeito pulsante -->
    <div class="notification-icon-wrapper" style="
      background: linear-gradient(135deg, ${config.color}20, ${config.color}40);
      border: 1.5px solid ${config.color};
      box-shadow: 0 0 10px ${config.glowColor};
      color: ${config.color};
    ">
      ${infoIconSVG}
      <div class="notification-ring" style="border: 1.5px solid ${config.color};"></div>
    </div>

    <!-- Conteúdo -->
    <div class="notification-content">
      <h4 class="notification-title" style="color: ${config.color};">${config.title}</h4>
      <p class="notification-description">${message}</p>
    </div>
  `;

  return notification;
}

// Adicionar notificação
function addNotification(type, message) {
  const id = generateId();
  const container = document.getElementById('notification-container');
  
  const element = createNotificationElement(id, type, message);
  if (!element) return;
  
  container.appendChild(element);
  
  // Forçar reflow para animação funcionar
  element.offsetHeight;
  
  // Mostrar notificação
  setTimeout(() => {
    element.classList.add('show');
  }, 50);
  
  // Guardar referência
  notifications.push({ id, element });
  
  // Iniciar animação de saída após 4.5s
  setTimeout(() => {
    element.classList.remove('show');
    element.classList.add('hide');
  }, 4500);
  
  // Remover após 5s
  setTimeout(() => {
    removeNotification(id);
  }, 5000);
}

// Remover notificação
function removeNotification(id) {
  const index = notifications.findIndex(n => n.id === id);
  if (index > -1) {
    const { element } = notifications[index];
    if (element.parentNode) {
      element.parentNode.removeChild(element);
    }
    notifications.splice(index, 1);
  }
}

// =====================================================
//          CEF CALLBACKS - SA:MP Mobile
// =====================================================

// Callback para notificação de Administração
function onNotifyAdm(data) {
  addNotification('administracao', data);
}

// Callback para notificação de Polícia
function onNotifyPolicia(data) {
  addNotification('policia', data);
}

// Callback para notificação de Mecânica
function onNotifyMecanica(data) {
  addNotification('mecanica', data);
}

// Callback para notificação de Hospital
function onNotifyHospital(data) {
  addNotification('hospital', data);
}

// Callback para notificação Ilegal
function onNotifyIlegal(data) {
  addNotification('ilegal', data);
}

// Callback para notificação de Atenção
function onNotifyAtencao(data) {
  addNotification('atencao', data);
}

// Callback para notificação de Convite
function onNotifyConvite(data) {
  addNotification('convite', data);
}

// Callback para notificação de Sucesso
function onNotifySucesso(data) {
  addNotification('sucesso', data);
}

// Callback para notificação de Rota
function onNotifyRota(data) {
  addNotification('rota', data);
}

// Callback para notificação de Rota Finalizada
function onNotifyRotaFinalizada(data) {
  addNotification('rotaFinalizada', data);
}

// Callback para notificação de Erro
function onNotifyErro(data) {
  addNotification('erro', data);
}

// Registrar callbacks do CEF quando disponível
if (typeof Cef !== 'undefined') {
  Cef.registerEventCallback('notifyAdm', 'onNotifyAdm');
  Cef.registerEventCallback('notifyPolicia', 'onNotifyPolicia');
  Cef.registerEventCallback('notifyMecanica', 'onNotifyMecanica');
  Cef.registerEventCallback('notifyHospital', 'onNotifyHospital');
  Cef.registerEventCallback('notifyIlegal', 'onNotifyIlegal');
  Cef.registerEventCallback('notifyAtencao', 'onNotifyAtencao');
  Cef.registerEventCallback('notifyConvite', 'onNotifyConvite');
  Cef.registerEventCallback('notifySucesso', 'onNotifySucesso');
  Cef.registerEventCallback('notifyRota', 'onNotifyRota');
  Cef.registerEventCallback('notifyRotaFinalizada', 'onNotifyRotaFinalizada');
  Cef.registerEventCallback('notifyErro', 'onNotifyErro');
}

// Exportar funções para uso externo
window.NotificationSystem = {
  add: addNotification,
  remove: removeNotification,
  config: notificationConfig
};
