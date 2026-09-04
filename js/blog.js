/**
 * ORVEXA GLOBAL TECH - BLOG & INSIGHTS JS
 * Category tab filtering, live keyword search, and reading time estimation
 */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.blog-filter-btn');
  const blogCards = document.querySelectorAll('.blog-card');
  const searchInput = document.getElementById('blogSearchInput');

  let currentCategory = 'all';
  let searchQuery = '';

  const applyFilters = () => {
    let visibleCount = 0;
    blogCards.forEach((card) => {
      const category = card.getAttribute('data-category');
      const title = card.querySelector('.blog-title') ? card.querySelector('.blog-title').textContent.toLowerCase() : '';
      const desc = card.querySelector('.blog-excerpt') ? card.querySelector('.blog-excerpt').textContent.toLowerCase() : '';

      const matchesCategory = currentCategory === 'all' || category === currentCategory;
      const matchesSearch = !searchQuery || title.includes(searchQuery) || desc.includes(searchQuery);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        card.classList.add('revealed');
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResultsMsg = document.getElementById('noBlogResults');
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      applyFilters();
    });
  }
});
