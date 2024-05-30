const [coin, cards] = [4, [3, 6, 7, 2, 1, 10, 5, 9, 8, 12, 11, 4]];
// result 5
// const [coin, cards] = [3, [1, 2, 3, 4, 5, 8, 6, 7, 9, 10, 11, 12]];
// result 2
// const [coin, cards] = [2, [5, 8, 1, 2, 9, 4, 12, 11, 3, 10, 6, 7]];
// result 4
// const [coin, cards] = [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]];
// result 1

function solution(coin, cards) {

    class Game {
        constructor(coin) {
            this.hand = []; // [value, coinSelected]
            this.keep = []; // [value, coinSelected]
            this.dp = [];
            this.handCount = 0;
            this.index = 0;
            this.nPlusOne = cards.length + 1;
            this.coinCount = coin;
            this.round = 1;
            while(this.index < cards.length / 3) {
                this.hand.push([cards[this.index], false]);
                this.index ++;
                this.handCount ++;
            }
        }

        cardDraw() {
            if(this.index >= cards.length) return false; // false 게임 종료
            this.keep.push([cards[this.index], false]);
            this.index ++;
            return true;
        }

        // 선택된 카드 중에서 두장을 뽑기
        selectTwoCardInHand() {
            for(let i = 0; i < this.hand.length; i ++) {
                const [c1v, c1selected] = this.hand[i];
                if(c1selected) continue;
                for(let j = i; j < this.hand.length; j ++) {
                    const [c2v, c2selected] = this.hand[j];
                    if(c2selected) continue;

                    if(c1v + c2v === this.nPlusOne) {
                        this.hand[i][1] = true;
                        this.hand[j][1] = true;

                        return true;
                    }
                }
            }

            return false;
        }

        // 손에 카드 한장과 선택되지 않은 카드 한장
        selectTwoCardInHandAndKeep() {
            if(this.coinCount < 1) return false;

            for(let i = 0; i < this.hand.length; i ++) {
                const [c1v, c1selected] = this.hand[i];
                if(c1selected) continue;
                for(let j = 0; j < this.keep.length; j ++) {
                    const [c2v, c2selected] = this.keep[j];
                    if(c2selected) continue;

                    if(c1v + c2v === this.nPlusOne) {
                        this.hand[i][1] = true;
                        this.keep[j][1] = true;
                        this.coinCount --;

                        return true;
                    }
                }
            }

            return false;
        }

        // 선택되지 않은 카드 중에서 두개 뽑기
        selectTwoCardInKeep() {
            if(this.coinCount < 2) return false;

            for(let i = 0; i < this.keep.length; i ++) {
                const [c1v, c1selected] = this.keep[i];
                if(c1selected) continue;
                for(let j = i; j < this.keep.length; j ++) {
                    const [c2v, c2selected] = this.keep[j];
                    if(c2selected) continue;

                    if(c1v + c2v === this.nPlusOne) {
                        this.keep[i][1] = true;
                        this.keep[j][1] = true;
                        this.coinCount -= 2;

                        return true;
                    }
                }
            }
            return false;
        }

        start() {
            let end = false;
            if(!this.cardDraw()) return false;
            if(!this.cardDraw()) return false;

            if(!end) end = this.selectTwoCardInHand();
            if(!end) end = this.selectTwoCardInHandAndKeep();
            if(!end) end = this.selectTwoCardInKeep()

            if(end) this.round ++;

            return end;
        }

        startGame() {
            let result = true;

            while(result) {
                result = this.start();
            }
        }
    }

    const game = new Game(coin);
    game.startGame();
    return game.round;
}

console.log(solution(coin, cards));