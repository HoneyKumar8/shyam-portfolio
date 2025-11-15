document.addEventListener("DOMContentLoaded", () => {
  // Toggle Dark Mode
  const toggleBtn = document.getElementById("toggle-theme");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Dynamic Year in Footer
  const footerYear = document.getElementById("footer-year");
  footerYear.textContent = `© ${new Date().getFullYear()} Shyam's Portfolio`;
});
