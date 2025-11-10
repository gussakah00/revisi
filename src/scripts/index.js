import App from "./pages/app.js";
import { pushManager } from "./utils/push-manager.js";
import { navigation } from "./components/navigation.js";

console.log("🚀 Memulai Cerita di Sekitarmu...");

const app = new App({
  drawerButton: document.querySelector("#drawer-button"),
  navigationDrawer: document.querySelector("#navigation-drawer"),
  content: document.querySelector("#main-content"),
});

let appInitialized = false;

window.addEventListener("hashchange", () => app.renderPage());
window.addEventListener("load", async () => {
  if (appInitialized) return;
  appInitialized = true;

  await app.renderPage();
  console.log("✅ Aplikasi berhasil dimulai");

  await initializePWA();
});

async function initializePWA() {
  try {
    console.log("📱 Initializing PWA features...");

    await initializeServiceWorker();

    await initializePushNotifications();

    console.log("✅ PWA features initialized successfully");
  } catch (error) {
    console.error("❌ PWA initialization failed:", error);
  }
}

async function initializeServiceWorker() {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register(
        "./sw.bundle.js",
        {
          scope: "./",
        }
      );

      console.log("✅ Service Worker registered:", registration);

      registration.addEventListener("updatefound", () => {
        const newWorker = registration.installing;
        console.log("🔄 New Service Worker found:", newWorker.state);
      });
    } catch (error) {
      console.log("ℹ️ Service Worker registration failed:", error);
    }
  }
}

async function initializePushNotifications() {
  try {
    const pushSupported = await pushManager.init();
    if (pushSupported) {
      await navigation.init();
      console.log("✅ Push notifications initialized");
    }
  } catch (error) {
    console.error("❌ Push notifications failed:", error);
  }
}

window.app = app;
