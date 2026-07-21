const yearTarget = document.getElementById('year');
if (yearTarget) {
  yearTarget.textContent = new Date().getFullYear();
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.15,
  }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
