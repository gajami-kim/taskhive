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
    

    const [error, setError] = useState({})
    const [disabled, setDisabled] = useState(true);

    const handleForm = async(e)=>{
        e.preventDefault();

        const validationError = validation();
        if(Object.keys(validationError).length>0) {
            setError(validationError);
            return;
        }

        try{
            const response = await fetch('http://localhost:8080/api/user/join',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            if(response.ok) {
                alert('회원가입이 완료되었습니다!');
                setFormData({email:'', nickname:'', pw:'', pwch:''})
                setDisabled(true)
                // navigate('/')
            } else {
                const errorData = await response.json();
                console.log(`회원가입 실패: ${errorData.message}`)
            }
        } catch(error) {
            console.log(`서버오류 : ${error.message}`)
        }
    }

    const handleChange = (e) =>{
        const {name, value} = e.target;
        const updatedFormData = {...formData, [name]:value};
        setFormData(updatedFormData);

        const allFieldsFilled = Object.values(updatedFormData).every(field => field.trim() !== '');
        setDisabled(!allFieldsFilled);

        setError({...error,[name]:''});
    }
    
    const validation = () => {
        const newError = {};

        if(!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(formData.email)){
            newError.email = "유효한 이메일을 입력해주세요.";
        }

        if(!formData.nickname) {
            newError.nickname = "닉네임을 입력해주세요."
        }

        if (formData.pw.length < 6) {
            newError.pw = '비밀번호는 최소 6자리여야 합니다.';
        }

        if (formData.pw !== formData.pwch) {
            newError.pwch = '비밀번호가 일치하지 않습니다.';
        }

        return newError;
    }


    // const validation = (name, value) => {
    //     const newError = {};

    //     if (value=='') {
    //         newError[name] = `${name === 'pwch' ? '비밀번호 확인' : name === 'pw' ? '비밀번호' : name === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`;
    //         return newError;
    //     }

    //     if (name === 'email') {
    //         if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(value)) {
    //             newError.email = "유효한 이메일을 입력해주세요.";
    //         }
    //     } else if (name === 'pw') {
    //         if (value.length < 6) {
    //             newError.pw = "비밀번호는 최소 6자리여야 합니다.";
    //         }
    //     } else if (name === 'pwch') {
    //         if (value !== formData.pw) {
    //             newError.pwch = "비밀번호가 일치하지 않습니다.";
    //         }
    //     }

    //     return newError;
    // }

    const duplication = async (type, value) => {
        console.log("duplication");
        const url = 'http://localhost:8080/api/user/find';
        return axios.get(url, {
            params: { type: type, email: value },
            withCredentials: true,
        })
        .then(res => {
            // console.log(res);
            if(res.data==="User found") {
                console.log("유저 있음")
            } else if(res.data==="User not found") {
                console.log("가입가능")
            }
        })
        .catch(error => {
            console.log(error);
        });
    };
    

    return(
        <section className="JoinSection">
            <section className="jsText">
                <p>회원가입</p>
                <p>TaskHIVE는 여러분의 할 일을 쉽게 관리할 수 있도록 도와드립니다!</p>
            </section>
            <section className="jsInput">
                <form onSubmit={handleForm}>
                    <div>
                        <input 
                            className={`emailInput ${error.email && "joinError" ? 'joinError' : ''}`}
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="이메일을 입력해주세요."
                        />
                        <DuplicationBtn onClick={()=>{duplication('email',formData.email)}}>중복확인</DuplicationBtn>
                        {error.email && <p className="error">{error.email}</p>}
                        <input 
                            className={`nickInput ${error.nickname && "joinError" ? 'joinError' : ''}`}
                            type="text"
                            name="nickname"
                            value={formData.nickname}
                            onChange={handleChange}
                            placeholder="닉네임을 입력해주세요."
                        />
                        <DuplicationBtn onClick={()=>{duplication('nickname',formData.nickname)}}>중복확인</DuplicationBtn>
                        {error.nickname && <p className="error">{error.nickname}</p>}
                        <input 
                            className={`pwInput ${error.pw && "joinError" ? 'joinError' : ''}`}
                            type="password"
                            name="pw"
                            value={formData.pw}
                            onChange={handleChange}
                            placeholder="비밀번호를 입력해주세요."
                        />
                        {error.pw && <p className="error">{error.pw}</p>}
                        <input 
                            className={`pwchInput ${error.pwch && "joinError" ? 'joinError' : ''}`}
                            type="password"
                            name="pwch"
                            value={formData.pwch}
                            onChange={handleChange}
                            placeholder="비밀번호를 한번 더 입력해주세요."
                        />
                        {error.pwch && <p className="error">{error.pwch}</p>}
                        <button className="joinBtn" type="submit" disabled={disabled}>회원가입</button>
                    </div>
                </form>
            </section>
        </section>  
    )
}

export default Join;