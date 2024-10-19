//================================================================================
//Додаємо актуальную дату

const dataEl =document.querySelector('.greytekst');
const currentDate=new Date().toLocaleDateString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
dataEl.innerHTML=currentDate;

//Жанри
//==================================================================================
const genres=['Drama','Thriller','Supernatural'];

const genresContainer=document.querySelector('.genres');

genres.forEach(genre=>{
    const genresSpan =document.createElement('span');
    genresSpan.classList.add('genre');
    genresSpan.innerText=genre;
    genresSpan.style.marginRight='15px';
    genresSpan.style.marginLeft='15px'

    genresContainer.appendChild(genresSpan);
    genresContainer.appendChild(document.createTextNode('|'));
})
genresContainer.lastChild.remove();

genresContainer.addEventListener('click',(e)=>{
    if(e.target.classList.contains('genre')){
        alert(`Ви натиснули на жанр:${e.target.innerText}`)
    }
})

//Активний рейтинг
//================================================================================

const stars = document.querySelectorAll('.star i');
let currentRating = 0;
let ratings = []; // Массив для оцінок

function highlightStars(rating) {
    stars.forEach((star) => {
        const starIndex = star.getAttribute('data-index');
        if (starIndex <= rating) {
            star.classList.add('fa-solid');
            star.classList.remove('fa-regular');
            star.style.color='gold'

        } else {
            star.classList.add('fa-regular');
            star.classList.remove('fa-solid');
            star.style.color='rgb(252, 252, 252)'

        }
    });
}

// Зберигаємо наш рейтинг

function saveRating(rating) {
    ratings.push(rating);
    console.log(`Оцінка збережена:${rating}`);
}

//Проходимо по нашим зіркам і за допомогую 'mouseover' i 'mouseout' вибираємо оцінку

stars.forEach((star) => {
    star.addEventListener('mouseover', function() {
        const rating = this.getAttribute('data-index');
        highlightStars(rating);
    });

    star.addEventListener('mouseout', function() {
        highlightStars(currentRating);
    });

    //Встановлюємо наш рейтинг

    star.addEventListener('click', function() {
        currentRating = this.getAttribute('data-index');
        saveRating(currentRating);
    });
});

//Адаптуємо фильми
//================================================================================

//Я додав ще кілька зображень із фільмами ,щоб перемикання стрілками виглядало більше менше жвавіше

const films = Array.from(document.querySelectorAll('.catalog .film'));
const filmsPerPage = 5;
let currentFilmIndex = 0;

films.forEach((film, index)=>{
    film.setAttribute('data-index',index)
    console.log(`Film №: ${index}`)

})

document.querySelector('.arrow-left').addEventListener('click', () => {
    currentFilmIndex = (currentFilmIndex - filmsPerPage + films.length) % films.length;
    updateFilms();
});


document.querySelector('.arrow-right').addEventListener('click', () => {
    currentFilmIndex = (currentFilmIndex + filmsPerPage) % films.length;
    updateFilms();
});

function updateFilms() {
    films.forEach((film, index) => {
        if (index >= currentFilmIndex && index < currentFilmIndex + filmsPerPage) {
            film.style.display = 'block'; }
         else {
            film.style.display = 'none';   
        }
    });
}

updateFilms();