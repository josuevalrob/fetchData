
import React from 'react';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import VirtualizedTable from './VirtualizedTable'

export default function ReactVirtualizedTable({rows}) {
  return (
    <Paper style={{ height: 400, width: '100%' }}>
      {!!rows.length 
        ? <VirtualizedTable
          rowCount={rows.length}
          rowGetter={({ index }) => rows[index]}
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