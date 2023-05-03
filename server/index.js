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
// app.use(body.json());
app.use(cookie());
// Устанавливаем максимально допустимый размер тела JSON-запроса в 50 МБ
app.use(body.json({ limit: '500mb' }));
app.use(body.urlencoded({ limit: '500mb', extended: true }));

const users = require('./static/jsonData/users.json');
const anns = require('./static/jsonData/anns.json');

/** session identificators */
const ids = {};

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.id === id);
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }
    const { password, checkPassword, ...rest } = user;
    return res.json(rest);
});

app.post('/api/user', (req, res) => {
    const { password, login, email } = req.body;
    if (!login || login.length < 4) {
        return res.status(400).json({ message: 'Логин не менее 4 символов', errorFill: 'username' });
    }
    if (!password || !password.match(/^\S{4,}$/)) {
        return res.status(400).json({ message: 'Минимальная длина пароля 4 символа', errorFill: 'password' });
    }
    if (!email) {
        return res.status(400).json({ message: 'Невалидные данные пользователя', errorFill: 'email' });
    }
    if (users.find((user) => user.email === email)) {
        return res.status(400).json({ message: 'Пользователь уже существует', errorFill: 'username' });
    }

    const id = uuid();
    const user = {
        ...req.body, purchs: [], anns: [], avatar: '/default.jpg',
    };

    ids[id] = email;
    users.push(user);

    res.cookie('appuniq', id, { expires: new Date(Date.now() + 1000 * 60 * 10) });
    return res.status(201).json({ id });
});

app.post('/api/auth/login', (req, res) => {

    const { password, login } = req.body;
    if (!password || !login) {
        return res.status(400).json({ message: 'Не указан логин или пароль' });
    }

    const user = users.find((user) => user.login === login);
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Неверный логин и/или пароль' });
    }

    const id = uuid();
    ids[id] = user.email;

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

app.get('/api/sort/new/:page', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const page = req.params.page;
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.json(anns.slice((page - 1) * 12, page * 12));
    } else {
        const result = anns.filter(ann => ann.userId !== user.id);
        return res.json(result.slice((page - 1) * 12, page * 12));
    }
});

app.get('/api/post', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
    } else {
        return res.json(user.anns);
    }
});

app.post('/api/post', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];

    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ error: 'Пользователь не найден' });
    } else {
        const { title, description, price, tags, image, close } = req.body;
        if (!title || !description || !price || !tags || !image || close === undefined) {
            return res.status(400).json({ message: 'Не все поля заполнены' });
        }

        // типа сохранение файла
        const images = image.map((img) => {
            const path = `0.jpeg`;
            return path;
        });

        const ann = {
            id: anns.length,
            title,
            description,
            price,
            tags,
            images,
            close,
            userId: user.id,
        };

        anns.push(ann);
    }
    return res.status(201).end();
});

app.get('/api/post/:id', (req, res) => {
    const id = req.params.id;

    if (!anns[id]) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    } else {
        return res.json(anns[id]);
    }
});

app.get('/api/post/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });   
    } else {
        return res.json(anns.filter(ann => ann.userId === id));
    }
});

app.get('/api/sellers/:id', (req, res) => {
    const sellerId = req.params.id;
    res.json(users[sellerId]);
});

app.get('/seller', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({message: 'Пользователь не найден'});
    }

    return res.json({
        id: user.id,
        username: user.username,
        phone: user.phone,
    });
});

// get seller of announcement
app.get('/api/getseller/:id', (req, res) => {
    let sellerId = -1;
    for (let User in users) {
        if (users[User].anns.find(elem => elem == req.params.id)) {
            sellerId = users[User].id;
            break;
        };
    }
    // console.log("getseller output: ", sellerId);
    res.json({id: users[sellerId].id});
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

app.get('/api/user', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({message: 'Пользователь не найден'});
    }

    return res.json({ ...user });
});

app.get('/api/anns/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];

    if (!user) {
        return res.status(401).json({message: 'Пользователь не найден'});
    }

    const result = anns.filter((_, i) => user.anns.includes(i));
    return res.json(result);
});

app.get('/api/me/anns', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({message: 'Пользователь не найден'});
    }

    const result = anns.filter((_, i) => user.anns.includes(i));
    return res.json(result);
});

app.get('/api/me/purchs', (req, res) => {
    const id = req.cookies.appuniq;
    const emailSession = ids[id];
    const user = users.find((user) => user.email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({message: 'Пользователь не найден'});
    }

    const result = anns.filter((_, i) => user.purchs.includes(i));
    return res.json(result);
});

/** port to listen */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
