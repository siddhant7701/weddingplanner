document.addEventListener('DOMContentLoaded', () => {
    let galleryIndex = 0;
    const gallery = document.querySelector('.gallery');
    const galleryPhotos = document.querySelectorAll('.gallery-photo');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.querySelector('.lightbox-close');

    // Duplicate the gallery photos to create an infinite loop effect
    gallery.innerHTML += gallery.innerHTML;
    const totalPhotos = galleryPhotos.length * 2;

    const showGalleryPhoto = (index) => {
        gallery.style.transition = 'transform 0.5s ease-in-out';
        const offset = -index * 100;
        gallery.style.transform = `translateX(${offset}%)`;
        galleryIndex = index;

        if (galleryIndex >= totalPhotos / 2) {
            setTimeout(() => {
                gallery.style.transition = 'none';
                gallery.style.transform = `translateX(0)`;
                galleryIndex = 0;
            }, 500);
        }
    };

    document.querySelector('.gallery-next').addEventListener('click', () => {
        showGalleryPhoto((galleryIndex + 1) % totalPhotos);
    });

    document.querySelector('.gallery-prev').addEventListener('click', () => {
        showGalleryPhoto((galleryIndex - 1 + totalPhotos) % totalPhotos);
    });

    galleryPhotos.forEach((photo, index) => {
        photo.addEventListener('click', () => {
            lightbox.style.display = 'flex';
            lightboxImg.src = photo.src;
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Auto-scroll gallery
    setInterval(() => {
        showGalleryPhoto((galleryIndex + 1) % totalPhotos);
    }, 3000);

    // Scroll animations for service boxes
    const serviceBoxes = document.querySelectorAll('.service-box');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.5 });

    serviceBoxes.forEach(box => {
        box.style.transform = 'translateY(20px)';
        box.style.opacity = '0';
        observer.observe(box);
    });
});
