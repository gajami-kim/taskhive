import { useState } from 'react'
import styled from 'styled-components'
import { useNavigation } from '../../context/NavigatorContext'

function Login(){

    const navigate = useNavigation();

    let LoginBtn = styled.div`
        width: 70%;
        background: gainsboro;
        padding: 18px 10px;
        margin: 10px auto 10px;
        text-align: center;
        border-radius: 7px;
        font-family: 'Paperlogy3';

        &:hover{
            background: #fed22b;
            font-weight: bold;
        }
    `

    let [loginWay] = useState(['구글','카카오','네이버','이메일'])

    return(
        <>
        <section className="select_login" style={{marginTop:'370px'}}>
            {
                loginWay.map((a,i)=><LoginBtn className={loginWay[i]}>{loginWay[i]}로 로그인</LoginBtn>)
            }
        </section>
        <section className="join_find">
            <div>
                <span className="joinTag" onClick={()=>{navigate('/join')}}>회원가입</span>
                <span> / </span>
                <span className="findTag">아이디•비밀번호 찾기</span>
            </div>
        </section>
        </>
    )
}

export default Login