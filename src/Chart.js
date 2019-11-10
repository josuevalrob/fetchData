import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';

export default function Chart({rows}) {
  const [data, setData] = React.useState([])
  React.useEffect(()=>{
    setData(removeDuplicatesAndKeepMax(rows))
  }, [rows])
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
          <XAxis dataKey="country" />
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

const removeDuplicatesAndKeepMax = (rows) => 
	rows
	.sort((a,b) => b.score - a.score) //just keep the highst value
	.filter((v,i,a) => //filter repetitive countries
		a.findIndex(t => (t.country === v.country))===i)
	.sort((a,b) => //order by country name, just for make it more dinamic
		(a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))