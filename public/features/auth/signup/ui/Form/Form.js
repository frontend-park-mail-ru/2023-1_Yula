export const Form = (parent) => {
    const id = 'signupForm';
    const errorUsernameId = '#usernameError';
    const errorEmailId = '#emailError';
    const errorPasswordId = '#passwordError';
    const errorRepeatPasswordId = '#repeatPasswordError';

    const template = Handlebars.templates['features/auth/signup/ui/Form/Form'];

    return {
        render: function() {
            parent.insertAdjacentHTML("beforeEnd", template());
        },

        self: function() {
            return parent.querySelector('#' + id);
        },

        getFields: function() {
            if (!this.self()) {
                return;
            }
            return {
                username: this.self().username.value,
                email: this.self().email.value,
                password: this.self().password.value,
                repeatPassword: this.self().repeatPassword.value,
            }
        },

        showError: function(errors) {
            if (!this.self()) {
                return;
            }
            if (errors.username) {
                this.self().querySelector(errorUsernameId).innerText = errors.username;
                this.self().username.classList.add('input-error');
            }
            if (errors.email) {
                this.self().querySelector(errorEmailId).innerText = errors.email;
                this.self().email.classList.add('input-error');
            }
            if (errors.password) {
                this.self().querySelector(errorPasswordId).innerText = errors.password;
                this.self().password.classList.add('input-error');
            }
            if (errors.repeatPassword) {
                this.self().querySelector(errorRepeatPasswordId).innerText = errors.repeatPassword;
                this.self().repeatPassword.classList.add('input-error');
            }
        },

        resetErrors: function() {
            if (!this.self()) {
                return;
            }

            this.self().querySelector(errorUsernameId).innerText = '';
            this.self().querySelector(errorEmailId).innerText = '';
            this.self().querySelector(errorPasswordId).innerText = '';
            this.self().querySelector(errorRepeatPasswordId).innerText = '';

            this.self().username.classList.remove('input-error');
            this.self().email.classList.remove('input-error');
            this.self().password.classList.remove('input-error');
            this.self().repeatPassword.classList.remove('input-error');
        }
    }
}
