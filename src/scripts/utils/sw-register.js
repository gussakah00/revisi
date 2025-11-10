<<<<<<< HEAD
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
=======
export const registerSW = () => {
  return new Promise((resolve) => {
    // Nonaktifkan SW di development
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      console.log("💻 Development: Service Worker disabled");
      resolve(null);
      return;
    }

    if (!("serviceWorker" in navigator)) {
      console.log("🚫 Service Worker not supported");
      resolve(null);
      return;
    }

    console.log("🌐 Registering Service Worker...");

    // Tentukan SW URL berdasarkan environment
    const isGitHubPages = window.location.hostname.includes("github.io");
    const swUrl = isGitHubPages ? "revisi/sw.js" : "/sw.js";

    console.log("📁 SW URL:", swUrl);
    console.log(
      "🌍 Environment:",
      isGitHubPages ? "GitHub Pages" : "Production"
    );

    fetch(swUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`SW file not found (${response.status}) at ${swUrl}`);
        }
        return navigator.serviceWorker.register(swUrl);
      })
      .then((registration) => {
        console.log("✅ Service Worker registered successfully!");
        console.log("📌 Scope:", registration.scope);
        resolve(registration);
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error.message);

        // Clean up any existing registrations
        navigator.serviceWorker.getRegistrations().then((registrations) => {
          registrations.forEach((registration) => {
            console.log("🗑️ Unregistering old SW:", registration.scope);
            registration.unregister();
          });
        });

        resolve(null);
      });
  });
>>>>>>> 4f29ea4e0f48b8aace6dd97052bd666d42af8f0f
};
