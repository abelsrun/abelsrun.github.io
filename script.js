document.addEventListener("DOMContentLoaded", () => {
  // Menu Toggle Variables
  const arrow = document.getElementById('arrow');
  const navMenu = document.getElementById('navMenu');
  const bottomContent = document.querySelector('.bottom-content');
  const pageWrapper = document.querySelector(".page-wrapper");

  // Toggle nav menu on arrow click
  arrow.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    arrow.classList.toggle('active');
    
    if (arrow.classList.contains('active')) {
      arrow.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'; // cross symbol
      bottomContent.classList.add('hidden');
    } else {
      arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>'; // down arrow
      bottomContent.classList.remove('hidden');
    }
  });

  // Close the menu when the user scrolls
  pageWrapper.addEventListener('scroll', () => {
    // Make sure the page is scrollable
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      arrow.classList.remove('active');
      arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
      bottomContent.classList.remove('hidden');
    }
  });

  // Also close the menu when a nav link is clicked and scroll smoothly
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

  // Intersection Observer for Section Images
  const sectionImages = document.querySelectorAll('.section-image');
  const observerOptions = {
    threshold: 0.5 // triggers when 50% of the element is visible
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  }, observerOptions);

  sectionImages.forEach(img => {
    observer.observe(img);
  });

  // Merch Slide Show
  const merchSlides = [
    "img/Crew.png",
    "img/Tee-Bone.png",
    "img/Tee-Pine Green.png",
    "img/Tee-Natural.png"
  ];
  let merchIndex = 0;
  const merchSlide = document.getElementById("merch-slide");

  function showNextMerchSlide() {
    merchIndex = (merchIndex + 1) % merchSlides.length;
    merchSlide.style.opacity = "0";
    setTimeout(() => {
      merchSlide.src = merchSlides[merchIndex];
      merchSlide.style.opacity = "1";
    }, 1000);
  }
  setInterval(showNextMerchSlide, 5000);

  // Sponsor Slide Show
  const sponsorSlides = [
    "img/type-logo.jpg",
    "img/tcf-logo.svg",
    "img/signnation-logo.png"
  ];
  let sponsorIndex = 0;
  const sponsorSlide = document.getElementById("sponsor-slide");

  function showNextSponsorSlide() {
    sponsorIndex = (sponsorIndex + 1) % sponsorSlides.length;
    sponsorSlide.style.opacity = "0";
    setTimeout(() => {
      sponsorSlide.src = sponsorSlides[sponsorIndex];
      sponsorSlide.style.opacity = "1";
    }, 1000);
  }
  setInterval(showNextSponsorSlide, 5000);

  // Modal Functionality
  const modal = document.getElementById("popup-modal");
  const modalContent = modal.querySelector(".modal-content");
  const modalBody = modal.querySelector(".modal-body");
  const modalClose = modal.querySelector(".modal-close");

  function closeModal() {
    console.log("Close button clicked. Starting closing animation.");
    modalContent.classList.add("closing");

    modalContent.addEventListener(
      "animationend",
      () => {
        console.log("Closing animation ended. Hiding modal.");
        modal.style.display = "none";
        modalBody.innerHTML = "";
        modalContent.classList.remove("closing");
      },
      { once: true }
    );
  }

  // Open modal on popup button click
  document.querySelectorAll(".popup-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const modalContentId = button.getAttribute("data-modal-id");
      const hiddenContent = document.getElementById(modalContentId);

      if (hiddenContent) {
        modal.style.display = "flex";
        modalBody.innerHTML = "";
        void modalBody.offsetHeight; // Force reflow

        setTimeout(() => {
          modalBody.innerHTML = hiddenContent.innerHTML;
          modalBody.scrollTop = 0;
        }, 10);
      }
    });
  });

  // Close modal when the close button is clicked
  modalClose.addEventListener("click", closeModal);

  // Close modal when clicking outside the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Loading Screen Hide on Window Load
  const loadingScreen = document.querySelector(".loadingScreen");
  window.addEventListener('load', function() {
    loadingScreen.style.display = 'none';
  });
});
