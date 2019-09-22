interface InflectOptions {
  word: string
  grammarCase: 1 | 2 | 3 | 4 | 5 | 6 | 7
  plural?: boolean
  animate?: boolean
}

/**
 * Inflect czech word
 */
declare function inflect(options: InflectOptions): string

export = inflect
