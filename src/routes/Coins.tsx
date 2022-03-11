import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useQuery } from "react-query";
import { fetchCoins } from "../api.ts";
import { Helmet } from 'react-helmet';
import 'styled-components';
import { ICoin, coinState } from "../atoms.ts";
import HeaderMain from "components/HeaderMain.tsx";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: auto;
`

const Container = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1, 1fr);
  height: auto;
`;

const CoinList = styled.div`
  padding: 5px;
  background-color: ${(props) => props.theme.bgColor};
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  list-style:none;
  border: 1px solid ${(props) => props.theme.textColor};
  a{
    transition: color 0.5s ease-in;
    padding:  20px;
    display: flex;
    align-items: center;
    font-weight: bolder;
  }
  &:hover{
    a{
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`

const Img = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`
// splice = (순서, 삭제, 추가)
//toUpperCase = string을 대문자로 화면에 출력해준다.

function Coins() {
  const { isLoading: loading, data: coinData } = useQuery<ICoin[]>("allCoins", fetchCoins);
  const onDragEnd = ({ draggableId ,destination, source }:DropResult) => {
    if(!destination) return;
    setState((oldCoins) => {
      const copyCoins = [...oldCoins];
      // 1) Delete item on source.index
      copyCoins.splice(source.index, 1)
      // 2) Put back the item on the destination.index
      copyCoins.splice(destination?.index, 0, draggableId)
      return copyCoins;
    })
  }
  return (
    <Wrapper>
      <Container>
      <HeaderMain />
      {loading ? "Is Loading..." : (
        <CoinList>
          {coinData?.slice(0, 10).map((coin, index) => (
            <DragDropContext onDragEnd={onDragEnd}>
              <div>
                <Droppable droppableId="one">
                  {(magic) =>
                    <ul ref={magic.innerRef} {...magic.droppableProps}>
                      <Draggable key={coin} draggableId={coin.id} index={index}>
                        {(magic) =>
                          <CoinList
                            ref={magic.innerRef}
                            {...magic.draggableProps}
                            {...magic.dragHandleProps}
                          >
                            <Coin key={coin.id}>
                              <Link to={{
                                pathname: `/${coin.id}`,
                                state: { name: coin.name },
                              }}
                              >
                                <Img
                                  src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                />
                                {coin.name} &rarr;
                              </Link>
                            </Coin>
                          </CoinList>
                        }
                      </Draggable>
                      {magic.placeholder}
                    </ul>}
                </Droppable>
              </div>
            </DragDropContext>
          ))}
          </CoinList>
      )}
      </Container>
    </Wrapper>
  )
}
export default Coins;
