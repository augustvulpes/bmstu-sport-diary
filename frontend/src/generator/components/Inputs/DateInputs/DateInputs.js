import React from 'react';

import Input from '../Input';
import './DateInputs.css';

const DateInputs = props => {
    const dateInputs = [];
    for (let key in props.data) {
        dateInputs.push(
            <div className='generator__form-dateInput' key={key}>
                <label htmlFor={key}>{props.data[key].label}</label>
                <Input 
                    type='date'
                    onChange={(event) => props.onChange(event, key)}
                    value={props.data[key].value}
                    id={key}
                    key={key} />
            </div>
        );
    };

    return (
        <div className='generator__form-dateInputs'>
            {dateInputs}
        </div>
    );
};

export default DateInputs;