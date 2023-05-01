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
 * @param {boolean} config.outbound - слайдер на 20% превышает слайды
 * @param {Function} config.onSlideChange - функция, вызываемая при изменении изображения
 * @returns 
 */
export const Carousel = (parent, config) => {
    config.images = config.images || [];
    config.current = config.current || 0;
    config.visibleCount = config.visibleCount || 3;
    config.outbound = config.outbound || true;
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
        if (index < 0 || index >= config.images.length ||
            index === config.current) {
            return;
        }

        // смена изображения
        const slider = self().querySelector('.carousel__slider');

        // коэффициент смещения слайдера
        let offset = 0;
        if (config.outbound) {
            if (config.current === 0 && index === 1 ||
                config.current === 1 && index === 0 ||
                config.current === config.images.length - 2 && index === config.images.length - 1 ||
                config.current === config.images.length - 1 && index === config.images.length - 2) {
                offset = 10;
            }
        }

        slider.style.transform = `translateX(-${index * (100 - offset)}%)`;
        config.current = index;
    }

    const prevSlide = () => {
        slideTo(config.current - 1 < 0 ? config.images.length - 1 : config.current - 1);
        
    }

    const nextSlide = () => {
        slideTo(config.current + 1 >= config.images.length ? 0 : config.current + 1);
    }

    const applyActions = () => {
        if (config.outbound) {
            // смена слайда при клике на слайд
            const slides = self().querySelectorAll('.carousel__slide');
            slides.forEach((slide, index) => {
                slide.addEventListener('click', () => {
                    slideTo(index);
                });
            });
        } else {
            // смена слайда при промотке мыши вдоль слайдера
            const slider = self().querySelector('.carousel__slider');
            slider.addEventListener('mousemove', (event) => {
                if (event.target.classList.contains('carousel__slide')) {
                    let index = parseInt(event.offsetX / event.target.offsetWidth * config.images.length);
                    slideTo(index);
                }
            });
        }

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