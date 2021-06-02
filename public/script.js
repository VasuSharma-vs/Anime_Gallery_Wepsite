/** @type {htmlCanvasELement} */
let sHeight = window.innerHeight;
let sWidth = window.innerWidth;

class StylesFolder {

    constructor(target, property) {

        this.properties = {};

        typeof(target) == 'string' ?
            this.target = target:
            console.log(`Error: target value => ${target} type => ${typeof(target)}`);

        typeof(property) === 'object' && typeof(property[0]) !== 'string' ? 
            this.propLists = Object.keys(property): 
            this.propLists = [];

        this.create(property);
    };

    SaveOrReturnProps(prop, save=true) {
        for (let i=0; i<prop.length; i+=3) {
            !prop[i] in this.propLists && this.propLists.push(prop[i]); 
            this.updateValueOf(prop[i], prop[i+1], prop[i+2]);
        }
    }

    create(data) {

        if (typeof(data) === 'object' && typeof(data[0]) !== 'string') {
            this.properties = data;
        } else if (typeof(data) === 'object' && typeof(data[0]) === 'string') {
            saveProps(data)
        } else {
            console.log(`Error: data value => ${data} type => ${typeof(data)}`);
        }
    };

    get(property) {
        const prop = this.properties[property];
        const propValues = prop.value;
        const propType = prop.type;
        let wholeValue = "";

        typeof(propValues) === 'object' ? 
            propValues.forEach(value => 
                wholeValue += `${value.toString()}${propType} `):

            wholeValue = `${propValues.toString()}${propType} `;
            
        return wholeValue;
    };

    getValueOf(property) {
        return this.properties[property].value;
    };

    getTypeOf(property) {
        return this.properties[property].type;
    };

    updateValueOf(property, value, type) {
        this.properties[property] = {value: value, type: type};
    };

    addProps(obj) {

        Object.keys(obj). // Acquired keys or list of properties in obj
            forEach(Property => {

                //  Appending Property value as key in propsList only if in List {  
                !Property in this.propLists && this.propLists.push(Property); 
                //  }

                //   Updating property of properries and value {
                this.properties[Property] = obj[Property]; 
                //   }
                }
            );
    };

    removeProps(property) {
        delete this.properties[property];
        this.propLists = Object.keys(this.properties);
    };

}


function applyCss(obj) {
    obj.propLists.
        forEach(singleProps => {
            $(obj.target).css(singleProps, obj.get(singleProps))});
  
}

const imageSchema = {
    height: {
        value: Math.floor((sWidth / 100 * 15) / 2 * 3), 
        type: "px"},

    width: {
        value: Math.floor((sWidth / 100 * 15)),
        type: "px"},

    margin : { 
        value: [20, 50],
        type: "px"
    },

    transform: {
        value: "rotatex(0deg)",
        type: ""},

    transition: {
        value: ["transform 1s,", "margin 1s"],
        type: ""}

} 
const canvasSchema = {
    height: {
        value: Math.floor(sHeight/2), 
        type: "px"},
    width: {
        value:  imageSchema.width.value+100,
        type: "px"
    },
    margin: {
        value: [60, (sWidth - (imageSchema.width.value + 100))/2],
        type: "px"
    } 
}
const imageDownAnimationSchema = {
    margin : { 
        value: [30, 50],
        type: "px"
    },
    transform: {
        value: "rotatex(0deg)",
        type: ""
    }    
}
const imageUpAnimationSchema = {
    margin : { 
        value: [10, 50],
        type: "px"
    },
    transform: {
        value: "rotatex(0deg)",
        type: ""
    }     
}
const imageBoxSchema = {
    height: {
        value: imageSchema.height.value + (imageSchema.margin[0]*2),
        type: "px"
    },
    width: {
        value: imageSchema.width.value + (imageSchema.margin[1]*2),
        type: "px"    
    }
}
const bgImageSchema = {
    "z-index": {
        value: -1, 
        type: ""
    },
    height: {
        value: sHeight,
        type: "px"
    },
    width: {
        value: sWidth,
        type: "px"
    }
}

const ImageCanvas = new StylesFolder(".logoImg", imageSchema);
const ImageBox = new StylesFolder("#imgBox", imageBoxSchema)
const CanvasContainer = new StylesFolder(".HomeIcon", canvasSchema);
const UpImageAnimation = new StylesFolder(".up", imageUpAnimationSchema);
const DowmImageAnimation = new StylesFolder(".down", imageDownAnimationSchema);

applyCss(ImageCanvas);
applyCss(CanvasContainer);
applyCss(ImageBox);

$("#imgBox").mouseover(() => {
    applyCss(UpImageAnimation);
    applyCss(DowmImageAnimation);
})

$("#imgBox").mouseout(() => { 
    applyCss(ImageCanvas);
});

const canvas = $("#bgBox")[0];

const image1 = new Image();
const BgImage = new StylesFolder(".bg_img", bgImageSchema);


// ./hom_logo_image/fullblacktest.png
image1.src = './hom_logo_image/fullblack.png';
image1.height = sHeight;
image1.width = sWidth;
//applyCss(BgImage);

image1.addEventListener('load', () => {

    const ctx = canvas.getContext('2d');
    const imagedata = ctx.getImageData(0, 0, sWidth, sHeight);
    canvas.height = sHeight;
    canvas.width = sWidth;

    let imageData = ctx.getImageData(0, 0, sWidth, sHeight);
    console.log(imageData);

    let x = Math.floor(Math.random() * sWidth);
    let y = Math.floor(Math.random() * sHeight);
    let particleHeight =  5;
    let particleWidth = 5;

    let redValue = 255;
    let greenValue = 255;
    let blueValue = 255;

    function partical() {
        ctx.beginPath();
        ctx.fillStyle  = `rgb(${redValue}n ${greenValue}, ${blueValue})`;
        ctx.fillRect(x, y, particleWidth, particleHeight);
    }

    function animateParticles() {
        redValue -= 5;
        blueValue -= 5;
        greenValue -= 5;
        y++;
        partical();
        window.requestAnimationFrame(animateParticles);
    }

    animateParticles();
  

});

var time = new Date();
console.log(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
