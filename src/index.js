import axios from 'axios';
// import Notiflix from 'notiflix';
// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';

// const { default: axios } = require("axios");
const axios = require('axios');

const elements = {
    form: document.querySelector("#search-form"),
    input: document.querySelector('[name="searchQuery"]')
};
const API_KEY = '40272444-68c2b8bdd462bea697b437f9a';
const URL = 'https://pixabay.com/api/'

elements.form.addEventListener('submit', handlerSearch);

function handlerSearch(evt) {
    evt.preventDefault();

    const searchValue = elements.input.value;
    console.log(searchValue)
    // const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${searchValue}&image_type=photo&orientation=horizontal&safesearch=true`
     axios({
        method: 'GET',
         url: 'https://pixabay.com/api/',
        data: {
    //     webformatURL - посилання на маленьке зображення для списку карток.
    //     largeImageURL - посилання на велике зображення.
    //     tags - рядок з описом зображення. Підійде для атрибуту alt.
    //     likes - кількість лайків.
    //     views - кількість переглядів.
    //     comments - кількість коментарів.
    //     downloads - кількість завантажень.
        }
     });
    
    axios.get(`${URL}?key=${API_KEY}&q=${searchValue}`, {
            // 'key': 'API_KEY',
            // 'q': 'searchValue',
            'image_type': 'photo',
            'orientation': 'horizontal',
            'safesearch': 'true'
         },)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })


//     axios({
//         method: 'POST',
//         url: 'https://pixabay.com/api/',
//         data: {
//             'key': 'API_KEY',
//             'q': 'searchValue',
//             'image_type': 'photo',
//             'orientation': 'horizontal',
//             'safesearch': 'true'
//         }
//     });

//     const getSearchValue = async (searchValue) => {
//   try {
//       const response = await axios.get(${URL});
//       console.log(response.data)
//       return response.data;
//   } catch (err) {
//       console.error(err.toJSON());
//   }
// }
//     getSearchValue()
//         .then(data => console.log(data))
//         .catch(error => console.log(error))
}

// async function getSearchValue() {
//     const URL = 'https://pixabay.com/api/'
//     const resp = await fetch(${URL}image)
//     console.log(resp)
// }

// getSearchValue() 


// https://pixabay.com/api?key=22879693-f597847bea9bb847dbdd65681&q=searchValue&image_type=photo&orientation=horizontal&safesearch=true
