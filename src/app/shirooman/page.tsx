"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Volume2, VolumeX, RotateCcw, Play, Award, Zap, Heart } from "lucide-react";

// Web Audio API Sound Synthesizer
class SoundSynth {
  ctx: AudioContext | null = null;
  muted: boolean = false;

  constructor() {
    // Lazy initialized on first user interaction
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  playDot() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playPowerPellet() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(300, this.ctx.currentTime + 0.15);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  playEatGhost() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.005, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playDeath() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.8);
  }

  playStartMelody() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const notes = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25];
    const duration = 0.12;

    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + index * duration);

      gain.gain.setValueAtTime(0.05, this.ctx!.currentTime + index * duration);
      gain.gain.exponentialRampToValueAtTime(0.005, this.ctx!.currentTime + (index + 1) * duration);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(this.ctx!.currentTime + index * duration);
      osc.stop(this.ctx!.currentTime + (index + 1) * duration);
    });
  }
}

// 1 = Wall, 2 = Pellet, 3 = Power Pellet, 0 = Empty, 4 = Ghost House Gate/Inside
const INITIAL_MAP = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,3,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,3,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,2,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,1,1,1,2,1,1,1,0,1,0,1,1,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,4,1,1,0,1,2,1,1,1,1],
  [0,0,0,0,2,0,0,1,4,4,4,1,0,0,2,0,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [0,0,0,1,2,1,0,0,0,0,0,0,0,1,2,1,0,0,0],
  [1,1,1,1,2,1,0,1,1,1,1,1,0,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,2,1],
  [1,3,2,1,2,2,2,2,2,0,2,2,2,2,2,1,2,3,1],
  [1,1,2,1,2,1,2,1,1,1,1,1,2,1,2,1,2,1,1],
  [1,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,2,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const TILE_SIZE = 20;
const MAP_ROWS = INITIAL_MAP.length;
const MAP_COLS = INITIAL_MAP[0].length;

const GHOST_COLORS = ["#ff0000", "#ffb8ff", "#00ffff", "#ffb852"];

export default function ShirooMan() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const synthRef = useRef<SoundSynth | null>(null);

  // Game settings / UI states
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState<"IDLE" | "PLAYING" | "PAUSED" | "GAME_OVER" | "VICTORY">("IDLE");
  const [isMuted, setIsMuted] = useState(false);

  // Entities references to keep them mutable within standard requestAnimationFrame game loop
  const gameRef = useRef({
    player: {
      x: 9, // Tile coordinates
      y: 15,
      pixelX: 9 * TILE_SIZE,
      pixelY: 15 * TILE_SIZE,
      dirX: 0,
      dirY: 0,
      nextDirX: 0,
      nextDirY: 0,
      speed: 2,
      mouthAngle: 0,
      mouthOpening: 1,
    },
    ghosts: [
      { id: 0, x: 9, y: 9, pixelX: 9 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: 0, dirY: -1, color: GHOST_COLORS[0], frightened: false, speed: 1.5, eaten: false },
      { id: 1, x: 8, y: 9, pixelX: 8 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: -1, dirY: 0, color: GHOST_COLORS[1], frightened: false, speed: 1.5, eaten: false },
      { id: 2, x: 10, y: 9, pixelX: 10 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: 1, dirY: 0, color: GHOST_COLORS[2], frightened: false, speed: 1.5, eaten: false },
      { id: 3, x: 9, y: 8, pixelX: 9 * TILE_SIZE, pixelY: 8 * TILE_SIZE, dirX: 0, dirY: -1, color: GHOST_COLORS[3], frightened: false, speed: 1.5, eaten: false },
    ],
    map: JSON.parse(JSON.stringify(INITIAL_MAP)),
    frightenedTime: 0,
    totalDots: 0,
    eatenDots: 0,
  });

  // Calculate total dots on mount
  useEffect(() => {
    let dots = 0;
    for (let r = 0; r < MAP_ROWS; r++) {
      for (let c = 0; c < MAP_COLS; c++) {
        if (INITIAL_MAP[r][c] === 2 || INITIAL_MAP[r][c] === 3) {
          dots++;
        }
      }
    }
    gameRef.current.totalDots = dots;

    // Load Highscore
    if (typeof window !== "undefined") {
      const savedScore = localStorage.getItem("shirooman_high");
      if (savedScore) {
        const parsed = parseInt(savedScore, 10);
        setTimeout(() => {
          setHighScore(parsed);
        }, 0);
      }
      synthRef.current = new SoundSynth();
    }
  }, []);

  // Sync mute state to Sound Synth
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Restart / Reset Game state
  const initGameEntities = React.useCallback((fullReset: boolean) => {
    const current = gameRef.current;
    
    // Player reset
    current.player.x = 9;
    current.player.y = 15;
    current.player.pixelX = 9 * TILE_SIZE;
    current.player.pixelY = 15 * TILE_SIZE;
    current.player.dirX = 0;
    current.player.dirY = 0;
    current.player.nextDirX = 0;
    current.player.nextDirY = 0;

    // Ghosts reset
    current.ghosts = [
      { id: 0, x: 9, y: 9, pixelX: 9 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: 0, dirY: -1, color: GHOST_COLORS[0], frightened: false, speed: 1.5, eaten: false },
      { id: 1, x: 8, y: 9, pixelX: 8 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: -1, dirY: 0, color: GHOST_COLORS[1], frightened: false, speed: 1.5, eaten: false },
      { id: 2, x: 10, y: 9, pixelX: 10 * TILE_SIZE, pixelY: 9 * TILE_SIZE, dirX: 1, dirY: 0, color: GHOST_COLORS[2], frightened: false, speed: 1.5, eaten: false },
      { id: 3, x: 9, y: 8, pixelX: 9 * TILE_SIZE, pixelY: 8 * TILE_SIZE, dirX: 0, dirY: -1, color: GHOST_COLORS[3], frightened: false, speed: 1.5, eaten: false },
    ];

    current.frightenedTime = 0;

    if (fullReset) {
      current.map = JSON.parse(JSON.stringify(INITIAL_MAP));
      current.eatenDots = 0;
      setScore(0);
      setLives(3);
    }
  }, []);

  const startGame = React.useCallback(() => {
    initGameEntities(true);
    setGameState("PLAYING");
    if (synthRef.current) {
      synthRef.current.playStartMelody();
    }
  }, [initGameEntities]);

  const handleKeyPress = React.useCallback((dx: number, dy: number) => {
    if (gameState === "PLAYING") {
      gameRef.current.player.nextDirX = dx;
      gameRef.current.player.nextDirY = dy;
      if (synthRef.current) {
        synthRef.current.init(); // initialize Web Audio on first key/button interaction
      }
    }
  }, [gameState]);

  // Listen to keyboard arrows
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (["ArrowUp", "KeyW"].includes(e.code)) {
        e.preventDefault();
        handleKeyPress(0, -1);
      } else if (["ArrowDown", "KeyS"].includes(e.code)) {
        e.preventDefault();
        handleKeyPress(0, 1);
      } else if (["ArrowLeft", "KeyA"].includes(e.code)) {
        e.preventDefault();
        handleKeyPress(-1, 0);
      } else if (["ArrowRight", "KeyD"].includes(e.code)) {
        e.preventDefault();
        handleKeyPress(1, 0);
      } else if (e.code === "Space") {
        e.preventDefault();
        if (gameState === "PLAYING") {
          setGameState("PAUSED");
        } else if (gameState === "PAUSED") {
          setGameState("PLAYING");
        } else if (gameState === "IDLE" || gameState === "GAME_OVER" || gameState === "VICTORY") {
          startGame();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, handleKeyPress, startGame]);

  // Main rendering & Game Loop logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const isWall = (x: number, y: number) => {
      // Allow wraps
      if (x < 0 || x >= MAP_COLS) return false;
      if (y < 0 || y >= MAP_ROWS) return true;
      return gameRef.current.map[y][x] === 1;
    };

    const updateGame = () => {
      const current = gameRef.current;
      const player = current.player;

      // ── Handle Frightened ghosts timer ──
      if (current.frightenedTime > 0) {
        current.frightenedTime--;
        if (current.frightenedTime === 0) {
          current.ghosts.forEach(g => {
            g.frightened = false;
            g.speed = 1.5;
          });
        }
      }

      // ── PLAYER MOVEMENT ──
      // Align player to grid to change direction
      if (player.pixelX % TILE_SIZE === 0 && player.pixelY % TILE_SIZE === 0) {
        player.x = Math.round(player.pixelX / TILE_SIZE);
        player.y = Math.round(player.pixelY / TILE_SIZE);

        // Tunnel wrapping
        if (player.x < 0) {
          player.x = MAP_COLS - 1;
          player.pixelX = player.x * TILE_SIZE;
        } else if (player.x >= MAP_COLS) {
          player.x = 0;
          player.pixelX = 0;
        }

        // Try changing direction if user buffered a next direction
        if (player.nextDirX !== 0 || player.nextDirY !== 0) {
          if (!isWall(player.x + player.nextDirX, player.y + player.nextDirY)) {
            player.dirX = player.nextDirX;
            player.dirY = player.nextDirY;
          }
        }

        // If next tile in current direction is wall, stop player
        if (isWall(player.x + player.dirX, player.y + player.dirY)) {
          player.dirX = 0;
          player.dirY = 0;
        }

        // Eat pellet at current tile
        const currentTile = current.map[player.y][player.x];
        if (currentTile === 2) {
          // Regular dot
          current.map[player.y][player.x] = 0;
          current.eatenDots++;
          setScore((prev) => {
            const next = prev + 10;
            if (next > highScore) {
              setHighScore(next);
              localStorage.setItem("shirooman_high", next.toString());
            }
            return next;
          });
          if (synthRef.current) synthRef.current.playDot();
        } else if (currentTile === 3) {
          // Power Pellet
          current.map[player.y][player.x] = 0;
          current.eatenDots++;
          setScore((prev) => {
            const next = prev + 50;
            if (next > highScore) {
              setHighScore(next);
              localStorage.setItem("shirooman_high", next.toString());
            }
            return next;
          });
          current.frightenedTime = 400; // 400 frames ~ 6.5s
          current.ghosts.forEach(g => {
            if (!g.eaten) {
              g.frightened = true;
              g.speed = 1.0;
            }
          });
          if (synthRef.current) synthRef.current.playPowerPellet();
        }

        // Check Victory
        if (current.eatenDots >= current.totalDots) {
          setGameState("VICTORY");
          return;
        }
      }

      // Smooth coordinate update
      player.pixelX += player.dirX * player.speed;
      player.pixelY += player.dirY * player.speed;

      // Animate mouth
      if (player.dirX !== 0 || player.dirY !== 0) {
        player.mouthAngle += 0.2 * player.mouthOpening;
        if (player.mouthAngle > 0.6 || player.mouthAngle < 0) {
          player.mouthOpening *= -1;
        }
      } else {
        player.mouthAngle = 0.2; // slightly open when stationary
      }

      // ── GHOST MOVEMENT & COLLISION ──
      current.ghosts.forEach((ghost) => {
        // Move ghost smoothly
        if (ghost.pixelX % TILE_SIZE === 0 && ghost.pixelY % TILE_SIZE === 0) {
          ghost.x = Math.round(ghost.pixelX / TILE_SIZE);
          ghost.y = Math.round(ghost.pixelY / TILE_SIZE);

          // Return home wrapping check / gate entering
          if (ghost.eaten && ghost.x === 9 && ghost.y === 9) {
            ghost.eaten = false;
            ghost.frightened = false;
            ghost.speed = 1.5;
          }

          // Choose directions
          const possibleDirs = [];
          const dirs = [
            { x: 0, y: -1 },
            { x: 0, y: 1 },
            { x: -1, y: 0 },
            { x: 1, y: 0 },
          ];

          dirs.forEach((d) => {
            // Cannot walk backwards to prevent jitter
            if (d.x === -ghost.dirX && d.y === -ghost.dirY) return;

            // Check walls
            const targetX = ghost.x + d.x;
            const targetY = ghost.y + d.y;
            
            // Allow ghost house access
            const isGateTile = targetY >= 0 && targetY < MAP_ROWS && targetX >= 0 && targetX < MAP_COLS && current.map[targetY][targetX] === 4;

            if (!isWall(targetX, targetY) || isGateTile) {
              possibleDirs.push(d);
            }
          });

          // Fallback to allow backwards if dead end
          if (possibleDirs.length === 0) {
            possibleDirs.push({ x: -ghost.dirX, y: -ghost.dirY });
          }

          // Decide direction: Smart target pathing or Random
          let selectedDir = possibleDirs[Math.floor(Math.random() * possibleDirs.length)];

          if (possibleDirs.length > 1 && !ghost.frightened) {
            // Target coordinates (e.g. head towards Shiroo)
            let targetX = player.x;
            let targetY = player.y;

            if (ghost.eaten) {
              // Target ghost house (9, 9)
              targetX = 9;
              targetY = 9;
            }

            let minDist = Infinity;
            possibleDirs.forEach((d) => {
              const checkX = ghost.x + d.x;
              const checkY = ghost.y + d.y;
              const dist = Math.pow(checkX - targetX, 2) + Math.pow(checkY - targetY, 2);
              if (dist < minDist) {
                minDist = dist;
                selectedDir = d;
              }
            });
          }

          if (selectedDir) {
            ghost.dirX = selectedDir.x;
            ghost.dirY = selectedDir.y;
          }
        }

        ghost.pixelX += ghost.dirX * ghost.speed;
        ghost.pixelY += ghost.dirY * ghost.speed;

        // COLLISION WITH PLAYER
        const distance = Math.hypot(player.pixelX - ghost.pixelX, player.pixelY - ghost.pixelY);
        if (distance < 12) {
          if (ghost.frightened && !ghost.eaten) {
            // Eat ghost
            ghost.eaten = true;
            ghost.frightened = false;
            ghost.speed = 3.0; // flies back fast
            setScore((prev) => prev + 200);
            if (synthRef.current) synthRef.current.playEatGhost();
          } else if (!ghost.frightened && !ghost.eaten) {
            // Eat player (die)
            if (synthRef.current) synthRef.current.playDeath();
            
            setLives((prev) => {
              const nextLives = prev - 1;
              if (nextLives <= 0) {
                setGameState("GAME_OVER");
              } else {
                initGameEntities(false); // Respawn without resetting map
              }
              return nextLives;
            });
          }
        }
      });
    };

    const drawMap = () => {
      const current = gameRef.current;
      for (let r = 0; r < MAP_ROWS; r++) {
        for (let c = 0; c < MAP_COLS; c++) {
          const tile = current.map[r][c];
          if (tile === 1) {
            // Retro cyan/blue walls
            ctx.fillStyle = "#0c152b";
            ctx.fillRect(c * TILE_SIZE, r * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            ctx.strokeStyle = "#00e5ff";
            ctx.lineWidth = 1.5;
            ctx.strokeRect(c * TILE_SIZE + 2, r * TILE_SIZE + 2, TILE_SIZE - 4, TILE_SIZE - 4);
          } else if (tile === 2) {
            // Neon pink dots
            ctx.fillStyle = "#ffb8ff";
            ctx.beginPath();
            ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 2.5, 0, Math.PI * 2);
            ctx.fill();
          } else if (tile === 3) {
            // Big blinking power pellets
            const isVisible = Math.floor(Date.now() / 250) % 2 === 0;
            if (isVisible) {
              ctx.fillStyle = "#00e5ff";
              ctx.shadowColor = "#00e5ff";
              ctx.shadowBlur = 10;
              ctx.beginPath();
              ctx.arc(c * TILE_SIZE + TILE_SIZE/2, r * TILE_SIZE + TILE_SIZE/2, 5.5, 0, Math.PI * 2);
              ctx.fill();
              ctx.shadowBlur = 0; // reset
            }
          } else if (tile === 4) {
            // Ghost gate line
            ctx.strokeStyle = "#a1a1aa";
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(c * TILE_SIZE, r * TILE_SIZE + TILE_SIZE/2);
            ctx.lineTo((c + 1) * TILE_SIZE, r * TILE_SIZE + TILE_SIZE/2);
            ctx.stroke();
          }
        }
      }
    };

    const drawPlayer = () => {
      const player = gameRef.current.player;
      const x = player.pixelX + TILE_SIZE/2;
      const y = player.pixelY + TILE_SIZE/2;
      const radius = 8.5;

      // Cat direction angle
      let baseAngle = 0;
      if (player.dirX === 1) baseAngle = 0;
      else if (player.dirX === -1) baseAngle = Math.PI;
      else if (player.dirY === 1) baseAngle = Math.PI / 2;
      else if (player.dirY === -1) baseAngle = -Math.PI / 2;

      // Draw Main Cat Face (Pac-Man shape styled white)
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(
        x,
        y,
        radius,
        baseAngle + player.mouthAngle,
        baseAngle + Math.PI * 2 - player.mouthAngle
      );
      ctx.lineTo(x, y);
      ctx.fill();

      // Draw Cat Ears (Triangles)
      ctx.fillStyle = "#ffffff";
      // Left Ear
      ctx.beginPath();
      ctx.moveTo(x - 6, y - 6);
      ctx.lineTo(x - 9, y - 13);
      ctx.lineTo(x - 2, y - 8);
      ctx.fill();
      // Left ear pink inner
      ctx.fillStyle = "#f4a0b0";
      ctx.beginPath();
      ctx.moveTo(x - 5, y - 7);
      ctx.lineTo(x - 7, y - 11);
      ctx.lineTo(x - 3, y - 8);
      ctx.fill();

      // Right Ear
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.moveTo(x + 2, y - 8);
      ctx.lineTo(x + 9, y - 13);
      ctx.lineTo(x + 6, y - 6);
      ctx.fill();
      // Right ear pink inner
      ctx.fillStyle = "#f4a0b0";
      ctx.beginPath();
      ctx.moveTo(x + 3, y - 8);
      ctx.lineTo(x + 7, y - 11);
      ctx.lineTo(x + 5, y - 7);
      ctx.fill();

      // Draw Eyes (blinking simple)
      const blink = Math.floor(Date.now() / 3000) % 2 === 0 && Math.floor(Date.now() / 100) % 2 === 0;
      ctx.fillStyle = "#1a1a1a";
      if (!blink) {
        // eyes open
        ctx.fillRect(x - 4, y - 3, 1.8, 2.5);
        ctx.fillRect(x + 2, y - 3, 1.8, 2.5);
      } else {
        // eyes closed (blink line)
        ctx.strokeStyle = "#1a1a1a";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x - 5, y - 2);
        ctx.lineTo(x - 2, y - 2);
        ctx.moveTo(x + 1, y - 2);
        ctx.lineTo(x + 4, y - 2);
        ctx.stroke();
      }

      // Small pink nose
      ctx.fillStyle = "#f4a0b0";
      ctx.fillRect(x - 0.7, y, 1.4, 1.4);
    };

    const drawGhosts = () => {
      const current = gameRef.current;
      current.ghosts.forEach((ghost) => {
        const x = ghost.pixelX + TILE_SIZE/2;
        const y = ghost.pixelY + TILE_SIZE/2;
        const radius = 8.5;

        if (ghost.eaten) {
          // Eaten: only target/scared neon eyes remain
          ctx.fillStyle = "#00e5ff";
          ctx.beginPath();
          ctx.arc(x - 3, y - 2, 2.5, 0, Math.PI * 2);
          ctx.arc(x + 3, y - 2, 2.5, 0, Math.PI * 2);
          ctx.fill();
          return;
        }

        // Color based on frightened state
        if (ghost.frightened) {
          const warn = current.frightenedTime < 100 && Math.floor(current.frightenedTime / 15) % 2 === 0;
          ctx.fillStyle = warn ? "#ffffff" : "#0022cc";
          ctx.shadowColor = warn ? "#ffffff" : "#0022cc";
        } else {
          ctx.fillStyle = ghost.color;
          ctx.shadowColor = ghost.color;
        }

        // Draw Ghost Body (standard classic ghost form)
        ctx.shadowBlur = 4;
        ctx.beginPath();
        ctx.arc(x, y - 1, radius, Math.PI, 0, false);
        ctx.lineTo(x + radius, y + radius);
        // Wavy bottom skirts
        const wave = Math.floor(Date.now() / 150) % 2 === 0 ? 2 : -2;
        ctx.lineTo(x + radius/2, y + radius - wave);
        ctx.lineTo(x, y + radius + wave);
        ctx.lineTo(x - radius/2, y + radius - wave);
        ctx.lineTo(x - radius, y + radius);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Draw Ghost Eyes
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(x - 3, y - 2, 3, 0, Math.PI * 2);
        ctx.arc(x + 3, y - 2, 3, 0, Math.PI * 2);
        ctx.fill();

        // Eye Pupils moving based on direction
        ctx.fillStyle = ghost.frightened ? "#ffb8ff" : "#000000";
        const px = ghost.dirX * 1.5;
        const py = ghost.dirY * 1.5;
        ctx.beginPath();
        ctx.arc(x - 3 + px, y - 2 + py, 1.3, 0, Math.PI * 2);
        ctx.arc(x + 3 + px, y - 2 + py, 1.3, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      if (gameState === "PLAYING") {
        updateGame();
      }

      // Draw Everything
      ctx.fillStyle = "#02040a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawMap();
      drawGhosts();
      drawPlayer();

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [gameState, highScore, initGameEntities]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-mono flex flex-col items-center justify-between pb-10 selection:bg-accent-neon selection:text-black">
      
      {/* Top Header Controls */}
      <header className="w-full max-w-4xl px-6 py-6 flex items-center justify-between border-b border-zinc-800">
        <Link 
          href="/#projects" 
          className="flex items-center space-x-2 text-xs uppercase border-2 border-zinc-800 hover:border-accent-neon bg-zinc-950 px-3.5 py-2 group transition-all duration-300 shadow-[3px_3px_0px_0px_#18181b]"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>[ Back to Projects ]</span>
        </Link>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 border-2 border-zinc-800 hover:border-accent-neon bg-zinc-950 text-zinc-400 hover:text-white transition-all cursor-pointer shadow-[3px_3px_0px_0px_#18181b]"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4 text-accent-neon" />}
          </button>

          <button
            onClick={() => {
              initGameEntities(true);
              setGameState("IDLE");
            }}
            className="flex items-center space-x-1.5 text-xs uppercase border-2 border-zinc-800 hover:border-accent-neon bg-zinc-950 px-3.5 py-2 transition-all cursor-pointer shadow-[3px_3px_0px_0px_#18181b]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </header>

      {/* Main Arcade Frame Casing */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 w-full max-w-lg">
        
        {/* Retro Gaming Console Frame */}
        <div className="w-full bg-zinc-950 border-4 border-zinc-800 shadow-[10px_10px_0px_0px_rgba(0,229,255,0.2)] p-4 rounded-none relative overflow-hidden">
          
          {/* Neon Light Strip Decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-neon via-pink-500 to-accent-neon shadow-[0_0_10px_rgba(0,229,255,0.8)]"></div>
          
          {/* CRT Glare Scanline Overlay */}
          <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-5 mix-blend-overlay z-10"></div>
          
          {/* Top Info Dashboard Display */}
          <div className="grid grid-cols-3 gap-2 border-b-4 border-zinc-800 pb-3 mb-4 text-center">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">SCORE</div>
              <div className="font-retro text-sm text-glow-retro text-accent-neon">{score}</div>
            </div>
            
            <div className="flex flex-col items-center justify-center">
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1.5">LIVES</div>
              <div className="flex space-x-1">
                {Array.from({ length: 3 }).map((_, idx) => (
                  <Heart
                    key={idx}
                    className={`w-3.5 h-3.5 ${
                      idx < lives 
                        ? "text-red-500 fill-red-500 animate-pulse text-glow-red" 
                        : "text-zinc-800"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 uppercase tracking-widest mb-0.5">HI-SCORE</div>
              <div className="font-retro text-sm text-white">{highScore}</div>
            </div>
          </div>

          {/* Interactive Screen Game Viewport */}
          <div className="relative border-4 border-zinc-900 bg-[#02040a] flex items-center justify-center overflow-hidden aspect-[19/21]">
            <canvas
              ref={canvasRef}
              width={MAP_COLS * TILE_SIZE}
              height={MAP_ROWS * TILE_SIZE}
              className="block select-none pointer-events-none w-full max-w-[380px]"
            />

            {/* Screen Modals for states (IDLE, GAME OVER, VICTORY, PAUSED) */}
            {gameState === "IDLE" && (
              <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center p-6 z-20">
                <div className="animate-bounce font-retro text-glow-retro text-accent-neon text-xl mb-4 select-none">
                  SHIROO-MAN
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed max-w-xs mb-8">
                  Navigate Shiroo the pixel cat around the maze, eat all neon dots, and avoid the colorful ghosts! Eat large power pellets to turn the ghosts blue and eat them.
                </p>
                <button
                  onClick={startGame}
                  className="retro-btn-solid font-mono px-6 py-3 text-sm cursor-pointer flex items-center space-x-2 select-none"
                >
                  <Play className="w-4 h-4 fill-black" />
                  <span>[ PRESS START ]</span>
                </button>
              </div>
            )}

            {gameState === "PAUSED" && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 select-none">
                <div className="font-retro text-glow-retro text-white text-lg mb-6 animate-pulse">
                  GAME PAUSED
                </div>
                <button
                  onClick={() => setGameState("PLAYING")}
                  className="retro-btn px-6 py-2.5 text-xs cursor-pointer"
                >
                  [ RESUME ]
                </button>
              </div>
            )}

            {gameState === "GAME_OVER" && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6 z-20 select-none">
                <div className="font-retro text-red-500 text-glow-red text-xl mb-4">
                  GAME OVER
                </div>
                <div className="text-xs text-zinc-500 mb-6">FINAL SCORE: <span className="text-accent-neon">{score}</span></div>
                <button
                  onClick={startGame}
                  className="retro-btn-solid px-6 py-3 text-xs cursor-pointer flex items-center space-x-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-black" />
                  <span>[ PLAY AGAIN ]</span>
                </button>
              </div>
            )}

            {gameState === "VICTORY" && (
              <div className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center text-center p-6 z-20 select-none">
                <div className="font-retro text-glow-retro text-green-400 text-xl mb-4">
                  VICTORY!
                </div>
                <div className="text-xs text-zinc-500 mb-2">WELL DONE! SHIROO CLEARED THE MAZE!</div>
                <div className="text-xs text-zinc-500 mb-8">FINAL SCORE: <span className="text-accent-neon">{score}</span></div>
                <button
                  onClick={startGame}
                  className="retro-btn-solid px-6 py-3 text-xs cursor-pointer flex items-center space-x-2"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-black" />
                  <span>[ PLAY AGAIN ]</span>
                </button>
              </div>
            )}
          </div>

          {/* Arcade Cabinet Casing Footer Branding */}
          <div className="mt-3.5 flex justify-between items-center text-[9px] text-zinc-600 font-mono tracking-widest select-none uppercase">
            <span>[ SYSTEM // SHIROO_ARCADE_CAB ]</span>
            <span>v1.0.3</span>
          </div>

        </div>

        {/* Mobile Responsive Touch D-PAD Controllers */}
        <div className="w-full mt-6 grid grid-cols-3 gap-2 max-w-[200px] select-none">
          <div></div>
          <button
            onTouchStart={() => handleKeyPress(0, -1)}
            onMouseDown={() => handleKeyPress(0, -1)}
            className="flex items-center justify-center p-4 border-2 border-zinc-800 hover:border-accent-neon active:bg-zinc-900 bg-zinc-950 font-bold active:text-accent-neon outline-none text-zinc-500 transition-colors"
          >
            ▲
          </button>
          <div></div>

          <button
            onTouchStart={() => handleKeyPress(-1, 0)}
            onMouseDown={() => handleKeyPress(-1, 0)}
            className="flex items-center justify-center p-4 border-2 border-zinc-800 hover:border-accent-neon active:bg-zinc-950 font-bold active:text-accent-neon outline-none text-zinc-500 transition-colors"
          >
            ◀
          </button>
          <div className="flex items-center justify-center text-[9px] font-mono text-zinc-700">D-PAD</div>
          <button
            onTouchStart={() => handleKeyPress(1, 0)}
            onMouseDown={() => handleKeyPress(1, 0)}
            className="flex items-center justify-center p-4 border-2 border-zinc-800 hover:border-accent-neon active:bg-zinc-900 bg-zinc-950 font-bold active:text-accent-neon outline-none text-zinc-500 transition-colors"
          >
            ▶
          </button>

          <div></div>
          <button
            onTouchStart={() => handleKeyPress(0, 1)}
            onMouseDown={() => handleKeyPress(0, 1)}
            className="flex items-center justify-center p-4 border-2 border-zinc-800 hover:border-accent-neon active:bg-zinc-900 bg-zinc-950 font-bold active:text-accent-neon outline-none text-zinc-500 transition-colors"
          >
            ▼
          </button>
          <div></div>
        </div>

        {/* Keyboard interaction instructions tips */}
        <div className="mt-4 hidden sm:flex items-center justify-center space-x-6 text-[10px] text-zinc-500 select-none uppercase">
          <span className="flex items-center space-x-1">
            <Zap className="w-3 h-3 text-accent-neon" />
            <span>WASD / Arrow Keys to Move</span>
          </span>
          <span className="flex items-center space-x-1">
            <Award className="w-3 h-3 text-accent-neon" />
            <span>Spacebar to Pause</span>
          </span>
        </div>

      </main>

      {/* Decorative footer */}
      <footer className="text-[10px] text-zinc-700 select-none font-mono">
        © {new Date().getFullYear()} DavenPorto. Shiroo.exe is a registered trademark of cuteness.
      </footer>

    </div>
  );
}
