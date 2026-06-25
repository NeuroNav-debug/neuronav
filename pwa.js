// NeuroNav PWA Registration & Install Handling

// ===== SERVICE WORKER REGISTRATION =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then((registration) => {
        console.log('✅ NeuroNav SW registered:', registration.scope);

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000);

        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showUpdateNotification();
            }
          });
        });
      })
      .catch((error) => {
        console.log('❌ SW registration failed:', error);
      });
  });
}

// ===== INSTALL PROMPT HANDLING =====
let deferredPrompt = null;
let installBanner = null;

// BEFOREINSTALLPROMPT: Browser says "this page is installable"
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('📦 beforeinstallprompt fired!');
  e.preventDefault(); // Don't show browser's default mini-infobar
  deferredPrompt = e;
  showInstallBanner();
  updateInstallButtonState();
});

// APPINSTALLED: User completed installation
window.addEventListener('appinstalled', () => {
  console.log('🎉 NeuroNav installed!');
  deferredPrompt = null;
  hideInstallBanner();
  hideFloatingInstallButton();

  // Show "installed" state in settings
  const installStatus = document.getElementById('installStatus');
  if (installStatus) {
    installStatus.innerHTML = '✅ NeuroNav is installed as an app';
    installStatus.style.color = 'var(--success-light)';
  }
});

// ===== INSTALL BANNER (top of page) =====
function showInstallBanner() {
  if (installBanner) return;
  if (isPWA()) return; // Already installed

  installBanner = document.createElement('div');
  installBanner.id = 'pwaInstallBanner';
  installBanner.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;justify-content:center">
      <span style="font-size:1.2rem">📦</span>
      <span style="font-weight:700">Install NeuroNav as an app</span>
      <span style="color:var(--text-dim);font-size:.85rem">— works offline, no browser chrome</span>
      <button id="pwaInstallBannerBtn" style="
        padding:8px 18px;
        border-radius:10px;
        border:none;
        background:linear-gradient(135deg,var(--primary),var(--primary-dark));
        color:white;
        font-family:'Syne',sans-serif;
        font-weight:700;
        font-size:.85rem;
        cursor:pointer;
        box-shadow:0 2px 8px rgba(124,58,237,.3);
        white-space:nowrap;
      ">⬇️ Install Now</button>
      <button id="pwaInstallBannerDismiss" style="
        padding:6px 10px;
        border-radius:8px;
        border:none;
        background:transparent;
        color:var(--text-dim);
        font-size:1rem;
        cursor:pointer;
      ">✕</button>
    </div>
  `;

  installBanner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 14px 16px;
    background: linear-gradient(135deg, rgba(124,58,237,.15), rgba(236,72,153,.08));
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(124,58,237,.25);
    animation: bannerSlideDown 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;

  document.body.appendChild(installBanner);

  // Add animation keyframes
  if (!document.getElementById('pwaBannerAnim')) {
    const style = document.createElement('style');
    style.id = 'pwaBannerAnim';
    style.textContent = `
      @keyframes bannerSlideDown {
        from { transform: translateY(-100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      @keyframes bannerSlideUp {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-100%); opacity: 0; }
      }
    `;
    document.head.appendChild(style);
  }

  document.getElementById('pwaInstallBannerBtn').addEventListener('click', triggerInstall);
  document.getElementById('pwaInstallBannerDismiss').addEventListener('click', () => {
    hideInstallBanner();
    // Show floating button instead
    showFloatingInstallButton();
  });
}

function hideInstallBanner() {
  if (!installBanner) return;
  installBanner.style.animation = 'bannerSlideUp 0.3s ease forwards';
  setTimeout(() => {
    if (installBanner) {
      installBanner.remove();
      installBanner = null;
    }
  }, 300);
}

// ===== FLOATING INSTALL BUTTON (bottom-left, persistent) =====
let floatingInstallBtn = null;

function showFloatingInstallButton() {
  if (floatingInstallBtn) return;
  if (isPWA()) return;

  floatingInstallBtn = document.createElement('button');
  floatingInstallBtn.id = 'pwaFloatingInstall';
  floatingInstallBtn.innerHTML = '⬇️ Install';
  floatingInstallBtn.style.cssText = `
    position: fixed;
    bottom: calc(72px + env(safe-area-inset-bottom) + 12px);
    left: 14px;
    z-index: 90;
    padding: 10px 18px;
    border-radius: 12px;
    border: 1px solid rgba(124,58,237,.4);
    background: linear-gradient(135deg, rgba(124,58,237,.9), rgba(91,33,182,.9));
    color: white;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: .85rem;
    cursor: pointer;
    box-shadow: 0 4px 16px rgba(124,58,237,.4);
    transition: all .2s;
    animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    white-space: nowrap;
  `;

  floatingInstallBtn.addEventListener('click', triggerInstall);
  floatingInstallBtn.addEventListener('mouseenter', () => {
    floatingInstallBtn.style.transform = 'scale(1.05)';
  });
  floatingInstallBtn.addEventListener('mouseleave', () => {
    floatingInstallBtn.style.transform = 'scale(1)';
  });

  document.body.appendChild(floatingInstallBtn);
}

function hideFloatingInstallButton() {
  if (floatingInstallBtn) {
    floatingInstallBtn.remove();
    floatingInstallBtn = null;
  }
}

// ===== TRIGGER INSTALL DIALOG =====
async function triggerInstall() {
  if (!deferredPrompt) {
    // If no deferred prompt, try to show manual instructions
    showManualInstallHelp();
    return;
  }

  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  console.log('Install outcome:', outcome);

  if (outcome === 'accepted') {
    console.log('User accepted install');
  } else {
    console.log('User dismissed install');
    // Show floating button for later
    showFloatingInstallButton();
  }

  deferredPrompt = null;
}

// ===== MANUAL INSTALL HELP (when browser doesn't support beforeinstallprompt) =====
function showManualInstallHelp() {
  const modal = document.createElement('div');
  modal.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(0,0,0,.8);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    animation: fadeIn 0.2s ease;
  `;

  const isChrome = /Chrome/.test(navigator.userAgent) && !/Edge/.test(navigator.userAgent);
  const isEdge = /Edg/.test(navigator.userAgent);
  const isSafari = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);

  let browserInstructions = '';
  if (isChrome) {
    browserInstructions = `
      <ol style="margin:10px 0 0 18px;font-size:.85rem;color:var(--text-secondary);line-height:1.8">
        <li>Click the <b>⋮</b> menu (top right of Chrome)</li>
        <li>Go to <b>Cast, save and share</b></li>
        <li>Click <b>"Install page as app..."</b></li>
      </ol>
    `;
  } else if (isEdge) {
    browserInstructions = `
      <ol style="margin:10px 0 0 18px;font-size:.85rem;color:var(--text-secondary);line-height:1.8">
        <li>Click the <b>⋯</b> menu (top right of Edge)</li>
        <li>Go to <b>Apps</b> → <b>Install this site as an app</b></li>
      </ol>
    `;
  } else if (isSafari) {
    browserInstructions = `
      <ol style="margin:10px 0 0 18px;font-size:.85rem;color:var(--text-secondary);line-height:1.8">
        <li>Click <b>Share</b> button (⬆️) in the toolbar</li>
        <li>Scroll down and tap <b>"Add to Home Screen"</b></li>
      </ol>
    `;
  } else {
    browserInstructions = `
      <p style="margin-top:10px;font-size:.85rem;color:var(--text-secondary)">
        Open this page in <b>Chrome</b> or <b>Edge</b> for the best install experience.
      </p>
    `;
  }

  modal.innerHTML = `
    <div style="
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 20px;
      max-width: 420px;
      width: 100%;
      padding: 24px;
      animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    ">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h3 style="font-size:1.1rem;font-weight:800">📦 Install NeuroNav</h3>
        <button onclick="document.getElementById('pwaManualModal').remove()" style="
          width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border);
          background: var(--bg-elevated); color: var(--text-muted); cursor: pointer;
          font-size: .9rem; display: flex; align-items: center; justify-content: center;
        ">✕</button>
      </div>
      <p style="font-size:.85rem;color:var(--text-muted);margin-bottom:14px;line-height:1.6">
        Your browser supports installing NeuroNav as a standalone app. Here's how:
      </p>
      ${browserInstructions}
      <div style="margin-top:16px;padding:12px;background:rgba(124,58,237,.08);border-radius:12px;border:1px solid rgba(124,58,237,.2)">
        <p style="font-size:.78rem;color:var(--primary-light);line-height:1.6">
          💡 <b>Why install?</b> Works offline, gets its own window, appears in your taskbar/start menu, and updates automatically.
        </p>
      </div>
    </div>
  `;

  modal.id = 'pwaManualModal';
  modal.className = 'modal-overlay';
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });

  document.body.appendChild(modal);
}

// ===== UPDATE NOTIFICATION =====
function showUpdateNotification() {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 16px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1001;
    padding: 12px 20px;
    background: var(--bg-card);
    border: 1px solid var(--primary);
    border-radius: var(--radius);
    color: var(--text);
    font-family: 'Syne', sans-serif;
    font-size: 0.85rem;
    font-weight: 600;
    box-shadow: var(--shadow-lg);
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    animation: sIn 0.3s ease;
  `;
  toast.innerHTML = `
    <span>🔄 Update available</span>
    <button style="padding: 6px 12px; border-radius: 8px; border: none; background: var(--primary); color: white; font-weight: 700; font-size: 0.75rem; cursor: pointer;">Reload</button>
  `;

  toast.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      window.location.reload();
    }
  });

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 15000);
}

// ===== UTILITY FUNCTIONS =====
function isPWA() {
  return window.matchMedia('(display-mode: standalone)').matches ||
         window.navigator.standalone === true ||
         document.referrer.includes('android-app://');
}

function isInstallable() {
  return 'BeforeInstallPromptEvent' in window;
}

function updateInstallButtonState() {
  // Update any install status elements in the UI
  const status = document.getElementById('installStatus');
  if (status) {
    if (isPWA()) {
      status.innerHTML = '✅ Installed as app';
      status.style.color = 'var(--success-light)';
    } else if (deferredPrompt) {
      status.innerHTML = '⬇️ Ready to install';
      status.style.color = 'var(--primary-light)';
    } else {
      status.innerHTML = '⏳ Open in Chrome/Edge to install';
      status.style.color = 'var(--text-dim)';
    }
  }
}

// ===== INIT =====
function initPWA() {
  // Check if already installed
  if (isPWA()) {
    console.log('🎉 NeuroNav is running as installed PWA');
    hideFloatingInstallButton();
    hideInstallBanner();
  } else {
    console.log('📦 NeuroNav is running in browser — install available');
    // Show floating install button after a short delay if banner wasn't shown
    setTimeout(() => {
      if (!installBanner && !isPWA()) {
        showFloatingInstallButton();
      }
    }, 3000);
  }

  updateInstallButtonState();
}

// Run init after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPWA);
} else {
  initPWA();
}

// Listen for display mode changes
window.matchMedia('(display-mode: standalone)').addEventListener('change', (e) => {
  if (e.matches) {
    console.log('Switched to standalone mode');
    hideFloatingInstallButton();
    hideInstallBanner();
  }
});

// Expose for debugging
window.neuronavPWA = {
  isPWA,
  isInstallable,
  getDeferredPrompt: () => deferredPrompt,
  triggerInstall,
  showManualInstallHelp
};

// Listen for messages from service worker
navigator.serviceWorker?.addEventListener('message', (event) => {
  if (event.data?.type === 'SYNC_COMPLETE') {
    toast('Sync complete', 'Your offline data has been synced', '#10b981');
  }
});
