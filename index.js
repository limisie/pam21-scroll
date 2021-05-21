const root = document.getElementById('root');
const images = 182;
const labels = [64, 93, 125];
const labelDisplay = 5;

for (let i = 0; i < images; i++) {
    const child = document.createElement('img');

    const num = i.toString().length === 1 ? `000${i}` : i.toString().length === 2 ? `00${i}` : `0${i}`;
    child.src = `./img/${num}.png`;
    child.classList = `image image-${i}`;
    root.appendChild(child);
}

const show = (i) => {
    document.querySelectorAll('.image').forEach(elem => elem.style.opacity = 0);
    document.querySelector(`.image-${i}`).style.opacity = 1;
    document.querySelector(`.label`).style.opacity = 0;
    for (const label of labels) {
        if (label - labelDisplay < i & i < label + labelDisplay) {
            const diff = labelDisplay - Math.abs(i - label);
            console.log(label);
            document.querySelector(`.label`).style.opacity = 0.15 * diff;
        }
    }
}

window.onscroll = () => {
    show(parseInt(window.scrollY * 0.1));
}
