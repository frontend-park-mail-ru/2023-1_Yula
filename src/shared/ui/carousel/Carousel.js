import './Carousel.scss';
import template from './Carousel.handlebars';

/**
 * Карусель изображений
 * @param {HTMLElement} parent - родительский элемент
 * @param {Object} config - конфигурация
 * @param {Array} config.images - массив объектов с изображениями и их описанием
 * @param {number} config.visibleCount - количество видимых изображений
 * @param {number} config.current - индекс текущего изображения
 * @param {number} config.interval - интервал смены изображений
 * @param {boolean} config.large - карусель большого размера
 * @param {Function} config.onSlideChange - функция, вызываемая при изменении изображения
 * @returns 
 */
export const Carousel = (parent, config) => {
    config.images = config.images || [];
    config.current = config.current || 0;
    config.onSlideChange = config.onSlideChange || (() => {});

    const self = () => {
        return parent.querySelector('.carousel');
    }

    const destroy = () => {
        if (self()) {
            self().remove();
        }
    }

    const changeConfig = (newConfig) => {
        config = {...config, ...newConfig};

        if (self()) {
            destroy();
            render();
        }
    }

    const slideTo = (index) => {
        if (index < 0 || index >= config.images.length) {
            return;
        }

        config.current = index;

        // смена изображения
        const slider = self().querySelector('.carousel__slider');
        slider.style.transform = `translateX(-${config.current * 100}%)`;
    }

    const prevSlide = () => {
        slideTo(config.current - 1 < 0 ? config.images.length - 1 : config.current - 1);
        
    }

    const nextSlide = () => {
        slideTo(config.current + 1 >= config.images.length ? 0 : config.current + 1);
    }

    const applyActions = () => {
        // смена слайда при промотке мыши вдоль слайдера
        const slider = self().querySelector('.carousel__slider');
        slider.addEventListener('mousemove', (event) => {
            if (event.target.classList.contains('carousel__slide')) {
                let index = parseInt(event.offsetX / event.target.offsetWidth * config.images.length);
                slideTo(index);
            }
        });

    }

    const render = () => {
        if (self()) {
            throw new Error('Объект уже есть на странице');
        }

        parent.insertAdjacentHTML('beforeend', template(config));

        slideTo(config.current);
        applyActions();
    }

    return {
        self,
        destroy,
        changeConfig,
        slideTo,
        prevSlide,
        nextSlide,
        render,
    };
}