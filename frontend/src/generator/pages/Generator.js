import React, { useState } from 'react';

import Logo from '../components/Logo/Logo';
import './Generator.css';
import TextInputs from '../components/Inputs/TextInputs/TextInputs';
import DateInputs from '../components/Inputs/DateInputs/DateInputs';
import Selects from '../components/Selects/Selects';

const Generator = props => {
    const [textData, setTextData] = useState({
        owner: {
            placeholder: 'Ф.И.О.',
            value: '',
            isValid: false
        },
        facultyAndGroup: {
            placeholder: 'Факультет и группа',
            value: '',
            isValid: false
        },
        weight: {
            placeholder: 'Вес',
            value: '',
            isValid: false
        },
        height: {
            placeholder: 'Рост',
            value: '',
            isValid: false
        },
        pulseMin: {
            placeholder: 'Пульс (min)',
            value: '',
            isValid: false,
            short: true
        },
        pulseMax: {
            placeholder: 'Пульс (max)',
            value: '',
            isValid: false,
            short: true
        }
    });

    const [dateData, setDateData] = useState({
        birthDate: {
            label: 'Дата рождения',
            value: '',
            isValid: false
        },
        startDate: {
            label: 'Начало занятий',
            value: '',
            isValid: false
        },
        endDate: {
            label: 'Конец занятий',
            value: '',
            isValid: false
        }
    });

    const [selectData] = useState({
        firstDay: {
            label: 'Первый день',
            options: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
        },
        secondDay: {
            label: 'Второй день',
            options: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье']
        },
        wish: {
            label: 'Желание заниматься',
            options: ['Есть', 'Нет']
        },
        difficulty: {
            label: 'Сложность',
            options: ['Лёгкая', 'Средняя', 'Сложная']
        }
    });

    const changeTextInputHandler = (event, inputName) => {
        const isValid = !!event.target.value;
        
        const updatedTextData = {
            ...textData,
            [inputName]: {
                ...textData[inputName],
                value: event.target.value,
                isValid: isValid
            }
        };
        setTextData(updatedTextData);
    };

    const changeDateInputHandler = (event, inputName) => {
        const isValid = !!event.target.value;
        
        const updatedDateData = {
            ...dateData,
            [inputName]: {
                ...dateData[inputName],
                value: event.target.value,
                isValid: isValid
            }
        };
        setDateData(updatedDateData);
    }

    return (
        <div className='generator'>
            <Logo />
            <form className='generator__form'>
                <TextInputs 
                    data={textData}
                    onChange={changeTextInputHandler} />
                <DateInputs
                    data={dateData}
                    onChange={changeDateInputHandler} />
                <Selects
                    data={selectData} />
            </form>
        </div>
    );
}

export default Generator;