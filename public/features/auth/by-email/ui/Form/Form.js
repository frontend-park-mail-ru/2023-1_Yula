export const Form = (parent) => {
    const formId = '#loginFormByEmail';
    const errorEmailId = '#emailError';
    const errorPasswordId = '#passwordError';
    const template = Handlebars.templates['features/auth/by-email/ui/Form/Form'];

    return {
        render: function() {
            parent.insertAdjacentHTML("beforeEnd", template());
        },

        self: function() {
            return parent.querySelector(formId);
        },

        getFields: function() {
            if (!this.self()) {
                return false;
            }
            return {
                email: this.self().email.value,
                password: this.self().password.value
            }
        },

        showError: function(errors) {
            if (!this.self()) {
                return false;
            }
            if (errors.email) {
                this.self().querySelector(errorEmailId).innerText = errors.email;
            }
            if (errors.password) {
                this.self().querySelector(errorPasswordId).innerText = errors.password;
            }
            return true;
        },

        resetErrors: function() {
            if (!this.self()) {
                return false;
            }
            this.self().querySelector(errorEmailId).innerText = '';
            this.self().querySelector(errorPasswordId).innerText = '';
            return true;
        }
    }
}
