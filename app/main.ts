import Game from './Game';

function main(args: string[] = []) {
    (<any>window).game = new Game();
    (<any>window).game.start();
}

main();