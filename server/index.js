'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const app = express();

const users = {
    "az.bilalov@mail.ru": {
        username: "Азат Билалов",
        email: "az.bilalov@mail.ru",
        password: "1234",
        avatar: "/ava1.jpeg",
        anns: [
            {src: "/ann1.jpeg", category: "В быту", title: "Тележка", desc: "Удобная тележка", price: "500", address: "Москва, ул. Лобавческого 88"},
            {src: "/ann2.jpeg", category: "Электрокина", title: "Планшет", desc: "Удобный планшет", price: "15000", address: "Москва, ул. Лобавческого 88"},
        ]
    },
    "test@mail.ru": {
        username: "Тестер",
        email: 'test@mail.ru',
        password: '000',
    },
}

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(body.json());
app.use(cookie());

const ids = {};

app.post('/signup', (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	const username = req.body.username;
	if (!username || !username.match(/^\S{4,}$/)) {
		return res.status(400).json({error: 'Имя пользователя не менее 4 символов', error_fill: 'username'});
	}
    if (!password || !password.match(/^\S{4,}$/)) {
        return res.status(400).json({error: 'Минимальная длина пароля 4 символа', error_fill: 'password'});
    }
    if (!email || !username.match(/^\S{4,}$/)) {
        return res.status(400).json({error: 'Невалидные данные пользователя', error_fill: 'email'});
    }
	if (users[email]) {
		return res.status(400).json({error: 'Пользователь уже существует', error_fill: 'username'});
	}

	const id = uuid();
	const user = {password, email, username, anns: []};
	ids[id] = email;
	users[email] = user;

	res.cookie('appuniq', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(201).json({id});
});

app.post('/login',  (req, res) => {
	const password = req.body.password;
	const email = req.body.email;
	if (!password || !email) {
		return res.status(400).json({error: 'Не указан E-Mail или пароль'});
	}
	if (!users[email] || users[email].password !== password) {
		return res.status(400).json({error: 'Неверный E-Mail и/или пароль'});
	}

	const id = uuid();
	ids[id] = email;

	res.cookie("appuniq", id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
	res.status(200).json({id});
});

app.post('/logout',  (req, res) => {
	const id = req.cookies['appuniq'];
	const emailSession = ids[id];

    if (!emailSession || !users[emailSession]) {
		return res.status(401).end();
	}

    res.clearCookie("appuniq");
	res.end();
});

app.get('/board', (req, res) => {
	const id = req.cookies['appuniq'];
	const emailSession = ids[id];

	const result = Object
		.values(users)
		.filter(({email}) => email !== emailSession)
		.map(user => user.anns)
		.filter(Boolean);

	res.json(result.flat());
});

app.get('/me', (req, res) => {
    const id = req.cookies['appuniq'];
	const emailSession = ids[id];

    if (!emailSession || !users[emailSession]) {
		return res.status(401).end();
	}

    const user = users[emailSession];
    res.json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        anns: user.anns,
    });
})

const port = process.env.PORT || 8080;

app.listen(port, function () {
	console.log(`Server listening port ${port}`);
});