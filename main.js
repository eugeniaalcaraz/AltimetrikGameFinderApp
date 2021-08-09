let page = 1;
let searching = false;
let searchSuggestion = false;
let searchString = "";
let horizontal = true;
let modalOpen = false;
let cardsDetails = [];

let displayVButton = document.querySelector("#vertical-display-button");
let displayHButton = document.querySelector("#horizontal-display-button");
window.scrollTo(0, 0);


Events();


function Events() {
    ShowCards(page);
    document.querySelector("#burger-icon").addEventListener("click", ShowNav);
    document.querySelector("#nav-burger-icon").addEventListener("click", ShowNav);
    document.querySelector("#search-icon").addEventListener("click", ShowSearchBar);
    document.querySelector("#searchbar").addEventListener("keyup", ReadSearchKey);
    displayVButton.addEventListener("click", VerticalDisplay);
    displayHButton.addEventListener("click", HorizontalDisplay);
    document.querySelector("#home-anchor").classList.add("link-active");

}

// --------------- Cards ---------------- 

function ShowCards(page) {

    let uri = `https://api.rawg.io/api/games?key=8854630ec3f74ac487342aced66aef10&page=${page}&page_size=30`;

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
            GetGameDetails(cards);
            MakeCards(cards);

        } else {
            console.log(response.status); //show error
        }
    })

}

function MakeCards(cards) {

    let newCard = "";

    for (let i = 0; i < cards.results.length; i++) {
        let card = cards.results[i];

        newCard = `<li class="card" id="${card.id}">
        <figure class="game-card-image">
            <img src="${card.background_image}" alt="">
        </figure>
        <div class="game-card-info-container">
            <div class="game-card-info-left">
            <h2>${card.name}</h2>
            <div class="game-card-p-container">
                <p>Release date</p>
                <p>${card.released}</p>
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

        for (let k = 0; k < card.parent_platforms.length; k++) {
            let platform = card.parent_platforms[k].platform;
            if (platform.slug.indexOf("playstation") > -1) {
                newCard += `<svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 0.149317L6.5 12.0296L9.07955 12.8818L9.07955 2.92038C9.07955 2.45098 9.28024 2.13932 9.60212 2.2465C10.023 2.36823 10.1048 2.80063 10.1048 3.2648L10.1048 7.24326C11.7104 8.05369 12.9745 7.24283 12.9745 5.10456C12.9745 2.91953 12.2334 1.94614 10.0527 1.16352C9.19249 0.864854 7.59836 0.360857 6.5 0.149317Z" fill="white"/>
                    <path d="M9.75 11.1429L13.6492 9.45771C14.0903 9.25915 14.1578 8.9894 13.8008 8.84764C13.4382 8.70325 12.791 8.74457 12.3452 8.93895L9.75 10.0506V8.27688L9.89861 8.21729C9.89861 8.21729 10.6498 7.89415 11.7064 7.75502C12.7609 7.61465 14.0541 7.77328 15.0706 8.2385C16.2156 8.68019 16.3439 9.32446 16.0542 9.77281C15.7603 10.2165 15.0478 10.5375 15.0478 10.5375L9.75 12.8484" fill="white"/>
                    <path d="M1.18907 11.3389C-0.0278308 10.9683 -0.230758 10.1851 0.324385 9.73273C0.836458 9.31962 1.70854 9.00863 1.70854 9.00863L5.31353 7.60333L5.31353 9.20276L2.72172 10.2185C2.26263 10.398 2.1938 10.6507 2.56358 10.7828C2.93997 10.9203 3.60794 10.8834 4.0673 10.698L5.31353 10.2068V11.6346C5.23321 11.6494 5.1439 11.6642 5.06238 11.6794C3.81985 11.9049 2.49607 11.8123 1.18907 11.3389Z" fill="white"/>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1271 12.7978C16.0247 12.8989 15.8903 12.9561 15.7455 12.9561C15.6008 12.9561 15.462 12.8989 15.3594 12.7978C15.2582 12.6948 15.2021 12.5603 15.2021 12.4154C15.2021 12.1153 15.4451 11.8727 15.7455 11.8727C15.8903 11.8727 16.0247 11.928 16.1271 12.0314C16.2284 12.1324 16.2855 12.2692 16.2855 12.4154C16.2855 12.5603 16.2284 12.6948 16.1271 12.7978ZM15.2934 12.4154C15.2934 12.292 15.3396 12.1788 15.4239 12.095C15.5104 12.0092 15.6257 11.963 15.7455 11.963C15.8655 11.963 15.9779 12.0092 16.0622 12.095C16.1473 12.1788 16.1932 12.292 16.1932 12.4154C16.1932 12.6627 15.9922 12.8634 15.7455 12.8634C15.6257 12.8634 15.5104 12.8177 15.4239 12.7331C15.3396 12.6477 15.2934 12.5358 15.2934 12.4154ZM15.9927 12.6405C15.9976 12.6544 16.0034 12.6627 16.0118 12.6651L16.0193 12.6694V12.7038H15.9018L15.8996 12.6969L15.8916 12.6761C15.8903 12.6651 15.8887 12.6508 15.8871 12.6267L15.8819 12.5325C15.8805 12.4991 15.8696 12.4796 15.8494 12.4667C15.8345 12.4617 15.8141 12.4579 15.7837 12.4579H15.6205V12.7038H15.5134V12.0997H15.7941C15.8399 12.0997 15.8785 12.1078 15.908 12.1204C15.9672 12.1482 15.9976 12.1984 15.9976 12.269C15.9976 12.3037 15.9889 12.3362 15.9741 12.3601C15.9612 12.377 15.946 12.3924 15.9295 12.4075L15.9339 12.4106C15.9451 12.4185 15.9563 12.4263 15.9628 12.4378C15.9778 12.4543 15.9846 12.482 15.9858 12.5177L15.9885 12.5946C15.9889 12.6143 15.9905 12.6296 15.9927 12.6405ZM15.8661 12.3435C15.8835 12.3323 15.8916 12.31 15.8916 12.276C15.8916 12.2401 15.8792 12.2162 15.8549 12.2042C15.8399 12.1984 15.8214 12.1942 15.7964 12.1942H15.6205V12.3639H15.7867C15.8198 12.3639 15.846 12.3571 15.8661 12.3435Z" fill="white"/>
                    </svg>`;
            }
            if (platform.slug.indexOf("xbox") > -1) {

                newCard += `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 0C7.75357 0 8.79048 0.40056 9.73452 1.07423C9.75 1.07423 9.75 1.09244 9.75 1.11064C9.75 1.12885 9.73452 1.12885 9.71905 1.12885C8.5119 0.819328 6.68571 2.03922 6.51548 2.16667H6.5H6.48452C6.31429 2.03922 4.4881 0.819328 3.28095 1.12885C3.26548 1.12885 3.25 1.12885 3.25 1.11064C3.25 1.09244 3.25 1.07423 3.26548 1.07423C4.20952 0.40056 5.24643 0 6.5 0ZM10.6537 11.4392C11.6287 10.4302 8.40504 6.86712 6.5023 5.41667C6.5023 5.41667 6.48658 5.41667 6.48658 5.43243C4.59957 6.86712 1.3602 10.4302 2.35088 11.4392C3.45164 12.4167 4.91407 13 6.5023 13C8.09054 13 9.53724 12.4167 10.6537 11.4392ZM1.78082 2.19751C1.7734 2.19751 1.76969 2.20158 1.76598 2.20566C1.76227 2.20973 1.75856 2.2138 1.75114 2.2138C0.667808 3.40327 0 5.04896 0 6.8576C0 8.34035 0.460046 9.72534 1.21689 10.817C1.21689 10.8333 1.23174 10.8333 1.24658 10.8333C1.26142 10.8333 1.26142 10.817 1.24658 10.8007C0.78653 9.25282 3.11644 5.52149 4.31849 3.95726L4.33333 3.94097C4.33333 3.93257 4.33333 3.9285 4.3313 3.92653C4.32939 3.92467 4.32568 3.92467 4.31849 3.92467C2.49315 1.93681 1.8847 2.14863 1.78082 2.19751ZM8.66667 3.93424L8.68151 3.91793C10.5068 1.94443 11.1153 2.15646 11.2043 2.18908C11.2105 2.18908 11.2141 2.18908 11.2173 2.19025C11.2217 2.1919 11.2253 2.19586 11.234 2.20539C12.3322 3.39602 13 5.04332 13 6.85372C13 8.33792 12.54 9.72426 11.7831 10.817C11.7831 10.8333 11.7683 10.8333 11.7534 10.8333V10.8007C12.1986 9.25127 9.88356 5.5163 8.68151 3.95055C8.66667 3.95055 8.66667 3.93424 8.66667 3.93424Z" fill="white"/>
                    </svg>`;
            }
            if (platform.slug.indexOf("pc") > -1) {
                newCard += `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.95833H5.95833V0.998704L13 0V5.95833ZM5.41667 1.08333V5.95833H0V1.80612L5.41667 1.08333ZM5.41667 6.5H0V11.1145L5.41667 11.9167V6.5ZM5.95833 11.912V6.5H13V13L5.95833 11.912Z" fill="white"/>
                </svg>`;
            }
            if (platform.slug.indexOf("nintendo") > -1) {
                newCard += `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67443 13H7.67506C7.62406 13 7.58325 12.9591 7.58325 12.908V0.081761C7.58325 0.0408805 7.61385 0 7.66486 0H9.67443C11.5106 0 12.9999 1.49214 12.9999 3.33176V9.66824C12.9999 11.5079 11.5106 13 9.67443 13ZM11.4596 7.15409C11.4596 6.42846 10.8679 5.83569 10.1437 5.83569C9.41941 5.83569 8.83796 6.42846 8.82776 7.15409C8.82776 7.87972 9.41941 8.47248 10.1437 8.47248C10.8679 8.47248 11.4596 7.87972 11.4596 7.15409Z" fill="white"/>
                <path d="M2.16675 4.33333C2.16675 4.92917 2.65425 5.41667 3.25008 5.41667C3.84591 5.41667 4.33341 4.92917 4.33341 4.33333C4.33341 3.7375 3.84591 3.25 3.25008 3.25C2.64522 3.25 2.16675 3.72847 2.16675 4.33333Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.45677 0H6.40457C6.45759 0 6.5 0.0408805 6.5 0.0919811V12.908C6.5 12.9591 6.45759 13 6.40457 13H3.45677C1.54812 13 0 11.5079 0 9.66824V3.33176C0 1.49214 1.54812 0 3.45677 0ZM3.45677 11.9575H5.41843V1.04245H3.45677C2.82055 1.04245 2.22675 1.28774 1.7814 1.71698C1.32545 2.14623 1.08157 2.71855 1.08157 3.33176V9.66824C1.08157 10.2814 1.33605 10.8538 1.7814 11.283C2.22675 11.7225 2.82055 11.9575 3.45677 11.9575Z" fill="white"/>
                </svg>`;
            }

        }
        newCard += ` </figure>
        <p>#${i+1}</p>
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
        document.querySelector("#card-list").innerHTML += newCard;

    }
    CardsAddClickEvent();
    AddScrollEvent();
    page++;

}

function GetGameDetails(cards) {

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
                oneGame.Age;
                oneGame.Website = game.website;

                cardsDetails.push(oneGame);
            }

            if (response.status === 400) {
                console.log(response.status);
            }
        })
    }


}

function AddDescription(id) {

    let description = "-"
    for (let i = 0; i < cardsDetails.length; i++) {
        let game = cardsDetails[i];
        if (game.Id == id) {
            description = game.Descr;
        }
    }
    document.querySelector(`#description-of-${id}`).innerHTML = description;
};

function CardsAddClickEvent() {

    let cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", ShowModal);

    }
}

// --------------- Modal -------------------- 

function SearchGameById(id) {

    for (let i = 0; i < cardsDetails.length; i++) {
        let gameDetails = cardsDetails[i];
        if (gameDetails.Id === id) {
            MakeModal(gameDetails);
        }
    }
}

function ShowModal() {
    let gameId = Number(this.getAttribute("id"));
    SearchGameById(gameId);
    modalOpen = true;

}

function MakeModal(game) {
    let modalBack = document.querySelector(".modal-black");
    let modal = document.querySelector(".modal-container");
    let cardDisplay = document.querySelector(".game-cards-container");
    let smallDispositives = window.matchMedia("(max-width: 1023px)");
    modal.innerHTML = "";
    let modalInfo = "";

    modalInfo += `<figure class="modal-background-img"><img src="${game.BackgroundPic}" alt=""></figure>
        <div class="modal-header-container">
        <a class="modal-close"><svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 8C16 10.1217 15.1571 12.1566 13.6569 13.6569C12.1566 15.1571 10.1217 16 8 16C5.87827 16 3.84344 15.1571 2.34315 13.6569C0.842855 12.1566 0 10.1217 0 8C0 5.87827 0.842855 3.84344 2.34315 2.34315C3.84344 0.842855 5.87827 0 8 0C10.1217 0 12.1566 0.842855 13.6569 2.34315C15.1571 3.84344 16 5.87827 16 8ZM5.354 4.646C5.26011 4.55211 5.13278 4.49937 5 4.49937C4.86722 4.49937 4.73989 4.55211 4.646 4.646C4.55211 4.73989 4.49937 4.86722 4.49937 5C4.49937 5.13278 4.55211 5.26011 4.646 5.354L7.293 8L4.646 10.646C4.59951 10.6925 4.56264 10.7477 4.53748 10.8084C4.51232 10.8692 4.49937 10.9343 4.49937 11C4.49937 11.0657 4.51232 11.1308 4.53748 11.1916C4.56264 11.2523 4.59951 11.3075 4.646 11.354C4.73989 11.4479 4.86722 11.5006 5 11.5006C5.06574 11.5006 5.13084 11.4877 5.19158 11.4625C5.25232 11.4374 5.30751 11.4005 5.354 11.354L8 8.707L10.646 11.354C10.6925 11.4005 10.7477 11.4374 10.8084 11.4625C10.8692 11.4877 10.9343 11.5006 11 11.5006C11.0657 11.5006 11.1308 11.4877 11.1916 11.4625C11.2523 11.4374 11.3075 11.4005 11.354 11.354C11.4005 11.3075 11.4374 11.2523 11.4625 11.1916C11.4877 11.1308 11.5006 11.0657 11.5006 11C11.5006 10.9343 11.4877 10.8692 11.4625 10.8084C11.4374 10.7477 11.4005 10.6925 11.354 10.646L8.707 8L11.354 5.354C11.4005 5.30751 11.4374 5.25232 11.4625 5.19158C11.4877 5.13084 11.5006 5.06574 11.5006 5C11.5006 4.93426 11.4877 4.86916 11.4625 4.80842C11.4374 4.74768 11.4005 4.69249 11.354 4.646C11.3075 4.59951 11.2523 4.56264 11.1916 4.53748C11.1308 4.51232 11.0657 4.49937 11 4.49937C10.9343 4.49937 10.8692 4.51232 10.8084 4.53748C10.7477 4.56264 10.6925 4.59951 10.646 4.646L8 7.293L5.354 4.646Z" fill="white"/>
        </svg></a>
    <figure class="modal-logos-container">`;

    for (let k = 0; k < game.Platforms.length; k++) {
        let platform = game.Platforms[k].platform;
        if (platform.slug.indexOf("playstation") > -1) {
            modalInfo += `<svg  height="20" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 0.149317L6.5 12.0296L9.07955 12.8818L9.07955 2.92038C9.07955 2.45098 9.28024 2.13932 9.60212 2.2465C10.023 2.36823 10.1048 2.80063 10.1048 3.2648L10.1048 7.24326C11.7104 8.05369 12.9745 7.24283 12.9745 5.10456C12.9745 2.91953 12.2334 1.94614 10.0527 1.16352C9.19249 0.864854 7.59836 0.360857 6.5 0.149317Z" fill="white"/>
                <path d="M9.75 11.1429L13.6492 9.45771C14.0903 9.25915 14.1578 8.9894 13.8008 8.84764C13.4382 8.70325 12.791 8.74457 12.3452 8.93895L9.75 10.0506V8.27688L9.89861 8.21729C9.89861 8.21729 10.6498 7.89415 11.7064 7.75502C12.7609 7.61465 14.0541 7.77328 15.0706 8.2385C16.2156 8.68019 16.3439 9.32446 16.0542 9.77281C15.7603 10.2165 15.0478 10.5375 15.0478 10.5375L9.75 12.8484" fill="white"/>
                <path d="M1.18907 11.3389C-0.0278308 10.9683 -0.230758 10.1851 0.324385 9.73273C0.836458 9.31962 1.70854 9.00863 1.70854 9.00863L5.31353 7.60333L5.31353 9.20276L2.72172 10.2185C2.26263 10.398 2.1938 10.6507 2.56358 10.7828C2.93997 10.9203 3.60794 10.8834 4.0673 10.698L5.31353 10.2068V11.6346C5.23321 11.6494 5.1439 11.6642 5.06238 11.6794C3.81985 11.9049 2.49607 11.8123 1.18907 11.3389Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M16.1271 12.7978C16.0247 12.8989 15.8903 12.9561 15.7455 12.9561C15.6008 12.9561 15.462 12.8989 15.3594 12.7978C15.2582 12.6948 15.2021 12.5603 15.2021 12.4154C15.2021 12.1153 15.4451 11.8727 15.7455 11.8727C15.8903 11.8727 16.0247 11.928 16.1271 12.0314C16.2284 12.1324 16.2855 12.2692 16.2855 12.4154C16.2855 12.5603 16.2284 12.6948 16.1271 12.7978ZM15.2934 12.4154C15.2934 12.292 15.3396 12.1788 15.4239 12.095C15.5104 12.0092 15.6257 11.963 15.7455 11.963C15.8655 11.963 15.9779 12.0092 16.0622 12.095C16.1473 12.1788 16.1932 12.292 16.1932 12.4154C16.1932 12.6627 15.9922 12.8634 15.7455 12.8634C15.6257 12.8634 15.5104 12.8177 15.4239 12.7331C15.3396 12.6477 15.2934 12.5358 15.2934 12.4154ZM15.9927 12.6405C15.9976 12.6544 16.0034 12.6627 16.0118 12.6651L16.0193 12.6694V12.7038H15.9018L15.8996 12.6969L15.8916 12.6761C15.8903 12.6651 15.8887 12.6508 15.8871 12.6267L15.8819 12.5325C15.8805 12.4991 15.8696 12.4796 15.8494 12.4667C15.8345 12.4617 15.8141 12.4579 15.7837 12.4579H15.6205V12.7038H15.5134V12.0997H15.7941C15.8399 12.0997 15.8785 12.1078 15.908 12.1204C15.9672 12.1482 15.9976 12.1984 15.9976 12.269C15.9976 12.3037 15.9889 12.3362 15.9741 12.3601C15.9612 12.377 15.946 12.3924 15.9295 12.4075L15.9339 12.4106C15.9451 12.4185 15.9563 12.4263 15.9628 12.4378C15.9778 12.4543 15.9846 12.482 15.9858 12.5177L15.9885 12.5946C15.9889 12.6143 15.9905 12.6296 15.9927 12.6405ZM15.8661 12.3435C15.8835 12.3323 15.8916 12.31 15.8916 12.276C15.8916 12.2401 15.8792 12.2162 15.8549 12.2042C15.8399 12.1984 15.8214 12.1942 15.7964 12.1942H15.6205V12.3639H15.7867C15.8198 12.3639 15.846 12.3571 15.8661 12.3435Z" fill="white"/>
                </svg>`;
        }
        if (platform.slug.indexOf("xbox") > -1) {

            modalInfo += `<svg  height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 0C7.75357 0 8.79048 0.40056 9.73452 1.07423C9.75 1.07423 9.75 1.09244 9.75 1.11064C9.75 1.12885 9.73452 1.12885 9.71905 1.12885C8.5119 0.819328 6.68571 2.03922 6.51548 2.16667H6.5H6.48452C6.31429 2.03922 4.4881 0.819328 3.28095 1.12885C3.26548 1.12885 3.25 1.12885 3.25 1.11064C3.25 1.09244 3.25 1.07423 3.26548 1.07423C4.20952 0.40056 5.24643 0 6.5 0ZM10.6537 11.4392C11.6287 10.4302 8.40504 6.86712 6.5023 5.41667C6.5023 5.41667 6.48658 5.41667 6.48658 5.43243C4.59957 6.86712 1.3602 10.4302 2.35088 11.4392C3.45164 12.4167 4.91407 13 6.5023 13C8.09054 13 9.53724 12.4167 10.6537 11.4392ZM1.78082 2.19751C1.7734 2.19751 1.76969 2.20158 1.76598 2.20566C1.76227 2.20973 1.75856 2.2138 1.75114 2.2138C0.667808 3.40327 0 5.04896 0 6.8576C0 8.34035 0.460046 9.72534 1.21689 10.817C1.21689 10.8333 1.23174 10.8333 1.24658 10.8333C1.26142 10.8333 1.26142 10.817 1.24658 10.8007C0.78653 9.25282 3.11644 5.52149 4.31849 3.95726L4.33333 3.94097C4.33333 3.93257 4.33333 3.9285 4.3313 3.92653C4.32939 3.92467 4.32568 3.92467 4.31849 3.92467C2.49315 1.93681 1.8847 2.14863 1.78082 2.19751ZM8.66667 3.93424L8.68151 3.91793C10.5068 1.94443 11.1153 2.15646 11.2043 2.18908C11.2105 2.18908 11.2141 2.18908 11.2173 2.19025C11.2217 2.1919 11.2253 2.19586 11.234 2.20539C12.3322 3.39602 13 5.04332 13 6.85372C13 8.33792 12.54 9.72426 11.7831 10.817C11.7831 10.8333 11.7683 10.8333 11.7534 10.8333V10.8007C12.1986 9.25127 9.88356 5.5163 8.68151 3.95055C8.66667 3.95055 8.66667 3.93424 8.66667 3.93424Z" fill="white"/>
                </svg>`;
        }
        if (platform.slug.indexOf("pc") > -1) {
            modalInfo += `<svg  height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.95833H5.95833V0.998704L13 0V5.95833ZM5.41667 1.08333V5.95833H0V1.80612L5.41667 1.08333ZM5.41667 6.5H0V11.1145L5.41667 11.9167V6.5ZM5.95833 11.912V6.5H13V13L5.95833 11.912Z" fill="white"/>
            </svg>`;
        }
        if (platform.slug.indexOf("nintendo") > -1) {
            modalInfo += `<svg height="20" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.67443 13H7.67506C7.62406 13 7.58325 12.9591 7.58325 12.908V0.081761C7.58325 0.0408805 7.61385 0 7.66486 0H9.67443C11.5106 0 12.9999 1.49214 12.9999 3.33176V9.66824C12.9999 11.5079 11.5106 13 9.67443 13ZM11.4596 7.15409C11.4596 6.42846 10.8679 5.83569 10.1437 5.83569C9.41941 5.83569 8.83796 6.42846 8.82776 7.15409C8.82776 7.87972 9.41941 8.47248 10.1437 8.47248C10.8679 8.47248 11.4596 7.87972 11.4596 7.15409Z" fill="white"/>
            <path d="M2.16675 4.33333C2.16675 4.92917 2.65425 5.41667 3.25008 5.41667C3.84591 5.41667 4.33341 4.92917 4.33341 4.33333C4.33341 3.7375 3.84591 3.25 3.25008 3.25C2.64522 3.25 2.16675 3.72847 2.16675 4.33333Z" fill="white"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M3.45677 0H6.40457C6.45759 0 6.5 0.0408805 6.5 0.0919811V12.908C6.5 12.9591 6.45759 13 6.40457 13H3.45677C1.54812 13 0 11.5079 0 9.66824V3.33176C0 1.49214 1.54812 0 3.45677 0ZM3.45677 11.9575H5.41843V1.04245H3.45677C2.82055 1.04245 2.22675 1.28774 1.7814 1.71698C1.32545 2.14623 1.08157 2.71855 1.08157 3.33176V9.66824C1.08157 10.2814 1.33605 10.8538 1.7814 11.283C2.22675 11.7225 2.82055 11.9575 3.45677 11.9575Z" fill="white"/>
            </svg>`;
        }

    }
    modalInfo += `</figure>
    <h1>${game.Name}</h1></div><div class="modal-info">
    <div class="modal-tags">
        <p>${game.ReleaseDate}</p>
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
                     <p>Release date</p>
                     <p>${game.ReleaseDate}</p>
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
                     <p>Not rated</p>
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

function ReadSearchKey(e) {


    if (e.keyCode === 13) {
        if (e.target.value.trim() !== "") {
            searching = true;
            searchString = e.target.value;
            document.querySelector("#card-list").innerHTML = "";
            document.querySelector("#home-anchor").classList.remove("link-active");
            page = 1;
            SearchGameByName(searchString);
            document.activeElement.blur();
            ChangeHeader(searchString);
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
        SearchGameByName(searchString);
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

function SearchGameByName(string) {


    let uri = `https://api.rawg.io/api/games?key=8854630ec3f74ac487342aced66aef10&page=${page}&page_size=30&search=${string}`;


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
                GetGameDetails(cards);
                MakeCards(cards);
            }
            if (searchSuggestion) {
                document.querySelector(".search-suggestions").innerHTML = "";
                for (let i = 0; i < 3; i++) {
                    let gameName = cards.results[i].name;
                    document.querySelector(".search-suggestions").innerHTML += `<p>${gameName}</p>`;
                }
                searchSuggestion = false;

            }


        }
        if (response.status === 400) {
            console.log(response.status); // show error message
        }
    })

}

function ChangeHeader(string) {
    document.querySelector("#main-header").innerHTML = "Search Results";
    document.querySelector("#main-header-descr").innerHTML = string;
}

//---------- Infinite Scroll ---------
function AddScrollEvent() {

    let needMoreCards = false;
    window.addEventListener("scroll", () => {

        let scrollHigh = document.documentElement.scrollHeight - window.innerHeight;
        let scrolled = window.scrollY;
        let percentageScrolled = Math.floor((scrolled / scrollHigh) * 100);

        if (percentageScrolled >= 60 && !(needMoreCards) && !modalOpen) {


            if (!searching) ShowCards(page);
            if (searching) SearchGameByName(searchString);
            needMoreCards = true;


        }

    });
}

/////////////////////////////// VISUAL 

//  ----- Displays ------- 

function VerticalDisplay() {
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
            AddDescription(cardId);
        }

        horizontal = false;

    }
}

function HorizontalDisplay() {
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

function ShowNav() {

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

function ShowSearchBar() {

    let header = document.querySelector("header");
    if (header.style.height === "166px") {
        header.style.height = "104px";

    } else {
        header.style.height = "166px";

    }

}