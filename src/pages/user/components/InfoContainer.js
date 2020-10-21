import styled from 'styled-components'

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.noMargin ? '' : '16px'};

  :last-of-type {
    margin-bottom: 32px;
  }
`

export default InfoContainer
