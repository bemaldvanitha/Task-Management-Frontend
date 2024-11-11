import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { message } from "antd";

import CustomInput from "../../components/common/input/CustomInput";
import LoadingSpinner from "../../components/common/loading/LoadingSpinner";
import CustomButton from "../../components/common/button/CustomButton";
import { usePasswordResetMutation } from "../../slicers/authApiSlice";

import './ChangePasswordScreen.css';

const ChangePasswordScreen = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
    });

    const [fieldError, setFieldError] = useState({
        isOldPasswordValid: false,
        isNewPasswordValid: false
    });

    const [passwordReset, { isLoading: passwordResetIsLoading }] = usePasswordResetMutation();

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const oldPasswordChangeHandler = (e) => {
        handleChange('oldPassword', e.target.value);
    }

    const newPasswordChangeHandler = (e) => {
        handleChange('newPassword', e.target.value);
    }

    const reNewPasswordChangeHandler = (e) => {
        handleChange('reNewPassword', e.target.value);
    }

    const submitHandler = async () => {
        const oldPasswordValidity = formData.oldPassword.trim().length >= 6;
        const newPasswordValidity = formData.newPassword.trim().length >= 6 && formData.newPassword.trim()
            === formData.reNewPassword.trim();

        setFieldError({
            isOldPasswordValid: false,
            isNewPasswordValid: false
        })

        if(oldPasswordValidity && newPasswordValidity){
            try {
                const body = {
                    password: formData.newPassword,
                    oldPassword: formData.oldPassword
                }

                const res = await passwordReset(body).unwrap();
                message.success(res?.message || 'Password reset successfully !');
                navigate('/');
            }catch (err){
                console.log(err);
                message.error(err?.data?.message  || 'Password reset error !');
            }
        }else {
            setFieldError({
                isOldPasswordValid: !oldPasswordValidity,
                isNewPasswordValid: !newPasswordValidity
            })
        }
    }

    if(passwordResetIsLoading){
        return <LoadingSpinner/>
    }else {
        return(
            <div className={'change-password-screen'}>
                <div className={'change-password-screen-container'}>
                    <p className={'change-password-screen-title'}>Password Reset</p>
                    <CustomInput type={'password'} value={formData.oldPassword} placeholder={'Enter old password'}
                                 onChangeHandle={oldPasswordChangeHandler}
                                 errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isOldPasswordValid} id={'oldPassword'} title={'Enter Old Password'}/>
                    <CustomInput type={'password'} value={formData.newPassword} placeholder={'Enter new password'}
                                 onChangeHandle={newPasswordChangeHandler}
                                 errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isNewPasswordValid} id={'newPassword'} title={'Enter New Password'}/>
                    <CustomInput type={'password'} value={formData.reNewPassword} placeholder={'Re enter new password'}
                                 onChangeHandle={reNewPasswordChangeHandler}
                                 errorMessage={'Enter Valid Password (password must be more that 5 chars)'}
                                 isError={fieldError.isNewPasswordValid} id={'reNewPassword'}
                                 title={'Re Enter New Password'}/>
                    <CustomButton title={'Password Reset!'} bgColor={'transparent'} fontColor={'#f0f0f0'}
                                  onClick={submitHandler}/>
                </div>
            </div>
        )
    }
}

export default ChangePasswordScreen;