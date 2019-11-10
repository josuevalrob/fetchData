
import React, {useState, useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedTable from './VirtualizedTable' //presentation 🎨
import {orderBy} from 'lodash'
export default function ReactVirtualizedTable({rows}) { //logic 🧠
  const [list, setList] = useState([])
  const [sorts, setSort] = useState({sortBy:'last_name', sortDirection:'ASC'})
  // const [word, setWord] = useState("")
  
  useEffect(()=>setList(rows), [rows])
  useEffect(()=>{
    const {sortBy, sortDirection} = sorts
    setList(list => orderBy(list, sortBy, sortDirection.toLowerCase()))
  }, [sorts])

  return (
    <Paper style={{ height: 400, width: '100%' }}>
      {!!list.length 
        ? <VirtualizedTable //separate logic component from presentational component 🎨🧠
            rowCount={list.length}
            rowGetter={({ index }) => list[index]}
            sort={({sortBy, sortDirection}) => setSort({sortBy, sortDirection})}
            sortBy={sorts.sortBy}
            sortDirection={sorts.sortDirection}
            columns={[
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
            ]}
            />
        : <CircularProgress /> //💅
      }
    </Paper>
  );
}