import React from 'react'
import '../node_modules/material-components-web/dist/material-components-web.min.css'
import './App.css'

import styled from '@emotion/styled/macro'
import { Typography } from '@rmwc/typography'
import { TextField } from '@rmwc/textfield'
import { Checkbox } from '@rmwc/checkbox'
import { ThemeProvider } from '@rmwc/theme'
import { compose, withState } from 'recompose'
import { propOr } from 'ramda'
import inflect from 'czech-inflection'

const StyledContainer = styled(ThemeProvider)`
  padding: 60px 30px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 600px;
`

const StyledForm = styled.div`
  padding: 10px 0px 10px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
`

const StyledInput = styled(TextField)`
  margin-top: 20px;
  &.mdc-text-field:not(.mdc-text-field--disabled) {
    ${p => (p.bgColor ? `background-color: ${p.bgColor};` : '')}
  }

  &.mdc-text-field--focused:not(.mdc-text-field--disabled):not(.mdc-text-field--invalid)
    .mdc-floating-label--float-above {
    color: ${propOr('var(--mdc-theme-primary)', 'focusedLabelColor')};
  }
`

const StyledCheckbox = styled(Checkbox)`
  margin-top: 30px;
`

const StyledTitle = styled(Typography)`
  color: #1c1c1c;
`

const StyledSectionTitle = styled(Typography)`
  color: #1c1c1c;
  font-weight: 600;
  border-bottom: 1px solid black;
  height: 40px;
  line-height: 40px;
  width: 100%;
  text-align: center;
`

const StyledCell = styled(Typography)`
  color: #1c1c1c;
  height: 40px;
  line-height: 40px;
`

const StyledCases = styled.div`
  flex-shrink: 0;
  width: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-right: 1px solid black;
`

const StyledSingular = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledPlural = StyledSingular

const StyledTable = styled.div`
  display: flex;
  align-items: stretch;
  margin-top: 40px;
  width: 100%;
`

const StyledGenderInfo = styled.span`
  margin-top: 10px;
  font-size: 14px;
`

const Form = ({ text, setText, animate, setAnimate, gender, setGender }) => {
  const normalizedGender = gender ? gender : undefined

  return (
    <StyledContainer
      {...{
        options: {
          primary: '#1bac9f',
          // secondary: 'black',
          // onPrimary: '#000',
          // textPrimaryOnBackground: 'black',
        },
      }}
    >
      <StyledForm>
        <StyledInput
          {...{
            label: 'Write Czech word',
            value: text,
            onChange: e => setText(e.target.value),
          }}
        />
        <StyledInput
          {...{
            label: 'Gender - write m or f',
            value: gender,
            onChange: e => setGender(e.target.value),
          }}
        />
        <StyledGenderInfo>
          Gender is necessary for correct nickname inflections
        </StyledGenderInfo>
        <StyledCheckbox
          {...{
            label: 'Animate',
            checked: animate,
            onChange: () => setAnimate(!animate),
          }}
        />
      </StyledForm>
      <StyledTable>
        <StyledCases>
          <StyledSectionTitle>Case</StyledSectionTitle>
          <StyledCell>1</StyledCell>
          <StyledCell>2</StyledCell>
          <StyledCell>3</StyledCell>
          <StyledCell>4</StyledCell>
          <StyledCell>5</StyledCell>
          <StyledCell>6</StyledCell>
          <StyledCell>7</StyledCell>
        </StyledCases>
        <StyledSingular>
          <StyledSectionTitle>Singular</StyledSectionTitle>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 1,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 2,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 3,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 4,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 5,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 6,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 7,
              animate,
              gender: normalizedGender,
            })}
          </StyledCell>
        </StyledSingular>
        <StyledSingular>
          <StyledSectionTitle>Plural</StyledSectionTitle>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 1,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 2,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 3,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 4,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 5,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 6,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
          <StyledCell>
            {inflect({
              word: text,
              grammarCase: 7,
              animate,
              gender: normalizedGender,
              plural: true,
            })}
          </StyledCell>
        </StyledSingular>
      </StyledTable>
    </StyledContainer>
  )
}

export default compose(
  withState('text', 'setText', 'Tomáš'),
  withState('animate', 'setAnimate', true),
  withState('gender', 'setGender', ''),
)(Form)
