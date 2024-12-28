import { use, useState } from "react";
import styled from 'styled-components'
import { useNavigation } from '../../context/NavigatorContext'
import axios from "axios";
import { toast } from "react-toastify";

function Join(){

    let navigate = useNavigation();

    const [formData, setFormData] = useState({
        email:'',
        nickname:'',
        pw:'',
        pwch:''
    });
    const [error, setError] = useState({})
    const [duplicate, setDuplicate] = useState({})
    const [disabled, setDisabled] = useState(true);
    const [duplCheck, setDuplCheck] = useState({
        email: '',
        nickname: ''
    })
    const [overlay, setOverlay] = useState(false)

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

    const toastError = (message) => {
        setOverlay(true);
        toast.error(
            <div>
                {message}
                <button
                    onClick={() => {
                        setOverlay(false);
                        toast.dismiss(); 
                    }}
                    className="toastCloseBtn"
                >
                    확인
                </button>
            </div>,
            {
                position: "top-center",
                autoClose: false,
                closeOnClick: false,
                closeButton: false, 
                style: {
                    marginTop: '369px',
                    paddingBottom: '55px',
                    width: '500px',
                    height: '140px',
                    display: 'flex',
                    flexDirection:'row',
                    justifyContent: 'center',
                    fontFamily: 'Paperlogy3',
                    color: 'black',
                    zIndex: '10',
                    position: 'absolute',
                    alignItems: 'center',
                }
            }
        );
    };    
    
    const handleForm = async (e) => {
        console.log("handleForm in")
        e.preventDefault();
        
        let newError = {};
        for (const [key, value] of Object.entries(formData)) {
            const fieldError = validation(key, value);
            if (Object.keys(fieldError).length > 0) {
                newError = { ...newError, ...fieldError };
            }
        }
        setError(newError);
        console.log(error)
    
        if (Object.keys(newError).length > 0) {
            console.log("newError 없음")
            return; 
        } else {
            console.log(newError.length)
        }


        //중복확인 진행여부 확인
        console.log("duplCheck.email : "+duplCheck.email);
        console.log("duplCheck.nickname : "+duplCheck.nickname);
        // let missingChecks = [];
        if (duplCheck.email==='' || duplCheck.nickname==='') {
            let missingChecks = [];
            if (duplCheck.email==='') missingChecks.push("이메일");
            if (duplCheck.nickname==='') missingChecks.push("닉네임");
        
            toastError(`${missingChecks}의 중복 확인을 진행해주세요.`)
            return;
        }
         
        if (!duplCheck.email || !duplCheck.nickname) {
            let missingChecks = [];
            if (!duplCheck.email) missingChecks.push("이메일");
            if (!duplCheck.nickname) missingChecks.push("닉네임");
        
            toastError(`${missingChecks}을 변경해주세요.`);
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8080/api/user/join', formData, {
                withCredentials: true,
            });
            console.log("회원가입 성공:", response.data);
            toast.success(
                <div>
                    회원가입을 축하합니다!
                </div>, 
                {
                    position:"top-center",
                    autoClose: 1500,
                    onClose:()=>{
                        navigate('/login')
                        //나중에 email login form 페이지로 바로 이동할 수 있도록!
                    },
                    style: {
                        marginTop: '369px',
                        width: '500px',
                        height: '140px',
                        display: 'flex',
                        flexDirection:'row',
                        justifyContent: 'center',
                        fontFamily: 'Paperlogy3',
                        color: 'black',
                        zIndex: '10',
                        position: 'absolute',
                        alignItems: 'center',
                        fontSize:'20px'
                    }
                }
            )
        } catch (err) {
            console.error("회원가입 실패:", err);
        }
    };    
        
    const handleChange = (e) => {
        const {name, value} = e.target;
        const updateFormData = {...formData, [name]:value};
        setFormData(updateFormData);
        
        const allFieldsFilled = Object.values(updateFormData).every(field=>field.trim()!=='');
        setDisabled(!allFieldsFilled)
        setError({...error,[name]:''})
        setDuplicate({...duplicate,[name]:''})

        if(name==='email') {
            setDuplCheck((prev) => ({ ...prev, email:'' }));
        } else if(name==='nickname') {
            setDuplCheck((prev) => ({ ...prev, nickname:'' }));
        }
    }
       
    const handleDuplication = async (type) => {
        const value = formData[type];
        if (value === '') {
            setDuplicate({ ...duplicate, [type]: `${type === 'email' ? '이메일' : '닉네임'}을 입력해주세요.` });
            return;
        }
    
        try {
            const message = await duplication(type, value);
            setDuplicate({ ...duplicate, [type]: message });
    
            if (message.includes('가능')) {
                setDuplCheck((prev) => ({ ...prev, [type]: true }));
            } else {
                setDuplCheck((prev) => ({ ...prev, [type]: false }));
            }
        } catch (error) {
            console.error("중복확인 실패:", error);
        }
    };
        
    const validation = (name, value) => {
        const newError = {};

        if (value=='') {
            newError[name] = `${name === 'pwch' ? '비밀번호 확인' : name === 'pw' ? '비밀번호' : name === 'email' ? '이메일' : '닉네임'}을 입력해주세요.`;
            return newError;
        }

        if (name === 'email') {
            if (!/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i.test(value)) {
                newError.email = "유효한 이메일을 입력해주세요.";
            }
        } else if(name==='nickname') {
            if(!/^[a-zA-Z0-9가-힣\s]+$/.test(value)){
                newError.nickname = "특수기호는 포함할 수 없습니다.";
            }
        } else if (name === 'pw') {
            if (value.length < 6) {
                newError.pw = "비밀번호는 최소 6자리여야 합니다.";
            }
        } else if (name === 'pwch') {
            if (value !== formData.pw) {
                newError.pwch = "비밀번호가 일치하지 않습니다.";
            }
        }

        return newError;
    }

    const duplication = async (type, value) => {
        console.log("duplication");
        const url = 'http://localhost:8080/api/user/find';
        return axios.get(url, {
            params: { type: type, value: value },
            withCredentials: true,
        })
        .then(res => {
            // console.log(res);
            if(res.data==="User found") {
                setDuplCheck((prev) => ({ ...prev, [type]: false }));
                console.log(duplCheck)
                return `${type === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 닉네임입니다.'}`;
            }
            setDuplCheck((prev) => ({ ...prev, [type]: true }));
            console.log(duplCheck)
            return `${type=== 'email' ? '사용 가능한 이메일입니다.' : '사용 가능한 닉네임입니다.'}`;
        })
        .catch(error => {
            console.log(error);
        });
    };
    

    return(
        <section className="JoinSection">
            {overlay && <div className="toast-overlay active"></div>}
            <section className="jsText">
                <p>회원가입</p>
                <p>TaskHIVE는 여러분의 할 일을 쉽게 관리할 수 있도록 도와드립니다!</p>
            </section>
            <section className="jsInput">
                <form onSubmit={handleForm}>
                    <label htmlFor="email">이메일</label>
                    <input 
                        type="email" 
                        name="email"
                        className="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <DuplicationBtn
                        type="button"
                        onClick={()=>handleDuplication("email")}
                    >중복확인</DuplicationBtn>
                    {error.email && <p className="error">{error.email}</p>}
                    {duplicate.email && <p className="error">{duplicate.email}</p>}

                    <label htmlFor="nickname">닉네임</label>
                    <input 
                        type="text" 
                        name="nickname"
                        className="nickname"
                        value={formData.nickname}
                        onChange={handleChange}  
                    />
                    <DuplicationBtn
                        type="button"
                        onClick={()=>handleDuplication("nickname")}
                    >중복확인</DuplicationBtn>
                    {error.nickname && <p className="error">{error.nickname}</p>}
                    {duplicate.nickname && <p className="error">{duplicate.nickname}</p>}

                    <label htmlFor="pw">비밀번호</label>
                    <input 
                        type="password" 
                        name="pw"
                        className="pw"
                        value={formData.pw}
                        onChange={handleChange}  
                    />
                    {error.pw && <p className="error">{error.pw}</p>}

                    <label htmlFor="pwch">비밀번호 확인</label>
                    <input 
                        type="password" 
                        name="pwch"
                        className="pwch"  
                        value={formData.pwch}
                        onChange={handleChange}
                    />
                    {error.pwch && <p className="error">{error.pwch}</p>}

                    <button className="joinBtn" type="submit">회원가입</button>
                </form>
            </section>
        </section>  
    )
}

export default Join;