import {
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts";
import './single.scss'


type Props  ={
    id: number;
    img?: string;
    title: string;
    info: object;
    chart?: {
        dataKeys: {name: string; color: string}[];
        data: object[]
    },

    activities?: {
        time: string; text:string
    }[]
}

const Single = (props: Props)=> {
    return (
        <div className='single'>
            <div className="view">
                <div className="info">
                    <div className="topInfo">
                        {
                            props?.img && 
                        <img src={props.img} alt="" />
                        }
                        <h1>{props.title}</h1>
                        <button>Update</button>
                    </div>

                    <div className="details">

                        {/* 
                         Object.entries on an object will turn the object to a List of list
                         [ [], [] ] by taking each value, the key turn to element index 0 while the value turn to element index of 1

                         EXP:
                             info: {
                                username: "Johndoe99",
                                fullname: "John Doe",
                                email: "johndoe@gmail.com",
                                phone: "123 456 789",
                                status: "verified",
                                },

                            Object.entries(info) =>
                            [
                                ['username', 'johndoe99'],
                                ['status', 'verified'],
                            ]
                        */}
                        {
                            Object.entries(props.info)?.map(item=>(
                                <div className="item" key={item[0]}>
                                    <span className="itemTitle">{item[0]}</span>
                                    <span className="itemValue">{item[1]}</span>
                                </div>

                            ))
                        }
                    </div>
                </div>
                <hr />
                <div className="chart">
                    {
                        props.chart && (

                        <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        width={500}
                        height={300}
                        data={props.chart.data}
                        margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        {props.chart.dataKeys.map((dataKey) => (
                        <Line
                            type="monotone"
                            dataKey={dataKey.name}
                            stroke={dataKey.color}
                        />
                        ))}
                    </LineChart>
                    </ResponsiveContainer>
                        )
                    }
                </div>
            </div>
            <div className="activities">
        <h2>Latest Activities</h2>
        {props.activities && (
          <ul>
            {props.activities.map((activity) => (
              <li key={activity.text}>
                <div>
                  <p>{activity.text}</p>
                  <time>{activity.time}</time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
        </div>
    )
}

export default Single