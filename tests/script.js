const canvas = $("#a")[0];
const ctx = canvas.getContext("2d");
const image1 = new Image();
image1.src = '../hom_logo_image/bg_black.png';

image1.addEventListener('load', () => {
    ctx.drawImage(image1, 0, 0);
})