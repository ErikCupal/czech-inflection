import inflect from '..'

const CASES = [1, 2, 3, 4, 5, 6, 7]

const testInflections = ({
  word,
  plural = false,
  animate = false,
  expectedInflections,
  gender = undefined,
}) => {
  expect(
    CASES.map(grammarCase =>
      inflect({ word, grammarCase, plural, animate, gender }),
    ),
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
        'Tomáše',
        'Tomášovi',
        'Tomáše',
        'Tomáši',
        'Tomášovi',
        'Tomášem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Tomášové',
        'Tomášů',
        'Tomášům',
        'Tomáše',
        'Tomášové',
        'Tomáších',
        'Tomáši',
      ],
    })
  })

  fit('inflects Honza correctly', () => {
    const WORD = 'Honza'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      gender: 'm',
      expectedInflections: [
        'Honza',
        'Honzy',
        'Honzovi',
        'Honzu',
        'Honzo',
        'Honzovi',
        'Honzou',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      gender: 'm',
      expectedInflections: [
        'Honzové',
        'Honzů',
        'Honzům',
        'Honzy',
        'Honzové',
        'Honzech',
        'Honzy',
      ],
    })
  })

  fit('inflects Dáda as masculine correctly', () => {
    const WORD = 'Dáda'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      gender: 'm',
      expectedInflections: [
        'Dáda',
        'Dády',
        'Dádovi',
        'Dádu',
        'Dádo',
        'Dádovi',
        'Dádou',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      gender: 'm',
      expectedInflections: [
        'Dádové',
        'Dádů',
        'Dádům',
        'Dády',
        'Dádové',
        'Dádech',
        'Dády',
      ],
    })
  })

  fit('inflects Dáda as feminine correctly', () => {
    const WORD = 'Dáda'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      gender: 'f',
      expectedInflections: [
        'Dáda',
        'Dády',
        'Dádě',
        'Dádu',
        'Dádo',
        'Dádě',
        'Dádou',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      gender: 'f',
      expectedInflections: [
        'Dády',
        'Dád',
        'Dádám',
        'Dády',
        'Dády',
        'Dádách',
        'Dádami',
      ],
    })
  })

  it('inflects hrad correctly', () => {
    const WORD = 'hrad'
    testInflections({
      word: WORD,
      plural: false,
      expectedInflections: [
        'hrad',
        'hradu',
        'hradu',
        'hrad',
        'hrade',
        'hradu',
        'hradem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      expectedInflections: [
        'hrady',
        'hradů',
        'hradům',
        'hrady',
        'hrady',
        'hradech',
        'hrady',
      ],
    })
  })

  it('inflects Angelika correctly', () => {
    const WORD = 'Angelika'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Angelika',
        'Angeliky',
        'Angelice',
        'Angeliku',
        'Angeliko',
        'Angelice',
        'Angelikou',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Angeliky',
        'Angelik',
        'Angelikám',
        'Angeliky',
        'Angeliky',
        'Angelikách',
        'Angelikami',
      ],
    })
  })

  it('inflects Jan correctly', () => {
    const WORD = 'Jan'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Jan',
        'Jana',
        'Janovi',
        'Jana',
        'Jane',
        'Janovi',
        'Janem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Janové',
        'Janů',
        'Janům',
        'Jany',
        'Janové',
        'Janech',
        'Jany',
      ],
    })
  })

  it('inflects Josef correctly', () => {
    const WORD = 'Josef'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Josef',
        'Josefa',
        'Josefovi',
        'Josefa',
        'Josefe',
        'Josefovi',
        'Josefem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Josefové',
        'Josefů',
        'Josefům',
        'Josefy',
        'Josefové',
        'Josefech',
        'Josefy',
      ],
    })
  })

  it('inflects Zeus correctly', () => {
    const WORD = 'Zeus'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Zeus',
        'Dia',
        'Diovi',
        'Dia',
        'Die',
        'Diovi',
        'Diem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: ['Diové', 'Diů', 'Diům', '', 'Diové', '', ''],
    })
  })

  it('inflects Monika correctly', () => {
    const WORD = 'Monika'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Monika',
        'Moniky',
        'Monice',
        'Moniku',
        'Moniko',
        'Monice',
        'Monikou',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Moniky',
        'Monik',
        'Monikám',
        'Moniky',
        'Moniky',
        'Monikách',
        'Monikami',
      ],
    })
  })

  it('inflects Čtyři correctly', () => {
    const WORD = 'Čtyři'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Čtyři',
        'Čtyřech',
        'Čtyřem',
        'Čtyři',
        'Čtyři',
        'Čtyřech',
        'Čtyřmi',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: ['', '', '', '', '', '', ''],
    })
  })

  it('inflects Monika correctly', () => {
    const WORD = 'Marcel'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Marcel',
        'Marcela',
        'Marcelovi',
        'Marcela',
        'Marceli',
        'Marcelovi',
        'Marcelem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Marcelové',
        'Marcelů',
        'Marcelům',
        'Marcely',
        'Marcelové',
        'Marcelích',
        'Marcely',
      ],
    })
  })

  it('inflects Dagmar correctly', () => {
    const WORD = 'Dagmar'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Dagmar',
        'Dagmary',
        'Dagmaře',
        'Dagmar',
        'Dagmar',
        'Dagmar',
        'Dagmar',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Dagmary',
        'Dagmar',
        'Dagmarám',
        'Dagmary',
        'Dagmary',
        'Dagmarách',
        'Dagmarami',
      ],
    })
  })

  it('inflects Ivo correctly', () => {
    const WORD = 'Ivo'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: [
        'Ivo',
        'Iva',
        'Ivovi',
        'Iva',
        'Ivo',
        'Ivovi',
        'Ivem',
      ],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Ivové',
        'Ivů',
        'Ivům',
        'Ivy',
        'Ivové',
        'Ivech',
        'Ivy',
      ],
    })
  })

  it('inflects Iva correctly', () => {
    const WORD = 'Iva'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: ['Iva', 'Ivy', 'Ivě', 'Ivu', 'Ivo', 'Ivě', 'Ivou'],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Ivy',
        'Iv',
        'Ivám',
        'Ivy',
        'Ivy',
        'Ivách',
        'Ivami',
      ],
    })
  })

  it('inflects Soňa correctly', () => {
    const WORD = 'Soňa'
    testInflections({
      word: WORD,
      plural: false,
      animate: true,
      expectedInflections: ['Soňa', 'Soni', 'Soně', 'Soňu', 'Soňo', 'Soně', 'Soňou'],
    })
    testInflections({
      word: WORD,
      plural: true,
      animate: true,
      expectedInflections: [
        'Soni',
        'Soň',
        'Soňám',
        'Soni',
        'Soni',
        'Soňách',
        'Soňami',
      ],
    })
  })
})
