const PDFDocument = require('pdfkit');
const fs = require('fs');
// const TreklamaLogoBlack = require('image/TreklamaLogoBlack.png');
const path = require('path')

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
        .strokeColor("#000000")
        .lineWidth(1)
        .moveTo(50, y)
        .lineTo(550, y)
        .stroke();
};

function generateCustomerInformation(doc, order) {
    doc
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .fillColor('#000000')
        .fontSize(12)
        .text('Išankstinė sąskaita', 50, 130,);
  
    generateHr(doc, 150);
  
    const customerInformationTop = 160;
  
    doc
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .fontSize(8)
        .text("Dokumento nr.:", 50, customerInformationTop)
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .text(`TR-IS-${order.uzsakymoNr}`, 150, customerInformationTop)
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .text("Dokumento data:", 50, customerInformationTop + 10)
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .text(formatDate(new Date()), 150, customerInformationTop + 10)
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .text("Užsakymo data:", 50, customerInformationTop + 20)
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .text(formatDate(order.createdAt), 150, customerInformationTop + 20)
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .text("Mokėjimo paskirtis:", 50, customerInformationTop + 30)
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .text(order.uzsakymoNr, 150, customerInformationTop + 30)
        .text('Pirkėjas', 300, customerInformationTop)
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .text(order.delivery.firstName + ' ' + order.delivery.lastName, 300, customerInformationTop + 10)
        .text(order.delivery.address + ', ' + order.delivery.zipcode + ', ' + order.delivery.city, 300, customerInformationTop + 20)
        
    if (order.delivery.juridinis) {
        doc
            .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
        .strokeColor("#000000")
        .lineWidth(20)
        .moveTo(50, tableTop)
        .lineTo(550, tableTop)
        .stroke();

    doc
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .fillColor('#F1FAEE')
        .fontSize(8)
        .text("Prekė", 55, tableTop - 5)
        .text("Kiekis", 355, tableTop - 5)
        .text("Kaina be PVM", 493, tableTop - 5)

    let cartItemsPos = tableTop + 15;

    for (const cartItem of order.cartItems) {
        doc
            .font(path.resolve('utils/fonts/gilroylight.OTF'))
            .fillColor('#000000')
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
                        .font(path.resolve('utils/fonts/gilroybold.OTF'))
                        .fillColor('#000000')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
                        .font(path.resolve('utils/fonts/gilroybold.OTF'))
                        .fillColor('#000000')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
                        .font(path.resolve('utils/fonts/gilroybold.OTF'))
                        .fillColor('#000000')
                        .fontSize(6)
                        .text(`${option.name}:`, 70, cartItemsPos)
                        .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
                .font(path.resolve('utils/fonts/gilroybold.OTF'))
                .fillColor('#000000')
                .fontSize(6)
                .text('Maketavimas:', 70, cartItemsPos)
                .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
        //         .font(path.resolve('utils/fonts/gilroybold.OTF'))
        //         .fillColor('#000000')
        //         .fontSize(6)
        //         .text('Pastaba:', 70, cartItemsPos)
        //         .font(path.resolve('utils/fonts/gilroylight.OTF'))
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
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .fillColor('#000000')
        .fontSize(8)
        .text('Suma:', 380, cartItemsPos, { lineBreak: false })
        .text(`${roundTwoDec(order.discountPrice / 1.21).toFixed(2)} €`, { align: 'right' })
        .text('PVM:', 380, cartItemsPos + 12, { lineBreak: false })
        .text(`${roundTwoDec((order.discountPrice  / 1.21) * 0.21).toFixed(2)} €`, { align: 'right' })
        .text('Pristatymas:', 380, cartItemsPos + 24, { lineBreak: false })
        .text('Nemokamas', { align: 'right' })
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
        .text('Viso:', 380, cartItemsPos + 36, { lineBreak: false })
        .text(`${roundTwoDec(order.discountPrice).toFixed(2)} €`, { align: 'right' })
    // console.log('ORDER DISKAUNTED PRAIS -> ', order.discountPrice);
};

const generateEarlyInvoice = (order) => {

    if (!fs.existsSync('./saskaitos')) {
        fs.mkdir('./saskaitos', (err) => {
            if (err) {
                return console.error(err);
            }
        });
    }

    const doc = new PDFDocument({size: 'A4', margin: 50});
    doc.pipe(fs.createWriteStream(`./saskaitos/Isankstine_saskaita_TR-IS-${order.uzsakymoNr}.pdf`));

    doc.image(path.resolve('utils/image/logoblack.png'), 50, 45, { width: 145 })
        .font(path.resolve('utils/fonts/gilroybold.OTF'))
		.fillColor('#000000')
		.fontSize(8)
		.text('UAB “TAURO PASLAUGOS”', 130, 45, { align: 'right' })
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
		.text('Daugėlių g. 79B, Kuršėnai, LT-81116 Šiaulių r.', { align: 'right' }) 
		.text('Įmonės kodas: 305328121', { align: 'right' }) 
        .text('PVM kodas: LT100012761116', { align: 'right' }) 
        .text('Banko sąskaita: LT737300010160772071', { align: 'right' }) 
        .moveDown()
        
    generateCustomerInformation(doc, order);
    generateCart(doc, order);

    generateHr(doc, doc.page.height - 80);

    doc
        .font(path.resolve('utils/fonts/gilroylight.OTF'))
        .text('Tai yra originali sąskaita faktūra, kurią galite atsispausdinti ir naudoti kaip buhalterinį dokumentą, atitinkantį visas apskaitos dokumentų išrašymo ir pripažinimo taisykles.', 
    50, doc.page.height - 70);

    doc.end();
    
    // console.log('/======== PDF =========/');
    // console.log(order);
    // console.log('/======== PDF =========/');
    return `${process.env.MAIN_URL}/saskaitos/Isankstine_saskaita_TR-IS-${order.uzsakymoNr}.pdf`;
};

module.exports = generateEarlyInvoice;