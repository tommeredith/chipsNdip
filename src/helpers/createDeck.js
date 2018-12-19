import _ from 'underscore'

export const createDeck = () => {
    let deck = []

    for (let suits = 1; suits <= 4; suits++) {
        let suit
        switch (suits) {
            case 1:
                suit = 'hearts'
                break;
            case 2:
                suit = 'spades'
                break;
            case 3:
                suit = 'clubs'
                break;
            case 4:
                suit = 'diamonds'
                break;
            default:
                break;
        }
        
        for (let rank = 1; rank <= 13; rank++) {
            let rankNum = rank
            switch (rank) {
                case 1:
                    rankNum = "ace"
                    break;
                case 11: 
                    rankNum = 'jack'
                    break;

                case 12:
                    rankNum = 'queen'
                    break;
                
                case 13:
                    rankNum = 'king'
                    break;

                default:
                    break;
            }

            let cardObj = {rank: rankNum, suit}

            deck.push(cardObj)
            
        }
    }

    let shuffledDeck = _.shuffle(deck)


    return shuffledDeck
}