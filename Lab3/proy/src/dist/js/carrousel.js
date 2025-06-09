function scrollCarousel(direction) {
  const carousel = document.getElementById('product-carousel');
  const card = carousel.querySelector('.flip-card');
  const cardWidth = card.offsetWidth + 16; // sumamos el gap (~1rem = 16px)
  const scrollAmount = cardWidth * 1; // 2 tarjetas por click
  carousel.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}