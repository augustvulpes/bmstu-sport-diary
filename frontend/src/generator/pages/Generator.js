import React, { useEffect, useState } from 'react';

import createPdf from '../../utils/createPdf';

import Logo from '../components/Logo/Logo';
import TextInputs from '../components/Inputs/TextInputs/TextInputs';
import DateInputs from '../components/Inputs/DateInputs/DateInputs';
import Selects from '../components/Selects/Selects';
import Button from '../components/Button/Button';
import './Generator.css';

const Generator = props => {
    const [isValid, setIsValid] = useState(false);
    
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
            placeholder: 'Вес (кг)',
            value: '',
            isValid: false
        },
        height: {
            placeholder: 'Рост (см)',
            value: '',
            isValid: false
        },
        pulseMin: {
            placeholder: 'Пульс (до)',
            value: '',
            isValid: false,
            short: true
        },
        pulseMax: {
            placeholder: 'Пульс (после)',
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

    const [selectData, setSelectData] = useState({
        firstDay: {
            label: 'Первый день',
            options: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            currentValue: 'Понедельник'
        },
        secondDay: {
            label: 'Второй день',
            options: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            currentValue: 'Воскресенье'
        },
        wish: {
            label: 'Желание заниматься',
            options: ['Есть', 'Нет'],
            currentValue: 'Есть'
        },
        difficulty: {
            label: 'Сложность',
            options: ['Лёгкая', 'Средняя', 'Сложная'],
            currentValue: 'Лёгкая'
        }
    });

    useEffect(() => {
        let newIsValid = true;
        
        for (const input in textData) {
            newIsValid = textData[input].isValid && newIsValid;
        };

        for (const input in dateData) {
            newIsValid = dateData[input].isValid && newIsValid;
        };

        setIsValid(newIsValid);
    }, [textData, dateData]);

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
    };

    const changeSelectHandler = (event, selectName) => {
        const updatedSelectData = {
            ...selectData,
            [selectName]: {
                ...selectData[selectName],
                currentValue: event.target.value
            }
        };
        setSelectData(updatedSelectData);
    };

    const submitHandler = async event => {
        event.preventDefault();

        createPdf(textData, dateData, selectData);
    };

    return (
        <div className='generator'>
            <Logo />
            <form 
                onSubmit={submitHandler} 
                method='POST' 
                className='generator__form'>
                <TextInputs 
                    data={textData}
                    onChange={changeTextInputHandler} />
                <DateInputs
                    data={dateData}
                    onChange={changeDateInputHandler} />
                <Selects
                    data={selectData}
                    onChange={changeSelectHandler} />
                <Button 
                    type='submit'
                    disabled={!isValid}>Создать</Button>
            </form>
        </div>
    );
}

export default Generator;