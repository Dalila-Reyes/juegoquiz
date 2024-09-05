import React, { useEffect } from 'react';
import Phaser from 'phaser';

import './ScriptJuego.css';

const ScriptJuego = () => {
  useEffect(() => {
    let game;
    let score = 0;
    let scoreText;
    let gameOver = false;
    let bombs;
    let bombaCount = 0;
    let jefeAparecido = false;
    let jefeCount = 0; // Contador de apariciones del jefe
    let moveJefeTimer;

    const config = {
      type: Phaser.AUTO,
      width: 2000,
      height: 850,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    // Inicializa el juego
    game = new Phaser.Game(config);

    function preload() {
      this.load.image('sky', 'images/sky.png');
      this.load.audio('kirbysong', 'audio/kirbysong.mp3');
      this.load.audio('batalla', 'audio/batalla.mp3');
      this.load.audio('sonidomuerte', 'audio/kirbymuere.mp3');
      this.load.audio('victoria', 'audio/victoria.mp3');
      this.load.image('platform', 'images/plataformapasto.png');
      this.load.image('platforma', 'images/plataforma.png');
      this.load.image('star', 'images/star.png');
      this.load.image('bomb', 'images/bomba.png');
      this.load.image('fuego', 'images/fuego.png');
      this.load.image('kirbyfest', 'images/kirbyfest.png');
      this.load.spritesheet('dude', 'images/pru.png', { frameWidth: 45, frameHeight: 42 });
      this.load.spritesheet('jefe', 'images/rey4.png', { frameWidth: 500, frameHeight: 80 });
      this.load.spritesheet('jefefinal', 'images/kirbymaloo.png', { frameWidth: 800, frameHeight: 80 });
      this.load.image('logo', 'images/kirby.png');

    }

    function create() {
      
      const sky = this.add.image(0, 0, 'sky').setOrigin(0, 0);
      sky.setDisplaySize(this.sys.game.config.width, this.sys.game.config.height);
      this.physics.world.setBounds(0, 0, 2000, 850); // Ajusta estos valores según el tamaño de tu mundo



      const platforms = this.physics.add.staticGroup();
      platforms.create(1000, 800, 'platforma').setScale(5).refreshBody();
      platforms.create(500, 550, 'platform');
      platforms.create(700, 350, 'platform');
      platforms.create(100, 350, 'platform');
      platforms.create(1500, 200, 'platform');
      platforms.create(1300, 200, 'platform');
      platforms.create(1350, 550, 'platform');
      platforms.create(1650, 550, 'platform');
      platforms.create(1850, 350, 'platform');

      this.player = this.physics.add.sprite(100, 600, 'dude').setScale(2);
      this.player.setCollideWorldBounds(true);
      this.player.setBounce(0.3);



      this.jefe = this.physics.add.sprite(700, 50, 'jefe').setScale(1.2, 1.19);
      this.jefe.setCollideWorldBounds(true);
      this.jefe.setBounce(0.3);
      this.jefe.setAlpha(0);
      this.jefe.disableBody(true, true);

      this.jefefinal = this.physics.add.sprite(800, 100, 'jefefinal').setScale(3.2, 3.19);
      this.jefefinal.setCollideWorldBounds(true);
      this.jefefinal.setBounce(1);
      this.jefefinal.setAlpha(0); // Oculta el jefe final inicialmente
      this.jefefinal.disableBody(true, true);


      const fuegos = this.physics.add.group();

      
      


      this.backgroundMusic = this.sound.add('kirbysong'); 
      this.backgroundMusicmuerte = this.sound.add('sonidomuerte'); 
      this.backgroundMusicBatalla = this.sound.add('batalla'); 
      this.backgroundVictoria = this.sound.add('victoria');
      
      this.backgroundMusic.play({ volume: 0.2 });
      this.input.keyboard.on('keydown-R', function (event) {
        if (this.gameOver) {
            this.score = 0;
            scoreText.setText('Score: 0');
            this.gameOver = false;
            this.backgroundMusic.resume(); // Reanuda la música
            this.scene.restart(); // Reinicia la escena
        }
    }, this);
      




      this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 2, end:1 }),
        frameRate: 15,
        repeat: -1
      });
      this.anims.create({
        key: 'turn',
        frames: [{ key: 'dude', frame: 4 }],
        frameRate: 20,
      });
      this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 6, end:8 }),
        frameRate: 15,
        repeat: -1
      });

      this.physics.add.collider(this.player, platforms);
      this.physics.add.collider(this.jefe, platforms);
      
      this.physics.add.collider(this.player, this.jefefinal, hitJefe, null, this);
      this.physics.add.collider(this.player, this.jefe, hitJefe, null, this);


      this.cursors = this.input.keyboard.createCursorKeys();

      this.stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 150 }
      });

      this.stars.children.iterate(child => {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      this.physics.add.collider(this.stars, platforms);
      this.physics.add.overlap(this.player, this.stars, collectStar, null, this);

      scoreText = this.add.text(100, 80, 'Score: 0', { fontSize: '32px', fill: '#000' });

      const logo = this.add.image(200, 40, 'logo').setOrigin(0.5);
      logo.setDisplaySize(200, 50);

      bombs = this.physics.add.group();
      this.physics.add.collider(bombs, platforms);
      //this.physics.add.collider(this.jefefinal, platforms);
      this.physics.add.collider(this.player, bombs, hitBomb, null, this);

      this.time.addEvent({
        delay: 3000,
        callback: lanzarBombas,
        callbackScope: this,
        loop: true
      });
      this.jefefinal.setVelocity(Phaser.Math.Between(-400, 300), 0);

      this.ganadorText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'Ganaste', {
        fontSize: '200px',
        stroke: '#000000',
        fill: '#fff',
        strokeThickness: 6,
        fontFamily: 'roboto'
      }).setOrigin(0.5).setAlpha(0);



      //score para que aparezca el jefe final
      function muestraJefeFinal() {
        if (score >= 400 && !this.jefefinal.active) {

          this.backgroundMusic.pause();
           this.backgroundMusicBatalla.play({ volume: 0.5, loop: true });
            // Activa el jefe final

            this.jefefinal.enableBody(true, this.jefefinal.x, this.jefefinal.y, true, true);
            this.jefefinal.setAlpha(1);
            
            // Animación de aparición
            this.tweens.add({
                targets: this.jefefinal,
                alpha: 1,
                duration: 1000,
                ease: 'Power2'
            });
    
            
            this.time.delayedCall(15000, manejarVictoria, [], this); // Cambia aquí para llamar a la función de victoria
        }
    }
    function manejarVictoria() {
      // Verifica que no haya game over
      if (!gameOver) {
          // Mostrar el texto de ganador
          this.ganadorText.setAlpha(1); // Asegúrate de que sea visible
          generarEstrellas.call(this); // Llama a la función para generar estrellas
          this.backgroundMusic.pause(); // Pausa la música de fondo
          this.backgroundMusicBatalla.pause();
          this.backgroundVictoria.play(); // Suponiendo que este es el sonido de victoria
  
          // Oculta al jefe final
          this.jefefinal.setAlpha(0);
          this.jefefinal.disableBody(true, true);
  
          // Cambiar las bombas a fuego
          bombs.children.iterate(bomb => {
              if (bomb.active) {
                  bomb.setTexture('fuego'); // Cambia la textura de la bomba
                  // Hacer que el fuego desaparezca
                  this.time.delayedCall(4000, () => {
                      
                  });
              }
          });
  
          // Detener el juego
          this.physics.pause(); // Pausa la física
          
          
      }
  }
  


      // Nueva función para generar estrellas en posiciones aleatorias
      function generarEstrellas() {
        const numEstrellas = 35; // Número de estrellas a generar

        for (let i = 0; i < numEstrellas; i++) {
          const x = Phaser.Math.Between(0, this.sys.game.config.width); // Posición aleatoria en el eje X
          const y = Phaser.Math.Between(0, this.sys.game.config.height); // Posición aleatoria en el eje Y
          const estrella = this.stars.create(x, y, 'star'); // Crea una estrella

          // Configurar el rebote y la velocidad
          estrella.setBounceY(Phaser.Math.FloatBetween(5, 5)); // Añade un rebote
          estrella.setVelocityY(Phaser.Math.Between(-200, -100)); // Velocidad inicial hacia arriba

          estrella.setAlpha(1); // Ajusta la opacidad si es necesario
        }
      }

      function collectStar(player, star) {
        star.disableBody(true, true);
        score += 10;
        scoreText.setText('Score: ' + score);

        // Verifica si el jefe final debe aparecer
        muestraJefeFinal.call(this);

        if (this.stars.countActive(true) === 0) {
          this.stars.children.iterate(child => {
            child.enableBody(true, child.x, 0, true, true);
          });

          const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
          const bomb = bombs.create(x, 16, 'bomb').setScale(2);
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

          // Verifica si el jefe ya ha aparecido
          if (!jefeAparecido && bombs.getChildren().length >= 2 && jefeCount < 2) {
            jefeAparecido = true;
            jefeCount++; // Incrementa el contador de jefe

            this.jefe.enableBody(true, this.jefe.x, this.jefe.y, true, true);
            this.tweens.add({
              targets: this.jefe,
              alpha: 1,
              duration: 1000,
              ease: 'Power2',
              onComplete: () => {
                this.jefe.setGravityY(300);
              }
            });
          }
        }
      }
    
    function moverJefefinal() {
      // Verifica si el jefe final está en movimiento y colisiona con los límites
      if (this.jefefinal.body.blocked.left || this.jefefinal.body.blocked.right) {
          this.jefefinal.setVelocityX(-this.jefefinal.body.velocity.x); // Invertir la dirección en X
      }
  155
      if (this.jefefinal.body.blocked.up || this.jefefinal.body.blocked.down) {1
          this.jefefinal.setVelocityY(-this.jefefinal.body.velocity.y); // Invertir la dirección en Y
      }
  }
  
      function lanzarBombas() {
        if (jefeAparecido && bombaCount < 2) {
          const jefePosition = this.jefe.getBounds();
          const bomba = bombs.create(jefePosition.centerX, jefePosition.bottom, 'bomb').setScale(2);
          bomba.setBounce(1);
          bomba.setCollideWorldBounds(true);
          bomba.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bombaCount++;

          // Si el jefe ha lanzado 2 bombas
          if (bombaCount >= 2) {
            this.jefe.setAlpha(0);
            this.jefe.disableBody(true, true);
            bombaCount = 0; // Resetea el contador de bombas
            jefeAparecido = false; // Indica que el jefe ya no aparecerá más
          }
        }
      }

      function hitBomb(player, bomb) {
        gameOver = true;
        this.physics.pause();
        bomb.setAlpha(0); // Ocultar la bomba para que no aparezca más
        this.backgroundMusic.pause();
        this.backgroundMusicmuerte.play(); // Reproduce el sonido de muerte
        // Puedes mostrar el texto de Game Over aquí si lo deseas
        endGame(this);
      }

      function hitJefe(player, jefe) {
        endGame(this);
      }

      function endGame(scene) {
        scene.physics.pause();
        scene.player.setTint(0xff0000);
        scene.player.anims.play('turn');
        gameOver = true;

        scene.backgroundMusicmuerte.play({ volume: 1.0 });
        scene.backgroundMusic.pause();
        // Crear el texto de "Game Over"
        const gameOverText = scene.add.text(1000, 300, 'Game Over', {
          fontSize: '100px',
          fontFamily: 'YourFont', // Cambia 'YourFont' por el nombre de tu fuente
          fill: '#ff0000', 
          stroke: '#000000',
          strokeThickness: 6,
        }).setOrigin(0.5);

        
        gameOverText.setShadow(2, 2, '#000000', 0.5);

        
        scene.tweens.add({
          targets: gameOverText,
          scale: 1.1,
          duration: 500,
          yoyo: true,
          repeat: -1,
        });

        // Crear el texto de "Reiniciar"
        const restartButton = scene.add.text(980, 400, 'Reiniciar', {
          fontSize: '64px',
          fontFamily: 'YourFont',
          fill: '#00ff00', 
          stroke: '#000000', 
          strokeThickness: 4,
        }).setOrigin(0.5);

        
        restartButton.setShadow(1, 1, '#000000', 0.5);

        
        restartButton.setInteractive();

        // Añadir evento para reiniciar el juego
        restartButton.on('pointerdown', () => {
          // Reiniciar el juego
          scene.scene.restart(); // Reinicia la escena actual
          score = 0; // Reinicia la puntuación
          scoreText.setText('Score: 0'); // Actualiza el texto de puntuación
          gameOver = false; // Restablece el estado de gameOver
          bombaCount = 0; // Reinicia el contador de bombas
          jefeAparecido = false; // Reinicia la aparición del jefe
          jefeCount = 0; // Resetea el contador de apariciones del jefe
        });
      }

      moveJefeTimer = this.time.addEvent({
        delay: 2000, // Cambiar cada 2 segundos
        callback: moverJefefinal,
        callbackScope: this,
        loop: true
      });

    }

    function update() {
      if (gameOver) {
          return;
      }
  
      const player = this.player;
      const runSpeed = 500;
      const walkSpeed = 200;
      const isRunning = this.cursors.down.isDown;
  
      // Movimiento lateral
      if (this.cursors.left.isDown) {
          player.setVelocityX(isRunning ? -runSpeed : -walkSpeed);
          player.anims.play('left', true);
      } else if (this.cursors.right.isDown) {
          player.setVelocityX(isRunning ? runSpeed : walkSpeed);
          player.anims.play('right', true);
      } else {
          player.setVelocityX(0);
          player.anims.play('turn');
      }
  
      // Saltos múltiples (doble salto)
      if (this.cursors.up.isDown && (player.body.touching.down || player.jumpCount < 3)) {
          player.setVelocityY(-550);
          player.jumpCount++;
      }
  
      // Restablecer el contador de saltos al tocar el suelo
      if (player.body.touching.down) {
          player.jumpCount = 0;
      }
  
      // Aumenta la velocidad de caída al presionar hacia abajo
      if (this.cursors.down.isDown && !player.body.touching.down) {
          player.setVelocityY(400); // Ajusta este valor según la rapidez que desees
      }
  }
  

    return () => {
      if (game) {
        game.destroy(true);
        clearInterval(moveJefeTimer);
      }
    };
  }, []);
  return <div className="game-container" id="phaser-game"></div>;
};

export default ScriptJuego;