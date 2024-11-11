import React from 'react';

import './CustomTextArea.css';

const CustomTextArea = ({ id, isError, errorMessage, title, value, onChangeHandle, placeholder }) => {
    return(
        <div className={'custom-text-area-container'}>
            <label className={'custom-text-area-label'}>
                {title}
            </label>
            <textarea id={id} value={value} onChange={onChangeHandle} placeholder={placeholder} className={'custom-text-area'}></textarea>
            {isError && <p className={'custom-text-area-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomTextArea;