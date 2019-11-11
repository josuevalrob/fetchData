
import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedTable from './VirtualizedTable' //presentation 🎨
import {orderBy, filter, keys} from 'lodash'
import FilterTable from './FilterTable'
export default function ReactVirtualizedTable({rows}) { //logic 🧠
  const [list, setList] = useState([])
  const [sorts, setSort] = useState({sortBy:'last_name', sortDirection:'ASC'})
  const [filterData, setFilterData] = useState({word:'', column:[]})
  useEffect(()=>setList(rows), [rows])
  useEffect(()=>{
    const {sortBy, sortDirection} = sorts
    setList(list => orderBy(list, sortBy, sortDirection.toLowerCase()))
  }, [sorts])

  useEffect(()=>{
    const {word, column} = filterData
    console.log(word, column)
    const result = word.length > 3 ?  filter(rows, p => keys(column).some( k =>column[k] && rows[k] && rows[k].includes(word))) : rows
    console.log(result)
    setList(result)
  }, [filterData, rows])
  // debugger
  return (
    <React.Fragment>
    <FilterTable columns={opts} callFilter={setFilterData} />
    <Paper style={{ height: 400, width: '100%' }}>
      {!!list.length 
        ? <VirtualizedTable //separate logic component from presentational component 🎨🧠
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            sort={({sortBy, sortDirection}) => setSort({sortBy, sortDirection})}
            sortBy={sorts.sortBy}
            sortDirection={sorts.sortDirection}
            columns={opts}
            />
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