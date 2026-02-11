import { useState, useEffect, useRef } from 'react';
import './PinballGame.css';

function PinballGame({ onHighScoreUpdate, onServerReady }) {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const gameContainerRef = useRef(null);

  useEffect(() => {
    const savedHighScore = localStorage.getItem('pinballHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }
  }, []);

  useEffect(() => {
    if (gameStarted) {
      loadScripts();
    }
  }, [gameStarted]);

  const loadScripts = () => {
    const scripts = [
      'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
      'https://cdn.rawgit.com/schteppe/poly-decomp.js/1ef946f1/build/decomp.min.js',
      'https://cdn.rawgit.com/liabru/matter-js/0895d81f/build/matter.min.js',
      'https://cdn.rawgit.com/liabru/matter-attractors/c470ed42/build/matter-attractors.min.js'
    ];

    let loadedCount = 0;
    scripts.forEach((src) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        loadedCount++;
        if (loadedCount === scripts.length) {
          initializeGame();
        }
      };
      document.head.appendChild(script);
    });
  };

  const initializeGame = () => {
    if (!gameContainerRef.current) return;
    initializePinballGame();
  };

  const initializePinballGame = () => {
    // Game constants
    const PATHS = {
      DOME: '0 0 0 250 19 250 20 231.9 25.7 196.1 36.9 161.7 53.3 129.5 74.6 100.2 100.2 74.6 129.5 53.3 161.7 36.9 196.1 25.7 231.9 20 268.1 20 303.9 25.7 338.3 36.9 370.5 53.3 399.8 74.6 425.4 100.2 446.7 129.5 463.1 161.7 474.3 196.1 480 231.9 480 250 500 250 500 0 0 0',
      DROP_LEFT: '0 0 20 0 70 100 20 150 0 150 0 0',
      DROP_RIGHT: '50 0 68 0 68 150 50 150 0 100 50 0',
      APRON_LEFT: '0 0 180 120 0 120 0 0',
      APRON_RIGHT: '180 0 180 120 0 120 180 0'
    };

    // Color constants
    const COLORS = {
      BACKGROUND: '#212529',
      OUTER: '#495057',
      INNER: '#15aabf',
      BUMPER: '#fab005',
      BUMPER_LIT: '#fff3bf',
      PADDLE: '#e64980',
      PINBALL: '#dee2e6'
    };

    const GRAVITY = 0.75;
    const WIREFRAMES = false;
    const BUMPER_BOUNCE = 1.5;
    const MAX_VELOCITY = 50;

    let engine, world, render, pinball, stopperGroup;
    let isLeftPaddleUp = false;
    let isRightPaddleUp = false;

    // Initialize Matter.js
    if (window.Matter) {
      Matter.use(window.MatterAttractors);

      engine = Matter.Engine.create();
      world = engine.world;
      world.bounds = {
        min: { x: 0, y: 0},
        max: { x: 500, y: 800 }
      };
      world.gravity.y = GRAVITY;

      render = Matter.Render.create({
        element: gameContainerRef.current,
        engine: engine,
        options: {
          width: world.bounds.max.x,
          height: world.bounds.max.y,
          wireframes: WIREFRAMES,
          background: COLORS.BACKGROUND
        }
      });
      Matter.Render.run(render);

      const runner = Matter.Runner.create();
      Matter.Runner.run(runner, engine);

      stopperGroup = Matter.Body.nextGroup(true);

      // Create game bodies
      createStaticBodies();
      createPaddles();
      createPinball();
      createEvents();

      function createStaticBodies() {
        Matter.World.add(world, [
          Matter.Bodies.rectangle(250, -30, 500, 100, { 
            isStatic: true, 
            render: { fillStyle: COLORS.OUTER } 
          }),
          Matter.Bodies.rectangle(250, 830, 500, 100, { 
            isStatic: true, 
            render: { fillStyle: COLORS.OUTER } 
          }),
          Matter.Bodies.rectangle(-30, 400, 100, 800, { 
            isStatic: true, 
            render: { fillStyle: COLORS.OUTER } 
          }),
          Matter.Bodies.rectangle(530, 400, 100, 800, { 
            isStatic: true, 
            render: { fillStyle: COLORS.OUTER } 
          }),
          createPath(239, 86, PATHS.DOME, COLORS.OUTER),
          createWall(140, 140, 20, 40, COLORS.INNER),
          createWall(225, 140, 20, 40, COLORS.INNER),
          createWall(310, 140, 20, 40, COLORS.INNER),
          createBumper(105, 250),
          createBumper(225, 250),
          createBumper(345, 250),
          createBumper(165, 340),
          createBumper(285, 340),
          createWall(440, 520, 20, 560, COLORS.OUTER),
          createPath(25, 360, PATHS.DROP_LEFT, COLORS.OUTER),
          createPath(425, 360, PATHS.DROP_RIGHT, COLORS.OUTER),
          createWall(120, 510, 20, 120, COLORS.INNER),
          createWall(330, 510, 20, 120, COLORS.INNER),
          createWall(60, 529, 20, 160, COLORS.INNER),
          createWall(390, 529, 20, 160, COLORS.INNER),
          createWall(93, 624, 20, 98, COLORS.INNER, -0.96),
          createWall(357, 624, 20, 98, COLORS.INNER, 0.96),
          createPath(79, 740, PATHS.APRON_LEFT, COLORS.OUTER),
          createPath(371, 740, PATHS.APRON_RIGHT, COLORS.OUTER),
          createReset(225, 50),
          createReset(465, 30)
        ]);
      }

      function createWall(x, y, width, height, color, angle = 0) {
        return Matter.Bodies.rectangle(x, y, width, height, {
          angle: angle,
          isStatic: true,
          chamfer: { radius: 10 },
          render: { fillStyle: color }
        });
      }

      function createPath(x, y, path, color) {
        const vertices = Matter.Vertices.fromPath(path);
        return Matter.Bodies.fromVertices(x, y, vertices, {
          isStatic: true,
          render: {
            fillStyle: color || COLORS.OUTER,
            strokeStyle: color || COLORS.OUTER,
            lineWidth: 1
          }
        });
      }

      function createBumper(x, y) {
        const bumper = Matter.Bodies.circle(x, y, 25, {
          label: 'bumper',
          isStatic: true,
          render: { fillStyle: COLORS.BUMPER }
        });
        bumper.restitution = BUMPER_BOUNCE;
        return bumper;
      }

      function createReset(x, width) {
        return Matter.Bodies.rectangle(x, 781, width, 2, {
          label: 'reset',
          isStatic: true,
          render: { fillStyle: '#fff' }
        });
      }

      function createPaddles() {
        const paddleGroup = Matter.Body.nextGroup(true);

        const paddleLeft = createPaddleMechanism(170, 660, 'left', paddleGroup);
        const rightPaddle = createPaddleMechanism(280, 660, 'right', paddleGroup);

        Matter.World.add(world, [
          ...paddleLeft,
          ...rightPaddle
        ]);
      }

      function createPaddleMechanism(x, y, side, paddleGroup) {
        const isLeft = side === 'left';
        const hingeX = isLeft ? 142 : 308;
        const angle = isLeft ? 0.57 : -0.57;
        const label = isLeft ? 'paddleLeft' : 'paddleRight';

        const paddle = Matter.Bodies.trapezoid(x, y, 20, 80, 0.33, {
          label: label,
          angle: isLeft ? 1.57 : -1.57,
          chamfer: {},
          render: { fillStyle: COLORS.PADDLE }
        });

        const brick = Matter.Bodies.rectangle(x + (isLeft ? 2 : -2), y + 12, 40, 80, {
          angle: isLeft ? 1.62 : -1.62,
          chamfer: {},
          render: { visible: false }
        });

        const comp = Matter.Body.create({
          label: label + 'Comp',
          parts: [paddle, brick]
        });

        const hinge = Matter.Bodies.circle(hingeX, y, 5, {
          isStatic: true,
          render: { visible: false }
        });

        [comp, hinge].forEach((piece) => {
          piece.collisionFilter.group = paddleGroup;
        });

        const con = Matter.Constraint.create({
          bodyA: comp,
          pointA: { x: isLeft ? -29.5 : 29.5, y: -8.5 },
          bodyB: hinge,
          length: 0,
          stiffness: 0
        });

        Matter.Body.rotate(comp, angle, { x: hingeX, y: y });

        return [comp, hinge, con];
      }

      function createPinball() {
        pinball = Matter.Bodies.circle(465, 765, 14, {
          label: 'pinball',
          collisionFilter: { group: stopperGroup },
          render: { fillStyle: COLORS.PINBALL }
        });
        Matter.World.add(world, pinball);
        Matter.Body.setVelocity(pinball, { x: 0, y: -25 });
      }

      function createEvents() {
        Matter.Events.on(engine, 'collisionStart', function(event) {
          const pairs = event.pairs;
          pairs.forEach(function(pair) {
            if (pair.bodyB.label === 'pinball') {
              switch (pair.bodyA.label) {
                case 'reset':
                  Matter.Body.setPosition(pinball, { x: 465, y: 765 });
                  Matter.Body.setVelocity(pinball, { x: 0, y: -25 });
                  updateScore(0);
                  break;
                case 'bumper':
                  updateScore(currentScore + 10);
                  pair.bodyA.render.fillStyle = COLORS.BUMPER_LIT;
                  setTimeout(() => {
                    pair.bodyA.render.fillStyle = COLORS.BUMPER;
                  }, 100);
                  break;
                default:
                  break;
              }
            }
          });
        });

        Matter.Events.on(engine, 'beforeUpdate', function(event) {
          Matter.Body.setVelocity(pinball, {
            x: Math.max(Math.min(pinball.velocity.x, MAX_VELOCITY), -MAX_VELOCITY),
            y: Math.max(Math.min(pinball.velocity.y, MAX_VELOCITY), -MAX_VELOCITY),
          });

          if (pinball.position.x > 450 && pinball.velocity.y > 0) {
            Matter.Body.setVelocity(pinball, { x: 0, y: -10 });
          }
        });

        // Keyboard controls
        const handleKeyDown = (e) => {
          if (e.which === 37) isLeftPaddleUp = true;
          if (e.which === 39) isRightPaddleUp = true;
        };

        const handleKeyUp = (e) => {
          if (e.which === 37) isLeftPaddleUp = false;
          if (e.which === 39) isRightPaddleUp = false;
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        // Button controls
        const leftBtn = document.querySelector('.left-trigger');
        const rightBtn = document.querySelector('.right-trigger');

        if (leftBtn) {
          leftBtn.addEventListener('mousedown', () => isLeftPaddleUp = true);
          leftBtn.addEventListener('mouseup', () => isLeftPaddleUp = false);
          leftBtn.addEventListener('touchstart', () => isLeftPaddleUp = true);
          leftBtn.addEventListener('touchend', () => isLeftPaddleUp = false);
        }

        if (rightBtn) {
          rightBtn.addEventListener('mousedown', () => isRightPaddleUp = true);
          rightBtn.addEventListener('mouseup', () => isRightPaddleUp = false);
          rightBtn.addEventListener('touchstart', () => isRightPaddleUp = true);
          rightBtn.addEventListener('touchend', () => isRightPaddleUp = false);
        }
      }

      function updateScore(newScore) {
        setCurrentScore(newScore);
        const scoreElement = document.querySelector('.current-score span');
        if (scoreElement) scoreElement.textContent = newScore;

        if (newScore > highScore) {
          setHighScore(newScore);
          localStorage.setItem('pinballHighScore', newScore.toString());
          onHighScoreUpdate(newScore);
          const highScoreElement = document.querySelector('.high-score span');
          if (highScoreElement) highScoreElement.textContent = newScore;
        }
      }
    }
  };

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div className="pinball-game-wrapper">
      {!gameStarted ? (
        <div className="pinball-start-screen">
          <h3>Pinball Mini-Game</h3>
          <p>Play while the server warms up!</p>
          <button className="pinball-start-button" onClick={startGame}>
            Start Game
          </button>
        </div>
      ) : (
        <div 
          ref={gameContainerRef} 
          className="pinball-container pinball-game-active"
        >
          <div className="score current-score">
            score<br/><span>{currentScore}</span>
          </div>
          <div className="score high-score">
            high score<br/><span>{highScore}</span>
          </div>
          <button className="trigger left-trigger">tap!</button>
          <button className="trigger right-trigger">tap!</button>
        </div>
      )}
    </div>
  );
}

export default PinballGame;
