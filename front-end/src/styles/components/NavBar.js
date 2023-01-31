import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  background-color: #d69c33;
  padding-left: 24px;
  position: fixed;
  width: 100%;

  a {
    color: white;
  }
  
  .hamburguer {
    display: none;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }

  .bar {
    display: block;
    width: 25px;
    height: 3px;
    margin: 5px auto;
    -webkit-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
    background-color: white;
  }

  .active {
    color: red;
    left: 0;
  }


  @media (max-width: 550px) {
    .hamburguer {
      display: block;
      margin-right: 30px;
    }
  }

`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  align-items: center;
  padding-right: 24px;

  a {
    transition: 2s ease;
    text-decoration: none;
  }

  a:hover {
    color: #f2b705;
  }

  @media (max-width: 550px) {
    position: fixed;
    left: -100%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    background-color: #d69c33;
    width: 100%;
    text-align: center;
    transition: 0.3s;
  }

`;