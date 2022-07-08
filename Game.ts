import { startConfetti, stopConfetti } from './confetti.js';

class Game {
  choices = [
    { name: 'Rock', defeats: ['scissors', 'lizard'] },
    { name: 'Paper', defeats: ['rock', 'spock'] },
    { name: 'Scissors', defeats: ['paper', 'lizard'] },
    { name: 'Lizard', defeats: ['paper', 'spock'] },
    { name: 'Spock', defeats: ['scissors', 'rock'] },
  ];
  player: HTMLDivElement;
  computer: HTMLDivElement;
  playerChoice: HTMLSpanElement;
  computerChoice: HTMLSpanElement;
  resultText: HTMLHeadingElement;
  playerMadeChoice: boolean = false;
  playerCount: number = 0;
  computerCount: number = 0;
  playerScore: HTMLSpanElement;
  computerScore: HTMLSpanElement;
  resetIcon: HTMLElement;
  constructor() {
    this.player = document.getElementById('player') as HTMLDivElement;
    this.computer = document.getElementById('computer') as HTMLDivElement;
    this.playerChoice = document.getElementById(
      'playerChoice'
    ) as HTMLSpanElement;
    this.computerChoice = document.getElementById(
      'computerChoice'
    ) as HTMLSpanElement;
    this.startGame();
    this.resultText = document.getElementById(
      'resultText'
    ) as HTMLHeadingElement;
    this.playerScore = document.getElementById(
      'playerScore'
    ) as HTMLSpanElement;
    this.computerScore = document.getElementById(
      'computerScore'
    ) as HTMLSpanElement;
    this.resetIcon = document.querySelector('.reset-icon') as HTMLElement;

    this.resetIcon.addEventListener('click', () => window.location.reload());
  }

  startGame() {
    for (let i = 1; i < this.player.children.length; i++) {
      this.player.children[i].addEventListener('click', (e: Event) => {
        const player = this.toggleActivePlayerClass(e);
        this.playerMadeChoice = true;
        if (this.playerMadeChoice) {
          const computer = this.toggleNemesisPlayerActiveClass();
          this.playerMadeChoice = false;
          this.winLooseLogic(player, computer);
        }
      });
    }
  }

  toggleActivePlayerClass(e: Event) {
    for (let i = 1; i < this.player.children.length; i++) {
      if (this.player.children[i].classList.contains('selected')) {
        this.player.children[i].classList.remove('selected');
      }
    }
    (e.target as HTMLElement).classList.add('selected');
    this.playerChoice.innerText = `-->${(e.target as HTMLElement).title}`;
    return (e.target as HTMLElement).title;
  }

  randomNumberGen() {
    return Math.floor(Math.random() * this.choices.length) + 1;
  }

  toggleNemesisPlayerActiveClass() {
    const value = this.randomNumberGen();
    for (let i = 1; i < this.computer.children.length; i++) {
      if (this.computer.children[i].classList.contains('selected')) {
        this.computer.children[i].classList.remove('selected');
      }
    }
    this.computer.children[value].classList.add('selected');
    this.computerChoice.innerText = `-->${
      (this.computer.children[value] as HTMLElement).title
    }`;
    return (this.computer.children[value] as HTMLElement).title;
  }

  winLooseLogic(user: string, comp: string) {
    this.choices.forEach((value) => {
      if (value.name === user && value.defeats.includes(comp.toLowerCase())) {
        startConfetti();
        setTimeout(() => {
          stopConfetti();
        }, 2000);
        this.resultText.innerText = 'You Won!';
        this.playerCount++;
        this.playerScore.innerText = this.playerCount.toString();
      } else if (
        value.name === comp &&
        value.defeats.includes(user.toLowerCase())
      ) {
        stopConfetti();
        this.resultText.innerText = 'You Lost';
        this.computerCount++;
        this.computerScore.innerText = this.computerCount.toString();
      } else if (user === comp) {
        stopConfetti();
        this.resultText.innerText = 'Draw!';
      }
    });
  }
}

const game = new Game();
