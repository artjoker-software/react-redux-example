# Artjoker's React + Redux example

This project contains a core Front-end structure (minimalistic boilerplae) of a React [SPA](https://en.wikipedia.org/wiki/Single-page_application).  
It utilizes the latest features of JavaScript (ES6/ES7/JSX) using runtime babel transpilation.  
It is production ready and fully configurable via environment.  

### Features:
- hot reloading and runtime transpilation via [Babel](https://babeljs.io/) and [Webpack](https://webpack.github.io/)
- [Redux](http://redux.js.org/)
- universal (isomorphic) rendering
- basic form validation on user signup and login
- advanced [routing](https://github.com/ReactTraining/react-router)
- multilanguage support (`/en/`, `/ru/`) via
- [SHA-2](https://en.wikipedia.org/wiki/SHA-2) password encryption before transfer to minimise [MitM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) dangers.
- fully customizable and flexible due to modular approach
- unit testing structure via Karma, Mocha and Enzyme
- [AirBnB code style](https://github.com/airbnb/javascript) linting

### Stack:
<a alt="Express" href="http://expressjs.com/">
<img alt="Express" src="https://camo.githubusercontent.com/fc61dcbdb7a6e49d3adecc12194b24ab20dfa25b/68747470733a2f2f692e636c6f756475702e636f6d2f7a6659366c4c376546612d3330303078333030302e706e67"  width="250"/>
</a>
<a alt="Webpack" href="https://webpack.github.io/">
<img alt="Webpack" src="https://webpack.github.io/assets/logo.png"  width="200"/>
</a>
<a alt="Babel" href="https://babeljs.io/">
<img alt="Babel" src="https://raw.githubusercontent.com/babel/logo/master/babel.png"  width="210"/>
</a>
<a alt="Redux" href="https://redux.js.org">
<img alt="Redux" src="https://camo.githubusercontent.com/f28b5bc7822f1b7bb28a96d8d09e7d79169248fc/687474703a2f2f692e696d6775722e636f6d2f4a65567164514d2e706e67"  width="250"/>
</a>
<a alt="Mocha" href="https://mochajs.org">
<img alt="Mocha" src="https://onsen.io/blog/content/images/2015/Aug/chaijs-mocha.png"  width="230"/>
</a>
<a alt="Karma" href="https://karma-runner.github.io/1.0/index.html">
<img alt="Karma" src="http://pascalprecht.github.io/full-spectrum-testing-slides/styles/karma-logo.svg"  width="220"/>
</a>
  
  
### Commands:
##### Setup:
1) Clone this repository.  
2) Install dependencies (`npm install`)

##### Production:
*Command*: `npm start`  
You will need to provide all the necessary environment variables.

##### Development:
*Command*: `npm run local`  
Employs hot reloading and runtime transpilation, all of the variables are supplied.  
Test it on `http://localhost:3000`
Will connect to the remote API which you will have to supply.  
  
*Command*: `npm run local-fullstack`  
Employs hot reloading and runtime transpilation, all of the variables are supplied.  
Test it on `http://localhost:3000`
Will connect to the local API (localhost:3030) which you will have to run.

##### Testing:
*Command*: `npm test`  
Will run all of the unit and behaviour tests and generate a coverage file.  

##### Code Style:
*Command*: `npm run lint`  
Will run [ESLint]() to check the code complience to the [AirBnB](https://github.com/airbnb/javascript) code style.
