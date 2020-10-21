import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const getPulse = (min, max) => {
    return ((Math.random() * (max - min) + min) / 4).toFixed(0) * 4;
}

const getRandomElement = arr => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const warmups = [
    'Бег на месте (1 минута)\nКруговые движения головой, руками и корпусом\n"Мельница"\nВыпады (10 раз на ногу)'
];
const ends = [
    'Наклоны к носкам (10 раз)\nДыхательные упражнения (1 минута)\nБег с подъемом коленей (1 минута)\nРазведение рук и ног (30 секунд)'
];
const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
const time = ['17:00 - 17:30', '17:30 - 18:00', '18:00 - 18:30', '18:30 - 19:00', '19:00 - 19:30', '19:30 - 20:00'];

const createLines = (start, end, firstDay, secondDay, pulseMin, pulseMax, wish, difficulty) => {
    let first = new Date(start);
    let second = new Date(end);

    const firstDayInd = days.indexOf(firstDay);
    const secondDayInd = days.indexOf(secondDay);

    const lines = [];

    let workouts = [
        'Отжимания\n(5х3)\nПриседания\n(10х3)\nСкручивания\n(10х2)\nПланка\n(30 секунд)\n"Велосипед"\n(30 секунд)',
        '"Ножницы"\n(30 секунд, 2 раза)\nПриседания\n(10x2)\nСкручивания набок\n(10x2)\n"Джампин Джекс"\n(30 секунд)',
        '"Альпинист"\n(30 секунд)\nОтжимания\n(5х3)\nПриседания с прыжками\n(10x2)\nПодъёмы корпуса на пресс\n(10x2)',
        'Планка\n(30 секунд)\nБоковые выпады\n(10x2)\nСкручивания\n(10х2)\nПоднятие ног на пресс\n(5x3)'
    ];

    if (difficulty === 'Средняя') {
        workouts = [
            'Отжимания\n(10х3)\nПриседания\n(20х3)\nСкручивания\n(20х2)\nПланка\n(1 минута)\n"Велосипед"\n(45 секунд)',
            '"Ножницы"\n(45 секунд, 2 раза)\nПриседания\n(20x2)\nСкручивания набок\n(20x2)\n"Джампин Джекс"\n(45 секунд)',
            '"Альпинист"\n(45 секунд)\nОтжимания\n(10х3)\nПриседания с прыжками\n(15x2)\nПодъёмы корпуса на пресс\n(20x2)',
            'Планка\n(1 минута)\nБоковые выпады\n(20x2)\nСкручивания\n(20х2)\nПоднятие ног на пресс\n(10x3)'
        ];
    } else if (difficulty === 'Сложная') {
        workouts = [
            'Отжимания\n(15х3)\nПриседания\n(30х3)\nСкручивания\n(40х2)\nПланка\n(1.5 минуты)\n"Велосипед"\n(1 минута)',
            '"Ножницы"\n(1 минута, 2 раза)\nПриседания\n(30x2)\nСкручивания набок\n(30x2)\n"Джампин Джекс"\n(1 минута)',
            '"Альпинист"\n(1 минута)\nОтжимания\n(15х3)\nПриседания с прыжками\n(30x2)\nПодъёмы корпуса на пресс\n(30x2)',
            'Планка\n(1.5 минуты)\nБоковые выпады\n(30x2)\nСкручивания\n(40х2)\nПоднятие ног на пресс\n(15x3)'
        ];
    };

    const editedPulseMin = isNaN(+pulseMin) ? 80: +pulseMin;
    const editedPulseMax = isNaN(+pulseMax) ? 120: +pulseMax;

    let i = 0;
    while (first < second) {
        first = new Date(Date.parse(first) + 86400000)
        const currentDayInd = first.getDay()
        if (currentDayInd === firstDayInd || currentDayInd === secondDayInd) {
            lines.push([
                `${first.getDate()}/${first.getMonth() + 1}/${first.getFullYear()}\n${getRandomElement(time)}`,
                `Подготовительная часть\n${workouts[i % workouts.length]}\nЗаключительная часть`,
                `${getPulse(editedPulseMin - 5, editedPulseMin + 5)}/${getPulse(editedPulseMax - 5, editedPulseMax + 5)}`,
                'Хорошо',
                wish === 'Есть' ? '+' : '-'
            ]);
        };

        i += 1;
    };

    return lines;
}

const createPdf = (textData, dateData, selectData) => {
    const lines = createLines(
        dateData.startDate.value,
        dateData.endDate.value,
        selectData.firstDay.currentValue,
        selectData.secondDay.currentValue,
        textData.pulseMin.value,
        textData.pulseMax.value,
        selectData.wish.currentValue,
        selectData.difficulty.currentValue
    );
    
    const bDay = new Date(dateData.birthDate.value);
    const docDefinition = {
        content: [
            { text: 'Дневник самоподготовки', style: 'header'},
            { text: `Ф.И.О. — ${textData.owner.value}`, style: 'text' },
            { text: `Факультет и группа — ${textData.facultyAndGroup.value}`, style: 'text' },
            { text: `Вес — ${textData.weight.value} кг`, style: 'text' },
            { text: `Рост — ${textData.height.value} см`, style: 'text' },
            { text: `Дата рождения — ${bDay.getDate()}/${bDay.getMonth() + 1}/${bDay.getFullYear()}`, style: 'text' },
            { 
                text: `Подготовительная часть:\n${getRandomElement(warmups)}`, 
                style: 'text' 
            },
            { 
                text: `Заключительная часть:\n${getRandomElement(ends)}`, 
                style: 'text' 
            },
            {
                table: {
                    headerRows: 0,
                    widths: [ '*', 200, 50, '*', '*' ],
            
                    body: [
                    [ 'Дата, время', 'Содержание', 'Пульс', 'Самочувствие', 'Желание заниматься' ],
                    ...lines
                    ]
                }
            }
        ],
        styles: {
            header: {
              fontSize: 22,
              bold: true,
              alignment: 'center',
              margin: [ 0, 0, 0, 50]
            },
            text: {
              italics: true,
              fontSize: 15,
              margin: [ 0, 0, 0, 20]
            }
        }
    };

    pdfMake.createPdf(docDefinition).download();
}

export default createPdf;