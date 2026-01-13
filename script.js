// Carousel functionality with 3D circular rotation effect
(function() {
  'use strict';

  // Remove no-js class if JavaScript is enabled
  document.documentElement.classList.remove('no-js');

  // Load screenshots dynamically
  async function loadScreenshots() {
    const track = document.getElementById('carouselTrack');
    if (!track) return;

    const extensions = ['png', 'jpeg'];
    const maxScreenshots = 10;
    const foundScreenshots = [];

    // Helper function to check if an image exists
    function checkImageExists(path) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = path;
      });
    }

    // Check for screenshots 1-10
    for (let i = 1; i <= maxScreenshots; i++) {
      // Try both extensions
      for (const ext of extensions) {
        const path = `screenshots/screenshot-${i}.${ext}`;
        const exists = await checkImageExists(path);
        
        if (exists) {
          foundScreenshots.push({ number: i, path: path, extension: ext });
          break; // Found this screenshot, move to next number
        }
      }
    }

    // Create carousel items for found screenshots
    foundScreenshots.forEach((screenshot) => {
      const item = document.createElement('div');
      item.className = 'carousel-item';
      
      const img = document.createElement('img');
      img.src = screenshot.path;
      img.alt = `Apex Log app screenshot ${screenshot.number}`;
      img.className = 'carousel-image';
      img.loading = 'lazy';
      
      item.appendChild(img);
      track.appendChild(item);
    });

    // Initialize carousel after screenshots are loaded
    if (foundScreenshots.length > 0) {
      initCarousel();
    }
  }

  // Initialize carousel
  function initCarousel() {
    const carousel = document.getElementById('carousel');
    const track = document.getElementById('carouselTrack');
    const dotsContainer = document.getElementById('carouselDots');
    const prevButton = document.getElementById('carouselPrev');
    const nextButton = document.getElementById('carouselNext');
    
    if (!carousel || !track) return;

    const items = Array.from(track.querySelectorAll('.carousel-item'));
    const itemCount = items.length;
    
    if (itemCount === 0) return;

    let currentIndex = 0;

    // Create dots
    if (dotsContainer && itemCount > 1) {
      items.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to screenshot ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
    }

    // Update carousel positions
    function updateCarousel() {
      items.forEach((item, index) => {
        // Remove all position classes
        item.classList.remove('active', 'prev', 'next', 'far-prev', 'far-next');
        
        const diff = index - currentIndex;
        
        if (diff === 0) {
          item.classList.add('active');
        } else if (diff === -1 || (diff === itemCount - 1 && currentIndex === 0)) {
          item.classList.add('prev');
        } else if (diff === 1 || (diff === -(itemCount - 1) && currentIndex === itemCount - 1)) {
          item.classList.add('next');
        } else if (diff === -2 || (diff === itemCount - 2 && currentIndex <= 1)) {
          item.classList.add('far-prev');
        } else if (diff === 2 || (diff === -(itemCount - 2) && currentIndex >= itemCount - 2)) {
          item.classList.add('far-next');
        } else if (Math.abs(diff) > 2 && Math.abs(diff) < itemCount - 2) {
          // Hide items that are too far away
          item.style.opacity = '0';
          item.style.pointerEvents = 'none';
        } else {
          item.style.opacity = '';
          item.style.pointerEvents = '';
        }
      });

      // Update dots
      const dots = dotsContainer.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // Update arrow states
      if (prevButton) {
        prevButton.disabled = itemCount <= 1;
      }
      if (nextButton) {
        nextButton.disabled = itemCount <= 1;
      }
    }

    // Go to specific slide
    function goToSlide(index) {
      if (index < 0 || index >= itemCount) return;
      currentIndex = index;
      updateCarousel();
    }

    // Next slide
    function nextSlide() {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }

    // Previous slide
    function prevSlide() {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      updateCarousel();
    }

    // Event listeners
    if (prevButton) {
      prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
      nextButton.addEventListener('click', nextSlide);
    }

    // Keyboard navigation
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        nextSlide();
      }
    });

    // Make carousel focusable for keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.setAttribute('role', 'region');
    carousel.setAttribute('aria-label', 'App screenshots carousel. Use arrow keys to navigate.');

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 50;

    track.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    function handleSwipe() {
      const swipeDistance = touchStartX - touchEndX;
      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    // Pause carousel on hover for better UX
    let isHovering = false;
    carousel.addEventListener('mouseenter', () => {
      isHovering = true;
    });
    carousel.addEventListener('mouseleave', () => {
      isHovering = false;
    });

    // Initialize
    updateCarousel();
  }

  // Intersection Observer for animations
  function initAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
      '.hero__title, .hero__tagline, .explanation__text, .email-form, .carousel-section'
    );

    animateElements.forEach(el => observer.observe(el));
  }

  // Form handling
  function initForm() {
    const form = document.getElementById('emailForm');
    const messageDiv = document.getElementById('formMessage');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitButton = form.querySelector('.email-submit');
      const emailInput = form.querySelector('#email');
      const originalButtonText = submitButton.textContent;
      
      // Disable form
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
      messageDiv.textContent = '';
      messageDiv.className = 'form-message';

      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          messageDiv.textContent = 'Thank you! We\'ll notify you when Apex Log launches.';
          messageDiv.className = 'form-message success';
          messageDiv.setAttribute('role', 'status');
          messageDiv.setAttribute('aria-live', 'polite');
          form.reset();
          // Focus management for accessibility
          emailInput.focus();
        } else {
          const data = await response.json();
          if (data.errors) {
            messageDiv.textContent = data.errors.map(error => error.message).join(', ');
          } else {
            messageDiv.textContent = 'Something went wrong. Please try again.';
          }
          messageDiv.className = 'form-message error';
          messageDiv.setAttribute('role', 'alert');
          messageDiv.setAttribute('aria-live', 'assertive');
        }
      } catch (error) {
        messageDiv.textContent = 'Network error. Please check your connection and try again.';
        messageDiv.className = 'form-message error';
        messageDiv.setAttribute('role', 'alert');
        messageDiv.setAttribute('aria-live', 'assertive');
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
      }
    });
  }

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      loadScreenshots();
      initAnimations();
      initForm();
    });
  } else {
    loadScreenshots();
    initAnimations();
    initForm();
  }
})();
