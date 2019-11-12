
import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedTable from './VirtualizedTable' //presentation 🎨
import {orderBy, filter, keys, values} from 'lodash'
import FilterTable from './FilterTable'
export default function ReactVirtualizedTable({rows, loading}) { //logic 🧠
  const [list, setList] = useState([])
  const [sorts, setSort] = useState({sortBy:'last_name', sortDirection:'ASC'})
  const [filterData, setFilterData] = useState({word:'', column:{}})
  useEffect(()=>setList(rows), [rows])
  useEffect(()=>{
    const {sortBy, sortDirection} = sorts
    setList(list => orderBy(list, sortBy, sortDirection.toLowerCase()))
  }, [sorts])

  useEffect(()=>{
    const {word, column} = filterData
    const result = !values(column).some(v=>v===true)
      ? rows
      : filter(rows, obj =>         // callback
          keys(column)              // check per column
            .some(k=>               
              column[k] &&          // 1) check if the calum is select,
              obj[k]    &&          // 2) check if we have the obj property
              obj[k].includes(word) // 3) check the word on that column
        ))

    setList(result)
  }, [filterData, rows])
  return (
    <React.Fragment>
    <FilterTable columns={opts} callFilter={setFilterData} />
    <Paper style={{ height: 400, width: '100%' }}>
      {!loading 
        ? !!list.length
          ? <VirtualizedTable //separate logic component from presentational component 🎨🧠
              rowCount={list.length}
              rowGetter={({ index }) => list[index]}
              sort={({sortBy, sortDirection}) => setSort({sortBy, sortDirection})}
              sortBy={sorts.sortBy}
              sortDirection={sorts.sortDirection}
              columns={opts}
            />
          : <div>No results found</div>
        : <CircularProgress /> //💅
      }
    </Paper>
    </React.Fragment>
  );
}

const opts = [
  {
    label: 'Last name',
    dataKey: 'last_name',
  },
  {
    label: 'First name',
    dataKey: 'first_name',
  },
  {
    label: 'Gender',
    dataKey: 'gender',
  },
  {
    label: 'City',
    dataKey: 'city',
  },
  {
    label: 'Country',
    dataKey: 'country',
  },
]