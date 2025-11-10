export const registerSW = async () => {
  // ⛔️ NONAKTIFKAN DI DEVELOPMENT
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    console.log("💻 DEVELOPMENT: Service Worker DISABLED");

    // Unregister semua SW
    if ("serviceWorker" in navigator) {
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (let registration of registrations) {
        await registration.unregister();
        console.log("🗑️ Unregistered SW");
      }
    }
    return null;
  }

  // 🚀 PRODUCTION: Register SW
  try {
    console.log("🌐 Registering Service Worker...");
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("✅ SW registered successfully");
    return registration;
  } catch (error) {
    console.error("❌ SW registration failed:", error);
    return null;
  }
};
