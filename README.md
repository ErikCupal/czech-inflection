# Czech inflection JavaScript library

[![Build Status](https://travis-ci.org/ErikCupal/czech-inflection.svg?branch=master)](https://travis-ci.org/ErikCupal/czech-inflection)

Czech-inflection is JavaScript library for inflecting Czech words. It is a port [inflection](https://github.com/heureka/inflection) library.

## Instalation

`npm i czech-inflection`

## Usage

```js
import inflect from 'czech-inflection'

console.log(inflect({ word: 'Tomáš', grammarCase: 3, animate: true }))
// Tomášovi

console.log(inflect({ word: 'Tomáš', grammarCase: 3, animate: true, plural: true }))
// Tomášům

console.log(inflect({ word: 'hrad', grammarCase: 6 }))
// hradě

console.log(inflect({ word: 'hrad', grammarCase: 6, plural: true }))
// hradech
```

