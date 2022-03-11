import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import styled from 'styled-components';
import { authService } from "fbase";

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;
const LogInForm = styled.form`
    
`
const InputId = styled.input`
    
`
const InputPassword = styled.input`
    
`
const InputSubmit = styled.input`
    
`

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (evnet) => {
        const {
            target: { name, value }
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <>
        <Container>
            <LogInForm onSubmit={onSubmit} />
            <InputId name="email" type="text" required value={email} onChange={onChange} />
            <InputPassword name="password" type="password" required value={password} onChange={onChange} />
            <InputSubmit type="submit" value={newAccount ? "Sign In" : "Create Account"} />
        </Container>
        </>
    )
}
export default Auth;