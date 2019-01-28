import React from 'react'
import { connect } from 'react-redux'
import { fetchTables } from '../../actions/fetchTables'

const Home = ({ fetchAllTables, allTables }) => {

    const tableMap = allTables.map(table => {
        return (
            <li>
                {table.title}
            </li>
        )
    })
    return (
        <div>
            <p>create new table:</p>
            <button>here</button>
            
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
    fetchAllTables: () => dispatch(fetchTables())
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Home)