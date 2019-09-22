import React from 'react'
import '../node_modules/material-components-web/dist/material-components-web.min.css'
import './App.css'

import styled from '@emotion/styled/macro'
import { Typography } from '@rmwc/typography'
import Form from './Form'

const StyledContainer = styled.div`
  padding: 60px 0px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StyledTitle = styled(Typography)`
  color: #1c1c1c;
  padding: 0px 15px;
`

const App = () => {
  return (
    <StyledContainer>
      <StyledTitle use="headline3">Czech inflection JS library</StyledTitle>
      <Form />
    </StyledContainer>
  )
}

export default App
