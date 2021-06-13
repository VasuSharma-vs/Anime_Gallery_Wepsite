/** @type {HTMLCanvasElement} */


const canvas = $("#bgBox")[0];
const image1 = new Image();


image1.src = './hom_logo_image/fullblack.png';
image1.height = sHeight;
image1.width = sWidth;


image1.addEventListener('load', () => {

    const ctx = canvas.getContext('2d');
    const imagedata = ctx.getImageData(0, 0, sWidth, sHeight);
    canvas.height = sHeight;
    canvas.width = sWidth;
    var dotArray = [];

    class CanvasDot {
        constructor() {
            this.x = Math.random() * sWidth;
            this.y = Math.random() * sHeight;
            this.size = Math.random() * 1;
            this.alfaColor = 0;
            this.rgb = '255, 255, 255';

        }

        makeDot() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2 , false);
            ctx.fillStyle = `rgba(${this.rgb}, ${this.alfaColor})` ;
            ctx.fill();
            ctx.stroke();
            ctx.strokeStyle = `rgba(0, 0, 0, 0)`;
        }

        inMouseRange() {
            if (mouse.x- this.x < 50 &&
                mouse.x - this.x > -50 &&
                mouse.y - this.y < 50 &&
                mouse.y - this.y > -50) {
                    return true;
                } else {return false}
        }

        UpdateDot(mSpeed, dSpeed, rgb) {
            this.y-= mSpeed;
            this.alfaColor-= dSpeed/100;
            this. rgb = rgb;
            if (this.y < 1) {
                this.alfaColor = 255;
                this.y = Math.random() * sHeight;
                this.x = Math.random() * sWidth;
                
            }

            if (this.inMouseRange()) {
                if (this.size< 10) {
                    this.size += .4;
                    this.rgb = '255, 50, 50'
                }
                
            } else {
                if (this.size > 1)
                this.size -= .1
            }
        }

    }
    
    function createDots(numOfDots) {
        ctx.globalAlpha = 1;
        for (let i = 0; i<numOfDots; i++) {
            dotArray.push(new CanvasDot);
        }
    }

    createDots(200);

    function CreatePartical() {

    }

    function animate() {
        requestAnimationFrame(animate);
        if (!clean) {
            ctx.clearRect(0 , 0, sWidth, sHeight);
        };
        
        dotArray.forEach(dot => {
            dot.UpdateDot(particalSpeed, 10, rgbColor);
            dot.makeDot();
        });

    }

    animate();

});