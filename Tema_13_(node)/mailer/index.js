// Envío de EMAIL

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'juliangv11204@gmail.com', // Cuenta que se usa para el envío
      pass: 'KKJGEE'  // Poner password
    }
  });
  
  var mailOptions = {
    from: 'juliangv11204@gmail.com', // Correo remitente
    to: 'jgarvel076@g.educaand.es', // Correo destino
    subject: 'Enviando correo desde Node.js',
    html: '<h1>Hola desde Node.js</h1>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Correo enviado: ' + info.response);
    }
  });