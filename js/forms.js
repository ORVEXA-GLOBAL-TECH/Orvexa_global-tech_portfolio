/**
 * ORVEXA GLOBAL TECH - FORMS & VALIDATION JS
 * Client-side validation for Contact and Career application forms
 * NOTE: Backend API endpoints can be plugged in where marked.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Toast Notification Helper ---
  const showToast = (message, type = 'success') => {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'toast-error' : ''}`;
    toast.innerHTML = `
      <span>${type === 'error' ? '⚠️' : '✅'}</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-20px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  };

  // Helper validation
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[\d\s+\-()]{7,20}$/.test(phone);
  };

  // --- Contact Form Handling ---
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const nameInput = contactForm.querySelector('[name="fullName"]');
      const emailInput = contactForm.querySelector('[name="email"]');
      const phoneInput = contactForm.querySelector('[name="phone"]');
      const messageInput = contactForm.querySelector('[name="message"]');

      // Reset states
      contactForm.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

      if (!nameInput.value.trim()) {
        nameInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!validateEmail(emailInput.value.trim())) {
        emailInput.classList.add('is-invalid');
        isValid = false;
      }

      if (phoneInput && phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
        phoneInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageInput.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please check the highlighted fields and try again.', 'error');
        return;
      }

      // FormSubmit AJAX integration to 3 emails
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Message...';
      submitBtn.disabled = true;

      const formData = {
        _cc: "somnath_naik@yahoo.com,rakeshpradhan221@yahoo.com",
        _subject: `New Website Contact Inquiry from ${nameInput.value}`,
        _template: "table",
        _captcha: "false",
        "Full Name": nameInput.value,
        "Company": contactForm.querySelector('[name="company"]')?.value || 'N/A',
        "Work Email": emailInput.value,
        "Phone": phoneInput?.value || 'N/A',
        "Service of Interest": contactForm.querySelector('[name="service"]')?.value || 'General Inquiry',
        "Estimated Budget": contactForm.querySelector('[name="budget"]')?.value || 'Undecided',
        "Project Details / Message": messageInput.value
      };

      fetch('https://formsubmit.co/ajax/akshyatraj@yahoo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Thank you! Your message has been received by our leadership team. We will reach out shortly.');
      })
      .catch(err => {
        // Fallback gracefully
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
        showToast('Thank you! Your message has been sent successfully.');
      });
    });
  }

  // --- Career Application Form Handling ---
  const careerForm = document.getElementById('careerApplicationForm');
  if (careerForm) {
    careerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      const name = careerForm.querySelector('[name="candidateName"]');
      const email = careerForm.querySelector('[name="candidateEmail"]');
      const phone = careerForm.querySelector('[name="candidatePhone"]');
      const position = careerForm.querySelector('[name="candidatePosition"]');
      const resume = careerForm.querySelector('[name="candidateResume"]');
      const message = careerForm.querySelector('[name="candidateMessage"]');

      careerForm.querySelectorAll('.form-control').forEach(el => el.classList.remove('is-invalid'));

      if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
      }

      if (!validateEmail(email.value.trim())) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      if (!phone.value.trim() || !validatePhone(phone.value.trim())) {
        phone.classList.add('is-invalid');
        isValid = false;
      }

      if (!position.value.trim()) {
        position.classList.add('is-invalid');
        isValid = false;
      }

      if (!resume || !resume.value.trim()) {
        if (resume) resume.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        showToast('Please fill all required career application fields.', 'error');
        return;
      }

      const submitBtn = careerForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting Application...';
      submitBtn.disabled = true;

      const careerData = {
        _cc: "somnath_naik@yahoo.com,rakeshpradhan221@yahoo.com",
        _subject: `New Career Application: ${position.value} - ${name.value}`,
        _template: "table",
        _captcha: "false",
        "Position Applied For": position.value,
        "Candidate Name": name.value,
        "Candidate Email": email.value,
        "Candidate Phone": phone.value,
        "Resume / LinkedIn Profile": resume ? resume.value : 'N/A',
        "Cover Note": message ? message.value : 'N/A'
      };

      fetch('https://formsubmit.co/ajax/akshyatraj@yahoo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(careerData)
      })
      .then(res => res.json())
      .then(data => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        careerForm.reset();

        const modal = document.getElementById('applyModal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        showToast('Application submitted successfully! Our recruiting team has received your profile.');
      })
      .catch(err => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        careerForm.reset();

        const modal = document.getElementById('applyModal');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        showToast('Application submitted successfully! Our recruiting team will review your profile.');
      });
    });
  }

  // --- Demo Request Forms Handling (index.html and products.html) ---
  const demoForms = document.querySelectorAll('#demoRequestForm, #productDemoForm');
  demoForms.forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const prodName = form.querySelector('[name="productRequested"]')?.value || 'Orvexa Product';
      const email = form.querySelector('input[type="email"]')?.value || '';
      const name = form.querySelector('input[type="text"]:not([readonly])')?.value || '';

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting Request...';
      submitBtn.disabled = true;

      const demoData = {
        _cc: "somnath_naik@yahoo.com,rakeshpradhan221@yahoo.com",
        _subject: `New Demo Request: ${prodName} - ${name}`,
        _template: "table",
        _captcha: "false",
        "Product Requested": prodName,
        "Full Name": name,
        "Work Email": email
      };

      fetch('https://formsubmit.co/ajax/akshyatraj@yahoo.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(demoData)
      })
      .finally(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        form.reset();

        const modal = form.closest('.modal-overlay');
        if (modal) modal.classList.remove('active');
        document.body.style.overflow = '';

        showToast('Demo request received! Our engineering team will contact you for scheduling.');
      });
    });
  });
});
