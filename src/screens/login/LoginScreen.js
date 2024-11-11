import React, { useState } from 'react';
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/common/input/CustomInput";
import CustomButton from "../../components/common/button/CustomButton";
import LoadingSpinner from "../../components/common/loading/LoadingSpinner";
import { useLoginMutation } from "../../slicers/authApiSlice";

import './LoginScreen.css';

const LoginScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [fieldError, setFieldError] = useState({
        isEmailError: false,
        isPasswordError: false
    });

    const [login, { isLoading: loginIsLoading }] = useLoginMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const emailChangeHandler = (e) => {
        handleChange('email', e.target.value);
    }

    const passwordChangeHandler = (e) => {
        handleChange('password', e.target.value);
    }

    const submitHandler = async () => {
        setFieldError({
            isEmailError: false,
            isPasswordError: false
        });

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValidity = emailRegex.test(formData.email);
        const passwordValidity = formData.password.trim().length >= 6;

        if(emailValidity && passwordValidity){
            try{
                const body = {
                    email: formData.email,
                    password: formData.password
                }

                const res = await login(body).unwrap();
                message.success(res?.message || 'Login successfully !');

                await localStorage.setItem('token', res?.shortJwtToken);
                await localStorage.setItem('refreshToken', res?.longJwtToken);
                await localStorage.setItem('type', res?.type);

                navigate('/');
            }catch (err){
                console.log(err);
                message.error(err?.data?.message  || 'Authentication error !');
            }
        }else {
            setFieldError({
                isEmailError: !emailValidity,
                isPasswordError: !passwordValidity
            });
        }
    }

    const signupNavigateHandler = () => {
        navigate('/signup');
    }

    if(loginIsLoading){
        return (
            <LoadingSpinner/>
        )
    }else {
        return(
            <div className={'login-screen'}>
                <div className={'login-screen-container'}>
                    <p className={'login-screen-title'}>Login</p>
                    <p className={'login-screen-description'}>Welcome back!</p>
                    <CustomInput type={'email'} value={formData.email} id={'email'} title={'Enter Email'}
                                 isError={fieldError.isEmailError} errorMessage={'Enter valid email'}
                                 onChangeHandle={emailChangeHandler} placeholder={'Enter Email'}/>
                    <CustomInput type={'password'} value={formData.password} placeholder={'Enter Password'}
                                 onChangeHandle={passwordChangeHandler} errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isPasswordError} id={'password'} title={'Enter Password'}/>
                    <CustomButton title={'Login!'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={submitHandler}/>
                    <div className={'login-screen-body-signup-container'}>
                        <p className={'login-screen-body-signup-container-text'}>Create an account!</p>
                        <p onClick={signupNavigateHandler} className={'login-screen-body-signup-container-text-link'}>Signup!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginScreen;