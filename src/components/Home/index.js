import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchTables } from '../../actions/fetchTables'
import { createTable } from '../../actions/createTable'
import { removeUserInStorage } from '../../actions/userInStorage';

const Home = ({ fetchAllTables, allTables, createTable, authedUser, signOutUser }) => {
    const [newTableInputValue, setTableInputValue] = useState('')
    const [newTableSeats, setNewTableSeats] = useState('2')

    const tableMap = allTables.map(table => {
        return (
            <li>
                <Link to={`/table/${table._id}`}>{table.title}</Link>
            </li>
        )
    })
    return (
        <div data-cy-home-wrap data-cy-user-id={authedUser._id}>
            <h3>Welcome back, {authedUser.username}  <button onClick={() => signOutUser(authedUser)}>logout</button></h3>
           
            <p>create new table:</p>
            <input onChange={(e) => setTableInputValue(e.target.value)} type="text"/>
            <p># of seats</p>
            <select onChange={(e) => setNewTableSeats(e.target.value)}>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button onClick={() => createTable(newTableInputValue, newTableSeats, authedUser)}>here</button>
            
            
            <p>list all tables: </p>
            <button onClick={() => fetchAllTables()}>here</button>

            <ul>
                {tableMap}
            </ul>
        </div>
    )
}

const mapStateToProps = state => ({
    allTables: state.tables.tables,
    authedUser: state.user.user
})

const mapDispatchToProps = dispatch => ({
    fetchAllTables: () => dispatch(fetchTables()),
    createTable: (tableInput, tableSeats, currentUser) => dispatch(createTable(tableInput, tableSeats, currentUser)),
    signOutUser: () => dispatch(removeUserInStorage())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)