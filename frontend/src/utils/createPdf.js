import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const createPdf = () => {
    // TO DO: style file and add logic
    const docDefinition = {
        content: [
            { text: 'Дневник самоподготовки', style: 'header', margin: [ 0, 0, 0, 50 ]},
            { text: 'Ф.И.О. — Шизов Шиз Шизович', style: 'text' },
            { text: 'Факультет и группа. — ШУЕ 11Б', style: 'text' },
            { text: 'Вес — 75 кг', style: 'text' },
            { text: 'Рост — 188 см', style: 'text' },
            { text: 'Дата рождения — 11.09.1337', style: 'text' },
            {
                layout: 'lightHorizontalLines', // optional
                table: {
                    headerRows: 2,
                    widths: [ '*', 'auto', 100, '*' ],
            
                    body: [
                    [ 'First', 'Second', 'Third', 'The last one' ],
                    [ 'Value 1', 'Value 2', 'Value 3', 'Value 4' ],
                    [ 'Bold value', 'Val 2', 'Val 3', 'Val 4' ]
                    ]
                }
            }
        ],
        styles: {
            header: {
              fontSize: 22,
              bold: true,
              alignment: 'center'
            },
            text: {
              italics: true,
              fontSize: 16
            }
        }
    };

    pdfMake.createPdf(docDefinition).download();
}

export default createPdf;