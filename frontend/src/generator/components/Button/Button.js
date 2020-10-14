import React from 'react';

import './Button.css';

const Button = props => {
    return (
        <button 
            className='button'
            type={props.type ? props.type : 'button'}
            disabled={props.disabled}>
            {props.children}
        </button>
    );
}

export default Button;