document.addEventListener('DOMContentLoaded', () => {
  const gameListContainer = document.getElementById('game-list');

  // Fetch game data
  fetch('games.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(games => {
      renderGames(games);
    })
    .catch(error => {
      console.error('Error fetching games:', error);
      gameListContainer.innerHTML = '<p style="text-align:center; flex: 1;">Failed to load games data.</p>';
    });

  function renderGames(games) {
    // Clear any existing content (or loading state)
    gameListContainer.innerHTML = '';

    games.forEach((game, index) => {
      const card = document.createElement('article');
      card.className = 'game-card';

      // Staggered animation delay
      card.style.animationDelay = `${index * 0.1}s`;

      card.innerHTML = `
        <div class="card-image-wrapper">
          <img src="${game.path}" alt="${game.name}" loading="lazy" decoding="async">
        </div>
        <div class="card-content">
          <h2 class="game-title">${game.name}</h2>
          <a href="#" class="play-btn">Play Now</a>
        </div>
      `;

      gameListContainer.appendChild(card);
    });
  }


  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(err => {
          console.log('ServiceWorker registration failed: ', err);
        });
    });
  }
});
