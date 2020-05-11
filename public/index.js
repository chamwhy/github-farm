const app = new PIXI.Application();

document.body.appendChild(app.view);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

app.loader.add("sua", "img/sua.jpg").load((loader, resources) => {
  const sua = new PIXI.Sprite(resources.sua.texture);
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
});

class Game {
  constructor(app) {
    this.app = app;
    this.resources = {};
    this.loadResources = 0;
  }

  getResources(imgs, callBack) {
    if (this.loadResources !== 0) return;
    // imgs is Array
    this.loadResources = imgs.length;
    for (let i in imgs) {
      let a = i;
      this.app.loader.add(imgs[a][0], imgs[a][1]).load((loader, resources) => {
        this.resources[imgs[a][0]] = resources;
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

  start() {}

  render() {}
}
