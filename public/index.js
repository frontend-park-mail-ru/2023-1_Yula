const header = document.querySelector('.header');
const add_btn = document.getElementById('add_ann');
const anns = document.getElementById('anns');

console.log(header);

header.addEventListener('click', () => {
    console.log('click');
    header.style.color = 'green';
});

add_btn.addEventListener('click', () => {
    anns.innerHTML += "<div class=\"ann\"></div>"
})