const app = new PIXI.Application();

document.body.appendChild(app.view);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

// app.loader.add("sua", "img/sua.jpg").load((loader, resources) => {
//   const sua = new PIXI.Sprite(resources.sua.texture);
//   sua.x = app.renderer.width / 2;
//   sua.y = app.renderer.height / 2;
//   sua.anchor.x = 0.5;
//   sua.anchor.y = 0.5;

//   // Add the sua to the scene we are building
//   app.stage.addChild(sua);

//   // Listen for frame updates
//   app.ticker.add(() => {
//     // each frame we spin the sua around a bit
//     sua.rotation += 0.01;
//   });
// });

class Game {
  constructor(app) {
    this.app = app;
    this.resources = {};
    this.sprites = {};
    this.loadResources = 0;
    this.isStart = false;
    this.pause = false;
  }

  /* background functions */
  getResources(imgs, callBack) {
    if (this.loadResources !== 0) return;
    // imgs is Array
    this.loadResources = Object.keys(imgs).length;
    for (let i in imgs) {
      let a = i;
      this.app.loader.add(a, imgs[a]).load((loader, resources) => {
        this.resources[a] = resources;
        this.loadResources--;
        if (this.loadResources === 0) callBack();
      });
    }
  }

  init(imgs) {
    this.getResources(
      imgs,
      (() => {
        this.start();
      }).bind(this)
    );
  }

  start() {
    this.isStart = true;
    console.log("start");
    this.update();
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
  }

  render(resourceName) {
    if (!this.isStart) return;
    const sua = new PIXI.Sprite(this.resources[resourceName].texture);
    sua.x = app.renderer.width / 2;
    sua.y = app.renderer.height / 2;
    sua.anchor.x = 0.5;
    sua.anchor.y = 0.5;

    // Add the sua to the scene we are building
    app.stage.addChild(sua);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the sua around a bit
      sua.rotation += 0.01;
    });
  }

  /* game functions */
  enterKey(keyCode) {}
  pause(bool) {
    this.pause = bool;
  }

  /* sprite functions */
  createSprite(name, data) {}
  deleteSprite(name) {
    delete this.sprites[name];
  }
  setDelta(name, x, y) {
    if (x !== null) {
      this.sprites[name].x = x;
    }
    if (y !== null) {
      this.sprites[name].y = y;
    }
  }
  show(name) {}
  hide(name) {}

  setAnim(name, anim) {}
}

/* test codes */
let game = new Game(app);
game.init({
  sua: "img/sua.jpg",
});
setTimeout(() => {
  game.render("sua");
}, 1000);
