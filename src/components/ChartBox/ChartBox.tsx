
import { Link } from 'react-router-dom'
import './chartbox.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";
import React from 'react';

type Props = {
    color: string;
    icon: string;
    title: string;
    dataKey: string;
    number: number | string;
    percentage: number;
    chartData: object[];
  };



const ChartBox: React.FC<Props> = (props)=> {
    return (
        <main className="chartbox">
            <div className="boxInfo">
                <div className="title">
                    <img src={props.icon} alt="" />
                    <span>{props.title}</span>
                </div>
                <h1>{props.number}</h1>
                <Link to={'/'} style={{color: props.color, textDecoration: 'none'}}>
                  View all
                </Link>
            </div>

            <div className="chartInfo">
                <div className="chart">
                    <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={props.chartData}>
                        <Tooltip
                            contentStyle={{ background: "transparent", border: "none" }}
                            labelStyle={{ display: "none" }}
                            position={{ x: 10, y: 70 }}
                        />
                        <Line
                            type="monotone"
                            dataKey={props.dataKey}
                            stroke={props.color}
                            strokeWidth={2}
                            dot={false} 
                        />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="texts">
                    <span className="percentage" style={{color: props.percentage >= 0 ? 'limegreen' : 'tomato'}}>{props.percentage}%</span>
                    <span className="duration">this month</span>
                </div>
            </div>

        </main>
    )
}

export default ChartBox