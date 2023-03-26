/**
 * @param {HTMLElement} parent - элемент, в который будет вставлена форма
 * @param {Object} config - конфигурация формы
 * @param {String} config.id - id формы
 * @param {String} config.template - название шаблона формы
 **/
export const Form = (parent, config = {id: ""}) => {
    config.id += "Form";
    const actions = {};

    const self = () => {
        return document.getElementById(config.id);
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const getFields = () => {
        const formData = new FormData(self());
        const fields = {};
        for (let [key, value] of formData.entries()) {
            fields[key] = value;
        }
        return fields;
    }

    const showError = (errors) => {
        for (let key in errors) {
            if (errors.hasOwnProperty(key)) {
                document.getElementById(key + 'Message').innerText = errors[key];
                self()[key].classList.add('input-error');
            }
        }
    }

    const resetErrors = () => {
        const errorFields = self().querySelectorAll('.input-error');
        for (let i = 0; i < errorFields.length; i++) {
            errorFields[i].classList.remove('input-error');
        }

        const errorMessages = self().querySelectorAll('.error-text');
        for (let i = 0; i < errorMessages.length; i++) {
            errorMessages[i].innerText = '';
        }
    }

    /**
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

    const applyActions = () => {
        self().addEventListener('submit', (event) => {
            event.preventDefault();
            resetErrors();

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

    const render = () => {
        if (self()) {
            throw new Error(`Объект с id="${id}" уже есть на странице`);
        }

        const template = Handlebars.templates[config.template]
        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();
    }

    return {
        self,
        destroy,
        render,
        setActions,
    }
}
