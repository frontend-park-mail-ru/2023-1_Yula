import './Form.scss';

/**
 * @param {HTMLElement} parent - элемент, в который будет вставлена форма
 * @param {Object} config - конфигурация формы
 * @param {String} config.id - id формы
 * @param {String} config.template - название шаблона формы
 **/
export const Form = (parent, config = {id: ""}) => {
    config.id += "Form";
    const actions = {};

    /**
     * Возвращает форму из DOM-дерева
     * @returns {HTMLElement|null}
     */
    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    /**
     * Удаление формы из DOM-дерева
     */
    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    /**
     * Возвращает объект со всеми полями формы
     * @returns {Object}
     */
    const getFields = () => {
        const formData = new FormData(self());
        const fields = {};
        for (let [key, value] of formData.entries()) {
            fields[key] = value;
        }
        return fields;
    }

    /**
     * Сбросить ошибки формы 
     * @description Сброс всех ошибок формы.
     */
    const resetErrors = () => {
        const errorFields = self().querySelectorAll('.input_error');
        for (let i = 0; i < errorFields.length; i++) {
            errorFields[i].classList.remove('input_error');
        }

        const errorMessages = self().querySelectorAll('.input_error');
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].innerText = '';
        }
    }

    /**
     * Отобразить ошибки формы
     * @param {Object} errors - объект ошибок, где ключ - имя поля, значение - текст ошибки.
     */
    const showError = (errors) => {
        resetErrors();

        for (let key in errors) {
            if (!self()[key]) {
                throw new Error(`Поле формы с именем ${key} не существует`)
            }

            self()[key].classList.add('input_error');
            let messageText = document.getElementById(key + 'Message');
            messageText.innerText = errors[key];
        }
    }

    /**
     * Установка событий на форму
     * @param {Object} newActions
     * @param {Function} newActions.submit - функция, которая будет вызвана при успешной валидации
     * @param {Function} newActions.validation - функция, которая будет вызвана для валидации полей
     * @param {Function} newActions.accept - функция, которая будет вызвана при изменении чекбокса 
     */
    const setActions = (newActions) => {
        actions.submit = newActions.submit;
        actions.validation = newActions.validation;
        actions.accept = newActions.accept;
    }

    /**
     * Добавление событий на форму, после её рендеринга.
     */
    const applyActions = () => {
        self().addEventListener('submit', (event) => {
            event.preventDefault();

            const fields = getFields();
            const errors = actions.validation(fields);

            if (!Object.keys(errors).length) {
                actions.submit(fields);
            } else {
                showError(errors);
            }
        });

        if (actions.accept) {
            self().accept.addEventListener('change', (event) => {
                actions.accept(event.target.checked);
            });
        }
    }

    /**
     * Функция рендеринга формы.
     */
    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${config.id}" уже есть на странице`);
        }

        const template = config.template;
        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        destroy,
        render,
        setActions,
        showError,
        resetErrors,
    }
}
