var cImgheight = sWidth/12;
var imgx = 0;
var imgy = 0;
const ImgCircleList = [];

function rValue(v1, v2, dec=false) {
    const va = Math.random() * (v2- v1) + v1;
    if (dec == true) {
        return Math.floor(va)
    }
    return va;

}

class ImgCircle {
    constructor() {
        this.circle = null;

        this.movePermit = true;

        this.hw = Math.floor(Math.random() * (200 - 150) + 150);

        this.x = rValue(0, sWidth- (this.hw+60));

        this.y =  rValue(0, sHeight- (this.hw+60));

        this.z = rValue(1,20);

        this.boxImaSchema = {
            height: {
                value: this.hw,
                type: 'px'
            },
            width: {
                value: this.hw,
                type: 'px'
            },
            top: {
                value: this.x,
                type: 'px'
            },
            left: {
                value: this.y,
                type: 'px'
            },
            'border-radius': {
                value: [50,50,50,50],
                type: '%'
            },
            'z-index': {
                value: 1,
                type: ""
            }
        }
        this.styleObj = null;

        this.idName = null;

        this.mvx = rValue(.1, 1);

        this.mvy = rValue(.1, 1);
    }

    makeCircle(CircleId) {
        this.circle = new Image;
        this.idName = 'Circleid'+(CircleId+1).toString();
        this.circle.id = this.idName;
        this.circle.className = 'imgCircle';
        $('#circlesBox').append(this.circle);
        this.styleObj = new StylesFolder("#"+this.idName, this.boxImaSchema);
        applyCss(this.styleObj);
    }

    updatePosition(x, y, z) {
        this.styleObj.updateValueOf('left', x, 'px');
        this.styleObj.updateValueOf('top', y, 'px');
        this.styleObj.updateValueOf('z-index', z, '');
        this.x = x;
        this.y = y;
        applyCss(this.styleObj);
    }

    updateSize(h, w) {
        this.circle.height = h;
        this.circle.width = w;
    }

    updateShape(topL, topR, downR, downL) {
        this.circle['border-radius'] = `${topL}% ${topR}% ${downR}% ${downL}%`;
    }

    moveCircle() {

        if (this.x < 1) {
            this.mvx = rValue(.1, 1);
            this.z = rValue(1, 20, true);
        } else if (this.x > sWidth - (this.hw+10)) {
            this.mvx = rValue(-.1, -1);
            this.z = rValue(1, 20,true);
        } else {
            null;
        }
    
        if (this.y < 1) {
            this.mvy = rValue(.1, 1);
            this.z = rValue(1, 20, true);
        } else if (this.y > sHeight - (this.hw+25)) {
            this.mvy = rValue(-.1, -1);
            this.z = rValue(1, 20, true);
        } else {
            null;
        }
    
        this.x += this.mvx;
        this.y += this.mvy;
        this.updatePosition(this.x, this.y, this.z);

        //console.log(this.z)
    }

    movementInspacter() {
        if (this.x - mouse.x < 50 && this.x - mouse.x < -50) {
            this.movePermit = false;
        } else {
            this.movePermit = true;
        }
    }

} 

function makeCircle(numofCircle) {
    for (var i = 0; i<numofCircle; i++) {
        const currc = new ImgCircle();
        currc.makeCircle(i);    
        ImgCircleList.push(currc);
    }
}

function animarte() {
    requestAnimationFrame(animarte)
    ImgCircleList.forEach(circle => {
        
        circle.movementInspacter();
        if (circle.movePermit) {
            circle.moveCircle()
        }



    });
    

}

makeCircle(15);
animarte()
