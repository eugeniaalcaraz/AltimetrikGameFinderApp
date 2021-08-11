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
window.scrollTo(0, 0);

events();

function events() {
    showCards(page);
    document.querySelector("#burger-icon").addEventListener("click", showNav);
    document.querySelector("#nav-burger-icon").addEventListener("click", showNav);
    document.querySelector("#search-icon").addEventListener("click", showSearchBar);
    document.querySelector("#searchbar").addEventListener("keyup", readSearchKey);
    displayVButton.addEventListener("click", verticalDisplay);
    displayHButton.addEventListener("click", horizontalDisplay);
    document.querySelector("#home-anchor").classList.add("link-active");
    document.querySelector("#logout-text").addEventListener("click", logout);
    document.querySelector("#logout-icon").addEventListener("click", logout);
    document.querySelector("#searchbar").addEventListener("click", growHeaderContainer);
}

// --------------- Cards ---------------- 

function showCards(page) {

    document.querySelector(".fetch-error").classList.add("hidden");
    document.querySelector(".fetch-error-description").innerHTML = "";

    let uri = `https://api.rawg.io/api/games?key=8854630ec3f74ac487342aced66aef10&page=${page}`;

    fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Eugenia Alcaraz BFEDA"
        },

    }).then(async(response) => {
        let cards = await response.json();

        if (response.status === 200) {
            getGameDetails(cards);
            makeCards(cards);
        } else {
            document.querySelector(".loader").classList.add("hidden");
            document.querySelector(".fetch-error").classList.remove("hidden");
            document.querySelector(".fetch-error-description").innerHTML = "Whops! Something went wrong :(";
            document.querySelector(".fetch-error-description").innerHTML += "<br>Please try again.";
            console.log(response.status); //show error
        }
    })
}

function makeCards(cards) {

    let newCard = "";
    let haveMac = false;

    for (let i = 0; i < cards.results.length; i++) {
        let card = cards.results[i];

        newCard = `<li class="card" id="${card.id}">
        <figure class="game-card-image">
            <img src="${card.background_image || "img/not_found.jpg"}" alt="">
        </figure>
        <div class="game-card-info-container">
            <div class="game-card-info-left">
            <h2>${card.name}</h2>
            <div class="game-card-p-container">
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
            <figure><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                       <style type="text/css">
                           .st0{fill:#FFFFFF;}
                       </style>
                       <path class="st0" d="M8,4c0.3,0,0.5,0.2,0.5,0.5v3h3C11.8,7.5,12,7.7,12,8c0,0.3-0.2,0.5-0.5,0.5h-3v3C8.5,11.8,8.3,12,8,12
                           c-0.3,0-0.5-0.2-0.5-0.5v-3h-3C4.2,8.5,4,8.3,4,8c0-0.3,0.2-0.5,0.5-0.5h3v-3C7.5,4.2,7.7,4,8,4z"/>
                       </svg><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                  <style type="text/css">
                      .st0{fill:#FFFFFF;}
                  </style>
                  <path class="st0" d="M3,2.5C3,1.1,4.1,0,5.5,0S8,1.1,8,2.5C8,1.1,9.1,0,10.5,0S13,1.1,13,2.5v0c0,0.1,0,0.3,0,0.5h2c0.6,0,1,0.4,1,1
                      v1c0,0.6-0.4,1-1,1H1C0.4,6,0,5.6,0,5V4c0-0.6,0.4-1,1-1h2C3,2.8,3,2.7,3,2.5L3,2.5z M4.1,3H7V2.5C7,1.7,6.3,1,5.5,1S4,1.7,4,2.5
                      C4,2.6,4,2.8,4.1,3C4.1,3,4.1,3,4.1,3z M9,3h2.9c0,0,0,0,0-0.1c0-0.2,0-0.3,0-0.4C12,1.7,11.3,1,10.5,1S9,1.7,9,2.5V3z M15,7v7.5
                      c0,0.8-0.7,1.5-1.5,1.5l0,0H9V7H15z M2.5,16C1.7,16,1,15.3,1,14.5l0,0V7h6v9H2.5z"/>
                  </svg></figure>
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
        // validar que el Id no este en el array ya -- if (gameId)
        let uri = `https://api.rawg.io/api/games/${gameId}?key=8854630ec3f74ac487342aced66aef10`;

        fetch(uri, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "User-Agent": "Eugenia Alcaraz BFEDA"
            },

        }).then(async(response) => {
            let game = await response.json();

            if (response.status === 200) {

                let oneGame = new Game();
                oneGame.Id = gameId;
                oneGame.Name = game.name;
                oneGame.BackgroundPic = game.background_image;
                oneGame.ReleaseDate = game.released;
                oneGame.Genres = game.genres;
                oneGame.Platforms = game.parent_platforms;
                oneGame.Descr = game.description;
                oneGame.Pics = gamePics;
                oneGame.Developers = game.developers;
                oneGame.Publishers = game.publishers;
                oneGame.Age = game.esrb_rating;
                oneGame.Website = game.website;

                if (!gameExists(gameId)) {
                    cardsDetails.push(oneGame);
                }
            }
            if (response.status === 400) {
                console.log(response.status);
            }
        })
    }
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
}

function makeModal(game) {
    let modalBack = document.querySelector(".modal-black");
    let modal = document.querySelector(".modal-container");
    let cardDisplay = document.querySelector(".game-cards-container");
    let smallDispositives = window.matchMedia("(max-width: 1023px)");
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
        <a class="modal-close"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.354 4.646C5.26011 4.55211 5.13278 4.49937 5 4.49937C4.86722 4.49937 4.73989 4.55211 4.646 4.646C4.55211 4.73989 4.49937 4.86722 4.49937 5C4.49937 5.13278 4.55211 5.26011 4.646 5.354L7.293 8L4.646 10.646C4.59951 10.6925 4.56264 10.7477 4.53748 10.8084C4.51232 10.8692 4.49937 10.9343 4.49937 11C4.49937 11.0657 4.51232 11.1308 4.53748 11.1916C4.56264 11.2523 4.59951 11.3075 4.646 11.354C4.73989 11.4479 4.86722 11.5006 5 11.5006C5.06574 11.5006 5.13084 11.4877 5.19158 11.4625C5.25232 11.4374 5.30751 11.4005 5.354 11.354L8 8.707L10.646 11.354C10.6925 11.4005 10.7477 11.4374 10.8084 11.4625C10.8692 11.4877 10.9343 11.5006 11 11.5006C11.0657 11.5006 11.1308 11.4877 11.1916 11.4625C11.2523 11.4374 11.3075 11.4005 11.354 11.354C11.4005 11.3075 11.4374 11.2523 11.4625 11.1916C11.4877 11.1308 11.5006 11.0657 11.5006 11C11.5006 10.9343 11.4877 10.8692 11.4625 10.8084C11.4374 10.7477 11.4005 10.6925 11.354 10.646L8.707 8L11.354 5.354C11.4005 5.30751 11.4374 5.25232 11.4625 5.19158C11.4877 5.13084 11.5006 5.06574 11.5006 5C11.5006 4.93426 11.4877 4.86916 11.4625 4.80842C11.4374 4.74768 11.4005 4.69249 11.354 4.646C11.3075 4.59951 11.2523 4.56264 11.1916 4.53748C11.1308 4.51232 11.0657 4.49937 11 4.49937C10.9343 4.49937 10.8692 4.51232 10.8084 4.53748C10.7477 4.56264 10.6925 4.59951 10.646 4.646L8 7.293L5.354 4.646Z" fill="white"/>
        </svg></a>
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
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 16 16" style="enable-background:new 0 0 16 16;" xml:space="preserve">
                <style type="text/css">
                .st0{fill:#FFFFFF;}
                </style>
                <path class="st0" d="M3,2.5C3,1.1,4.1,0,5.5,0S8,1.1,8,2.5C8,1.1,9.1,0,10.5,0S13,1.1,13,2.5v0c0,0.1,0,0.3,0,0.5h2c0.6,0,1,0.4,1,1
                v1c0,0.6-0.4,1-1,1H1C0.4,6,0,5.6,0,5V4c0-0.6,0.4-1,1-1h2C3,2.8,3,2.7,3,2.5L3,2.5z M4.1,3H7V2.5C7,1.7,6.3,1,5.5,1S4,1.7,4,2.5
                C4,2.6,4,2.8,4.1,3C4.1,3,4.1,3,4.1,3z M9,3h2.9c0,0,0,0,0-0.1c0-0.2,0-0.3,0-0.4C12,1.7,11.3,1,10.5,1S9,1.7,9,2.5V3z M15,7v7.5
                c0,0.8-0.7,1.5-1.5,1.5l0,0H9V7H15z M2.5,16C1.7,16,1,15.3,1,14.5l0,0V7h6v9H2.5z"/>
            </svg>
        </a>

    </div>

    <div class="modal-description">${game.Descr}</div>
    <div class="container-for-responsive-display">
        <div class="modal-links-reviews">
            <a href="">Leave a comment <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 14C12.418 14 16 10.866 16 7C16 3.134 12.418 0 8 0C3.582 0 0 3.134 0 7C0 8.76 0.744 10.37 1.969 11.6C1.873 12.616 1.553 13.73 1.199 14.566C1.12 14.752 1.272 14.96 1.472 14.928C3.728 14.558 5.069 13.99 5.653 13.694C6.41859 13.8982 7.20765 14.0011 8 14ZM4 6C4.55228 6 5 6.44772 5 7C5 7.55228 4.55228 8 4 8C3.44772 8 3 7.55228 3 7C3 6.44772 3.44772 6 4 6ZM9 7C9 6.44772 8.55229 6 8 6C7.44772 6 7 6.44772 7 7C7 7.55228 7.44772 8 8 8C8.55229 8 9 7.55228 9 7ZM13 7C13 7.55228 12.5523 8 12 8C11.4477 8 11 7.55228 11 7C11 6.44772 11.4477 6 12 6C12.5523 6 13 6.44772 13 7Z" fill="white"/>
            </svg></a>
            <a href="">
            <p>Write a review<strong>+</strong></p>
            </a>
        </div><figure class="modal-gallery">`;

    for (let z = 0; z <= 4; z++) {
        let picture = game.Pics[z];

        if (z === 0) {
            modalInfo += `<img class="modal-first-video" src="${picture.image}" alt="">`;
        } else if (z > 0 && z < 4) {
            modalInfo += `<img class="modal-image" src="${picture.image}" alt=""></img>`;
        } else if (z === 4) {
            modalInfo += `<div class="modal-image">
            <img class="modal-last-image" src="${picture.image}" alt="">
            <span class="modal-viewMore">
        <p>View all</p>
        <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 3.5C1.17157 3.5 0.5 2.82843 0.5 2C0.5 1.17157 1.17157 0.5 2 0.5C2.82843 0.5 3.5 1.17157 3.5 2C3.5 2.82843 2.82843 3.5 2 3.5ZM7 3.5C6.17157 3.5 5.5 2.82843 5.5 2C5.5 1.17157 6.17157 0.5 7 0.5C7.82843 0.5 8.5 1.17157 8.5 2C8.5 2.82843 7.82843 3.5 7 3.5ZM10.5 2C10.5 2.82843 11.1716 3.5 12 3.5C12.8284 3.5 13.5 2.82843 13.5 2C13.5 1.17157 12.8284 0.5 12 0.5C11.1716 0.5 10.5 1.17157 10.5 2Z" fill="white"/>
            </svg></span></div>`;
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


    for (let a = 0; a < game.Publishers.length; a++) {
        let publisher = game.Publishers[a];
        modalInfo += `${publisher.name}`;
        if (a < game.Publishers.length - 1) {
            modalInfo += `, `;
        }
    }

    modalInfo += `</a></div>`;

    modalInfo += `<div class="modal-detail-container">
                     <p>Age rating</p>
                    <p>${game.Age.name}</p>
                </div>`;

    modalInfo += `<div class="modal-detail-container">
                <p>Website</p>
                <a class="modal-detail-link">${game.Website}</a>
                </div>`;
    modalInfo += `</div></div></div>`;

    modalBack.classList.remove("hidden");
    modal.classList.remove("hidden");

    modal.innerHTML += modalInfo;
    if (smallDispositives.matches) {
        cardDisplay.classList.add("hidden");
    }
    let closeModal = document.querySelector(".modal-close");
    closeModal.addEventListener("click", function() {
        cardDisplay.classList.remove("hidden");
        modalBack.classList.add("hidden");
        modal.classList.add("hidden");
        modalOpen = false;

    })
    modalBack.addEventListener("click", () => {
        cardDisplay.classList.remove("hidden");
        modalBack.classList.add("hidden");
        modal.classList.add("hidden");
        modalOpen = false;
    });

    document.addEventListener("keyup", (e) => {
        if ((e.key = 'Escape')) {
            cardDisplay.classList.remove("hidden");
            modalBack.classList.add("hidden");
            modal.classList.add("hidden");
            modalOpen = false;
        }
    });
}

// --------------- Search Functionallity ---------------- 

function readSearchKey(e) {
    let smallDispositives = window.matchMedia("(max-width: 767px)");
    if (e.keyCode === 13) {
        if (e.target.value.trim() !== "") {
            searching = true;
            searchString = e.target.value;
            document.querySelector("#card-list").innerHTML = "";
            document.querySelector("#home-anchor").classList.remove("link-active");
            page = 1;
            searchGameByName(searchString);
            document.activeElement.blur();
            changeHeader(searchString);
            document.querySelector(".loader").classList.remove("hidden");
            if (smallDispositives.matches) {
                showSearchBar();
            }
        } else {
            console.log("vacio");
        }
    }
}

function searchSuggestions() {
    let searchString = document.querySelector("#searchbar").value;
    console.log(searchString);
    searchSuggestion = true;
    if (searchString !== "") {
        searchGameByName(searchString);
    } else {
        document.querySelector(".search-suggestions").innerHTML = "";
    }
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

    let uri = `https://api.rawg.io/api/games?key=8854630ec3f74ac487342aced66aef10&page=${page}&search=${string}`;

    fetch(uri, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "User-Agent": "Eugenia Alcaraz BFEDA"
        },

    }).then(async(response) => {
        let cards = await response.json();

        if (response.status === 200) {

            if (!searchSuggestion) {
                getGameDetails(cards);
                makeCards(cards);
            }
            if (searchSuggestion) {
                document.querySelector(".search-suggestions").innerHTML = "";
                for (let i = 0; i < 3; i++) {
                    let gameName = cards.results[i].name;
                    document.querySelector(".search-suggestions").innerHTML += `<p class="suggestion" id="${gameName}">${gameName}</p>`;
                }
                searchSuggestion = false;
                suggestionsClickEvent();
            }
        }
        if (response.status === 400) {
            console.log(response.status); // show error message
        }
    })

}

function growHeaderContainer() {

    let header = document.querySelector("header");
    let headerContainer = document.querySelector(".header-container");
    let smallDispositives = window.matchMedia("(max-width: 767px)");
    if (smallDispositives.matches) {
        header.style.height = "290px";
        headerContainer.style.overflow = "visible";
    }
}

function changeHeader(string) {
    document.querySelector("#main-header").innerHTML = "Search Results";
    document.querySelector("#main-header-descr").innerHTML = string;
}

function suggestionsClickEvent() {
    let smallDispositives = window.matchMedia("(max-width: 767px)");
    let suggestionsText = document.querySelectorAll(".suggestion");
    for (let i = 0; i < suggestionsText.length; i++) {
        suggestionsText[i].addEventListener("click", function() {
            searching = true;
            document.querySelector("#card-list").innerHTML = "";
            document.querySelector("#home-anchor").classList.remove("link-active");
            page = 1;
            searchGameByName(suggestionsText[i].id);
            document.activeElement.blur();
            changeHeader(suggestionsText[i].id);
            document.querySelector(".loader").classList.remove("hidden");
            if (smallDispositives.matches) {
                showSearchBar();
            }
        });
    }
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
    let headerContainer = document.querySelector(".header-container");
    if (header.style.height >= "166px") {
        header.style.height = "104px";

        setTimeout(function() {
            headerContainer.style.overflow = "hidden";
        }, 600)

    } else {
        header.style.height = "166px";

    }
}

function logout() {
    window.location.href = "login.html";
    cardsDetails = [];
}