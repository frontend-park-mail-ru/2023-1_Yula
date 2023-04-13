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

        // смена активной миниатюры
        const thumbnails = self().querySelector('.carousel__thumbnails');
        thumbnails.querySelectorAll('.carousel__thumbnail').forEach((thumbnail) => {
            thumbnail.classList.remove('carousel__thumbnail_active');
        });
        thumbnails.querySelector(`[data-index="${config.current}"]`).classList.add('carousel__thumbnail_active');
    }

    const prevSlide = () => {
        slideTo(config.current - 1 < 0 ? config.images.length - 1 : config.current - 1);
        
    }

    const nextSlide = () => {
        slideTo(config.current + 1 >= config.images.length ? 0 : config.current + 1);
    }

    const applyActions = () => {
        // смена слайда на правую и левую часть изображения
        const slider = self().querySelector('.carousel__slider');
        slider.addEventListener('click', (event) => {
            if (event.target.classList.contains('carousel__slide')) {
                if (event.offsetX < event.target.offsetWidth / 2) {
                    prevSlide();
                } else {
                    nextSlide();
                }
            }
        });
        
        // смена слайда по клику на миниатюру
        const thumbnails = self().querySelector('.carousel__thumbnails');
        thumbnails.addEventListener('click', (event) => {
            if (event.target.classList.contains('carousel__thumbnail')) {
                slideTo(+event.target.dataset.index);
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