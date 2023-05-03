const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
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
const basket = require('./static/jsonData/basket.json');
const favorites = require('./static/jsonData/favorites.json');

/** session identificators */
const ids = {};

/** session tokens */
const checkToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (typeof header !== "undefined") {
        const bearer = header.split(" ");
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403);
    }
};

// USER API
app.get('/api/user', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    return res.json({ ...user });
});

app.post('/api/user', (req, res) => {
    const { Password, Login, Email } = req.body;
    if (!Login || Login.length < 4) {
        return res.status(400).json({ message: 'Логин не менее 4 символов' });
    }
    if (!Password || !Password.match(/^\S{4,}$/)) {
        return res.status(400).json({ message: 'Минимальная длина пароля 4 символа' });
    }
    if (!Email) {
        return res.status(400).json({ message: 'Невалидные данные пользователя' });
    }
    if (users.find((user) => user.Email === Email)) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }

    const user = {
        ...req.body,
        Avatar: 'default.jpg',
        ID: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })
    };

    const token = Math.random().toString(36).substring(2);
    ids[token] = user.Email;
    users.push(user);

    fs.writeFileSync(path.resolve(__dirname, 'static/jsonData/users.json'), JSON.stringify(users, null, 4));

    return res.status(201).json(token);
});

app.put('/api/user', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find((user) => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const { Password, Login, Email } = req.body;
    if (!Login || Login.length < 4) {
        return res.status(400).json({ message: 'Логин не менее 4 символов' });
    }
    if (!Password || !Password.match(/^\S{4,}$/)) {
        return res.status(400).json({ message: 'Минимальная длина пароля 4 символа' });
    }
    if (!Email) {
        return res.status(400).json({ message: 'Невалидные данные пользователя' }); 
    }

    const newUser = {
        ...user,
        ...req.body,
    };

    users[users.indexOf(user)] = newUser;

    fs.writeFileSync(path.resolve(__dirname, 'static/jsonData/users.json'), JSON.stringify(users, null, 4));

    return res.status(200).json({ ...newUser });
});

app.delete('/api/user', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find((user) => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    users.splice(users.indexOf(user), 1);

    fs.writeFileSync(path.resolve(__dirname, 'static/jsonData/users.json'), JSON.stringify(users, null, 4));

    return res.status(200).json({ message: 'Пользователь удален' });
});

app.get('/api/user/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find((user) => user.ID === id);
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.json({
        ID: user.ID,
        Login: user.Login,
        Name: user.Name,
        Email: user.Email,
        Avatar: user.Avatar,
    });
});

// AUTH API
app.post('/api/auth/login', (req, res) => {
    const { Password, Login } = req.body;
    if (!Password || !Login) {
        return res.status(400).json({ message: 'Не указан логин или пароль' });
    }

    const user = users.find((user) => user.Login === Login);
    if (!user || user.Password !== Password) {
        return res.status(400).json({ message: 'Неверный логин и/или пароль' });
    }

    // генерируем токен
    const token = Math.random().toString(36).substring(2);
    ids[token] = user.Email;

    return res.status(200).json(token);
});

// ANNOUNCEMENTS API
app.get('/api/sort/new/:page', (req, res) => {
    let page = req.params.page;
    const result = anns.sort((a, b) => b.PostId - a.PostId);
    return res.json(result.slice((page - 1) * 12, page * 12));
});

app.post('/api/post', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find((user) => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    } else {
        const { Title, Description, Price, Tag, PathImages } = req.body;
        if (!Title || !Description || !Price || !Tag || !PathImages) {
            return res.status(400).json({ message: 'Не все поля заполнены' });
        }

        // типа сохранение файла
        const images = PathImages.map((img) => {
            const path = `0.jpeg`;
            return path;
        });

        const ann = {
            PostId: anns.length,
            UserId: user.ID,
            Title,
            Description,
            Price,
            Tag,
            PathImages: images,
            Close: false,
        };

        anns.push(ann);
    }
    return res.status(201).end();
});

app.get('/api/post/:id', (req, res) => {
    const id = +req.params.id;
    const ann = anns.find(ann => ann.PostId === id);

    if (!ann) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    } else {
        return res.json(ann);
    }
});

app.get('/api/post/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.ID === id);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    } else {
        return res.json(anns.filter(ann => ann.UserId === id));
    }
});

app.put('/api/post/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const id = +req.params.id;
    const ann = anns.find(ann => ann.PostId === id);

    if (!ann) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    if (ann.UserId !== user.ID) {
        return res.status(403).json({ message: 'Нет доступа' });
    }

    let { Title, Description, Price, Tag, PathImages, Close } = req.body;

    // типа сохранение файла
    if (PathImages) {
        PathImages = PathImages.map(img => {
            const path = `0.jpeg`;
            return path;
        });
    }

    const newAnn = { Title, Description, Price, Tag, PathImages, Close };
    
    anns[anns.indexOf(ann)] = { ...ann, ...newAnn };

    return res.status(200).end();
});

app.delete('/api/post/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const id = +req.params.id;
    const ann = anns.find(ann => ann.PostId === id);

    if (ann === undefined) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    if (ann.UserId !== user.ID) {
        return res.status(403).json({ message: 'Нет доступа' });
    }

    anns.splice(anns.indexOf(ann), 1);

    return res.status(200).end();
});

app.get('/api/post/open/user/:id/', (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.ID === id);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.json(anns.filter(ann => ann.UserId === id && !ann.Close));
});

app.get('/api/post/close/user/:id/', (req, res) => {
    const id = req.params.id;

    const user = users.find(user => user.ID === id);

    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    return res.json(anns.filter(ann => ann.UserId === id && ann.close));
});

app.put('/api/post/close/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const id = +req.params.id;
    const ann = anns.find(ann => ann.PostId === id);

    if (!ann) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    if (ann.UserId !== user.ID) {
        return res.status(403).json({ message: 'Нет доступа' });
    }

    anns[anns.indexOf(ann)] = { ...ann, Close: true };

    return res.status(200).end();
});

app.get('/api/post/:tag/:page', (req, res) => {
    const tag = req.params.tag;
    let page = req.params.page;
    const result = anns.filter(ann => ann.Tag === tag);
    return res.json(result.slice((page - 1) * 12, page * 12));
});

app.get('/api/cart', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const userBasket = basket.find(item => item.UserId === user.ID);
    if (!userBasket) {
        return res.status(404).json([]);
    }

    const userBasketAnns = anns.filter(ann => userBasket.anns.includes(ann.PostId));

    return res.json(userBasketAnns);
});

app.post('/api/cart/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const annId = +req.params.id;

    if (annId === undefined) {
        return res.status(400).json({ message: 'Не указан id объявления' });
    }

    if (!anns.find(ann => ann.PostId === annId)) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    const userBasket = basket.find(item => item.UserId === user.ID);
    if (!userBasket) {
        basket.push({ UserId: user.ID, anns: [annId] });
    } else {
        userBasket.anns.push(annId);
    }

    return res.status(200).end();
});

app.delete('/api/cart/clear', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const userBasket = basket.find(item => item.UserId === user.ID);
    if (!userBasket) {
        return res.status(404).json({ message: 'Корзина не найдена' });
    }

    userBasket.anns = [];

    return res.status(200).end();
});

app.delete('/api/cart/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);
    
    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const annId = +req.params.id;
    if (annId === undefined) {
        return res.status(400).json({ message: 'Не указан id объявления' });
    }

    const userBasket = basket.find(item => item.UserId === user.ID);
    if (!userBasket) {
        return res.status(404).json({ message: 'Корзина не найдена' });
    }

    const inBasket = userBasket.anns.includes(annId);
    if (!inBasket) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    userBasket.anns.splice(userBasket.anns.indexOf(annId), 1);

    return res.status(200).end();
});

// FAVORITES API
app.get('/api/favorite', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const userFavorites = favorites.find(item => item.UserId === user.ID);

    if (!userFavorites) {
        return res.status(404).json([]);
    }

    const userFavoritesAnns = anns.filter(ann => userFavorites.anns.includes(ann.PostId));

    return res.json(userFavoritesAnns);
});

app.post('/api/favorite/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const annId = +req.params.id;

    if (annId === undefined) {
        return res.status(400).json({ message: 'Не указан id объявления' });
    }

    if (!anns.find(ann => ann.PostId === annId)) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    const userFavorites = favorites.find(item => item.UserId === user.ID);
    if (!userFavorites) {
        favorites.push({ UserId: user.ID, anns: [annId] });
    } else {
        userFavorites.anns.push(annId);
    }

    return res.status(200).end();
});

app.delete('/api/favorite/:id', checkToken, (req, res) => {
    const emailSession = ids[req.token];

    const user = users.find(user => user.Email === emailSession);

    if (!emailSession || !user) {
        return res.status(401).json({ message: 'Пользователь не найден' });
    }

    const annId = +req.params.id;
    if (annId === undefined) {
        return res.status(400).json({ message: 'Не указан id объявления' });
    }

    const userFavorites = favorites.find(item => item.UserId === user.ID);
    if (!userFavorites) {
        return res.status(404).json({ message: 'Избранное не найдено' });
    }

    const inFavorites = userFavorites.anns.includes(annId);
    if (!inFavorites) {
        return res.status(404).json({ message: 'Объявление не найдено' });
    }

    userFavorites.anns.splice(userFavorites.anns.indexOf(annId), 1);

    return res.status(200).end();
});

// SEARCH API
app.get('/api/search', (req, res) => {
    const query = req.query.query;

    if (!query) {
        return res.status(400).json({ message: 'Не указан поисковый запрос' });
    }

    const queryWords = query.toLowerCase().split(' ');

    const result = anns.filter(ann => {
        const annWords = ann.Title.toLowerCase().split(' ');
        return queryWords.every(word => annWords.includes(word));
    });

    return res.json(result);
});

/** port to listen */
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server listening port ${port}`);
});
