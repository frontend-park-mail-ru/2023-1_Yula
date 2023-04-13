const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
const path = require('path');
const fs = require('fs');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(body.json());
app.use(cookie());

const users = require('./static/jsonData/users.json');
const anns = require('./static/jsonData/anns.json');

/** session identificators */
const ids = {};

app.post('/api/signup', (req, res) => {
    const { password, email, username } = req.body;
    if (!username || username.length < 4) {
        return res.status(400).json({ error: 'Имя пользователя не менее 4 символов', errorFill: 'username' });
    }
    if (!password || !password.match(/^\S{4,}$/)) {
        return res.status(400).json({ error: 'Минимальная длина пароля 4 символа', errorFill: 'password' });
    }
    if (!email) {
        return res.status(400).json({ error: 'Невалидные данные пользователя', errorFill: 'email' });
    }
    if (users[email]) {
        return res.status(400).json({ error: 'Пользователь уже существует', errorFill: 'username' });
    }

    const id = uuid();
    const user = {
        password, email, username, anns: [], avatar: '/default.jpg',
    };

    ids[id] = email;
    users.push(user);

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(201).json({ id });
});

app.post('/api/login', (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }

    const user = users.find((user) => user.email === email);
    if (!user || user.password !== password) {
        return res.status(400).json({ error: 'Неверный E-Mail и/или пароль' });
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(200).json({ id });
});

app.post('/api/logout', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).end();
    }

    res.clearCookie('appuniq');
    return res.end();
});

app.get('/api/board', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.json(anns);
    } else {
        const result = anns.filter((_, i) => user.anns.includes(i));
        return res.json(result);
    }
});

app.get('/api/board/:id', (req, res) => {
    const annId = req.params.id;
    res.json(anns[annId]);
});

app.get('/api/bucket', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({error: 'Пользователь не найден'});
    } else {
        const result = anns.filter((_, i) => user.purchs.includes(i));
        return res.json(result);
    }
})

app.get('/api/me', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({error: 'Пользователь не найден'});
    }

    return res.json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        anns: user.anns,
        phone: user.phone,
    });
});

app.get('/api/me/anns', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({error: 'Пользователь не найден'});
    }

    const result = anns.filter((_, i) => user.anns.includes(i));
    return res.json(result);
});

app.get('/api/me/purchs', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({error: 'Пользователь не найден'});
    }

    const result = anns.filter((_, i) => user.purchs.includes(i));
    return res.json(result);
});

/** port to listen */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
