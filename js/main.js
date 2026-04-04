/**
 * ECOWOOL - Premium Eco-Friendly Homes
 * Main JavaScript with WOW Effects
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  Loader.init();
  Header.init();
  MobileNav.init();
  ScrollAnimations.init();
  SmoothScroll.init();
  Testimonials.init();
  Modal.init();
  Lightbox.init();
  GalleryFilter.init();
  HouseFilter.init();
  ContactForm.init();
  CounterAnimation.init();
  Parallax.init();
});

/**
 * Page Loader with Animation
 */
const Loader = {
  init() {
    this.loader = document.querySelector('.loader');
    if (this.loader) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          this.loader.classList.add('hidden');
          document.body.style.overflow = '';
        }, 1500);
      });
      document.body.style.overflow = 'hidden';
    }
  }
};

/**
 * Sticky Header with Scroll Effect
 */
const Header = {
  init() {
    this.header = document.querySelector('.header');
    if (!this.header) return;
    
    this.lastScroll = 0;
    this.ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.handleScroll();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  },
  
  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class
    if (currentScroll > 100) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
    
    this.lastScroll = currentScroll;
  }
};

/**
 * Mobile Navigation
 */
const MobileNav = {
  init() {
    this.toggle = document.querySelector('.menu-toggle');
    this.nav = document.querySelector('.mobile-nav');
    this.links = document.querySelectorAll('.mobile-nav__link');
    
    if (!this.toggle || !this.nav) return;
    
    this.toggle.addEventListener('click', () => this.toggleMenu());
    this.links.forEach(link => link.addEventListener('click', () => this.closeMenu()));
  },
  
  toggleMenu() {
    this.toggle.classList.toggle('active');
    this.nav.classList.toggle('active');
    document.body.style.overflow = this.nav.classList.contains('active') ? 'hidden' : '';
  },
  
  closeMenu() {
    this.toggle.classList.remove('active');
    this.nav.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Scroll-triggered Animations
 */
const ScrollAnimations = {
  init() {
    this.elements = document.querySelectorAll(
      '.fade-in, .scale-in, .slide-in-left, .slide-in-right, ' +
      '.advantage-card, .project-card, .team-member, ' +
      '.house-card, .gallery-item, .process-step'
    );
    
    if (this.elements.length === 0) return;
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Unobserve after animation
            if (entry.target.classList.contains('stagger')) {
              entry.target.classList.add('visible');
            }
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    this.elements.forEach(el => this.observer.observe(el));
    
    // Handle stagger animations
    this.staggerContainers = document.querySelectorAll('.stagger');
    this.staggerContainers.forEach(container => {
      this.observer.observe(container);
    });
  }
};

/**
 * Smooth Scroll for Anchor Links
 */
const SmoothScroll = {
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
};

/**
 * Testimonials Slider
 */
const Testimonials = {
  init() {
    this.slider = document.querySelector('.testimonials__slider');
    if (!this.slider) return;
    
    this.cards = this.slider.querySelectorAll('.testimonial-card');
    this.dots = document.querySelectorAll('.testimonial-dot');
    this.current = 0;
    
    if (this.dots.length > 0) {
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goToSlide(index));
      });
    }
    
    // Auto-advance
    this.interval = setInterval(() => this.next(), 5000);
  },
  
  goToSlide(index) {
    this.cards.forEach((card, i) => {
      card.style.display = i === index ? 'block' : 'none';
    });
    
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    this.current = index;
  },
  
  next() {
    const next = (this.current + 1) % this.cards.length;
    this.goToSlide(next);
  }
};

/**
 * Modal System
 */
const Modal = {
  init() {
    this.modals = document.querySelectorAll('.modal');
    this.triggers = document.querySelectorAll('[data-modal]');
    
    this.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const modalId = trigger.dataset.modal;
        this.open(modalId);
      });
    });
    
    this.modals.forEach(modal => {
      const closeBtn = modal.querySelector('.modal__close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => this.close(modal.id));
      }
      
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close(modal.id);
        }
      });
    });
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.modals.forEach(modal => this.close(modal.id));
      }
    });
  },
  
  open(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  },
  
  close(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
};

/**
 * Lightbox for Gallery
 */
const Lightbox = {
  init() {
    this.lightbox = document.querySelector('.lightbox');
    this.image = this.lightbox?.querySelector('.lightbox__image');
    this.items = document.querySelectorAll('.gallery-item[data-lightbox]');
    
    if (!this.lightbox || !this.image) return;
    
    this.items.forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          this.image.src = img.src;
          this.lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });
    
    // Close button
    const closeBtn = this.lightbox.querySelector('.lightbox__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.close());
    }
    
    // Click outside
    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) {
        this.close();
      }
    });
    
    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
  },
  
  close() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
};

/**
 * Gallery Filter
 */
const GalleryFilter = {
  init() {
    this.buttons = document.querySelectorAll('.gallery-filters .filter-btn');
    this.items = document.querySelectorAll('.gallery-item');
    
    if (this.buttons.length === 0) return;
    
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter items
        this.items.forEach(item => {
          const category = item.dataset.category;
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'block';
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
};

/**
 * House Catalog Filter
 */
const HouseFilter = {
  init() {
    this.buttons = document.querySelectorAll('.filter-bar .filter-btn');
    this.cards = document.querySelectorAll('.house-card');
    
    if (this.buttons.length === 0) return;
    
    this.buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        // Update active button
        this.buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter cards
        this.cards.forEach(card => {
          const category = card.dataset.category;
          
          if (filter === 'all' || category === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
};

/**
 * Contact Form Validation
 */
const ContactForm = {
  init() {
    this.form = document.querySelector('.contact-form form');
    if (!this.form) return;
    
    this.inputs = this.form.querySelectorAll('.form-input');
    
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
          this.validateField(input);
        }
      });
    });
    
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  },
  
  validateField(input) {
    const value = input.value.trim();
    let isValid = true;
    
    // Required fields
    if (input.hasAttribute('required') && !value) {
      isValid = false;
    }
    
    // Email validation
    if (input.type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
      }
    }
    
    // Phone validation
    if (input.type === 'tel' && value) {
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(value)) {
        isValid = false;
      }
    }
    
    input.classList.toggle('error', !isValid);
    return isValid;
  },
  
  handleSubmit(e) {
    e.preventDefault();
    
    let isValid = true;
    this.inputs.forEach(input => {
      if (!this.validateField(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      // Show success message
      const successMsg = this.form.querySelector('.form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        this.form.reset();
        
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }
  }
};

/**
 * Counter Animation for Stats
 */
const CounterAnimation = {
  init() {
    this.counters = document.querySelectorAll('.stat-number[data-count]');
    
    if (this.counters.length === 0) return;
    
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    
    this.counters.forEach(counter => this.observer.observe(counter));
  },
  
  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        element.textContent = target + (element.dataset.suffix || '');
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + (element.dataset.suffix || '');
      }
    }, 16);
  }
};

/**
 * Parallax Effect
 */
const Parallax = {
  init() {
    this.elements = document.querySelectorAll('.parallax');
    if (this.elements.length === 0) return;
    
    this.ticking = false;
    
    window.addEventListener('scroll', () => {
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.update();
          this.ticking = false;
        });
        this.ticking = true;
      }
    }, { passive: true });
  },
  
  update() {
    const scrollY = window.pageYOffset;
    
    this.elements.forEach(el => {
      const speed = el.dataset.speed || 0.5;
      const rect = el.getBoundingClientRect();
      const offset = rect.top;
      
      if (offset < window.innerHeight && offset > -rect.height) {
        const yPos = offset * speed;
        el.style.transform = `translateY(${yPos}px)`;
      }
    });
  }
};

/**
 * Cursor Effect (Desktop only)
 */
const CustomCursor = {
  init() {
    if (window.innerWidth < 1024) return;
    if ('ontouchstart' in window) return;
    
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    document.body.appendChild(this.cursor);
    
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'custom-cursor-dot';
    document.body.appendChild(this.cursorDot);
    
    this.pos = { x: 0, y: 0 };
    this.mouse = { x: 0, y: 0 };
    this.speed = 0.1;
    
    document.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });
    
    this.animate();
    
    // Hover effects
    const links = document.querySelectorAll('a, button, .gallery-item, .project-card');
    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      link.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });
  },
  
  animate() {
    this.pos.x += (this.mouse.x - this.pos.x) * this.speed;
    this.pos.y += (this.mouse.y - this.pos.y) * this.speed;
    
    this.cursorDot.style.left = `${this.mouse.x}px`;
    this.cursorDot.style.top = `${this.mouse.y}px`;
    
    this.cursor.style.left = `${this.pos.x}px`;
    this.cursor.style.top = `${this.pos.y}px`;
    
    requestAnimationFrame(() => this.animate());
  }
};

// Initialize custom cursor on desktop
if (window.innerWidth >= 1024 && !('ontouchstart' in window)) {
  document.addEventListener('DOMContentLoaded', () => {
    CustomCursor.init();
  });
}

/**
 * Utility: Debounce function
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Utility: Throttle function
 */
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

console.log('🌿 ECOWOOL - Website loaded successfully!');
