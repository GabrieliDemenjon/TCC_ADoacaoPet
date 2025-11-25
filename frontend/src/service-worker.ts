self.addEventListener("install", () => {
  console.log("Service worker instalado!");
});

self.addEventListener("activate", () => {
  console.log("Service worker ativado!");
});
