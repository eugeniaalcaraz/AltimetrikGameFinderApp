# **AltimetrikGameFinderApp**

## CODE IMPROVEMENTS - DAVID'S COMMENTS

- ~~Add css color variables to the code~~
- ~~why the smooth scroll?~~
- ~~The name of #key-icon is not descriptive because it’s not an icon~~
- ~~also the #rememberMe Id is not following the naming convention the same .divCarousel #ulCarousel if you started with “-” stick with that~~
- ~~the same .chbox, .btn too generic name to the login button, because that btn is not generic~~
- ~~lower case all the folder structure~~
- ~~outline !important is necessary?~~
- ~~CSS file too large, 900 lines, split the css, in small files~~
- ~~.login-division, I prefer the word “divider”~~

- ~~#snackbar-success not valid for classes that we are going to repeat~~
- you can create SVG files instead of inline in the HTML
- ~~indentation SVG closing tag is not right~~
- ~~.dot => carousel-dot~~
- ~~sometimes has too much spacing in the JS~~
- ~~bad naming convention for the Events methods, we use UpperCase just for Classes and Components. use Camel case for functions in javascript~~
- ~~“EmailFromat” typo there~~
- ~~LoadMain has too much responsabilities and the name is not accurate~~
- ~~separate fetch in a new method.~~
- ~~don’t mix async/await with then promises, just use async/await~~
- ~~positionArroba spanglish => use just English for naming variables~~
- low priority:
- snackbarError.style.top = “-500px”;
  too hacky try to find another approach, if it is an animation you can change that to transform: translate or apply another class that will do that for you

---

- I like the comments to separate the components in CSS
- I like “.hidden” utility class like bootstrap

## TO DO

- Add Modal description scroll
- Add the || to Modal bottom links, to avoid undefined info
- Improve snackbar animation

## WISH LIST

- Last searches

## HOW TO START THE APP

Start npm:

```
npm start
```

Start Json server / Json server auth:

```
json-server db.json -m ./node_modules/json-server-auth
```

Accepted users:

```
{
  "email": "test@mail.com",
  "password": "hola"
}
```
