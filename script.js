document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------------
  // 1. Menu Toggle Functionality
  // --------------------------------------------------
  const arrow = document.getElementById("arrow");
  const navMenu = document.getElementById("navMenu");
  const bottomContent = document.querySelector(".bottom-content");
  const pageWrapper = document.querySelector(".page-wrapper");

  arrow.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    arrow.classList.toggle("active");

    if (arrow.classList.contains("active")) {
      arrow.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      bottomContent.classList.add("hidden");
    } else {
      arrow.innerHTML = '<i class="fa-solid fa-bars"></i>';
      bottomContent.classList.remove("hidden");
    }
  });

  pageWrapper.addEventListener("scroll", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      arrow.classList.remove("active");
      arrow.innerHTML = '<i class="fa-solid fa-bars"></i>';
      bottomContent.classList.remove("hidden");
    }
  });

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        arrow.classList.remove("active");
        arrow.innerHTML = '<i class="fa-solid fa-bars"></i>';
        bottomContent.classList.remove("hidden");
      }
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --------------------------------------------------
  // 2. Intersection Observer for Section Images
  // --------------------------------------------------
  const sectionImages = document.querySelectorAll(".section-image");
  const imageObserverOptions = { threshold: 0.5 };

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      } else {
        entry.target.classList.remove("in-view");
      }
    });
  }, imageObserverOptions);

  sectionImages.forEach((img) => {
    imageObserver.observe(img);
  });

  // --------------------------------------------------
  // 3. Slide Show Functionality (Merch & Sponsor)
  // --------------------------------------------------
  const merchSlides = [
    "img/Crew.png",
    "img/Tee-Bone.png",
    "img/Tee-Pine Green.png",
    "img/Tee-Natural.png",
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

  const sponsorSlides = [
    "img/type-logo.jpg",
    "img/tcf-logo.svg",
    "img/signnation-logo.png",
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

  // --------------------------------------------------
  // 4. Modal Functionality
  // --------------------------------------------------
  const modal = document.getElementById("popup-modal");
  const modalContent = modal.querySelector(".modal-content");
  const modalBody = modal.querySelector(".modal-body");
  const modalClose = modal.querySelector(".modal-close");

  function closeModal() {
    modalContent.classList.add("closing");
    modalContent.addEventListener(
      "animationend",
      () => {
        modal.style.display = "none";
        modalBody.innerHTML = "";
        modalContent.classList.remove("closing");
      },
      { once: true }
    );
  }

  document.querySelectorAll(".popup-button").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const modalContentId = button.getAttribute("data-modal-id");
      const hiddenContent = document.getElementById(modalContentId);

      if (hiddenContent) {
        modal.style.display = "flex";
        modalBody.innerHTML = "";
        void modalBody.offsetHeight;
        setTimeout(() => {
          modalBody.innerHTML = hiddenContent.innerHTML;
          modalBody.scrollTop = 0;
        }, 10);
      }
    });
  });

  modalClose.addEventListener("click", closeModal);

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // --------------------------------------------------
  // 5. Hide the Loading Screen on Window Load
  // --------------------------------------------------
  const loadingScreen = document.querySelector(".loadingScreen");
  window.addEventListener("load", function () {
    loadingScreen.style.display = "none";
  });

  // --------------------------------------------------
  // 6. Slide-In Animation for Headings and Paragraphs
  // --------------------------------------------------
  const slideElements = document.querySelectorAll(
    ".section h1, .section p, .sponsors h1, .sponsors p, footer h1, footer p, button"
  );

  const slideObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  slideElements.forEach((el) => slideObserver.observe(el));

  // --------------------------------------------------
  // 7. Animate Counter with Comma Formatting
  // --------------------------------------------------
  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-target"), 10);
    const duration = 2000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * target);
      el.innerText = "$" + currentValue.toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.innerText = "$" + target.toLocaleString();
      }
    }
    requestAnimationFrame(updateCounter);
  }

  const counterEl = document.querySelector(".counter");
  if (counterEl) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    counterObserver.observe(counterEl);
  }
});



