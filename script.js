// API를 사용하여 영화 목록을 가져오고 화면에 표시하는 함수
function fetchMovies() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjFkNzIzMTBmNGViY2Q4OWVlNTNlNzU1ODJjNzZkYiIsInN1YiI6IjY2MjlmYTI0NGNiZTEyMDBhN2Y5ZmNkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gagwi5ji6AvsjSLqv6JtwWf7yT-v_LQQpPESRponXxo'
    }
  };

  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(err => console.error(err));
}

// 영화 목록을 화면에 표시하는 함수
function displayMovies(movies) {
  const cardList = document.querySelector('.card-list');

  // 기존에 표시되어 있는 영화 카드를 모두 제거
  cardList.innerHTML = '';

  // 각 영화 정보를 카드로 만들어 화면에 추가
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.movieId = movie.id; // 영화 ID를 데이터 속성으로 설정

    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    image.alt = movie.title;

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const overview = document.createElement('p');
    overview.textContent = movie.overview;

    // 평점 정보를 표시하는 요소 추가
    const rating = document.createElement('p');
    rating.textContent = `평점: ${movie.vote_average}`;

    card.appendChild(image);
    card.appendChild(title);
    card.appendChild(overview);
    card.appendChild(rating); // 평점 요소 추가

    cardList.appendChild(card);
  });
}

// 검색 폼 제출 이벤트 핸들러
function handleSearch(event) {
  event.preventDefault();
  const searchTerm = document.getElementById('search-input').value;
  searchMovies(searchTerm);
}

// 영화 검색 함수
function searchMovies(keyword) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjFkNzIzMTBmNGViY2Q4OWVlNTNlNzU1ODJjNzZkYiIsInN1YiI6IjY2MjlmYTI0NGNiZTEyMDBhN2Y5ZmNkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gagwi5ji6AvsjSLqv6JtwWf7yT-v_LQQpPESRponXxo'
    }
  };

  fetch(`https://api.themoviedb.org/3/search/movie?query=${keyword}&language=en-US&page=1&include_adult=false`, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(err => console.error(err));
}

// 장르 버튼 클릭 이벤트 핸들러
document.querySelectorAll('.genre-btn').forEach(button => {
  button.addEventListener('click', () => {
    const genreId = button.getAttribute('data-genre-id');
    searchMoviesByGenre(genreId);
  });
});

// API를 사용하여 장르별 영화를 검색하는 함수
function searchMoviesByGenre(genreId) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MjFkNzIzMTBmNGViY2Q4OWVlNTNlNzU1ODJjNzZkYiIsInN1YiI6IjY2MjlmYTI0NGNiZTEyMDBhN2Y5ZmNkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gagwi5ji6AvsjSLqv6JtwWf7yT-v_LQQpPESRponXxo'
    }
  };

  fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`, options)
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      displayMovies(movies);
    })
    .catch(err => console.error(err));
}

// 페이지 로드 시 영화 목록을 가져와서 표시
window.onload = function () {
  fetchMovies();
};

// 카드 클릭 이벤트 핸들러 추가
document.querySelector('.card-list').addEventListener('click', function (event) {
  // 클릭한 요소가 카드인지 또는 카드의 하위 요소인지 확인합니다.
  const clickedCard = event.target.closest('.card');
  if (clickedCard) {
    // 클릭한 카드에서 영화 ID를 가져옵니다.
    const movieId = clickedCard.dataset.movieId;
    // 가져온 영화 ID를 사용하여 알림창으로 출력합니다.
    alert(`영화 ID : ${movieId}`);
  }
});

// CINE SCOPE 로고 클릭 시 메인 홈으로 이동하는 함수
function goToMainHome() {
  location.href = '/index.html';
}

// CINE SCOPE 로고 클릭 이벤트 핸들러 추가
document.querySelector('header h1').addEventListener('click', goToMainHome);