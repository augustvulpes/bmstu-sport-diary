import React from 'react';

import './Input.css';

const Input = props => {
    const classes = `generator__input
     ${props.short ? ' generator__input-short' : ''}`
    
    switch (props.type) {
        case 'date':
            return <input
                        className={classes}
                        type='date'
                        onChange={props.onChange}
                        id={props.id} />
        default:
            return <input
                        className={classes}
                        type='text'
                        onChange={props.onChange}
                        placeholder={props.placeholder}
                        value={props.value} />
    };
}

export default Input;