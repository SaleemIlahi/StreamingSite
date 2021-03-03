
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