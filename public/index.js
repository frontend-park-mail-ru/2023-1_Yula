const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const contentElement = document.createElement('main');
rootElement.appendChild(headerElement);
rootElement.appendChild(contentElement)

const config = {
    board: {
        name: 'Объявления',
        href: '/board',
        render: renderBoard,
        key: 'index',

    },
    // login: {
    //     name: 'Авторизация',
    //     href: '/login',
    //     render: renderLogin,
    //     key: 'login',
    // },
    // signup: {
    //     name: 'Регистрация',
    //     href: '/signup',
    //     render: renderSignup,
    //     key: 'signup',
    // },
    // profile: {
    //     name: 'Профиль',
    //     href: '/profile',
    //     render: renderProfile,
    //     key: 'profile',
    // }
};

function ajax(method, url, body = null, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;

        callback(xhr.status, xhr.responseText);
    });

    if (body) {
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf8');
        xhr.send(JSON.stringify(body));
        return;
    }

    xhr.send();
}

function renderBoard(parent) {
    const boardElement = document.createElement('div');

    ajax(
        'GET',
        '/board',
        null,
        (status, responseString) => {
            const anns = JSON.parse(responseString);

            if (anns && Array.isArray(anns)) {
                const ann_group = document.createElement('div');
                ann_group.classList.add("ann-group")
                boardElement.appendChild(ann_group)

                anns.forEach(({src, category, title, price, address}) => {
                    console.log(src, title);
                    ann_group.innerHTML += `
                    <div class="ann">
                        <div class="ann-img">
                            <img src="images/${src}" alt="">
                        </div>
                        <div class="ann-body">
                            <div class="ann-category">${category}</div>
                            <div class="ann-title">${title}</div>
                            <div class="ann-sale">${price} ₽</div>
                            <div class="ann-address">${address}</div>
                        </div>
                    </div>`
                })
            }
            parent.appendChild(boardElement);
        }
    );
}

function renderModals(parent) {
    const modal = `
    <!-- Модальное окно вопроса -->
    <div id="enterModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer" id="enterBack"><i class="arrow-left"></i></span>
                <span class="modal-title">Вход в систему</span>
                <span class="close-btn pointer" id="enterClose"><i class="close"></i></span>
            </div>
            <div class="modal-body">
              <span class="modal-text text-center">Создайте аккаунт, если ещё не зарегистрированы</span>
              <button class="btn btn-success grid-center" id="signupBtn">Регистрация</button>
              <br>
              <span class="modal-text text-center">Или авторизируйтесь, если уже есть аккаунт</span>
              <button class="btn btn-primary grid-center" id="signinBtn">Вход</button>
            </div>
        </div>
    </div>

    <!-- Модальное окно входа -->
    <div id="signinModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer" id="signinBack"><i class="arrow-left"></i></span>
                <span class="modal-title">Авторизация</span>
                <span class="close-btn pointer" id="signinClose"><i class="close"></i></span>
            </div>
            <div class="modal-body">
                <form id="sugninForm">
                    <section class="input-group">
                        <label class="modal-text" for="username">Имя пользователя</label>
                        <input type="text" class="input input-error" name="username">
                        <span class="error-text">Неверное имя пользователя</span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password">
                        <span class="error-text"></span>
                    </section>
                </form>
            </div>
            <div class="modal-footer">
                <label class="grid-left modal-text" for="remember">
                    <input form="signinForm" type="checkbox" name="remember">
                    Запомнить меня
                </label>
                <button class="btn btn-primary grid-right" id="auth-btn">Вход</button>
            </div>
        </div>
    </div>

    <!-- Модальное окно регистрации -->
    <div id="signupModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer" id="signupBack"><i class="arrow-left"></i></span>
                <span class="modal-title">Регистрация</span>
                <span class="close-btn pointer" id="signupClose"><i class="close"></i></span>
            </div>
            <div class="modal-body">
                <form id="signupForm" action="">
                    <section class="input-group">
                        <label class="modal-text" for="username">Имя пользователя</label>
                        <input type="text" class="input" name="username">
                        <span class="error-text"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="email">Почта</label>
                        <input type="email" class="input" name="email">
                        <span class="error-text"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password">
                        <span class="error-text"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="repeat-password">Повторите пароль</label>
                        <input type="password" class="input input-error" name="repeat-password">
                        <span class="error-text">Пароли не совпадают</span>
                    </section>
                    <section class="input-group">
                        <label class="grid-left modal-text" for="accept">
                            <input type="checkbox" name="accept">
                            Я принимаю
                        </label>
                        <a href="#"><button class="cell-btn-sm">пользовательское соглашение</button></a>
                    </section>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-primary-tertiary grid-left" id="auth-btn">Есть аккаунт</button>
                <button form="" class="btn btn-success grid-right" id="auth-btn">Регистрация</button>
            </div>
        </div>
    </div>`;
    
    parent.innerHTML += modal;

    // логика
    const enter_backer = document.getElementById("enterBack");
    const enter_closer = document.getElementById("enterClose");
    const signin_btn = document.getElementById("signinBtn");
    const signup_btn = document.getElementById("signupBtn");

    const signin_backer = document.getElementById("signinBack");
    const signin_closer = document.getElementById("signinClose");

    const signup_backer = document.getElementById("signupBack");
    const signup_closer = document.getElementById("signupClose");

    const enter_modal = document.getElementById("enterModal");
    const signin_modal = document.getElementById("signinModal");
    const signup_modal = document.getElementById("signupModal");

    enter_backer.onclick = () => {
        enter_modal.style.display = "none";
    }
    enter_closer.onclick = () => {
        enter_modal.style.display = "none";
    }
    signin_btn.onclick = () => {
        enter_modal.style.display = "none";
        signin_modal.style.display = "block";
    }
    signup_btn.onclick = () => {
        enter_modal.style.display = "none";
        signup_modal.style.display = "block";
    }

    signin_backer.onclick = () => {
        signin_modal.style.display = "none";
        enter_modal.style.display = "block";
    }
    signin_closer.onclick = () => {
        signin_modal.style.display = "none";
    }

    signup_backer.onclick = () => {
        signup_modal.style.display = "none";
        enter_modal.style.display = "block";
    }
    signup_closer.onclick = () => {
        signup_modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == enter_modal ||
            event.target == signin_modal ||
            event.target == signup_modal) {
                enter_modal.style.display = "none";
                signin_modal.style.display = "none";
                signup_modal.style.display = "none";
        }
    } 
}

function renderHeader(parent) {
    const nav_brand = document.createElement("div");
    nav_brand.classList.add("nav-brand");
    nav_brand.innerText = "AppUniq";

    const category_btn = document.createElement("button");
    category_btn.classList.add("btn", "btn-primary");
    category_btn.innerHTML = `<span><i class="play-list"></i></span>Категории`; 

    const search_input = document.createElement("input");
    search_input.classList.add("input", "search");
    search_input.placeholder = "Найти товар";

    const add_ann_btn = document.createElement("button");
    add_ann_btn.classList.add("btn", "btn-success");
    add_ann_btn.innerHTML = `<span><i class="play-list"></i></span>Разместить объявление`; 

    parent.appendChild(nav_brand);
    parent.appendChild(category_btn);
    parent.appendChild(search_input);
    parent.appendChild(add_ann_btn);

    ajax(
        'GET',
        '/me',
        null,
        (status, responseString) => {
            let isAuthorized = status === 200;

            if (isAuthorized) {
                const user = JSON.parse(responseString);
                if (!user.avatar) {
                    user.avatar = "ava.jpeg";
                }

                const profile = document.createElement("a");
                profile.classList.add("profile");
                profile.href = "/profile";
                profile.innerHTML = `<img src="images/${user.avatar}" alt="" class="avatar">${username}`;

                const logout_btn = document.createElement('button');
                logout_btn.classList.add("cell-btn-sm", "grid-center");
                logout_btn.innerHTML = `<i class="log-out"></i>`;

                parent.appendChild(profile);
                parent.appendChild(logout_btn);

            } else {
                renderModals(contentElement);

                const enter_btn = document.createElement("button");
                enter_btn.classList.add("btn", "btn-primary");
                enter_btn.innerHTML = `<span><i class="chevron-right"></i></span>Войти`;

                parent.appendChild(enter_btn);

                enter_btn.onclick = () => {
                    const enter_modal = document.getElementById("enterModal");
                    enter_modal.style.display = "block";
                }
            }
        });
}

function goToPage(configSection) {
    contentElement.innerHTML = '';
    configSection.render(contentElement);
}

renderHeader(headerElement)
renderBoard(contentElement);
