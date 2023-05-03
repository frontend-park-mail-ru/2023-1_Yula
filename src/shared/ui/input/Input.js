import { goTo } from "@shared/lib/history";

import './Input.scss';
import template from './Input.handlebars';

/**
 * @param {HTMLElement} parent
 * @param {Object} config
 * @param {string} config.id
 * @param {string} config.text
 * @param {string} config.placeholder
 * @param {string} config.type
 * @param {string} config.leftIcon
 * @param {string} config.rightIcon
 */
export const Input = (parent, config = {id: ""}) => {
    config.id += "Input";
    const actions = {};

    const self = () => {
        return parent.querySelector('#' + config.id);
    }

    const field = () => {
        if (!self()) {
            throw new Error(`Объект с id="${config.id}" не найден на странице`);
        }
        return self().querySelector(".input__field");
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
        if (actions.leftIcon) {
            const leftIcon = self().querySelectorAll(".input__icon")[0];
            leftIcon.addEventListener("click", actions.leftIcon);
        }
        if (actions.rightIcon) {
            const rightIcon = self().querySelectorAll(".input__icon")[1];
            rightIcon.addEventListener("click", actions.rightIcon);
        }

        self().querySelector(".input__field").addEventListener("focus", () => {
            self().classList.add("input_focus");
        });
        self().querySelector(".input__field").addEventListener("blur", () => {
            self().classList.remove("input_focus");
        });
    }

    const render = () => {
        if (self()) {
            self().remove();
        }

        parent.insertAdjacentHTML("beforeEnd", template(config));

        applyActions();

        self().addEventListener('keypress', function (e) {
            if ((e.key === 'Enter') && (field().value !== "")) {
            //   debugger
            console.log(`/search/${field().value}`);
            goTo(`/search/${field().value}`);
            // goTo(`/ann/${field().value}`);
            //   searchFunct();
            }
        });
    }

    const searchFunct = () => {
        // Declare variables
        let input, filter, annGroup, a, i, txtValue;
        input = document.getElementById('myInput');
        filter = field().value.toUpperCase();
        annGroup = document.querySelector(".announcement-group");
        console.log(annGroup);
        let li = annGroup.getElementsByClassName('announcement-card');
        
        // Loop through all list items, and hide those who don't match the search query
        for (i = 0; i < li.length; i++) {
            console.log(li[i]);
            a = li[i].getElementsByClassName("announcement-card__title")[0];
            
            txtValue = a.textContent || a.innerText;
            console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
      }

    return {
        self,
        field,
        render,
        searchFunct,
        setActions,
        destroy,
    }
}
