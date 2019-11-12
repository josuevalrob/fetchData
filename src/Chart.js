import React, {useState, useEffect} from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import {groupBy, meanBy, keys} from 'lodash'
export default function Chart({rows, filterBy, loading}) {
  const [data, setData] = useState([])

  useEffect(()=>{ //component did update
    if(!!rows.length) {
      const obj = groupBy(rows, filterBy)
      const arr = keys(obj).map(k=> ({
        [filterBy] : k,
        score : meanBy(obj[k], 'score')
      }))
      setData(arr)
    }
  }, [filterBy, rows])

  return (
    <React.Fragment>
      <Title>Score statistics</Title>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey={filterBy} />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: 'middle' }}>
              Average score
            </Label>
          </YAxis>
          <Bar type="monotone" dataKey="score" fill="#556CD6" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}

// const removeDuplicatesAndKeepMax = (rows) =>  //no needed 💩
// 	rows
// 	.sort((a,b) => b.score - a.score) //just keep the highst value
// 	.filter((v,i,a) => //filter repetitive countries
// 		a.findIndex(t => (t.country === v.country))===i)
// 	.sort((a,b) => //order by country name, just for make it more dinamic
//     (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))

//  Show the average score of the people in the data set grouped by country 
//  or gender in a suitable visualization
// const avargeScore = (how, what) => {
//   return groupBy(what, )
// }
    