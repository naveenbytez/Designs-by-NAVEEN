// Theme Toggle
const themeButton = document.getElementById('theme-button');
const body = document.body;

themeButton.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  themeButton.textContent = body.classList.contains('dark-theme') ? '☀️' : '🌙';
});

// Load portfolio data from JSON
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const portfolioGrid = document.getElementById('portfolio-grid');
    const figmaEmbeds = document.querySelector('.figma-embeds');

    // Load Poster Designs
    data.posters.forEach(item => {
      const portfolioItem = document.createElement('div');
      portfolioItem.className = 'portfolio-item';

      const image = document.createElement('img');
      image.src = item.imageUrl;
      image.alt = item.title;
      image.addEventListener('click', () => openModal(item.imageUrl, item.title));

      portfolioItem.appendChild(image);
      portfolioGrid.appendChild(portfolioItem);
    });

    // Load UI/UX Designs
    data.uiux.forEach(item => {
      const iframe = document.createElement('iframe');
      iframe.src = item.embedUrl;
      iframe.style.border = '1px solid rgba(0, 0, 0, 0.1)';
      iframe.width = '100%';
      iframe.height = '450';
      iframe.allowFullscreen = true;

      figmaEmbeds.appendChild(iframe);
    });
  });

// Modal functionality
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const downloadLink = document.getElementById('download-link');
const closeBtn = document.querySelector('.close');

function openModal(imageUrl, title) {
  modal.style.display = 'block';
  modalImage.src = imageUrl;
  downloadLink.href = imageUrl;
  downloadLink.download = title;
}

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});