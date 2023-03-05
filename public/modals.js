function renderModals(parent) {
    const modal = `
    <!-- Модальное окно вопроса -->
    <div id="enterModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer"><i class="arrow-left"></i></span>
                <span class="modal-title">Вход в систему</span>
                <span class="close-btn pointer"><i class="close"></i></span>
            </div>
            <div class="modal-body">
              <span class="modal-text text-center">Создайте аккаунт, если ещё не зарегистрированы</span>
              <button class="btn btn-success grid-center" id="reg-btn">Регистрация</button>
              <span></span>
              <span class="modal-text text-center">Или авторизируйтесь, если уже есть аккаунт</span>
              <button class="btn btn-primary grid-center" id="auth-btn">Вход</button>
            </div>
        </div>
    </div>

    <!-- Модальное окно входа -->
    <div id="authModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer"><i class="arrow-left"></i></span>
                <span class="modal-title">Авторизация</span>
                <span class="close-btn pointer"><i class="close"></i></span>
            </div>
            <div class="modal-body">
                <form action="">
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
                    <input type="checkbox" name="remember">
                    Запомнить меня
                </label>
                <button class="btn btn-primary grid-right" id="auth-btn">Вход</button>
            </div>
        </div>
    </div>

    <!-- Модальное окно регистрации -->
    <div id="regModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="back-btn pointer"><i class="arrow-left"></i></span>
                <span class="modal-title">Регистрация</span>
                <span class="close-btn pointer"><i class="close"></i></span>
            </div>
            <div class="modal-body">
                <form action="">
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
                <button class="btn btn-success grid-right" id="auth-btn">Регистрация</button>
            </div>
        </div>
    </div>`;
    
    parent.innerHTML += modal;
}