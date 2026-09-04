/**
 * ORVEXA GLOBAL TECH - MAIN GLOBAL CONTROLLER JS
 * Scroll progress, back-to-top button, modal dialogs, and utility handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Scroll Progress Bar ---
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);

  const updateScrollProgress = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  };

  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // --- 2. Back to Top Button ---
  const backToTopBtn = document.createElement('button');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.setAttribute('aria-label', 'Back to top of page');
  backToTopBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15"></polyline>
    </svg>
  `;
  document.body.appendChild(backToTopBtn);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --- 3. Global Modal Controller ---
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('.modal-close, [data-modal-close]');
  const modals = document.querySelectorAll('.modal-overlay');

  modalTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-target');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        // If trigger contains job position context
        const positionName = trigger.getAttribute('data-position-name');
        const posInput = targetModal.querySelector('[name="candidatePosition"]');
        if (posInput && positionName) {
          posInput.value = positionName;
        }

        // If trigger contains product name context
        const productName = trigger.getAttribute('data-product-name');
        const prodInput = targetModal.querySelector('[name="productRequested"]');
        if (prodInput && productName) {
          prodInput.value = productName;
        }
        const modalProductTitle = targetModal.querySelector('#modalProductTitle');
        if (modalProductTitle && productName) {
          modalProductTitle.textContent = productName;
        }

        targetModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeModal = (modal) => {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  modalCloses.forEach((closeBtn) => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal-overlay');
      closeModal(modal);
    });
  });

  modals.forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modals.forEach(m => closeModal(m));
    }
  });

  // --- 4. Dynamic Current Year in Footers ---
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
});
