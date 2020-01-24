document.addEventListener('DOMContentLoaded', function toggleSidebar() {
  const body = document.querySelector('body');
  const filterToggle = document.querySelector('.js-room-filter__toggle');

  filterToggle.addEventListener('click', function toggleFilter(e) {
    e.preventDefault();

    body.classList.toggle('sidebar-visible-on-mobile');
  });
});
