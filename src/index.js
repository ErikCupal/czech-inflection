import { patterns, exceptions, forceM, forceF, forceS } from './constants'

/**
 * @param pattern
 * @param word
 *
 * @return int position from left where the pattern matched from right otherwise -1
 */
const match = (pattern, word, replacements) => {
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
  gender,
}) => {
  const originalWord = word
  if (plural) {
    grammarCase += 7
  }

  if (grammarCase === 1) {
    return word
  }

  const firstLetter = word.substring(0, 1)
  const isUpperCase = firstLetter.toLocaleUpperCase() === firstLetter

  word = breakAccents(word)
  const lowercaseWord = word.toLocaleLowerCase()

  if (!gender) {
    if (forceM.includes(lowercaseWord)) {
      gender = 'm'
    } else if (forceF.includes(lowercaseWord)) {
      gender = 'f'
    } else if (forceS.includes(lowercaseWord)) {
      gender = 's'
    }
  }

  console.log({ gender })

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
      const prefix = word.substring(0, left)

      if (exception && grammarCase === 4) {
        return exception[2]
      }

      let postfix = pattern[grammarCase]
      if (postfix === undefined) {
        return ''
      }
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
        result =
          result.substring(0, 1).toLocaleUpperCase() + result.substring(1)
      }
      return result
    }
  }

  return originalWord
}

export default inflect
