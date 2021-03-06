
//Search
const search = document.querySelector("#search");
const searchBtn = document.querySelector(".fa-search");
searchBtn.addEventListener("click", () => {
    const fetchSearch = fetch(`https://api.themoviedb.org/3/search/multi?api_key=1015bc24cd3e7930b331be222621accb&query=${search.value}`);

    fetchSearch.then(resolve => resolve.json())
    .then(data => {
        console.log(data);
    })

});


// Carousel Section

// const container = document.querySelector(".container");
const carousel = document.querySelector(".carousel-list");
const carouselItem = document.querySelector(".carousel-items");
const carouselItemWidth = carouselItem.offsetWidth;
const carouselSlide = Array.from(carousel.children);
const carouselItemCount = carousel.children.length;
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");



//Carousel Item position
carouselSlide.forEach((slide , index) => {
    slide.style.left = `${carouselItemWidth * index}px`;
});

//Carousel Control
let slideControl = (currentSlide,targetSlide) => {
    const targetItem = targetSlide.style.left;
    const totalCarouselWidth = `${carouselItemWidth * (carouselItemCount - 1)}px`;

    currentSlide.classList.remove("active");
    targetSlide.classList.add("active");
    carousel.style.transform = `translateX(-${targetItem})`;
    

    if(targetItem == totalCarouselWidth){
        nextBtn.style.display = "none";
    }
    if(targetItem < totalCarouselWidth){
        prevBtn.style.display = "block";
    }
    if(targetItem < totalCarouselWidth){
        nextBtn.style.display = "block";
    }
    if(targetItem == "0px"){
        prevBtn.style.display = "none";
    }
}

// Carousel Control Button
nextBtn.addEventListener('click', () => {
    const currentItem = carousel.querySelector(".active");
    const nextItem = currentItem.nextElementSibling;
    
    slideControl(currentItem,nextItem);    
});
prevBtn.addEventListener('click', () => {
    const currentItem = carousel.querySelector(".active");
    const prevItem = currentItem.previousElementSibling;

    slideControl(currentItem,prevItem);
});



//Fectching Data
const popularMovies = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=1015bc24cd3e7930b331be222621accb`);
const popularShows = fetch(`https://api.themoviedb.org/3/tv/popular?api_key=1015bc24cd3e7930b331be222621accb`);

let cardContainer = (contentCard,data) => {
    for(let i=0 ; i<5 ; i++){
        const card = `  <div class="card">
                            <div class="card-img">
                                <img src="https://image.tmdb.org/t/p/original${data.results[i].poster_path}" alt="poster" />
                            </div>
                            <div class="card-img-overlay">
                                <div class="card-overlay-box">
                                    <a href="#" class="card-link" id="${data.results[i].id}">Watch Now</a>
                                </div>
                            </div>
                        </div>`;
        contentCard.insertAdjacentHTML("afterbegin",card)
    }
}

//popular movies data
popularMovies.then(relsove => {return relsove.json()})
.then(data => {
        const contentCard = document.querySelector(".movie-card");
        cardContainer(contentCard,data);        
    });

//popular TV shows data
popularShows.then(relsove => {return relsove.json()})
.then(data => {
        const contentCard = document.querySelector(".TVshow-card");
        cardContainer(contentCard,data);        
    });
    

// Trending Section
const nextSlide = document.querySelector(".trend-next-control");
const prevSlide = document.querySelector(".trend-prev-control");
const nextTrendingContainer = document.querySelector(".next-trending-box");
let counter = 0;

const movieTrendfetch = fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=1015bc24cd3e7930b331be222621accb');

//next Trending Item
let nextTrending = (data) => {
    const nextTrendBox = document.querySelector(".next-trending-box");
    let trendImg = `
    <img src="https://image.tmdb.org/t/p/original${data.results[0].poster_path}" alt="poster" class="trend-img active" id="${data.results[0].id}" />
    <img src="https://image.tmdb.org/t/p/original${data.results[1].poster_path}" alt="poster" class="trend-img" id="${data.results[1].id}" />
    <img src="https://image.tmdb.org/t/p/original${data.results[2].poster_path}" alt="poster" class="trend-img" id="${data.results[2].id}" />
    <img src="https://image.tmdb.org/t/p/original${data.results[3].poster_path}" alt="poster" class="trend-img" id="${data.results[3].id}" />
    <img src="https://image.tmdb.org/t/p/original${data.results[4].poster_path}" alt="poster" class="trend-img" id="${data.results[4].id}" />
    <img src="https://image.tmdb.org/t/p/original${data.results[5].poster_path}" alt="poster" class="trend-img" id="${data.results[5].id}" />
    `;
    nextTrendBox.insertAdjacentHTML("afterbegin",trendImg);
}

//fetching Trending Movies
movieTrendfetch.then(relsove => relsove.json())
.then(data => {
    nextTrending(data);
});

//Trending Container
let trendingContainer = (data) => {
    const trendContBox = document.querySelector(".trending-cont-box");
    let trendBox = `
                    <div class="trending-box">
                        <div class="img-overlay">
                            <img src="https://image.tmdb.org/t/p/original${data.backdrop_path}" alt="backgroundImg" />
                        </div>
                        <div class="trending-body">
                            <h1 class="title">${data.title}</h1>
                            <div class="carousel-details">
                                <div class="carousel-rating">
                                    <img src="img/imdb.png" alt="img" />
                                    <span>${data.vote_average}</span>
                                </div>
                                <span class="carousel-runtime">${data.runtime} mins</span>
                            </div>
                            <p class="overview">${data.overview}</p>
                            <a href="#" class="carousel-link" id="${data.id}">Watch Now</a>
                        </div>
                    </div>
                    `;
    
    trendContBox.innerHTML = trendBox;
}

// fetching movie Id & inserting trending container in HTML page
let fetchingId = (movieId) => {
    const movieIdfetch = fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1015bc24cd3e7930b331be222621accb`);

    //fetching Trending Movies Id
        movieIdfetch.then(relsove => relsove.json())
        .then(data => {
            trendingContainer(data);
        });
}

fetchingId(movieId = "527774");

//trending slide Control
let imgControl = (counter,currentImg,targetImg) => {
    nextTrendingContainer.style.marginTop = `${-244 * (counter)}px`;
    currentImg.classList.remove("active");
    targetImg.classList.add("active");
    const movieId = targetImg.getAttribute("id");
    fetchingId(movieId);
}

nextSlide.addEventListener("click" , () => {
    
    counter++;
    if(counter == 6){
        counter = 0;
    }
    const currentImg = document.querySelector(".trend-img.active");
    const nextImg = nextTrendingContainer.children[counter];
    
    imgControl(counter,currentImg,nextImg);
});
prevSlide.addEventListener("click" , () => {
    
    counter--;
    if(counter < 0){
        counter = 5;
    }
    const currentImg = document.querySelector(".trend-img.active");
    const prevImg = nextTrendingContainer.children[counter];
    
    imgControl(counter,currentImg,prevImg);
});



