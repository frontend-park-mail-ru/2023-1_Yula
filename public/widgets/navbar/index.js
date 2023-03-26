import { fButton, Input } from "../../shared/ui/index.js";

export const Navbar = (parent) => {
    const actions = {};

    const self = () => {
        return document.getElementById('navbar');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const setActions = (newActions) => {
        for (let action in newActions) {
            actions[action] = newActions[action];
        }
    }

    const applyActions = () => {
        if (actions.auth) {
            const authButton = document.getElementById('loginButton');
            authButton.addEventListener('click', actions.auth);
        }
    }

    const render = () => {
        const widget = document.createElement('header');
        widget.classList.add('navbar');
        parent.appendChild(widget);

        const logo = document.createElement('div');
        // logo.classList.add('navbar__logo');
        logo.classList.add('nav-brand', 'pointer');

        const logoLink = document.createElement('a');
        logoLink.href = '/';
        logoLink.innerText = 'AppUniq';

        logo.appendChild(logoLink);
        widget.appendChild(logo);

        const input = Input(widget, {
            id: "search",
            placeholder: "Я ищу...",
            type: "text",
            leftIcon: "icons/search.svg",
            rightIcon: "icons/favicon.ico",
        });
        input.setActions({
            rightIcon: () => {
                input.field().value = 'Здарова, Ваня';
            }
        });
        input.render();

        const auth = fButton(widget, {
            id: "login",
            type: "button",
            text: "Войти",
            class: "btn btn-primary-tertiary grid-left"
        });
        auth.setActions({
            click: () => {
                console.log('Auth!');
            }
        });
        auth.render();

        applyActions();
    }

    return {
        self,
        destroy,
        setActions,
        render,
    }
} 
