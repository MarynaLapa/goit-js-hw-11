import axios from 'axios';
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';

const elements = {
    form: document.querySelector('#search-form'),
    input: document.querySelector('[name="searchQuery"]'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more')
};

const API_KEY = '40272444-68c2b8bdd462bea697b437f9a';
const BASE_URL = 'https://pixabay.com/api/'

const options = {
    captions: true,
    captionDelay: 250,
    captionSelector: 'img',
    captionType: 'attr',
    captionPosition: 'bottom',
    captionsData: 'alt',
};

let page = 1;
const perPage = 40;

elements.form.addEventListener('submit', handlerSearch);
elements.loadMore.addEventListener('click', handlerLoadMore)

let gallerylist = new SimpleLightbox('.gallery a', options);

async function handlerSearch(evt) {
    evt.preventDefault();
    elements.gallery.innerHTML = '';
    const formData = new FormData(evt.currentTarget);
    const searchValue = formData.getAll('searchQuery');
    if (searchValue[0] === '') {
        Notiflix.Notify.success('Please enter search parameters first');
        return; 
    }

    const data = await getSearchValue(searchValue)
        .then(function (response) {

            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })

    if (data.hits.length === 0) {
        elements.loadMore.classList.add('visually-hidden');
        Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
        return;
    } else {
        Notiflix.Notify.success(`Hooray! We found ${data.total} images.`);
    }

    if (data.hits.length > 40) {
        elements.loadMore.classList.remove('visually-hidden');
    }

    const galleryValue = await getGalleryValue(data.hits);
    createMarkup(galleryValue);
}

async function getSearchValue(q) {
    const paramsObj = {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: perPage,
        page
    }

    const params = new URLSearchParams(paramsObj);

    return await axios.get(`${BASE_URL}?${params}`)
}

function getGalleryValue(arr) {

    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return { webformatURL, largeImageURL, tags, likes, views, comments, downloads };
    })

}

function createMarkup(arr) {
    
    const markup = arr.map(( { webformatURL, largeImageURL, tags, likes, views, comments, downloads } ) => `  
        <div class="photo-card">
            <a class="photo-card__link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}" class="photo-card-image" width="300" loading="lazy">
                <div class="info">
                    <p class="info-item">
                        <b>Likes:</b> <span class="info-item-text">${likes}</span>
                    </p>
                    <p class="info-item">
                        <b>Views:</b> <span class="info-item-text">${views}</span>
                    </p>
                    <p class="info-item">
                        <b>Comments:</b> <span class="info-item-text">${comments}</span>
                    </p>
                    <p class="info-item">
                        <b>Downloads:</b> <span class="info-item-text">${downloads}</span>
                    </p>
                </div>
            </a>
        </div>
    `)
        .join('')
    
    elements.gallery.insertAdjacentHTML('beforeend', markup);
    gallerylist.refresh();
}

async function handlerLoadMore(evt) {
    page += 1;
    const searchValue = elements.input.value;
    const data = await getSearchValue(searchValue)
        .then(function (response) {

            return response.data;
        })
        .catch(function (error) {
            console.log(error);
        })

    const galleryValue = await getGalleryValue(data.hits);
    createMarkup(galleryValue);
   
    if (page * 40 >= data.totalHits) {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
        elements.loadMore.classList.add('visually-hidden');
        return;
    }

    const { height: cardHeight } = document
    .querySelector('.gallery')
    .lastElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });

}

