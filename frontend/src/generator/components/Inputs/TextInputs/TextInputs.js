import React from 'react';

import Input from '../Input';
import './TextInputs.css';

const TextInputs = props => {
    const textInputs = [];
    for (let key in props.data) {
        textInputs.push(
            <Input 
                onChange={(event) => props.onChange(event, key)}
                placeholder={props.data[key].placeholder}
                value={props.data[key].value}
                short={props.data[key].short}
                key={key} />
        );
    };

    return (
        <div className='generator__form-textInputs'>
            {textInputs}
        </div>
    );
}

export default TextInputs;