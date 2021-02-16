$(document).ready(function () {

const APP_key = '932e7bfb1f8f521b93bbc52e613f92cb';
const myData = document.getElementById("rowData");
let searchInput = '';
let sideNav = $("#side-nav")
let sideNavWidth = sideNav.outerWidth();
let allMovies;
let name = document.getElementById("name");
let email = document.getElementById("email");
let phone = document.getElementById("phone");
let age = document.getElementById("age");
let password = document.getElementById("password");
let rePassword = document.getElementById("rePassword");
let nameAlert = document.getElementById("namealert");
let emailAlert = document.getElementById("emailalert");
let phoneAlert = document.getElementById("phonealert");
let ageAlert = document.getElementById("agealert");
let passwordAlert = document.getElementById("passwordalert");
let rePasswordAlert = document.getElementById("repasswordalert");
let inputs_required = document.getElementById("inputs_required");
let regName = /^[a-z ,.'-]+$/i;
let regEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let regPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
let regAge = /^[1-9]?[1-9]{1}$|^100$/;

let regPassword = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,15})$/


name.addEventListener("keyup", () => {
    if(regName.test(name.value)){
        nameAlert.style.color = "green";
        nameAlert.innerHTML = "Verified";
    }else {
        nameAlert.style.color = "red";
        nameAlert.innerHTML = "Your Name is not valid";
    }
})

email.addEventListener("keyup", () => {
    if(regEmail.test(email.value)){
        emailAlert.style.color = "green";
        emailAlert.innerHTML = "Verified";
    }else {
        emailAlert.style.color = "red";
        emailAlert.innerHTML = "Enter a valid Email";
    }
})

phone.addEventListener("keyup", () => {
    if(regPhone.test(phone.value)){
        phoneAlert.style.color = "green";
        phoneAlert.innerHTML = "Verified";
    }else {
        phoneAlert.style.color = "red";
        phoneAlert.innerHTML = "Enter a valid Phone number";
    }
})

age.addEventListener("keyup", () => {
    if(regAge.test(age.value)){
        ageAlert.style.color = "green";
        ageAlert.innerHTML = "Verified";
    }else {
        ageAlert.style.color = "red";
        ageAlert.innerHTML = "Enter a valid Age";
    }
})

password.addEventListener("keyup", () => {
    if(regPassword.test(password.value)){
        passwordAlert.style.color = "green";
        passwordAlert.innerHTML = "Verified";
    }else {
        passwordAlert.style.color = "red";
        passwordAlert.innerHTML = "password must be minimum eight characters, at least one letter and one number";
    }
})

rePassword.addEventListener("keyup", () => {
    if(password.value == rePassword.value){
        rePasswordAlert.style.color = "green";
        rePasswordAlert.innerHTML = "Verified";
    }else {
        rePasswordAlert.style.color = "red";
        rePasswordAlert.innerHTML = "It must match the password";
    }
})

$("#submitBtn").click( function() {
    if(name.value == '' || email.value == '' || phone.value == '' || age.value == '' || password.value == '' || rePassword.value == ''){
        inputs_required.style.color = "red";
        inputs_required.innerHTML = "All Inputs are Required";
    }else {
        inputs_required.style.color = "green";
        inputs_required.innerHTML = "Form Submitted Successfully";
        clearInputs()
    }
})

function clearInputs() {
    name.value = "";
    email.value = "";
    phone.value = "";
    age.value = "";
    password.value = "";
    rePassword.value = "";
    nameAlert.innerHTML = "";
    emailAlert.innerHTML = "";
    phoneAlert.innerHTML = "";
    ageAlert.innerHTML = "";
    passwordAlert.innerHTML = "";
    rePasswordAlert.innerHTML = "";
}


$("#toggle").click(function () {
    if (sideNav.css("left") == "0px") {
        $("#head-nav").animate({left: 0}, 500);
        sideNav.animate({left: `-${sideNavWidth}`},500);
        $(".nav-item li").animate({opacity: "0"},500);
        $(".nav-item li").animate({paddingTop: "500px"}, 500);
        $("#open-close").removeClass("fa-times");
        
    } else {
        $("#head-nav").animate({left: `${sideNavWidth}`}, 500)
        sideNav.animate({left: `0px`},500);
        $(".nav-item li").animate({opacity: "1"},500);
        $(".nav-item li").animate({paddingTop: "25px"}, 1000);
        $("#open-close").addClass("fa-times");
    }
})

async function getAPI(category) {
    let baseURL = '';
    if(category == ''){
        baseURL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APP_key}`;
    }else if (category == 'trending'){
        baseURL = `https://api.themoviedb.org/3/trending/all/day?api_key=${APP_key}`;
    }else{
        baseURL = `https://api.themoviedb.org/3/movie/${category}?api_key=${APP_key}`;
    }
    const res = await fetch(baseURL);
    const data = await res.json();
    allMovies = data.results;
    displayResult(allMovies)

}

$("#now_playing").click( (e) => getAPI(e.target.id))

$("#popular").click( (e) => getAPI(e.target.id))

$("#top_rated").click( (e) => getAPI(e.target.id))

$("#upcoming").click( (e) => getAPI(e.target.id))

$("#trending").click( (e) => getAPI(e.target.id))


displayResult = (results) => {

    let cartona = ``;
    results.map((result, index) => {
        cartona +=
            `
            <div class="col-md-6 col-lg-4 my-3 shadow">
                <div class="movie shadow rounded position-relative">
                    <div class="post">
                        <img src="https://image.tmdb.org/t/p/w500${result.poster_path}"
                            class="img-fluid rounded">
                        <div class="layer d-flex align-items-center ">
                            <div class="info p-0">
                                <h2>${result.title}</h2>
                                <p>${result.overview}</p>
                                <p>rate: ${result.vote_average}</p>
                                <p>${result.release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    })
    myData.innerHTML = cartona;
}

searchMovie = (movie) => {
    searchInput = movie;
    allMoviesAPI()
}

searchByWord = (word) => {
    let cartona = ``;
    for (let i = 0; i < allMovies.length ; i++){
        if(allMovies[i].title.toLowerCase().includes(word.toLowerCase())){
            cartona += `
            <div class="col-md-6 col-lg-4 my-3 shadow">
                <div class="movie shadow rounded position-relative">
                    <div class="post">
                        <img src="https://image.tmdb.org/t/p/w500${allMovies[i].poster_path}"
                            class="img-fluid rounded">
                        <div class="layer d-flex align-items-center ">
                            <div class="info p-0">
                                <h2>${allMovies[i].title}</h2>
                                <p>${allMovies[i].overview}</p>
                                <p>rate: ${allMovies[i].vote_average}</p>
                                <p>${allMovies[i].release_date}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }else{
            console.log("m4 mawgoda")
        }
    }
    document.getElementById("res").innerHTML = cartona;
}

async function allMoviesAPI() {
    const baseURL = `https://api.themoviedb.org/3/search/movie?api_key=${APP_key}&query=${searchInput}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    displayResult(data.results);
    console.log(data)
}

getAPI('');

})
