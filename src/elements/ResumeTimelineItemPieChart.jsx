
import React from 'react'
import { withRouter } from 'react-router-dom';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer
} from 'recharts'

import {
  Box
} from '@mui/material'

class ResumePieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: {
        ...props,
      },
      activeIndex: 0,
    };
    this.theme = this.props.theme;
    this.onPieEnter = this.onPieEnter.bind(this)
    // this.data = props.data
  }

  createLabelLines(props) {
    let {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      color,
      startAngle,
      endAngle,
    } = props;
    const RADIAN = Math.PI / 180;
    const diffAngle = endAngle - startAngle;
    const radius = innerRadius + (outerRadius - innerRadius);
    let path = '';
    for (let i = 0; i < (360 - diffAngle) / 15; i++) {
      path += `${cx + (radius + i) * Math.cos(-midAngle * RADIAN)},${
        cy + (radius + i * i) * Math.sin(-midAngle * RADIAN)
      } `;
    }
    return <polyline points={path} stroke={color} fill="none" />;
  }

  onPieEnter(_, index) {
    const activeIndex = index
    console.log(`mount entered _ value`)
    console.log(`index ${index}`)
    console.log(_)
    this.setState((state) => ({
      ...state,
      activeIndex
    }))
  }

  createActiveShape(props) {
    const RADIAN = Math.PI / 180
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        {/* <text x={cx} y={cy} dy={8} textAnchor={textAnchor} fill={fill}>
          {payload.name}
        </text> */}
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
          fontSize={5}
        >{`${payload.name}: ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
          fontSize={5}
        >
          {`(Percentage ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  }

  createLabel({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    value,
    color,
    startAngle,
    endAngle,
  }) {
    console.log(`logging the createLabel function parameters`);
    console.log({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      name,
      value,
      color,
      startAngle,
      endAngle,
    });
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius + Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);
    return (

      <text
        x={x}
        y={y}
        fill='white'
        dominantBaseline="central"
        textAnchor={x > cx ? 'start' : 'end'}
      >
        {name}
      </text>
    );
  }

  componentDidMount() {
    console.log(`
    A PieChart component has loaded
    `);
  }

  render() {
    return (
      <ResponsiveContainer width='100%' height={200}>
        {/* <div
          sx={{
            width: 100,
            height: 100
          }}
        > */}
          <PieChart
            // width={200}
            // height={400}
            margin={{ right: 0, left: 0, top: 0, bottom: 20 }}
          >
            <Pie
              data={this.props.data}
              cx='35%'
              cy='50%'
              innerRadius={15}
              outerRadius={25}
              fill='#8884db'
              paddingAngle={5}
              dataKey='value'
              nameKey='name'
              activeIndex={this.state.activeIndex}
              activeShape={this.createActiveShape}
              onMouseEnter={this.onPieEnter}
            >
              {this.props.data.map((entry, index) => {
                return <Cell key={`cell-${index}`} fill={`${entry.color}`} />;
              })}
            </Pie>
          </PieChart>
        {/* </div> */}
      </ResponsiveContainer>
    );
  }
}

export default withRouter(ResumePieChart)