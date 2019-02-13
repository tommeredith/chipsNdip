import React from 'react'
import lifecycle from 'react-pure-lifecycle'
import { connect } from 'react-redux'
import { fetchTableById } from '../../actions/fetchTableById'
import { shuffleAndDeal } from '../../actions/shuffleAndDeal'
import { deleteTable } from '../../actions/deleteTable';

const lifecycleMethods = {
    componentWillMount({ match, grabSingleTable }){
        grabSingleTable(match.params.tableId)
    }
}

const Table = ({ singleTable, shuffleAndDeal, deleteTable }) => {
    const { _id, deck, users } = singleTable
    
    return (
        <section>
            <h2>Table: {singleTable.title}</h2>

            <button onClick={() => shuffleAndDeal(_id, deck)}>shuffle and deal</button>

            {users && users.map(user => (
                <p>{user.name}</p>
            ))}
            <button onClick={() => deleteTable(_id)}>delete table</button>
        </section>
    )
}

const mapDispatchToProps = dispatch => ({
    grabSingleTable: tableId => dispatch(fetchTableById(tableId)),
    shuffleAndDeal: (tableId, deck) => dispatch(shuffleAndDeal(tableId, deck)),
    deleteTable: tableId => dispatch(deleteTable(tableId))
})

const mapStateToProps = state => ({
    singleTable: state.singleTable.table
})

export default connect(mapStateToProps, mapDispatchToProps)(lifecycle(lifecycleMethods)(Table))