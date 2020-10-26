import React from 'react';

import './Input.css';

const Input = props => {
    const isSafari = navigator.userAgent.indexOf("Safari") !== -1;
    console.log(isSafari);
    const classes = `generator__input${props.short ? ' generator__input-short' : ''}`
    
    switch (props.type) {
        case 'date':
            return <input
                        className={classes}
                        type={isSafari ? 'text' : 'date'}
                        onChange={props.onChange}
                        id={props.id}
                        placeholder="месяц/день/год" />
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