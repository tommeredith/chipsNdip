import React from 'react'
import { connect } from 'react-redux'
import { claimSeat } from '../../../actions/claimSeat'
import { setUserToReady } from '../../../actions/setUserToReady'

const renderUsers = (users, authedUser, table, claimSeat, setUserToReady) => {
    if (!users) {
        return
    }

    return users.map((user, index) => {
        const availableSeat = user.isFake && !authedUser.associatedTables.includes(table._id)
        const seatClass = `user seat${index + 1}_${table.seats}`
        return (
            <div className={seatClass} key={index}>
                <p>{user.username}</p>
                {availableSeat && (
                    <button onClick={() => claimSeat(users, table._id, authedUser, index)}>claim seat</button>
                )}
                {authedUser._id == user._id && !user.isReady && (
                    <button onClick={() => setUserToReady(users, table._id, authedUser)}>You ready?</button>
                )}
            </div>
        )
    })
}

const renderHand = hand => {
    if ( !hand ) {
        return
    }
 
     return (
        <div>
             {hand.map((card, index) => (
                 <p key={index}>{card.rank} of {card.suit}</p>
             ))}
        </div>
     )
}

const renderSharedCards = sharedCards => {
    if ( !sharedCards ) {
        return 
    }

    return (
        <div className="table-shared-cards">
            <h3>
                Shared Cards
            </h3>
            {
                sharedCards.map((card, index) => (
                    <p key={index}>{card.rank} of {card.suit}</p>
                ))
            }
        </div>
    )
}

const TableLayout = ({ table, authedUser, claimSeat, setUserToReady }) => {
   const { users } = table

       
    const userAtTable = users && users.find(user => {
        return user._id == authedUser._id
    })

    return (
        <section className='table-wrap'>
            <div className='table'>
                {renderUsers(users, authedUser, table, claimSeat, setUserToReady)}

                <div className='hand'>
                    <h3>Your Hand:</h3>
                    {userAtTable && renderHand(userAtTable.hand)}
                </div>
                
            </div>
            {table.sharedCards && renderSharedCards(table.sharedCards)}
        </section>
        
    )
}

const mapStateToProps = state => ({
    authedUser: state.user.user
})

const mapDispatchToProps = dispatch => ({
    claimSeat: (users, tableId, authedUser, seatIndex) => dispatch(claimSeat(users, tableId, authedUser, seatIndex)),
    setUserToReady: (users, tableId, authedUser) => dispatch(setUserToReady(users, tableId, authedUser))
})

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout)