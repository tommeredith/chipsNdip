import React from 'react'
import { connect } from 'react-redux'
import { claimSeat } from '../../../actions/claimSeat'

const renderUsers = (users, authedUser, table, claimSeat) => {
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

const TableLayout = ({ table, authedUser, claimSeat }) => {
   const { users } = table

       
    const userAtTable = users && users.find(user => {
        return user._id == authedUser._id
    })

    return (
        <section className='table-wrap'>
            <div className='table'>
                {renderUsers(users, authedUser, table, claimSeat)}

                <div className='hand'>
                    <h3>Your Hand:</h3>
                    {userAtTable && renderHand(userAtTable.hand)}
                </div>
                
            </div>
        
        </section>
        
    )
}

const mapStateToProps = state => ({
    authedUser: state.user.user
})

const mapDispatchToProps = dispatch => ({
    claimSeat: (users, tableId, authedUser, seatIndex) => dispatch(claimSeat(users, tableId, authedUser, seatIndex)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TableLayout)