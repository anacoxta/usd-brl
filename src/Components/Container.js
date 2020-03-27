import React from 'react'
import styled from 'styled-components'

const Container = props => {
  return <StyledContainer>{props.children}</StyledContainer>
}

const StyledContainer = styled.div`
  margin: 0 5vw;
  padding: 0;
  max-width: 600px;
  width: 90%;
  background-color: white;
  border-radius: 0 0 0.8rem 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Container