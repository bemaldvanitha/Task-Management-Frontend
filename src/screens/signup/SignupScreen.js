import React, { useState } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { message } from "antd";
import { useNavigate } from "react-router-dom";

import CustomInput from "../../components/common/input/CustomInput";
import CustomButton from "../../components/common/button/CustomButton";

import './SignupScreen.css';

const SignupScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        userName: ''
    });

    const [fieldError, setFieldError] = useState({
        isEmailError: false,
        isPasswordError: false,
        isUserNameError: false
    });

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

    const confirmPasswordChangeHandler = (e) => {
        handleChange('confirmPassword', e.target.value);
    }

    const userNameChangeHandler = (e) => {
        handleChange('userName', e.target.value);
    }

    const submitHandler = async () => {
        setFieldError({
            isEmailError: false,
            isPasswordError: false,
            isUserNameError: false
        });

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const emailValidity = emailRegex.test(formData.email);
        const passwordValidity = formData.password.trim().length >= 6 && formData.password ===
            formData.confirmPassword;
        const userNameValidity = formData.userName.trim().length >= 3;

        if(emailValidity && passwordValidity && userNameValidity){
            try{

            }catch (err){

            }
        }else {
            setFieldError({
                isEmailError: !emailValidity,
                isPasswordError: !passwordValidity,
                isUserNameError: !userNameValidity
            });
        }
    }

    const loginNavigateHandler = () => {
        navigate('/login');
    }

    if(false){
        return (
            <div className={'loading-container'}>
                <ColorRing visible={true} height="80" width="80" ariaLabel="color-ring-loading" wrapperStyle={{}}
                           wrapperClass="color-ring-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
            </div>
        )
    }else {
        return(
            <div className={'signup-screen'}>
                <div className={'signup-screen-container'}>
                    <p className={'signup-screen-title'}>Signup</p>
                    <p className={'signup-screen-description'}>Create an account!</p>
                    <CustomInput type={'email'} value={formData.email} id={'email'} title={'Enter Email'}
                                 isError={fieldError.isEmailError} errorMessage={'Enter valid email'}
                                 onChangeHandle={emailChangeHandler} placeholder={'Enter Email'}/>
                    <CustomInput type={'password'} value={formData.password} placeholder={'Enter Password'}
                                 onChangeHandle={passwordChangeHandler} errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isPasswordError} id={'password'} title={'Enter Password'}/>
                    <CustomInput type={'confirmPassword'} value={formData.confirmPassword} placeholder={'Enter Confirm Password'}
                                 onChangeHandle={confirmPasswordChangeHandler} errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isPasswordError} id={'confirmPassword'} title={'Enter Confirm Password'}/>
                    <CustomInput type={'text'} value={formData.userName} id={'userName'} title={'Enter User Name'}
                                 isError={fieldError.isUserNameError} errorMessage={'Enter valid username'}
                                 onChangeHandle={userNameChangeHandler} placeholder={'Enter User Name'}/>
                    <CustomButton title={'Signup!'} bgColor={'transparent'} fontColor={'#f0f0f0'} onClick={submitHandler}/>
                    <div className={'signup-screen-body-login-container'}>
                        <p className={'signup-screen-body-login-container-text'}>You already have an account!</p>
                        <p onClick={loginNavigateHandler} className={'signup-screen-body-login-container-text-link'}>Login!</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignupScreen;