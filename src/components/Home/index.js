import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchTables } from '../../actions/fetchTables'
import { createTable } from '../../actions/createTable'

const Home = ({ fetchAllTables, allTables, createTable }) => {
    const [newTableInputValue, setTableInputValue] = useState('')
    const [newTableUsers, setNewTableUsers] = useState('1')

    const tableMap = allTables.map(table => {
        return (
            <li>
                <Link to={`/table/${table._id}`}>{table.title}</Link>
            </li>
        )
    })
    return (
        <div>
            <p>create new table:</p>
            <input onChange={(e) => setTableInputValue(e.target.value)} type="text"/>
            <p># of robot users</p>
            <select onChange={(e) => setNewTableUsers(e.target.value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
            </select>
            <button onClick={() => createTable(newTableInputValue, newTableUsers)}>here</button>
            
            
            <p>list all tables: </p>
            <button onClick={() => fetchAllTables()}>here</button>

            <ul>
                {tableMap}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    allTables: state.tables.tables
})

const mapDispatchToProps = dispatch => ({
    fetchAllTables: () => dispatch(fetchTables()),
    createTable: (tableInput, robotUsers) => dispatch(createTable(tableInput, robotUsers))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)