document.addEventListener('DOMContentLoaded', function() {
  // ============================================================
  // Navigation Menu & Arrow Toggle
  // ============================================================
  const arrow = document.getElementById('arrow');
  const navMenu = document.getElementById('navMenu');
  const bottomContent = document.querySelector('.bottom-content');

  if (arrow && navMenu && bottomContent) {
    arrow.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      arrow.classList.toggle('active');

      if (arrow.classList.contains('active')) {
        arrow.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>';
        bottomContent.classList.add('hidden');
      } else {
        arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
        bottomContent.classList.remove('hidden');
      }
    });

    window.addEventListener('scroll', () => {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        arrow.classList.remove('active');
        arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
        bottomContent.classList.remove('hidden');
      }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          arrow.classList.remove('active');
          arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
          bottomContent.classList.remove('hidden');
        }
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  } else {
    console.warn('Navigation elements not found!');
  }

  // ============================================================
  // Intersection Observer for Section Images
  // ============================================================
  const sectionImages = document.querySelectorAll('.section-image');
  if (sectionImages.length) {
    const observerOptions = { threshold: 0.5 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    }, observerOptions);
    sectionImages.forEach(img => observer.observe(img));
  }

  // ============================================================
  // Merch Slide Show
  // ============================================================
  const merchSlides = [
    "img/Crew.png",
    "img/Tee-Bone.png",
    "img/Tee-Pine Green.png",
    "img/Tee-Natural.png"
  ];
  let currentMerchIndex = 0;
  const merchSlide = document.getElementById("merch-slide");
  if (merchSlide) {
    function showNextMerchSlide() {
      currentMerchIndex = (currentMerchIndex + 1) % merchSlides.length;
      merchSlide.style.opacity = "0";
      setTimeout(() => {
        merchSlide.src = merchSlides[currentMerchIndex];
        merchSlide.style.opacity = "1";
      }, 1000);
    }
    setInterval(showNextMerchSlide, 5000);
  }

  // ============================================================
  // Sponsor Slide Show
  // ============================================================
  const sponsorSlides = [
    "img/type-logo.jpg",
    "img/tcf-logo.svg",
    "img/signnation-logo.png"
  ];
  let currentSponsorIndex = 0;
  const sponsorSlide = document.getElementById("sponsor-slide");
  if (sponsorSlide) {
    function showNextSponsorSlide() {
      currentSponsorIndex = (currentSponsorIndex + 1) % sponsorSlides.length;
      sponsorSlide.style.opacity = "0";
      setTimeout(() => {
        sponsorSlide.src = sponsorSlides[currentSponsorIndex];
        sponsorSlide.style.opacity = "1";
      }, 1000);
    }
    setInterval(showNextSponsorSlide, 5000);
  }

  // ============================================================
  // Modal Popup Handling
  // ============================================================
  const modal = document.getElementById("popup-modal");
  if (modal) {
    const modalBody = modal.querySelector(".modal-body");
    const modalClose = modal.querySelector(".modal-close");
    const scrollToTopButton = document.getElementById('scrollToTop');

    document.querySelectorAll(".popup-button").forEach(button => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const modalContentId = button.getAttribute("data-modal-id");
        const hiddenContent = document.getElementById(modalContentId);
        if (hiddenContent && modalBody) {
          modal.style.display = "flex";
          modalBody.innerHTML = "";
          void modalBody.offsetHeight;
          scrollToTopButton.classList.remove('show');
          setTimeout(() => {
            modalBody.innerHTML = hiddenContent.innerHTML;
            modalBody.scrollTop = 0;
            scrollToTopButton.classList.remove('show');

          }, 10);
        }
      });
    });

    if (modalClose && modalBody) {
      modalClose.addEventListener("click", () => {
        modal.style.display = "none";
        modalBody.innerHTML = "";
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
        if (modalBody) modalBody.innerHTML = "";
      }
    });
  }

  // ============================================================
  // Scroll-to-Top Button
  // ============================================================
  const scrollToTopButton = document.getElementById('scrollToTop');
  if (scrollToTopButton) {
    
    console.log('scrollToTopButton found:', scrollToTopButton);
  
    // Determine the scroll container:
    // Change '.main-content' to your custom scroll container selector if you have one.
    // If no custom container is found, use the window.
    const scrollContainer = document.querySelector('.page-wrapper') || window;
  
    function toggleScrollButton() {
      let scrollPos;
      if (scrollContainer === window) {
        scrollPos = window.pageYOffset;
      } else {
        scrollPos = scrollContainer.scrollTop;
      }
      if (scrollPos > 100) {
        scrollToTopButton.classList.add('show');
      } else {
        scrollToTopButton.classList.remove('show');
      }
    }
  
    // Attach the scroll event listener to the appropriate container.
    if (scrollContainer === window) {
      window.addEventListener('scroll', toggleScrollButton);
    } else {
      scrollContainer.addEventListener('scroll', toggleScrollButton);
    }
  
    scrollToTopButton.addEventListener('click', function() {
      if (scrollContainer === window) {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      } else {
        // If using a custom scroll container, scroll that container to the top.
        scrollContainer.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
      setTimeout(() => {
        scrollToTopButton.classList.remove('show');
      }, 500);
    });
  } else {
    console.warn('scrollToTopButton not found in the DOM.');
  }  
});
