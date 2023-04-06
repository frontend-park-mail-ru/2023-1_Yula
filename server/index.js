const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid').v4;
// const mime = require('mime-types')
const path = require('path');
const fs = require('fs');

const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'dist')));
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(body.json());
app.use(cookie());

// mime.contentType('text/html');

/** user data */
const users = require('./static/jsonData/anns.json');

/** base64 user avatars */
Object.values(users).map(user => {
    if (user.avatar) {
        const imagePath = path.join(__dirname, 'static', 'images', user.avatar);
        const imageBuffer = fs.readFileSync(imagePath);
        user.avatar = Buffer.from(imageBuffer).toString('base64');
    }

    return user.avatar;
}).filter(Boolean);

/** base64 ann images */
Object.values(users).map(user => {
    if (user.anns) {
        user.anns.map(ann => {
            const imagePath = path.join(__dirname, 'static', 'images', ann.src);
            const imageBuffer = fs.readFileSync(imagePath);
            ann.img = Buffer.from(imageBuffer).toString('base64');
        });
    }
    
    return user.anns;
}).filter(Boolean);

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
        password, email, username, anns: [], avatar: '/ava.jpg',
    };
    const imagePath = path.join(__dirname, 'static', 'images', user.avatar);
    const imageBuffer = fs.readFileSync(imagePath);
    user.avatar = Buffer.from(imageBuffer).toString('base64');

    ids[id] = email;
    users[email] = user;

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(201).json({ id });
});

app.post('/api/login', (req, res) => {
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

app.post('/api/logout', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    if (!emailSession || !users[emailSession]) {
        return res.status(401).end();
    }

    res.clearCookie('appuniq');
    return res.end();
});

app.get('/api/board', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const result = Object
        .values(users)
        .filter(({ email }) => email !== emailSession)
        .map((user) => user.anns)
        .filter(Boolean);

    res.json(result.flat());
});

app.get('/api/me', (req, res) => {
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

// app.get('/*', (_,res) => {
//     res.sendFile(path.resolve("dist/index.html"));
// });

/** port to listen */
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
