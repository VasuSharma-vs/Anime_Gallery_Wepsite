function loop(times, data) { 

    const rV = [];
    const nextTime = times/10;

    console.log(nextTime)

    
        if (times<10) {
            for (let i = 0; i<10; i++) {
            rV.push("O");
            }
        } else {
            rV.push(loop(nextTime, null))
            
        }

    return rV

 }

 

  console.log(createImage(100, 10))




  let particlesArray = [];
  const numberOfParticles = 50;

  class Particle {
      constructor() {
          this.x = Math.random() * canvas.width;
          this.y = 0;
          this.speed = 0;
          this.velocity = Math.random() * 0;
          this.size = Math.random() * 1.5 + 1;
      }
  
      update() {
          this.y+= this.velocity;
          if (this.y >= canvas.height) {
              this.y = 0;
              this.x = Math.random() * canvas.width;
          }
      }

      draw() {
          ctx.beginPath();
          ctx.fillStyle = 'white';
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false)
          ctx.fill();
      }
  }

  function init() {
      for (let i = 0; i< numberOfParticles; i++) {
          particlesArray.push(new Particle);
      }
  }

  init();

  function animate() {
      ctx.globalAlpha = 0.05;
      ctx.fillStyle = 'rgb(0, 0, 0)';
      ctx.fillRect (0, 0, sWidth, sHeight);
      for (let i = 0; i< particlesArray.length; i++) {
          particlesArray[i].update();
          particlesArray[i].draw();
      }
      requestAnimationFrame(animate);
  }
  //animate();