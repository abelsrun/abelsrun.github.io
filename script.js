// Existing code:
const arrow = document.getElementById('arrow');
const navMenu = document.getElementById('navMenu');
const bottomContent = document.querySelector('.bottom-content');

arrow.addEventListener('click', () => {
  // Toggle active classes on nav menu and arrow
  navMenu.classList.toggle('active');
  arrow.classList.toggle('active');

  // Toggle arrow icon between down arrow and cross,
  // and toggle the hidden class on the bottom-content container
  if (arrow.classList.contains('active')) {
    arrow.innerHTML = '<i class="fa-solid fa-circle-xmark"></i>'; // cross symbol
    bottomContent.classList.add('hidden');
  } else {
    arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>'; // down arrow
    bottomContent.classList.remove('hidden');
  }
});

// New: Close the menu when the user scrolls
window.addEventListener('scroll', () => {
  if (navMenu.classList.contains('active')) {
    navMenu.classList.remove('active');
    arrow.classList.remove('active');
    arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
    bottomContent.classList.remove('hidden');
  }
});

// New: Also close the menu when a nav link is clicked
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Close the menu if it is open
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
      arrow.classList.remove('active');
      arrow.innerHTML = '<i class="fa-solid fa-circle-arrow-down fa-bounce"></i>';
      bottomContent.classList.remove('hidden');
    }
    // Smoothly scroll to the target section
    const targetId = this.getAttribute('href');
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
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
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        "img/Crew.png",        // First image
        "img/Tee-Bone.png",      // Second image
        "img/Tee-Pine Green.png",      // Third image
        "img/Tee-Natural.png"      // Add more images as needed
    ];

    let currentIndex = 0;
    const merchSlide = document.getElementById("merch-slide");

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the start
        merchSlide.style.opacity = "0"; // Fade out
        setTimeout(() => {
            merchSlide.src = slides[currentIndex]; // Change image
            merchSlide.style.opacity = "1"; // Fade in
        }, 1000); // Match the duration of the CSS transition
    }

    setInterval(showNextSlide, 5000); // Change every 5 seconds
});

document.addEventListener("DOMContentLoaded", () => {
    const slides = [
        "img/type-logo.jpg",        // First image
        "img/tcf-logo.svg",      // Second image
        "img/signnation-logo.png"      // Add more images as needed
    ];

    let currentIndex = 0;
    const merchSlide = document.getElementById("sponsor-slide");

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length; // Loop back to the start
        merchSlide.style.opacity = "0"; // Fade out
        setTimeout(() => {
            merchSlide.src = slides[currentIndex]; // Change image
            merchSlide.style.opacity = "1"; // Fade in
        }, 1000); // Match the duration of the CSS transition
    }

    setInterval(showNextSlide, 5000); // Change every 5 seconds
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("popup-modal");
  const modalBody = modal.querySelector(".modal-body");
  const modalClose = modal.querySelector(".modal-close");

  // Attach click handler to all popup buttons
  document.querySelectorAll(".popup-button").forEach(button => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      // Get the ID of the hidden content container from the data attribute
      const modalContentId = button.getAttribute("data-modal-id");
      const hiddenContent = document.getElementById(modalContentId);

      if (hiddenContent) {
        modal.style.display = "flex";  // Open modal

        // Reset modal content (force reflow)
        modalBody.innerHTML = "";
        void modalBody.offsetHeight; // Trigger reflow

        // Inject new content after reflow
        setTimeout(() => {
          modalBody.innerHTML = hiddenContent.innerHTML;
          modalBody.scrollTop = 0; // Now reset scroll position
        }, 10);
      }
    });
  });

  // Close modal when the close button is clicked
  modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    modalBody.innerHTML = ""; // Clear content to ensure fresh reload
  });

  // Optional: Close modal if the user clicks outside of the modal content
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
      modalBody.innerHTML = ""; // Reset content when closing
    }
  });
});




