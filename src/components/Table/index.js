import React from 'react'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const Table = ({ singleTable, shuffleAndDeal }) => {
    const { _id, deck } = singleTable
    
    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {deck && deck.map(card => (
                <p>{card.rank} of {card.suit}</p>
            ))}
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, deck) => dispatch(shuffleAndDeal(tableId, deck))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))