import styled from "styled-components";

interface TitleProps {
  completed: boolean;
}

export const Item = styled.div`
  background-color: #ccc;
  border-radius: 8px;
  width: 50%;
  height: 80px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.span<TitleProps>`
  padding-left: 10px;
  text-decoration: ${(props) => props.completed && "line-through"};
`;
