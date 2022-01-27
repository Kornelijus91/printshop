const PDFDocument = require('pdfkit');
const fs = require('fs');

function formatDate(date) {
    const day = ('0' + new Date(date).getDate()).slice(-2);
    const month = ('0' + (new Date(date).getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
  
    return year + "-" + month + "-" + day;
};

const shouldShow = (option, summon) => {
    let showarray = [];
    for (const item of option) {
        
        if (!showarray.includes(item.summonID)) {
            showarray.push(item.summonID)
        }
    }
    if (summon === 0 || summon === null) {
        return true;
    } else {
        if (showarray.includes(summon)) {
            return true;
        } else {
            return false;
        }
    } 
};

const roundTwoDec = (num) => { 
    const result = Math.round(Number((Math.abs(num) * 100).toPrecision(15))) / 100 * Math.sign(num);
    return result;
};

function generateHr(doc, y) {
    doc
        .strokeColor("#1D3557")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
};

function generateCustomerInformation(doc, order) {
    doc
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .fillColor('#1D3557')
        .fontSize(12)
        .text('PVM sąskaita faktūra', 50, 130,);
  
    generateHr(doc, 150);
  
    const customerInformationTop = 160;
  
    doc
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .fontSize(8)
        .text("Dokumento nr.:", 50, customerInformationTop)
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .text(`TR-PSF-${order.uzsakymoNr}`, 150, customerInformationTop)
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .text("Dokumento data:", 50, customerInformationTop + 10)
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .text(formatDate(new Date()), 150, customerInformationTop + 10)
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .text("Užsakymo nr:", 50, customerInformationTop + 20)
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .text(order.uzsakymoNr, 150, customerInformationTop + 20)
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .text("Apmokėjimo būdas:", 50, customerInformationTop + 30)
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .text(
            order.payment === 'cash' ? 
            'Grynais pinigais pristatymo metu.' : 
            order.payment === 'hanza' ?  
            'AB bankas "Swedbank"' :
            order.payment === 'vb2' ? 
            'AB SEB bankas' : 
            order.payment === 'lt_revolut' ? 
            'Revolut' :
            order.payment === 'nord' ? 
            'AS Luminor bankas' :
            order.payment === 'mb' ? 
            'UAB Medicinos bankas' : 
            order.payment === 'lku' ? 
            'Lietuvos kredito unijos' :
            order.payment === 'lt_n26' ? 
            'N26' :
            order.payment === 'sb' ? 
            'AB Šiaulių bankas' : 
            order.payment === 'parex' ? 
            'AS Citadele bankas' : 
            order.payment === 'wallet' ? 
            'Paysera sąskaita' : 
            order.payment === 'card' ? 
            'Mokėjimo kortelė' : ''
        , 150, customerInformationTop + 30)
        .text('Pirkėjas', 300, customerInformationTop)
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .text(order.delivery.firstName + ' ' + order.delivery.lastName, 300, customerInformationTop + 10)
        .text(order.delivery.address + ', ' + order.delivery.zipcode + ', ' + order.delivery.city, 300, customerInformationTop + 20)
        
    if (order.delivery.juridinis) {
        doc
            .font('./server/utils/fonts/Quicksand-Regular.ttf')
            .fontSize(8)
            .text("Įmonės pavadinimas:", 300, customerInformationTop + 30)
            .text(order.delivery.companyName, 380, customerInformationTop + 30)
            .text("Įmonės adresas:", 300, customerInformationTop + 40)
            .text(order.delivery.companyAddress, 363, customerInformationTop + 40)
            .text("Įmonės kodas:", 300, customerInformationTop + 50)
            .text(order.delivery.companyCode, 355, customerInformationTop + 50)
            .text("Įmonės PVM kodas:", 300, customerInformationTop + 60)
            .text(order.delivery.companyPVM, 373, customerInformationTop + 60)
        
        generateHr(doc, 240);
    } else {
        generateHr(doc, 210);
    }
};

function generateCart(doc, order) {

    let tableTop = 240;

    if (order.delivery.juridinis) {
        tableTop = 270;
    }

    doc
        .strokeColor("#1D3557")
        .lineWidth(20)
        .moveTo(50, tableTop)
        .lineTo(550, tableTop)
        .stroke();

    doc
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .fillColor('#F1FAEE')
        .fontSize(8)
        .text("Prekė", 55, tableTop - 5)
        .text("Kiekis", 355, tableTop - 5)
        .text("Kaina be PVM", 493, tableTop - 5)

    let cartItemsPos = tableTop + 15;

    for (const cartItem of order.cartItems) {
        doc
            .font('./server/utils/fonts/Quicksand-Regular.ttf')
            .fillColor('#1D3557')
            .fontSize(8)
            .text(cartItem.name, 55, cartItemsPos)
            .text(cartItem.quantity, 355, cartItemsPos, { lineBreak: false })
            .text(`${roundTwoDec(cartItem.discountedPrice / 1.21).toFixed(2)} €`, { align: 'right' })

        // cartItemsPos = cartItemsPos + 8;
        if (cartItemsPos + 12 >= doc.page.height - 80) {
            doc.addPage();
            cartItemsPos = 50;
        } else {
            cartItemsPos = cartItemsPos + 12;
        }  
        // console.log(cartItem);
        for (const option of cartItem.options) {
            // console.log(option);
            // console.log(shouldShow(cartItem.options, option.summon));
            if (shouldShow(cartItem.options, option.summon)) {
                if (option.type === 0 || option.type === 2) {
                    doc
                        .font('./server/utils/fonts/Quicksand-Bold.ttf')
                        .fillColor('#1D3557')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font('./server/utils/fonts/Quicksand-Regular.ttf')
                        .text(option.value, 170, cartItemsPos)

                    // cartItemsPos = cartItemsPos + 8;
                    if (cartItemsPos + 8 >= doc.page.height - 80) {
                        doc.addPage();
                        cartItemsPos = 50;
                    } else {
                        cartItemsPos = cartItemsPos + 8;
                    }  
                } else if (option.type === 1) {
                    doc
                        .font('./server/utils/fonts/Quicksand-Bold.ttf')
                        .fillColor('#1D3557')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font('./server/utils/fonts/Quicksand-Regular.ttf')
                        .text(`${option.firstName}: ${option.firstValue}, ${option.secondName}: ${option.secondValue}`, 170, cartItemsPos)

                    // cartItemsPos = cartItemsPos + 8;
                    if (cartItemsPos + 8 >= doc.page.height - 80) {
                        doc.addPage();
                        cartItemsPos = 50;
                    } else {
                        cartItemsPos = cartItemsPos + 8;
                    }  
                }  else if (option.type === 3) {
                    doc
                        .font('./server/utils/fonts/Quicksand-Bold.ttf')
                        .fillColor('#1D3557')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font('./server/utils/fonts/Quicksand-Regular.ttf')
                        .text(`${option.firstValue}`, 170, cartItemsPos)

                    // cartItemsPos = cartItemsPos + 8;
                    if (cartItemsPos + 8 >= doc.page.height - 80) {
                        doc.addPage();
                        cartItemsPos = 50;
                    } else {
                        cartItemsPos = cartItemsPos + 8;
                    }  
                }
            }
        }
        if (cartItem.maketavimoKaina > 0) {
            doc
                .font('./server/utils/fonts/Quicksand-Bold.ttf')
                .fillColor('#1D3557')
                .fontSize(6)
                .text('Maketavimas:', 70, cartItemsPos)
                .font('./server/utils/fonts/Quicksand-Regular.ttf')
                .text('Taip', 170, cartItemsPos)

            // cartItemsPos = cartItemsPos + 8;
            if (cartItemsPos + 8 >= doc.page.height - 80) {
                doc.addPage();
                cartItemsPos = 50;
            } else {
                cartItemsPos = cartItemsPos + 8;
            }  
        }
        // if (cartItem.pastaba !== '') {
        //     doc
        //         .font('./server/utils/fonts/Quicksand-Bold.ttf')
        //         .fillColor('#1D3557')
        //         .fontSize(6)
        //         .text('Pastaba:', 70, cartItemsPos)
        //         .font('./server/utils/fonts/Quicksand-Regular.ttf')
        //         .text(cartItem.pastaba, 170, cartItemsPos)

        //     cartItemsPos = cartItemsPos + 8;
        // }

        // cartItemsPos = cartItemsPos + 10;
        if (cartItemsPos + 10 >= doc.page.height - 80) {
            doc.addPage();
            cartItemsPos = 50;
        } else {
            cartItemsPos = cartItemsPos + 10;
        }  
    }

    generateHr(doc, cartItemsPos);

    // cartItemsPos = cartItemsPos + 10;
    if (cartItemsPos + 10 >= doc.page.height - 80) {
        doc.addPage();
        cartItemsPos = 50;
    } else {
        cartItemsPos = cartItemsPos + 10;
    }  

    doc
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .fillColor('#1D3557')
        .fontSize(8)
        .text('Kaina be PVM:', 380, cartItemsPos, { lineBreak: false })
        .text(`${roundTwoDec(order.discountPrice / 1.21).toFixed(2)} €`, { align: 'right' })
        .text('PVM:', 380, cartItemsPos + 12, { lineBreak: false })
        .text(`${roundTwoDec((order.discountPrice / 1.21) * 0.21).toFixed(2)} €`, { align: 'right' })
        .text('Pristatymas:', 380, cartItemsPos + 24, { lineBreak: false })
        .text('Nemokamas', { align: 'right' })
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
        .text('Viso:', 380, cartItemsPos + 36, { lineBreak: false })
        .text(`${roundTwoDec(order.discountPrice).toFixed(2)} €`, { align: 'right' })
    // console.log('ORDER DISKAUNTED PRAIS -> ', order.discountPrice);
};

const generatePVMInvoice = (order) => {

    if (!fs.existsSync('./saskaitos')) {
        fs.mkdir('./saskaitos', (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }

    const doc = new PDFDocument({size: 'A4', margin: 50});
    doc.pipe(fs.createWriteStream(`./saskaitos/PVM sąskaita faktūra TR-PSF-${order.uzsakymoNr}.pdf`));

    doc.image('./printshop/server/image/TreklamaLogoBlack.png', 50, 45, { width: 145 })
        .font('./server/utils/fonts/Quicksand-Bold.ttf')
		.fillColor('#1D3557')
		.fontSize(8)
		.text('UAB “TAURO PASLAUGOS”', 130, 45, { align: 'right' })
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
		.text('Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r.', { align: 'right' }) 
		.text('Įmonės kodas: 305328121', { align: 'right' }) 
        .text('PVM kodas: LT100012761116', { align: 'right' }) 
        .text('Banko sąskaita: LT737300010160772071', { align: 'right' }) 
        .moveDown()
        
    generateCustomerInformation(doc, order);
    generateCart(doc, order);

    generateHr(doc, doc.page.height - 80);

    doc
        .font('./server/utils/fonts/Quicksand-Regular.ttf')
        .text('Tai yra originali sąskaita faktūra, kurią galite atsispausdinti ir naudoti kaip buhalterinį dokumentą, atitinkantį visas apskaitos dokumentų išrašymo ir pripažinimo taisykles.', 
    50, doc.page.height - 70);

    doc.end();
    
    // console.log('/======== PDF =========/');
    // console.log(order);
    // console.log('/======== PDF =========/');
    return `${process.env.MAIN_URL}/saskaitos/PVM sąskaita faktūra TR-PSF-${order.uzsakymoNr}.pdf`;
};

module.exports = generatePVMInvoice;