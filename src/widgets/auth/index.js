import { signupModal } from "../../features/auth/signup/index.js";
import { loginModal } from "../../features/auth/by-email/index.js";

export const AuthWidget = (parent) => {

    const render = () => {
        const widget = document.createElement('div');
        widget.classList.add('auth-widget');
        parent.appendChild(widget);

        const signup = signupModal(widget);
        const login = loginModal(widget);

        signup.setActions({
            back: () => {
                signup.destroy();
                login.render();
            },
            existsAccount: () => {
                signup.destroy();
                login.render();
            },
        });

        login.setActions({
            back: () => {
                login.destroy();
            },
            noAccount: () => {
                login.destroy();
                signup.render();
            },
        });

        login.render();
    }


    return {
        render,
    };
} 
