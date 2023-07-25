const express = require('express')
const router = new express.Router();
const nodemailer = require('nodemailer')

router.post('/register', (req, res) => {
    const { formState, height, selectedFence, lengthValue, price, formattedDate } = req.body
    const { companyName, img, mainFeature, model, description } = selectedFence
    const { name, email } = formState;
    console.log(name, email)
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your fence estimate price",
            text: `Hi ${name},

            Thank you for estimating our ${companyName} ${model} ${height}mm height. As you selected, the indicative price for ${lengthValue} lineal meters is NZ$ ${price} plus GST. Please, be aware that this price is intended for estimation purposes only, and total project pricing will vary according to the final fence layout. Please, contact our team for an accurate and official quote at enquiries@boundaryline.co.nz.
            
            Estimate details:
            
            Customer: ${name}
            Date: ${formattedDate}
            Product: ${companyName} ${model} ${height}mm
            Required Length: ${lengthValue}m
            Total: NZ$ ${price} + GST
            Contact us from Monday to Friday, between 7 am and 5 pm, at 0800 003 006.
            
            We have an entire team ready to make your fencing easy.
            
            Kind Regards,
            
            `,
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                res.status(500).send('Error sending email');
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).send('Email sent successfully');
            }
        });
    } catch (error) {
        res.status(401).send(error);
    }
})

module.exports = router