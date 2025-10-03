import { ref, computed } from 'vue';
import PWAInstallButton from './components/PWAInstallButton.vue';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}


const deferredPrompt = ref<BeforeInstallPromptEvent | null>(null);
const canInstall = ref(false);
const isInstalling = ref(false);
const isOnline = ref(navigator.onLine);

const isFirefox = computed(() => /Firefox/i.test(navigator.userAgent));

//#region COMPUTED
const isPWA = computed(() => {
  return window.matchMedia('(display-mode: standalone)').matches;
});

const deviceType = computed(() => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile = /Mobi|Android/i.test(userAgent);
  if (isIOS) return 'ios';
  if (isAndroid) return 'android';
  if (!isMobile) return 'desktop';
  return 'mobile';
});

const isMobile = computed(() => {
  const userAgent = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent);
  const isAndroid = /Android/.test(userAgent);
  const isMobile = /Mobi|Android/i.test(userAgent);
  return isIOS || isAndroid || isMobile;
});

const platformName = computed(() => {
  switch (deviceType.value) {
    case 'ios': return 'iOS';
    case 'android': return 'Android';
    case 'desktop': return 'Desktop';

    default: return 'Mobile';
  }
});

//#endregion

//#region INSTALLATION
const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
  deferredPrompt.value = e;
  canInstall.value = true;
};
const handleAppInstalled = () => {
  canInstall.value = false;
  deferredPrompt.value = null;
};
const installPWA = async () => {
  if (isFirefox.value) {
    console.warn('Firefox does not support PWA installation.');
    return;
  }
  if (!deferredPrompt.value) return;
  isInstalling.value = true;
  try {
    await deferredPrompt.value.prompt();
    const { outcome } = await deferredPrompt.value.userChoice;
    if (outcome === 'accepted') {
      canInstall.value = false;
    }
  } catch (error) {
    console.error('Error installing PWA:', error);
  } finally {
    isInstalling.value = false;
    deferredPrompt.value = null;
  }
};
//#endregion

//#region NETWORK STATUS
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
};
//#endregion

// to call at app mount
const setup = () => {
  window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
  window.addEventListener('appinstalled', handleAppInstalled);
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
};

// to call at app unmount
const cleanup = () => {
  window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
  window.removeEventListener('appinstalled', handleAppInstalled);
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
};

export function usePWA() {
  return {
    deferredPrompt,
    isInstalling,
    isPWA,
    deviceType,
    isMobile,
    platformName,
    installPWA,
    setup,
    cleanup,
    isOnline,
    isFirefox,
    canInstall,
  };
}

// Vue.js plugin installation
import type { App } from 'vue';

export default {
  install(app: App) {
    const pwa = usePWA();
    app.provide('pwa', pwa);
    app.config.globalProperties.$pwa = pwa;
    app.component('PWAInstallButton', PWAInstallButton); // Enregistrement global
  },
};