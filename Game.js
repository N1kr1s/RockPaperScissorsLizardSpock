import { startConfetti, stopConfetti } from './confetti.js';
class Game {
    constructor() {
        this.choices = [
            { name: 'Rock', defeats: ['scissors', 'lizard'] },
            { name: 'Paper', defeats: ['rock', 'spock'] },
            { name: 'Scissors', defeats: ['paper', 'lizard'] },
            { name: 'Lizard', defeats: ['paper', 'spock'] },
            { name: 'Spock', defeats: ['scissors', 'rock'] },
        ];
        this.playerMadeChoice = false;
        this.playerCount = 0;
        this.computerCount = 0;
        this.player = document.getElementById('player');
        this.computer = document.getElementById('computer');
        this.playerChoice = document.getElementById('playerChoice');
        this.computerChoice = document.getElementById('computerChoice');
        this.startGame();
        this.resultText = document.getElementById('resultText');
        this.playerScore = document.getElementById('playerScore');
        this.computerScore = document.getElementById('computerScore');
        this.resetIcon = document.querySelector('.reset-icon');
        this.resetIcon.addEventListener('click', () => window.location.reload());
    }
    startGame() {
        for (let i = 1; i < this.player.children.length; i++) {
            this.player.children[i].addEventListener('click', (e) => {
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
    toggleActivePlayerClass(e) {
        for (let i = 1; i < this.player.children.length; i++) {
            if (this.player.children[i].classList.contains('selected')) {
                this.player.children[i].classList.remove('selected');
            }
        }
        e.target.classList.add('selected');
        this.playerChoice.innerText = `-->${e.target.title}`;
        return e.target.title;
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
        this.computerChoice.innerText = `-->${this.computer.children[value].title}`;
        return this.computer.children[value].title;
    }
    winLooseLogic(user, comp) {
        this.choices.forEach((value) => {
            if (value.name === user && value.defeats.includes(comp.toLowerCase())) {
                startConfetti();
                setTimeout(() => {
                    stopConfetti();
                }, 2000);
                this.resultText.innerText = 'You Won!';
                this.playerCount++;
                this.playerScore.innerText = this.playerCount.toString();
            }
            else if (value.name === comp &&
                value.defeats.includes(user.toLowerCase())) {
                stopConfetti();
                this.resultText.innerText = 'You Lost';
                this.computerCount++;
                this.computerScore.innerText = this.computerCount.toString();
            }
            else if (user === comp) {
                stopConfetti();
                this.resultText.innerText = 'Draw!';
            }
        });
    }
}
const game = new Game();
