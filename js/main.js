let page = 1;
let searching = false;
let stopScrolling = false;
let searchSuggestion = false;
let searchString = "";
let horizontal = true;
let modalOpen = false;
let cardsDetails = [];
let displayVButton = document.querySelector("#vertical-display-button");
let displayHButton = document.querySelector("#horizontal-display-button");
let mobileDevice = window.matchMedia("(max-width: 767px)");
let tabletDevice = window.matchMedia("(max-width: 1023px)");
let laptopDevice = window.matchMedia("(max-width: 1279px)");
let desktopDevice = window.matchMedia("(max-width: 1439px)");
let bigScreenDevice = window.matchMedia("(min-width: 1440px)");
window.scrollTo(0, 0);

events();

function events() {
    showCards();
    document.querySelector("#burger-icon").addEventListener("click", showNav);
    document.querySelector("#nav-burger-icon").addEventListener("click", showNav);
    document.querySelector("#search-icon").addEventListener("click", showSearchBar);
    document.querySelector("#searchbar").addEventListener("input", readSearchKey);
    document.querySelector("#searchbar").addEventListener("keyup", searchWithEnterKey);
    document.querySelector("#searchbar").addEventListener("focus", showSearchSpinner);
    document.querySelector("#searchbar").addEventListener("blur", closeSearchBar);
    displayVButton.addEventListener("click", verticalDisplay);
    displayHButton.addEventListener("click", horizontalDisplay);
    document.querySelector("#home-anchor").classList.add("link-active");
    document.querySelector("#logout-text").addEventListener("click", logout);
    document.querySelector("#logout-icon").addEventListener("click", logout);
    document.querySelector("#searchbar").addEventListener("click", growHeaderContainer);

}

// --------------- Cards ---------------- 

function showCards() {

    document.querySelector(".fetch-error").classList.add("hidden");
    document.querySelector(".fetch-error-description").innerHTML = "";

    getCards().then(data => {
        getGameDetails(data);
        makeCards(data);
    }).catch(err => {
        document.querySelector(".loader").classList.add("hidden");
        document.querySelector(".fetch-error").classList.remove("hidden");
        document.querySelector(".fetch-error-description").innerHTML = "Whops! Something went wrong :(";
        document.querySelector(".fetch-error-description").innerHTML += "<br>Please try again.";
        console.log(err);
    });
}

async function getCards() {

    let uri = `https://api.rawg.io/api/games?key=3c49833921b74137a3967c6723ac9167&page=${page}`;

    const response = await fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Eugenia Alcaraz BFEDA"
        }
    });

    if (response.status !== 200) {
        throw new Error();
    }
    const data = await response.json();
    return data;
}

function makeCards(cards) {

    let newCard = "";
    let haveMac = false;
    document.querySelector("#searchbar").value = "";

    for (let i = 0; i < cards.results.length; i++) {
        let card = cards.results[i];
        let nameLength = card.name.length;
        newCard = `<li class="card" id="${card.id}">
        <figure class="game-card-image">
            <img src="${card.background_image || "img/not_found.jpg"}" alt="">
        </figure>
        <div class="game-card-info-container">
            <div class="game-card-info-left">`;

        if (((mobileDevice || bigScreenDevice) && nameLength > 20) || ((tabletDevice || desktopDevice) && nameLength > 15) || (laptopDevice && nameLength > 10)) {

            newCard += `<h2 class="show-text" text-content="${card.name}">${card.name}</h2>`;

        } else {
            newCard += `<h2>${card.name}</h2>`;
        }

        newCard += `<div class="game-card-p-container">
                <p>Release date</p>`;

        let releasedDate = new Date(card.released);
        let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ][releasedDate.getMonth()];
        let dateCorrectFormat = `${month} ${releasedDate.getDate()+1} ${releasedDate.getFullYear()}`;

        newCard += `<p>${dateCorrectFormat}</p>
            </div>
            <div class="game-card-p-container">
                <p>Genres</p><p>`;
        for (let j = 0; j < card.genres.length; j++) {
            let genre = card.genres[j];
            newCard += `${genre.name}`;
            if (j < card.genres.length - 1) {
                newCard += `, `;
            }
        }
        newCard += `</p>
            </div>
        </div>
        <div class="game-card-info-right">
            <figure class="game-card-consoles">`;
        if (card.parent_platforms != null) {

            for (let k = 0; k < card.parent_platforms.length; k++) {
                let platform = card.parent_platforms[k].platform;
                if (platform.slug.indexOf("playstation") > -1) {
                    newCard += `${playStationSvg}`;
                }
                if (platform.slug.indexOf("xbox") > -1) {

                    newCard += `${xboxSvg}`;
                }
                if (platform.slug.indexOf("pc") > -1) {
                    newCard += `${pcSvg}`;
                }
                if (platform.slug.indexOf("nintendo") > -1) {
                    newCard += `${nintendoSvg}`;
                }
                if (platform.slug.indexOf("mac") > -1 || platform.slug.indexOf("ios") > -1 && !haveMac) {
                    newCard += `${macSvg}`;
                    haveMac = true;
                }
                if (platform.slug.indexOf("linux") > -1) {
                    newCard += `${linuxSvg}`;
                }
                if (platform.slug.indexOf("android") > -1) {
                    newCard += `${androidSvg}`;
                }
            }
        }

        newCard += ` </figure>`;

        let rating;
        if (page === 1) {
            rating = i + 1;
        } else {
            rating = (10 * page) + (i + 1);
        }

        newCard += `<p>#${rating}</p>
        <a href="">
            <figure>${cardButtonSvgs}</figure>
                                </a>
                            </div>
                        </div>`;

        if (horizontal) {
            newCard += `<p numero="${card.id}" id="description-of-${card.id}" class="game-card-description hidden">`;
        } else {
            newCard += `<p numero="${card.id}" id="description-of-${card.id}"class="game-card-description">`;
        }

        newCard += `</p></li>`;
        document.querySelector(".loader").classList.add("hidden");
        document.querySelector("#card-list").innerHTML += newCard;

    }
    cardsAddClickEvent();
    addScrollEvent();
    if (cards.next != null) {
        page++;
    } else {
        stopScrolling = true;
    }
}


function getGameDetails(cards) {

    for (let i = 0; i < cards.results.length; i++) {
        let gameId = cards.results[i].id;
        let gamePics = cards.results[i].short_screenshots;

        callForDetails(gameId).then(data => {

            let oneGame = new Game();
            oneGame.Id = gameId;
            oneGame.Name = data.name;
            oneGame.BackgroundPic = data.background_image;
            oneGame.ReleaseDate = data.released;
            oneGame.Genres = data.genres;
            oneGame.Platforms = data.parent_platforms;
            oneGame.Descr = data.description;
            oneGame.Pics = gamePics;
            oneGame.Developers = data.developers;
            oneGame.Publishers = data.publishers;
            oneGame.Age = data.esrb_rating;
            oneGame.Website = data.website;

            if (!gameExists(gameId)) {
                cardsDetails.push(oneGame);
            }

        }).catch(err => {
            console.log(err);
        });
    }
}

async function callForDetails(id) {

    let uri = `https://api.rawg.io/api/games/${id}?key=3c49833921b74137a3967c6723ac9167`;

    const response = await fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Eugenia Alcaraz BFEDA"
        }
    });

    if (response.status !== 200) {
        throw new Error();
    }

    const data = await response.json();

    return data;
}

function addDescription(id) {

    let description = "-"
    for (let i = 0; i < cardsDetails.length; i++) {
        let game = cardsDetails[i];
        if (game.Id == id) {
            description = game.Descr;
        }
    }
    document.querySelector(`#description-of-${id}`).innerHTML = description;
};

function cardsAddClickEvent() {

    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", showModal);
    }
}

function gameExists(gameId) {
    var gameExists = cardsDetails.find(x => x.Id === gameId);
    return gameExists;
}

// --------------- Modal -------------------- 

function searchGameById(id) {

    for (let i = 0; i < cardsDetails.length; i++) {
        let gameDetails = cardsDetails[i];
        if (gameDetails.Id === id) {
            makeModal(gameDetails);
        }
    }
}

function showModal() {
    let gameId = Number(this.getAttribute("id"));
    searchGameById(gameId);
    modalOpen = true;
    document.body.style.overflowY = "hidden";

}

function makeModal(game) {
    let modalBack = document.querySelector(".modal-black");
    let modal = document.querySelector(".modal-container");
    let cardDisplay = document.querySelector(".game-cards-container");
    modal.innerHTML = "";
    let modalInfo = "";
    let haveMac = false;

    let releasedDate = new Date(game.ReleaseDate);
    let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ][releasedDate.getMonth()];
    let dateCorrectFormat = `${month} ${releasedDate.getDate()+1} ${releasedDate.getFullYear()}`;

    modalInfo += `<figure class="modal-background-img"><img src="${game.BackgroundPic || "img/not_found.jpg"}" alt=""></figure>
        <div class="modal-header-container">
        <a class="modal-close">${modalCloseSvg}</a>
    <figure class="modal-logos-container">`;

    for (let k = 0; k < game.Platforms.length; k++) {
        let platform = game.Platforms[k].platform;
        if (platform.slug.indexOf("playstation") > -1) {
            modalInfo += `${playStationSvg}`;
        }
        if (platform.slug.indexOf("xbox") > -1) {

            modalInfo += `${xboxSvg}`;
        }
        if (platform.slug.indexOf("pc") > -1) {
            modalInfo += `${pcSvg}`;
        }
        if (platform.slug.indexOf("nintendo") > -1) {
            modalInfo += `${nintendoSvg}`;
        }
        if (platform.slug.indexOf("mac") > -1 || platform.slug.indexOf("ios") > -1 && !haveMac) {
            modalInfo += `${macSvg}`;
            haveMac = true;
        }
        if (platform.slug.indexOf("linux") > -1) {
            modalInfo += `${linuxSvg}`;
        }
        if (platform.slug.indexOf("android") > -1) {
            modalInfo += `${androidSvg}`;
        }
    }
    modalInfo += `</figure>
    <h1>${game.Name}</h1></div><div class="modal-info">
    <div class="modal-tags">
        <p>${dateCorrectFormat}</p>
        <p><strong class="bold-green">#1</strong>TOP 2021</p>
        <p><strong class="bold-green">#342</strong>RPG</p>
    </div>
    <div class="modal-links-container">
        <a href="" class="modal-link-transparent">

            <p>Where to<br><strong>buy</strong></p>
            <p class="modal-plus-symbol"> +</p>

        </a>
        <a href="" class="modal-link-green">
            <p>Add to<br><strong>Wish list</strong></p>
            ${wishListSvg}
        </a>
    </div>
    <div class="modal-description">${game.Descr}</div>
    <div class="container-for-responsive-display">
        <div class="modal-links-reviews">
            <a href="">Leave a comment ${leaveCommentSvg}</a>
            <a href="">
            <p>Write a review<strong>+</strong></p>
            </a>
        </div><figure class="modal-gallery">`;

    modalInfo += `<img class="modal-first-video" src="img/video_placeholder.jpg" alt="">`;
    for (let z = 0; z <= 3; z++) {
        let picture = game.Pics[z];

        if (z < 3) {
            modalInfo += `<img class="modal-image" src="${picture.image}" alt=""></img>`;
        } else if (z === 3) {
            modalInfo += `<div class="modal-image">
            <img class="modal-last-image" src="${picture.image}" alt="">
            <span class="modal-viewMore">
        <p>View all</p>
        ${viewAllSvg}</span></div>`;
        }
    }

    modalInfo += `</figure>`;
    modalInfo += `<div class="modal-bottom-links">
                    <div class="modal-detail-container">
                        <p>Plattforms</p><a class="modal-detail-link">`;

    for (let h = 0; h < game.Platforms.length; h++) {
        let platform = game.Platforms[h].platform;
        modalInfo += `${platform.name}`;
        if (h < game.Platforms.length - 1) {
            modalInfo += `, `;
        }
    }

    modalInfo += `</a></div>`;
    modalInfo += `<div class="modal-detail-container">
        <p>Genre</p><a class="modal-detail-link">`;

    for (let x = 0; x < game.Genres.length; x++) {
        let genre = game.Genres[x].name;
        modalInfo += `${genre}`;
        if (x < game.Genres.length - 1) {
            modalInfo += `, `;
        }
    }
    modalInfo += `</a></div>`;
    dateCorrectFormat = `${month} ${releasedDate.getDate()+1}, ${releasedDate.getFullYear()}`;
    modalInfo += `<div class="modal-detail-container">
                     <p>Release date</p>
                     <p>${dateCorrectFormat}</p>
                 </div>`;

    modalInfo += `<div class="modal-detail-container">
                 <p>Developer</p><a class="modal-detail-link">`;

    for (let f = 0; f < game.Developers.length; f++) {
        let developer = game.Developers[f];
        modalInfo += `${developer.name}`;
        if (f < game.Developers.length - 1) {
            modalInfo += `, `;
        }
    }
    modalInfo += `</a></div>`;
    modalInfo += `<div class="modal-detail-container">
                 <p>Publisher</p><a class="modal-detail-link">`;

    if (game.Publishers.length > 0) {
        for (let a = 0; a < game.Publishers.length; a++) {
            let publisher = game.Publishers[a];
            modalInfo += `${publisher.name}`;
            if (a < game.Publishers.length - 1) {
                modalInfo += `, `;
            }
        }
    } else {
        modalInfo += `No registered publishers`;
    }


    modalInfo += `</a></div>`;
    modalInfo += `<div class="modal-detail-container">
                     <p>Age rating</p>

                    <p>${game.Age!=null? game.Age.name : "Not rated"}</p>
                </div>`;
    modalInfo += `<div class="modal-detail-container">
                <p>Website</p>
                <a class="modal-detail-link">${game.Website || "No website registered"}</a>
                </div>`;
    modalInfo += `</div></div></div>`;

    modalBack.classList.remove("hidden");
    modal.classList.remove("hidden");
    modal.innerHTML += modalInfo;

    if (tabletDevice.matches) {
        cardDisplay.classList.add("hidden");
    }

    let closeModalIcon = document.querySelector(".modal-close");
    closeModalIcon.addEventListener("click", function() {
        closeModal();

    })
    modalBack.addEventListener("click", function() {
        closeModal();
    });

    document.addEventListener("keyup", (e) => {
        if ((e.key = 'Escape')) {
            closeModal();
        }
    });

    function closeModal() {
        cardDisplay.classList.remove("hidden");
        modalBack.classList.add("hidden");
        modal.classList.add("hidden");
        modalOpen = false;
        document.body.style.overflowY = "scroll";
    }
}

// --------------- Search Functionallity ---------------- 
function readSearchKey(e) {

    let waitingSearch = document.querySelector("#waiting-spinner");
    waitingSearch.classList.add("hidden");
    let searchSpinner = document.querySelector("#search-spinner");
    searchSpinner.classList.remove("hidden");

    if (e.target.value.trim() === "") {
        waitingSearch.classList.remove("hidden");
        searchSpinner.classList.add("hidden");
    }
}

function searchWithEnterKey(e) {
    if (e.keyCode === 13) {
        if (e.target.value.trim() !== "") {
            string = e.target.value
            search(string);
            document.activeElement.blur();
        }
    }
}

function suggestionsClickEvent() {

    let suggestionsText = document.querySelectorAll(".suggestion");
    for (let i = 0; i < suggestionsText.length; i++) {
        suggestionsText[i].addEventListener("click", function() {
            search(suggestionsText[i].id);
            closeSearchBar();
        });
    }
}

function search(_string) {

    searching = true;
    searchString = _string;
    document.querySelector("#card-list").innerHTML = "";
    document.querySelector("#home-anchor").classList.remove("link-active");
    page = 1;
    searchGameByName(_string);
    changeHeader(_string);
    document.querySelector(".fetch-error").classList.add("hidden");
    document.querySelector(".fetch-error-description").innerHTML = "";
    document.querySelector(".loader").classList.remove("hidden");
    if (mobileDevice.matches) {
        showSearchBar();
    }
}

function searchSuggestions() {
    let searchString = document.querySelector("#searchbar").value;
    searchSuggestion = true;
    if (searchString !== "") {
        searchGameByName(searchString);
    } else {
        document.querySelector(".search-suggestions").innerHTML = "";
    }
}

function showSearchSpinner() {
    let waitingSearch = document.querySelector("#waiting-spinner");
    waitingSearch.classList.remove("hidden");
}

function debounce(fn, wait) {
    var timeout;
    var debounced = function() {
        var args = arguments,
            context = this;

        function later() {
            fn.apply(context, args);
        }
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    }
    return debounced;
}

var debouncedRead = debounce(searchSuggestions, 300);
document.querySelector("#searchbar").addEventListener("keyup", debouncedRead);

function searchGameByName(string) {

    callByName(string).then(data => {

        if (!searchSuggestion) {
            getGameDetails(data);
            makeCards(data);

        }
        if (searchSuggestion) {
            document.querySelector(".search-suggestions").innerHTML = "";
            let waitingSearch = document.querySelector("#waiting-spinner");
            waitingSearch.classList.add("hidden");
            let searchSpinner = document.querySelector("#search-spinner");
            searchSpinner.classList.add("hidden");
            for (let i = 0; i < 3; i++) {
                let gameName = data.results[i].name;
                document.querySelector(".search-suggestions").innerHTML += `<p class="suggestion" id="${gameName}">${gameName}</p>`;
            }
            searchSuggestion = false;
            suggestionsClickEvent();
        }

    }).catch(err => {
        document.querySelector(".loader").classList.add("hidden");
        document.querySelector(".fetch-error").classList.remove("hidden");
        document.querySelector(".fetch-error-description").innerHTML = "Whops! Something went wrong :(";
        document.querySelector(".fetch-error-description").innerHTML += "<br>Please try again.";
        console.log(err);
    });
}

async function callByName(string) {

    let uri;
    if (!searchSuggestion) {
        uri = `https://api.rawg.io/api/games?key=3c49833921b74137a3967c6723ac9167&page=${page}&search=${string}`;
    } else {
        uri = `https://api.rawg.io/api/games?key=3c49833921b74137a3967c6723ac9167&page=1&search=${string}`;
    }
    const response = await fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Eugenia Alcaraz BFEDA"
        }
    });

    if (response.status !== 200) {
        throw new Error();
    }

    const data = await response.json();
    return data;
}

function growHeaderContainer() {

    let header = document.querySelector("header");
    let headerContainer = document.querySelector(".header-container");

    if (mobileDevice.matches) {
        header.style.height = "290px";
        headerContainer.style.overflow = "visible";
    }
}

function changeHeader(string) {
    document.querySelector("#main-header").innerHTML = "Search Results";
    document.querySelector("#main-header-descr").innerHTML = string;
}

//---------- Infinite Scroll ---------
function addScrollEvent() {

    let needMoreCards = false;
    window.addEventListener("scroll", () => {

        let scrollHigh = document.documentElement.scrollHeight - window.innerHeight;
        let scrolled = window.scrollY;
        let percentageScrolled = Math.floor((scrolled / scrollHigh) * 100);

        if (percentageScrolled >= 60 && !(needMoreCards) && !modalOpen && !stopScrolling) {

            if (!searching) showCards(page);
            if (searching) searchGameByName(searchString);
            needMoreCards = true;
        }
    });
}

/////////////////////////////// VISUAL 

//  ----- Displays ------- 
function verticalDisplay() {
    if (horizontal) {
        let container = document.querySelector("#card-list-container");
        container.classList.remove("game-cards-h-display");
        container.classList.add("game-cards-v-display");

        displayVButton.classList.remove("main-display-not-selected");
        displayVButton.classList.add("main-display-selected");
        displayHButton.classList.remove("main-display-selected");
        displayHButton.classList.add("main-display-not-selected");

        let descripcionesCards = document.querySelectorAll(".game-card-description");
        for (let j = 0; j < descripcionesCards.length; j++) {
            let card = descripcionesCards[j];
            let cardId = card.getAttribute("numero");
            card.classList.remove("hidden");
            addDescription(cardId);
        }
        horizontal = false;
    }
}

function horizontalDisplay() {
    if (!horizontal) {
        let container = document.querySelector("#card-list-container");
        container.classList.add("game-cards-h-display");
        container.classList.remove("game-cards-v-display");

        displayHButton.classList.remove("main-display-not-selected");
        displayHButton.classList.add("main-display-selected");
        displayVButton.classList.add("main-display-not-selected");
        displayHButton.classList.remove("main-display-selected");

        let descripcionesCards = document.querySelectorAll(".game-card-description");
        for (let j = 0; j < descripcionesCards.length; j++) {
            descripcionesCards[j].classList.add("hidden");
        }
        horizontal = true;
    }
}

//  ------ Nav & search bar in small devices ------
function showNav() {

    let nav = document.querySelector(".nav-aside");
    let leaveNav = document.querySelector(".leave-nav");
    if (nav.style.left !== "0px") {
        nav.style.left = "0px";
        leaveNav.classList.remove("hidden");
        leaveNav.addEventListener("click", function() {
            nav.style.left = "-1000px";
            leaveNav.classList.add("hidden");

        })

    } else {
        nav.style.left = "-1000px";
        leaveNav.classList.add("hidden");
    }
}

function showSearchBar() {
    let header = document.querySelector("header");
    if (header.style.height > "104px" && header.style.height <= "166px") {
        closeSearchBar();
    } else {
        header.style.height = "166px";
    }
}

function closeSearchBar() {
    let waitingSearch = document.querySelector("#waiting-spinner");
    let searchSpinner = document.querySelector("#search-spinner");
    waitingSearch.classList.add("hidden");
    searchSpinner.classList.add("hidden");
    let header = document.querySelector("header");
    let headerContainer = document.querySelector(".header-container");
    header.style.height = "104px";
    setTimeout(function() {
        headerContainer.style.overflow = "hidden";
        document.querySelector(".search-suggestions").innerHTML = "";
    }, 600)
}

function logout() {
    window.location.href = "login.html";
    cardsDetails = [];
}