import React from 'react'

const Card = ({card}) => {

    return (
        <div>
            {card.rank} of {card.suit}
        </div>
    )
}

export default Card