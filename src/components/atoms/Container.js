import styled from'styled-components'

const Container = styled.div`
  padding: 16px 0;
  max-width: 768px;
  margin: 0 auto;
  height: ${props => props.height ? props.height : 'auto'};

  @media (max-width: 768px) {
    padding-bottom: ${props => props.paddingBottom ? props.paddingBottom: '144px'};
  }
`

export default Container;
