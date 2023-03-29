const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
// const mime = require('mime-types')
const path = require('path');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(body.json());
app.use(cookie());

// mime.contentType('text/html');

/** user data */
const users = require('./static/jsonData/anns.json');

/** session identificators */
const ids = {};

app.post('/signup', (req, res) => {
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
        password, email, username, anns: [],
    };
    ids[id] = email;
    users[email] = user;

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(201).json({ id });
});

app.post('/login', (req, res) => {
    const { password, email } = req.body;
    if (!password || !email) {
        return res.status(400).json({ error: 'Не указан E-Mail или пароль' });
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({ error: 'Неверный E-Mail и/или пароль' });
    }

    const id = uuid();
    ids[id] = email;

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(200).json({ id });
});

app.post('/logout', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    if (!emailSession || !users[emailSession]) {
        return res.status(401).end();
    }

    res.clearCookie('appuniq');
    return res.end();
});

app.get('/board', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const result = Object
        .values(users)
        .filter(({ email }) => email !== emailSession)
        .map((user) => user.anns)
        .filter(Boolean);

    res.json(result.flat());
});

app.get('/me', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    if (!emailSession || !users[emailSession]) {
        return res.status(401).json({error: 'Пользователь не найден'});
    }

    const user = users[emailSession];
    return res.json({
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        anns: user.anns,
    });
});

app.get('/*', (_,res) => {
    res.sendFile(path.resolve("public/index.html"));
});

/** port to listen */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
