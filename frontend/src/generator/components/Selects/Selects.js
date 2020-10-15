import React from 'react';

import Select from './Select/Select';
import './Selects.css';

const Selects = props => {
    const selects = [];
    for (let key in props.data) {
        selects.push(
            <div className='generator__form-select' key={key}>
                <label htmlFor={key}>{props.data[key].label}</label>
                <Select
                    options={props.data[key].options}
                    id={key}
                    onChange={props.onChange} />
            </div>
        );
    };

    return (
        <div className='generator__form-selects'>
            {selects}
        </div>
    );
}

export default Selects;