import React from 'react';

import './CustomInput.css';

const CustomInput = ({ id, isError, errorMessage, title, value, onChangeHandle, placeholder, type,
                         isSmall = false, isNoLabel = false }) => {
    return(
        <div className={`custom-input-container ${isSmall && 'custom-small-input-container'}`}>
            {!isNoLabel && <label className={'custom-input-label'}>
                {title}
            </label>}
            <input id={id} value={value} onChange={onChangeHandle} placeholder={placeholder} type={type}
                   className={`custom-input ${isSmall && 'custom-small-input'}`}/>
            {isError && <p className={'custom-input-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomInput;