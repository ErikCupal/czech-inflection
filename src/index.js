import { patterns, exceptions, forceM, forceF, forceS } from './constants'

// /**
//  * @param string pattern
//  * @param string word
//  *
//  * @return int position from left where the pattern matched from right otherwise -1
//  */
const match = (pattern, word, replacements) => {
  // if (pattern ==='-([cčďšňřťž])') {
    // console.log({pattern, word, sub: pattern.substring(1), reg: new RegExp(pattern.substring(1) + '$', 'iu')})
  // }
  if (pattern.substring(0, 1) !== '-') {
    // compare if the first byte is ascii `-`
    return pattern.toLocaleLowerCase() === word.toLocaleLowerCase() ? 0 : -1
  }

  const matches = new RegExp(pattern.substring(1) + '$', 'iu').exec(word)
  if (matches) {
    for (let i = matches.length - 1; i > 0; i--) {
      replacements[i - 1] = matches[matches.length - i]
    }

    return word.length - matches[0].length
  }

  return -1
}

const breakAccents = word => {
  let newWord = word

  const replacementsArr = [
    ['di', 'ďi'],
    ['ti', 'ťi'],
    ['ni', 'ňi'],
    ['dě', 'ďe'],
    ['tě', 'ťe'],
    ['ně', 'ňe'],
  ]
  replacementsArr.forEach(([pattern, replacement]) => {
    newWord = newWord.split(pattern).join(replacement)
  })

  return newWord
}

const fixAccents = word => {
  let newWord = word

  const replacementsArr = [
    ['ďi', 'di'],
    ['ťi', 'ti'],
    ['ňi', 'ni'],
    ['ďe', 'dě'],
    ['ťe', 'tě'],
    ['ňe', 'ně'],
  ]
  replacementsArr.forEach(([pattern, replacement]) => {
    newWord = newWord.split(pattern).join(replacement)
  })

  return newWord
}

export const inflect = ({
  word,
  grammarCase,
  plural = false,
  animate = false,
}) => {
  const originalWord = word
  if (plural) {
    grammarCase += 7
  }

  if (grammarCase === 1) {
    return word
  }

  let gender

  const firstLetter = word.substring(0, 1)
  const isUpperCase = firstLetter.toLocaleUpperCase() === firstLetter

  word = breakAccents(word)
  const lowercaseWord = word.toLocaleLowerCase()

  if (forceM.includes(lowercaseWord)) {
    gender = 'm'
  } else if (forceF.includes(lowercaseWord)) {
    gender = 'f'
  } else if (forceS.includes(lowercaseWord)) {
    gender = 's'
  }

  let exception
  for (const e of exceptions) {
    if (lowercaseWord === e[0]) {
      exception = e
      break
    }
  }


  let replacements = []
  for (const pattern of patterns) {
    if (gender && pattern[0] !== gender) {
      continue
    }

    word = exception ? exception[1] : word
    const left = match(pattern[1], word, replacements)


    if (left !== -1) {
      // console.log({ left, pattern, word, exception, lowercaseWord, gender, animate, plural, grammarCase, replacements })
      const prefix = word.substring(0, left)

      if (exception && grammarCase === 4) {
        return exception[2]
      }

      let postfix = pattern[grammarCase]
      if (postfix === undefined) {
        return ''
      }
      // console.log({postfix, replacements, pattern})
      replacements.forEach((replacement, i) => {
        postfix = postfix.replace(new RegExp(String(i), 'g'), replacement)
      })

      const posSlash = postfix.indexOf('/')
      if (posSlash !== -1) {
        if (animate) {
          postfix = postfix.substring(posSlash + 1)
        } else {
          postfix = postfix.substring(0, posSlash)
        }
      }

      let result = fixAccents(prefix + postfix)
      if (isUpperCase) {
        result = result.substring(0, 1).toLocaleUpperCase() + result.substring(1)
      }
      return result
    }
  }

  return originalWord
}

export default inflect
