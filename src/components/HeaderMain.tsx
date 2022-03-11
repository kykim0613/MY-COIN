import styled from "styled-components"
import { useSetRecoilState } from "recoil";
import { CoinsInfo, ICoin, isDarkAtom } from "atoms.ts";
import { useForm } from "react-hook-form";
import 'styled-components';
import { useState } from "react";
import { Helmet } from 'react-helmet';

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.textColor};
`;

const Header = styled.header`
  height: 25vh;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 20vh;
`;
const ToggleMode = styled.label`
  width:60px;
  height:34px;
  position:absolute;
  display:inline-block;
  top:1.5%;
  right:15%;
  input:checked + span:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
  }
`;
const ToggleInput = styled.input`
  opacity:0;
  width:0px;
  height:0px;
`
const ToggleSwitch = styled.span`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.textColor};
  position:absolute;
  cursor:pointer;
  transition: 0.4s;
  -webkit-transition: .4s;
  position:absolute;
  left:0px;
  right:0;
  top:0;
  bottom:0;
  border-radius: 34px;
  :before{
    position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 3px;
  top:3px;
  background-color: ${(props) => props.theme.textColor};
  -webkit-transition: 0.3s;
  transition: 0.3s;
  border-radius:50px;
  }
`;

const SearchForm = styled.form`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 15vh;
  left: 50%;
  transform: translate(-50%);
`

const SearchInput = styled.input`
  width: 394px;
  height: 40px;
  text-indent: 15px;
  border-radius: 20px;
  border-style: none;
  font-size: 20px;
  outline: none;
  position: relative;
`
const SearchButton = styled.button`
  width: 0;
  height: 0;
  opacity: 0;
`

function HeaderMain() {
    const  [holder, setHolder] = useState(true);
    const setterFn = useSetRecoilState(isDarkAtom);
    const setToDos = useSetRecoilState(CoinsInfo);
    const { register, handleSubmit } = useForm<ICoin>();
  const handleValid = () => {
    setToDos((oldToDos) => [{text: CoinsInfo, id: Date.now()}])
  }
    return (
        <>
        <Helmet>
            <title>Coin</title>
        </Helmet>
            <Header>
                <Title>Coin</Title>
                <SearchForm onSubmit={handleSubmit(handleValid)}>
                    <SearchInput
                        placeholder={holder ? "Search Your Coin!" : null}
                        {...register("serch", {
                            required: false,
                        })}
                        onFocus={() => {
                            setHolder()
                        }}
                        onBlur={() => {
                            setHolder("Write Your Coin!")
                        }}
                    />
                    <SearchButton />
                </SearchForm>
                <ToggleMode>
                    <ToggleInput type={"checkbox"} onClick={() => setterFn(prev => !prev)} />
                    <ToggleSwitch />
                </ToggleMode>
            </Header>
        </>
    )
}

export default HeaderMain;