import inflect from '..'

const CASES = [1, 2, 3, 4, 5, 6, 7]

const testInflections = ({ word, plural, animate, expectedInflections }) => {
  expect(
    CASES.map(grammarCase => inflect({ word, grammarCase, plural, animate })),
  ).toEqual(expectedInflections)
}

describe('inflect', () => {
  it('inflects Tomáš correctly', () => {
    const WORD = 'Tomáš'

    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
        'Tomáš',
      ],
    })
  })
})
