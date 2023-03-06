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
    profile: {
        name: 'Профиль',
        href: '/profile',
        render: renderProfile,
        key: 'profile',
    }
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

    try {
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
    catch(err) {
        alert("Server does not respond!");
    };
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
                <form id="signinForm">
                    <section class="input-group">
                        <label class="modal-text" for="email">Имя пользователя</label>
                        <input type="text" class="input" name="email">
                        <span class="error-text" id="signinEmailError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password">
                        <span class="error-text" id="signinPasswordError"></span>
                    </section>
                </form>
            </div>
            <div class="modal-footer">
                <label class="grid-left modal-text" for="remember">
                    <input form="signinForm" type="checkbox" name="remember">
                    Запомнить меня
                </label>
                <button type="submit" form="signinForm" class="btn btn-primary grid-right">Вход</button>
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
                <form id="signupForm">
                    <section class="input-group">
                        <label class="modal-text" for="username">Имя пользователя</label>
                        <input type="text" class="input" name="username">
                        <span class="error-text" id="signupUsernameError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="email">Почта</label>
                        <input type="email" class="input" name="email">
                        <span class="error-text" id="signupEmailError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password">
                        <span class="error-text" id="signupPasswordError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="repeat-password">Повторите пароль</label>
                        <input type="password" class="input" name="repeatPassword">
                        <span class="error-text" id="signupRepeatPasswordError"></span>
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
                <button class="btn btn-primary-tertiary grid-left" id="accexistsBtn">Есть аккаунт</button>
                <button type="submit" form="signupForm" class="btn btn-success grid-right">Регистрация</button>
            </div>
        </div>
    </div>`;
    
    parent.innerHTML += modal;

    // логика переключений
    const enter_backer = document.getElementById("enterBack");
    const enter_closer = document.getElementById("enterClose");
    const signin_btn = document.getElementById("signinBtn");
    const signup_btn = document.getElementById("signupBtn");
    const accexists_btn = document.getElementById("accexistsBtn")

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
    accexists_btn.onclick = () => {
        signup_modal.style.display = "none";
        signin_modal.style.display = "block";
    }

    window.onclick = (e) => {
        if (e.target == enter_modal ||
            e.target == signin_modal ||
            e.target == signup_modal) {
                enter_modal.style.display = "none";
                signin_modal.style.display = "none";
                signup_modal.style.display = "none";
        }
    } 

    // логика отправки данных
    signin_form = document.getElementById("signinForm");
    signup_form = document.getElementById("signupForm");

    signin_form.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signin_form.email.value.trim();
        const password = signin_form.password.value;

        ajax(
            'POST',
            '/login',
            {email, password},
            (status, responseString) => {
                if (status === 200) {
                    goToPage(config.board);
                    return;
                }

                const {error} = JSON.parse(responseString);
                signin_form.email.classList.add("input-error");
                const error_text = document.getElementById("signinEmailError");
                error_text.innerText = error;
            }
        );
    });

    signup_form.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = signup_form.username.value.trim();
        const email = signup_form.email.value.trim();
        const password = signup_form.password.value;
        const repeat_password = signup_form.repeatPassword.value;

        // сброс стилей
        signup_form.username.classList.remove("input-error");
        signup_form.email.classList.remove("input-error");
        signup_form.password.classList.remove("input-error");
        signup_form.repeatPassword.classList.remove("input-error");
        document.getElementById("signupUsernameError").innerText = "";
        document.getElementById("signupEmailError").innerText = "";
        document.getElementById("signupPasswordError").innerText = "";
        document.getElementById("signupRepeatPasswordError").innerText = "";

        if (password !== repeat_password) {
            signup_form.repeatPassword.classList.add("input-error");
            signup_form.password.classList.add("input-error");
            const error_title = document.getElementById("signupRepeatPasswordError");
            error_title.innerText = "Пароли не совпадают";
            return;
        }

        ajax(
            'POST',
            '/signup',
            {email, password, username},
            (status, responseString) => {
                if (status === 201) {
                    goToPage(config.board);
                    return;
                }

                const {error, error_fill} = JSON.parse(responseString);
                
                let error_title;
                switch (error_fill) {
                    case "username":
                        signup_form.username.classList.add("input-error");
                        error_title = document.getElementById("signupUsernameError");
                        break;
                    case "email":
                        signup_form.email.classList.add("input-error");
                        error_title = document.getElementById("signupEmailError");
                        break;
                    case "password":
                        signup_form.password.classList.add("input-error");
                        error_title = document.getElementById("signupPasswordError");
                        break;
                    default:
                        signup_form.username.classList.add("input-error");
                        error_title = document.getElementById("signupUsernameError");
                }
                
                error_title.innerText = error;
            }
        );

    });
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

    try {
        ajax(
            'GET',
            '/me',
            null,
            (status, responseString) => {
                let isAuthorized = status === 200;

                if (isAuthorized) {
                    const user = JSON.parse(responseString);
                    if (!user.avatar) {
                        user.avatar = "ava.jpg";
                    }

                    const profile = document.createElement("a");

                    const {username, avatar} = user
                    profile.classList.add("profile", "pointer");
                    profile.innerHTML = `<img src="images/${avatar}" alt="" class="avatar">${username}`;

                    profile.addEventListener("click", () => {
                        goToPage(config.profile);
                    })

                    const logout_btn = document.createElement('button');
                    logout_btn.classList.add("cell-btn-sm", "grid-center");
                    logout_btn.innerHTML = `<i class="log-out"></i>`;

                    logout_btn.addEventListener("click", () => {
                        ajax("POST", "/logout", null, (req, res) => {
                            goToPage(config.board);
                        })
                    })

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
    catch(err) {
        alert("Server does not respond!");
    }
}

function renderProfile(parent) {
    const profileElement = document.createElement("div");
    
    try {
        ajax(
            'GET',
            '/me',
            null,
            (status, responseString) => {
                let isAuthorized = status === 200;

                if (!isAuthorized) {
                    goToPage(config.board);
                    return;
                }

                const {username, email, anns} = JSON.parse(responseString);
                const span = document.createElement('span');
                span.textContent = `${username}, ${email}`;
                profileElement.appendChild(span);

                if (anns && Array.isArray(anns)) {
                    const ann_group = document.createElement('div');
                    ann_group.classList.add("ann-group");
                    profileElement.appendChild(ann_group);

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
                        </div>`;
                    })
                }
                parent.appendChild(profileElement);
            }
        );
    }
    catch(err) {
        alert("Server does not respond!");
    }
} 

function goToPage(configSection) {
    contentElement.innerHTML = '';
    headerElement.innerHTML = '';
    renderHeader(headerElement);
    configSection.render(contentElement);
}

renderHeader(headerElement);
renderBoard(contentElement);
