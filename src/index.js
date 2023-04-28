import Notiflix from 'notiflix';
import axios from 'axios';

const galleryList = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const searchQuery = form.querySelector('input[name="searchQuery"]');
const btnLoadMore = document.querySelector('.load-more');
const btnSubmit = form.querySelector('button[type="submit"]');
btnLoadMore.style.display = 'none';

btnSubmit.addEventListener('click', () => {
  btnLoadMore.style.display = 'block';
});
btnLoadMore.addEventListener('click', () => {
  btnLoadMore.style.display = 'none';
  
});

btnLoadMore.addEventListener('click', async () => {
  const response = await searchPhoto(namePhoto, page, perPage);
  page += 1;

  if (arr1.push(...response.data.hits)) {
    markup(arr1);
    btnLoadMore.style.display = 'block';
  }
});

searchQuery.addEventListener('input', () => {
  if (!searchQuery.value.trim()) {
    galleryList.innerHTML = '';
  }
});

form.addEventListener('submit', getPicture);

const baseUrl = 'https://pixabay.com/api/';
const key = '35755370-cb3790e9babc7c8bcf3805309';
const imageType = 'photo';
const orientation = 'horizontal';
const safeSearch = 'true';
let perPage = 40;
let page = 1;
let namePhoto = '';
const arr1 = [];



async function searchPhoto(namePhoto, page = 1, perPage = 40) {
  try {
    const response = await axios(`${baseUrl}?key=${key}&q=${namePhoto}&image_type=${imageType}&safesearch=${safeSearch}&orientation=${orientation}&page=${page}&per_page=${perPage}`);
    return response;
  } catch (error) {
    throw error;
  }
}

async function getPicture(event) {
  event.preventDefault();
  namePhoto = searchQuery.value.trim();
  galleryList.innerHTML=''
  const result = await searchPhoto(namePhoto);
  

  const totalHits = result.data.totalHits;
  const arr = result.data.hits;


  if (totalHits !== 0) {
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }

  if (arr.length === 0) {
    Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");
  }
  
  else {
    markup(arr);
  }
}

async function markup(arr) {
  const imageCard = arr.map(({ comments, webformatURL, downloads, likes, largeImageURL, tags, views }) => `
    <div class="photo-card">
      <img src=${webformatURL} alt=${downloads} loading="${largeImageURL}" />
      <div class="info">
        <p class="info-item">
          <b>${likes}</b>
        </p>
        <p class="info-item">
          <b>${views}</b>
        </p>
        <p class="info-item">
          <b>${comments}</b>
        </p>
        <p class="info-item">
          <b>${tags}</b>
        </p>
      </div>
    </div>
  `).join('');
  galleryList.insertAdjacentHTML('beforeend', imageCard);
}





 