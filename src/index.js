import Notiflix, { Block } from 'notiflix'
import axios from 'axios'
const galleryList = document.querySelector('.gallery')
const form = document.querySelector('#search-form')
const searchQwery = form.querySelector('input[name="searchQuery"]')
const btnLoadMore = document.querySelector('.load-more')

const btnSubmit = form.querySelector('button[type="submit"]');
// btnLoadMore.style.display='none'
// btnSubmit.addEventListener('click', () => {
//   btnLoadMore.style.display = 'block'
//   if (arr.length > 40 ) {
    
//   }
//   })


imageCard=[]
searchQwery.addEventListener('input', () => {
  if (!searchQwery.value.trim()) {
    galleryList.innerHTML = '';
  }
  
})



form.addEventListener('submit', getPicture)

const basaUrl = 'https://pixabay.com/api/';
const key = '35755370-cb3790e9babc7c8bcf3805309'
const imagePhoto = 'photo'
const orientation = "horizontal"
const safesearch ='true'
let perPage = 40
let page =1
let namePhoto=''
const arr=[]

async function searchPhoto(namePhoto, page=1, perPage=40) {
  try {
    return response = await axios(`${basaUrl}?key=${key}&q=${namePhoto}&image_type=${imagePhoto}&safesearch=${safesearch}&orientation=${orientation}&page=${page}&per_page=${perPage}`);

  } catch (error) {
    throw error; }}
async function getPicture(event) {
  event.preventDefault();
 

  namePhoto = event.target.elements.searchQuery.value.trim();
  
  const result= await searchPhoto(namePhoto);
  let arr = result.data.hits


  console.log(arr)
  if (arr.length === 0) {
    Notiflix.Notify.warning
      ("Sorry, there are no images matching your search query. Please try again.")
    
  }
   {
   return markup(arr);
   

  }

}


async function markup(arr) {
   const imageCard = arr.map(({
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
  galleryList.insertAdjacentHTML('beforeend', imageCard)}
btnLoadMore.addEventListener('click', async () => {
  const response = await searchPhoto(namePhoto, page, perPage)
  page += 1;

  arr.push(...response.data.hits)
  markup(arr);

  if(!searchQwery.value.trim()) {
    galleryList.innerHTML = ''
    if (namePhoto) {
  console.log('aaa')
}
  }
}) 

