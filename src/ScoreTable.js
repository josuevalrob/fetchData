
import React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedTable from './VirtualizedTable' //presentation 🎨

export default function ReactVirtualizedTable({rows}) { //logic 🧠
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      {!!rows.length 
        ? <VirtualizedTable //separate logic component from presentational component 🎨🧠
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
          sort={this._sort}
          sortBy={sortBy}
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