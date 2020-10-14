import React from 'react';

import './Select.css';

const Select = props => {
    const options = props.options.map(option => {
        return (
            <option 
                value={option}
                key={option}>{option}</option>
        );
    });

    return (
        <select id={props.id}>
            {options}
        </select>
    );
}

export default Select;