import React from 'react';

import './CustomSelect.css';

const CustomSelect = ({ id, isError, errorMessage, title, value, onChangeHandle, options, isSmall = false,
                          isNoLabel = false }) => {
    return(
        <div className={`custom-select-container ${isSmall && 'custom-small-select-container'}`}>
            {!isNoLabel && <label className={'custom-select-label'}>
                {title}
            </label>}
            <select id={id} value={value} onChange={onChangeHandle} className={`custom-select ${ isSmall && 'custom-small-select' }`}>
                <option value="" disabled hidden>{title}</option>
                {options.map((option, index) => <option value={option} key={index}>{option}</option>)}
            </select>
            {isError && <p className={'custom-select-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomSelect;