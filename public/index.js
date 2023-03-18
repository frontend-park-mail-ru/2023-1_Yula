import { loginModal } from './features/auth/by-email/index.js';
import { signupModal } from './features/auth/signup/index.js';
import { boardPage } from './pages/board/index.js';

const rootElement = document.getElementById('root');
const headerElement = document.createElement('header');
const contentElement = document.createElement('main');
rootElement.appendChild(headerElement);
rootElement.appendChild(contentElement);

/** configuration options */
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
    },
};

/**
 * function to render board of existing products
 * @function renderBoard
 * @param {any} parent - parent content element
 */
function renderBoard(parent) {
    // boardPage(parent);
    
    // const cardGroup = new CardGroup(parent);
    // cardGroup.render();

    const modal = signupModal(parent);
    modal.open();
}

/**
 * function to render modal window of authorization and authentication
 * @function renderModals
 * @param {any} parent - parent content element
 */
function renderModals(parent) {
    const content = parent;

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
                        <label class="modal-text" for="email">Почта</label>
                        <input type="text" class="input" name="email" required>
                        <span class="error-text" id="signinEmailError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password" required>
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
                        <input type="text" class="input" name="username" required>
                        <span class="error-text" id="signupUsernameError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="email">Почта</label>
                        <input type="email" class="input" name="email" required>
                        <span class="error-text" id="signupEmailError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="password">Пароль</label>
                        <input type="password" class="input" name="password" required>
                        <span class="error-text" id="signupPasswordError"></span>
                    </section>
                    <section class="input-group">
                        <label class="modal-text" for="repeat-password">Повторите пароль</label>
                        <input type="password" class="input" name="repeatPassword" required>
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
                <button type="submit" form="signupForm" class="btn btn-success grid-right" id="signupSubmit" disabled>Регистрация</button>
            </div>
        </div>
    </div>`;

    content.insertAdjacentHTML("beforeEnd", modal);

    /** логика переключений */
    const enterBack = document.getElementById('enterBack');
    const enterClose = document.getElementById('enterClose');
    const signinBtn = document.getElementById('signinBtn');
    const signupBtn = document.getElementById('signupBtn');
    const accexistsBtn = document.getElementById('accexistsBtn');

    const signinBack = document.getElementById('signinBack');
    const signinClose = document.getElementById('signinClose');

    const signupBack = document.getElementById('signupBack');
    const signupClose = document.getElementById('signupClose');

    const enterModal = document.getElementById('enterModal');
    const signinModal = document.getElementById('signinModal');
    const signupModal = document.getElementById('signupModal');

    enterBack.onclick = () => {
        enterModal.style.display = 'none';
    };
    enterClose.onclick = () => {
        enterModal.style.display = 'none';
    };
    signinBtn.onclick = () => {
        enterModal.style.display = 'none';
        signinModal.style.display = 'block';
    };
    signupBtn.onclick = () => {
        enterModal.style.display = 'none';
        signupModal.style.display = 'block';
    };

    signinBack.onclick = () => {
        signinModal.style.display = 'none';
        enterModal.style.display = 'block';
    };
    signinClose.onclick = () => {
        signinModal.style.display = 'none';
    };

    signupBack.onclick = () => {
        signupModal.style.display = 'none';
        enterModal.style.display = 'block';
    };
    signupClose.onclick = () => {
        signupModal.style.display = 'none';
    };
    accexistsBtn.onclick = () => {
        signupModal.style.display = 'none';
        signinModal.style.display = 'block';
    };

    window.onclick = (e) => {
        if (e.target === enterModal
            || e.target === signinModal
            || e.target === signupModal) {
            enterModal.style.display = 'none';
            signinModal.style.display = 'none';
            signupModal.style.display = 'none';
        }
    };

    /** логика отправки данных  */
    const signinForm = document.getElementById('signinForm');
    const signupForm = document.getElementById('signupForm');

    signupForm.accept.addEventListener('change', () => {
        const btn = document.getElementById('signupSubmit');
        btn.disabled = !btn.disabled;
    });

    signinForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = signinForm.email.value.trim();
        const password = signinForm.password.value;
        try {
            Ajax.post({
                url: '/login',
                body: { email, password },
                callback: (status, responseString) => {
                    if (status === 200) {
                        goToPage(config.board);
                        return;
                    }

                    const { error } = JSON.parse(responseString);
                    signinForm.email.classList.add('input-error');
                    const errorTitle = document.getElementById('signinEmailError');
                    errorTitle.innerText = error;
                },
            });
        } catch (err) {
            alert('Server does not respond!');
        }
    });

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const username = signupForm.username.value.trim();
        const email = signupForm.email.value.trim();
        const password = signupForm.password.value;
        const repeatPassword = signupForm.repeatPassword.value;

        /** сброс стилей */
        signupForm.username.classList.remove('input-error');
        signupForm.email.classList.remove('input-error');
        signupForm.password.classList.remove('input-error');
        signupForm.repeatPassword.classList.remove('input-error');
        document.getElementById('signupUsernameError').innerText = '';
        document.getElementById('signupEmailError').innerText = '';
        document.getElementById('signupPasswordError').innerText = '';
        document.getElementById('signupRepeatPasswordError').innerText = '';

        if (password !== repeatPassword) {
            signupForm.repeatPassword.classList.add('input-error');
            signupForm.password.classList.add('input-error');
            const errorTitle = document.getElementById('signupRepeatPasswordError');
            errorTitle.innerText = 'Пароли не совпадают';
            return;
        }
        try {
            Ajax.post({
                url: '/signup',
                body: { email, password, username },
                callback: (status, responseString) => {
                    if (status === 201) {
                        goToPage(config.board);
                        return;
                    }

                    const { error, errorFill } = JSON.parse(responseString);

                    let errorTitle;
                    switch (errorFill) {
                    case 'username':
                        signupForm.username.classList.add('input-error');
                        errorTitle = document.getElementById('signupUsernameError');
                        break;
                    case 'email':
                        signupForm.email.classList.add('input-error');
                        errorTitle = document.getElementById('signupEmailError');
                        break;
                    case 'password':
                        signupForm.password.classList.add('input-error');
                        errorTitle = document.getElementById('signupPasswordError');
                        break;
                    default:
                        signupForm.username.classList.add('input-error');
                        errorTitle = document.getElementById('signupUsernameError');
                    }

                    errorTitle.innerText = error;
                },
            });
        } catch (err) {
            alert('Server does not respond!');
        }
    });
}

/**
 * function to render Header of site page
 * @function renderHeader
 * @param {any} parent - parent content element
 */
function renderHeader(parent) {
    const navBrand = document.createElement('div');
    navBrand.classList.add('nav-brand', 'pointer');
    navBrand.innerText = 'AppUniq';

    navBrand.addEventListener('click', () => {
        goToPage(config.board);
    });

    const categoryBtn = document.createElement('button');
    categoryBtn.classList.add('btn', 'btn-primary');
    categoryBtn.innerHTML = '<span><i class="play-list"></i></span>Категории';

    const searchInput = document.createElement('input');
    searchInput.classList.add('input', 'search');
    searchInput.placeholder = 'Найти товар';

    const addAnnBtn = document.createElement('button');
    addAnnBtn.classList.add('btn', 'btn-success');
    addAnnBtn.innerHTML = '<span><i class="play-list"></i></span>Разместить объявление';

    parent.appendChild(navBrand);
    parent.appendChild(categoryBtn);
    parent.appendChild(searchInput);
    parent.appendChild(addAnnBtn);

    try {
        // Ajax.get({
        //     url: '/me',
        //     callback: (status, responseString) => {
        //         const isAuthorized = status === 200;

        //         if (isAuthorized) {
        //             const user = JSON.parse(responseString);
        //             if (!user.avatar) {
        //                 user.avatar = 'ava.jpg';
        //             }

        //             const profile = document.createElement('a');

        //             const { username, avatar } = user;
        //             profile.classList.add('profile', 'pointer');
        //             profile.innerHTML = `<img src="images/${avatar}" alt="" class="avatar">${username}`;

        //             profile.addEventListener('click', () => {
        //                 goToPage(config.profile);
        //             });

        //             const logoutBtn = document.createElement('button');
        //             logoutBtn.classList.add('cell-btn-sm', 'grid-center');
        //             logoutBtn.innerHTML = '<i class="log-out"></i>';

        //             logoutBtn.addEventListener('click', () => {
        //                 Ajax.post({
        //                     url: '/logout',
        //                     callback: () => {
        //                         goToPage(config.board);
        //                     },
        //                 });
        //             });

        //             parent.appendChild(profile);
        //             parent.appendChild(logoutBtn);
        //         } else {
        //             renderModals(contentElement);

        //             const enterBtn = document.createElement('button');
        //             enterBtn.classList.add('btn', 'btn-primary');
        //             enterBtn.innerHTML = '<span><i class="chevron-right"></i></span>Войти';

        //             parent.appendChild(enterBtn);

        //             enterBtn.onclick = () => {
        //                 const enterModal = document.getElementById('enterModal');
        //                 enterModal.style.display = 'block';
        //             };
        //         }
        //     },
        // });

        let isAuthorized;
        let user;
        fetch('/me').then(request => {
            isAuthorized = request.status === 200;
            return request.json();
        }).then(u => {
            user = u;
        }).finally(() => {
            if (isAuthorized) {
                if (!user.avatar) {
                    user.avatar = 'ava.jpg';
                }

                const profile = document.createElement('a');

                const { username, avatar } = user;
                profile.classList.add('profile', 'pointer');
                profile.innerHTML = `<img src="images/${avatar}" alt="" class="avatar">${username}`;

                profile.addEventListener('click', () => {
                    goToPage(config.profile);
                });

                const logoutBtn = document.createElement('button');
                logoutBtn.classList.add('cell-btn-sm', 'grid-center');
                logoutBtn.innerHTML = '<i class="log-out"></i>';

                logoutBtn.addEventListener('click', () => {
                    Ajax.post({
                        url: '/logout',
                        callback: () => {
                            goToPage(config.board);
                        },
                    });
                });

                parent.appendChild(profile);
                parent.appendChild(logoutBtn);
            } else {
                renderModals(contentElement);

                const enterBtn = document.createElement('button');
                enterBtn.classList.add('btn', 'btn-primary');
                enterBtn.innerHTML = '<span><i class="chevron-right"></i></span>Войти';

                parent.appendChild(enterBtn);

                enterBtn.onclick = () => {
                    const enterModal = document.getElementById('enterModal');
                    enterModal.style.display = 'block';
                };
            }
        })
    } catch (err) {
        alert('Server does not respond!');
    }
}

/**
 * function to render profile site page
 * @function renderProfile
 * @param {any} parent - parent content element
 */
function renderProfile(parent) {
    const profileElement = document.createElement('div');

    try {
        Ajax.get({
            url: '/me',
            callback: (status, responseString) => {
                const isAuthorized = status === 200;

                if (!isAuthorized) {
                    goToPage(config.board);
                    return;
                }

                const { username, email, anns } = JSON.parse(responseString);

                const data = document.createElement('h1');
                data.textContent = `${username}, ${email}`;
                profileElement.appendChild(data);

                const h = document.createElement('h1');
                h.textContent = (anns && anns.length) ? 'Мои объявления' : 'У вас нет объявлений';
                profileElement.appendChild(h);

                if (anns && Array.isArray(anns)) {
                    const annGroup = document.createElement('div');
                    annGroup.classList.add('ann-group');
                    profileElement.appendChild(annGroup);

                    anns.forEach(({
                        src, category, title, price, address,
                    }) => {
                        annGroup.innerHTML += `
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
                    });
                }

                parent.appendChild(profileElement);
            },
        });
    } catch (err) {
        alert('Server does not respond!');
    }
}

/**
 * function to render next page
 * @function goToPage
 * @param {map} configSection - configuration methods from 'const config'
 */
function goToPage(configSection) {
    contentElement.innerHTML = '';
    headerElement.innerHTML = '';
    renderHeader(headerElement);
    configSection.render(contentElement);
}

renderHeader(headerElement);
renderBoard(contentElement);
