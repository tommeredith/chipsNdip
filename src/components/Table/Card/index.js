import React from 'react'

const Card = ({ rank, suit}) => {

    return (
        <div>
            {rank} of {suit}
        </div>
    )
}

export default Card