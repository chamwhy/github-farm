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
