import Notiflix from 'notiflix'
import axios from 'axios'
const galleryList = document.querySelector('.gallery')
console.log(galleryList)
const form = document.querySelector('#search-form')



form.addEventListener('submit', getPicture)
// console.log(form)


const basaUrl = 'https://pixabay.com/api/';
const key = '35755370-cb3790e9babc7c8bcf3805309'
const imagePhoto = 'photo'
const orientation = "horizontal"
const safesearch ='true'
const perPage=40
let namePhoto=''


async function searchPhoto(namePhoto) {
  try {
    return response = await axios(`${basaUrl}?key=${key}&q=${namePhoto}&image_type=${imagePhoto}&safesearch=${safesearch}&orientation=${orientation}&per_page=${perPage}`);

  
  } catch (error) {
    throw error;
  }
}





async function getPicture(event) {
  event.preventDefault();
  // galleryList.innerHTML = ''
  namePhoto = event.target.elements.searchQuery.value.trim();
  const result= await searchPhoto(namePhoto);
  console.log(result)
   
  if (result.data.hits.length === 0) {
    Notiflix.Notify.warning
      ("Sorry, there are no images matching your search query. Please try again.")
    return
  
     
  }

  markup(result)
  
}
async function markup(result) {
  let imageCard = result.data.hits.map(({
    comments, webformatURL, downloads, likes, largeImageURL, tags, views
  }) =>
    `<div class="photo-card">
      <img src=${webformatURL} alt=${downloads} loading=${largeImageURL} />
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
    </div> `
  ).join('')
  galleryList.insertAdjacentHTML('beforeend', imageCard)
}