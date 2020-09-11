// import { SMTPClient } from 'emailjs';
const SMTPClient = require('emailjs').SMTPClient
const client = new SMTPClient({
  user: 'xy1ovexy@sina.com',
  password: '38524e0a90c6afa3',
	host: 'smtp.sina.com',
  ssl: true,
  tls: false
});
// send the message and get a callback with an error or details of the message that was sent
client.send(
	{
		text: 'i hope this works',
		from: 'you <xy1ovexy@sina.com>',
		to: 'someone <329103586@qq.com>',
		cc: 'else <else@your-email.com>',
		subject: 'testing emailjs',
	},
	(err, message) => {
		console.log(err || message);
	}
);