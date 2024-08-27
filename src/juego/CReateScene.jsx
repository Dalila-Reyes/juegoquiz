export default function createScene() {
  this.gameOver = false; // Inicializar gameOver
  this.score = 0; // Inicializar score
  this.scoreText = this.add.text(16, 16, 'Score: 0', {
    fontSize: '32px',
    fill: '#fff',
  });

  const sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
  sky.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);

  // Animaciones
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', { start: 1, end: 2 }),
    frameRate: 15,
    repeat: -1,
  });

  // Manejador de eventos para reiniciar
  this.input.keyboard.on('keydown-R', () => {
    if (this.gameOver) {
      this.score = 0;
      this.scoreText.setText('Score: 0');
      this.gameOver = false;
      this.scene.restart();
    }
  });
}
