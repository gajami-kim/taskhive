import { use, useState } from "react";
import styled from 'styled-components'
import { useNavigation } from '../../context/NavigatorContext'
import axios from "axios";

function Join(){

    let navigate = useNavigation();

    const [formData, setFormData] = useState({
        email:'',
        nickname:'',
        pw:'',
        pwch:''
    });
    const [error, setError] = useState({})
    const [disabled, setDisabled] = useState(true);

    let DuplicationBtn = styled.button
    `
        position: absolute;
        font-family: 'Paperlogy3';
        transform: translate(-77px, 11px);
        padding: 10px;
        border-radius: 26px;
        border: 1px solid gainsboro;
        outline: none;
        background: #e5e5e5;
        color: #353535;
    `;

    return(
        <section className="JoinSection">
            <section className="jsText">
                <p>회원가입</p>
                <p>TaskHIVE는 여러분의 할 일을 쉽게 관리할 수 있도록 도와드립니다!</p>
            </section>
            <section className="jsInput">
                <form>
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="email" 
                        name="email"
                        className="email"  
                    />
                    <DuplicationBtn>중복확인</DuplicationBtn>

                    <label htmlFor="nickname">닉네임</label>
                    <input 
                        type="text" 
                        name="nickname"
                        className="nickname"  
                    />
                    <DuplicationBtn>중복확인</DuplicationBtn>

                    <label htmlFor="pw">비밀번호</label>
                    <input 
                        type="password" 
                        name="pw"
                        className="pw"  
                    />
                    
                    <label htmlFor="pwch">비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="pwch"
                        className="pwch"  
                    />
                </form>
            </section>
        </section>  
    )
}

export default Join;