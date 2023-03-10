import styled from 'styled-components';

const MainOrder = styled.div`
  margin-top: 6rem;
  gap: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  button {
    background: transparent;
    color: #777;
    margin-top: 10px;
    border: 2px solid transparent;
    font-size: 17px;
  }

  button:disabled {
    cursor: not-allowed;
  }
`;

export default MainOrder;
