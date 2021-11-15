import styled from "styled-components";

export const Spacer = styled.div`
  padding-top: 1rem;
`;

export const SpacerRow = styled.div`
  display: inline-block;
  padding-right: 1rem;
`;

export const Button = styled.button`
  width: 20%;
  height: 50px;
  background-color: cadetblue;
  text-transform: uppercase;
  border: none;
  border-radius: 4px;
  :hover {
    background-color: burlywood;
  }
`;

export const Input = styled.input`
  outline: none;
  width: 60%;
  height: 50px;
  padding-left: 10px;
  border: 1px solid grey;
  border-color: darkgrey;
  border-radius: 5px;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
