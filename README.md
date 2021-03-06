# Czech inflection JavaScript library

[![Build Status](https://travis-ci.org/ErikCupal/czech-inflection.svg?branch=master)](https://travis-ci.org/ErikCupal/czech-inflection)

`czech-inflection` is JavaScript library for inflecting Czech words. It is a port of PHP [inflection](https://github.com/heureka/inflection) library.

## Instalation

`npm i czech-inflection`

## [Live demo](https://erikcupal.github.io/czech-inflection/)

## Usage

```js
import inflect from 'czech-inflection'

console.log(inflect({ word: 'Tomáš', grammarCase: 3, animate: true }))
// Tomášovi

console.log(inflect({ word: 'Tomáš', grammarCase: 3, animate: true, plural: true }))
// Tomášům

console.log(inflect({ word: 'Honza', grammarCase: 3, animate: true, gender: 'm' }))
// It's necessary to specify gender for some names/nicknames to inflect them correctly
// Honzovi

console.log(inflect({ word: 'hrad', grammarCase: 6 }))
// hradě

console.log(inflect({ word: 'hrad', grammarCase: 6, plural: true }))
// hradech
```

