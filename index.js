const root = document.getElementById('root');
const boxLinks = document.getElementById('box-links');

const images = 182;
const labels = [64, 93, 125];
const labelDisplay = 5;

for (var i = 0; i < images; i++) {
    const child = document.createElement('img');

    const num = i.toString().length === 1 ? `000${i}` : i.toString().length === 2 ? `00${i}` : `0${i}`;
    child.src = `./img/${num}.png`;
    child.id = `img-${i}`;
    if (labels.includes(i)) {
        child.classList = `image image-${i} img-labeled`;
    } else {
        child.classList = `image image-${i}`;
    }
    root.appendChild(child);
}

const scrollLink = (props) => {
    return () => { window.scroll({ top: props.y, behavior: 'smooth' }); }
}

for (var i = 0; i < labels.length; i++) {
    const boxLink = document.createElement('div');
    boxLink.id = `box-link-${labels[i]}`
    boxLink.classList = `box-link box-link-${labels[i]}`
    boxLinks.appendChild(boxLink);
    boxLink.addEventListener('click', scrollLink({ y: labels[i] * 10 }));
}

document.getElementById('label').addEventListener('click', scrollLink({ y: 0 }));


const handleZoom = (i) => {
    const bls = document.querySelector(`#box-links`);
    bls.style.display = 'none';

    if (i == 0 || i == images - 1) {
        bls.style.display = 'block';
    }
}

const handleScroll = (i) => {
    document.querySelectorAll('.image').forEach(elem => elem.style.opacity = 0);
    document.querySelector(`.image-${i}`).style.opacity = 1;
}

const handleLabels = (i) => {
    document.querySelector(`.label`).style.opacity = 0;
    for (const label of labels) {
        if (label - labelDisplay < i & i < label + labelDisplay) {
            const diff = labelDisplay - Math.abs(i - label);
            document.querySelector(`.label`).style.opacity = 0.15 * diff;
        }
    }
}

const show = (i) => {
    handleZoom(i);
    handleScroll(i);
    handleLabels(i);
}

window.onscroll = () => {
    show(parseInt(window.scrollY * 0.1));
}
