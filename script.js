const fileInput1 = document.getElementById('file1');
const fileInput2 = document.getElementById('file2');
const canvas1 = document.getElementById('canvas1');
const canvas2 = document.getElementById('canvas2');
const ctx1 = canvas1.getContext('2d');
const ctx2 = canvas2.getContext('2d');

const previewImage = (event, imgClass) => {
    const reader = new FileReader();
    reader.onload = function () {
        const imgElement = document.querySelector(`.${imgClass}`);
        imgElement.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

const handleFile = (file, ctx) => {
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                ctx.canvas.width = img.width;
                ctx.canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, img.width, img.height);
                const pixels = imageData.data; // Array de pixels
                console.log(pixels);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

fileInput1.addEventListener('change', function (e) {
    handleFile(e.target.files[0], ctx1);
    previewImage(e, 'img1')
});

fileInput2.addEventListener('change', function (e) {
    handleFile(e.target.files[0], ctx2);
    previewImage(e, 'img2')
});
