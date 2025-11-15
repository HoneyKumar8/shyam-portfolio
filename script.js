document.addEventListener("DOMContentLoaded", () => {
  const sections = {
    "fish-about": "section-about",
    "fish-projects": "section-projects",
    "fish-routines": "section-routines"
  };

  Object.keys(sections).forEach(fishId => {
    document.getElementById(fishId).addEventListener("click", () => {
      Object.values(sections).forEach(sec => {
        document.getElementById(sec).style.display = "none";
      });
      document.getElementById(sections[fishId]).style.display = "block";
    });
  });

  document.getElementById("footer-year").textContent =
    `© ${new Date().getFullYear()} Shyam's Portfolio`;
});
