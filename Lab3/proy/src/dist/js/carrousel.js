function scrollCarousel(direction) {
    const carousel = document.getElementById('product-carousel');
    const scrollAmount = 150; 
    carousel.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
    });
}