

import ChartBox from '../../components/ChartBox/ChartBox'
import BarChartBox from '../../components/barChartBox/BarChartBox'
import BigChartBox from '../../components/bigChartBox/BigChartbox'
import PieCartBox from '../../components/pieCartBox/PieCartBox'
import Topbox from '../../components/topBox/Topbox'
import { barChartBoxRevenue, barChartBoxVisit, chartBoxConversion, chartBoxProduct, chartBoxRevenue, chartBoxUser } from '../../data'
import './home.scss'


const Home = ()=> {
    return (
        <main className="home">
            <section className="box box1">
                <Topbox/>
            </section>
            <section className="box box2"><ChartBox {...chartBoxUser}/></section>
            <section className="box box3"><ChartBox  {...chartBoxProduct}/></section>
            <section className="box box4"><PieCartBox/></section>
            <section className="box box5">
                <ChartBox {...chartBoxConversion}/>
            </section>
            
            <section className="box box6">
            <ChartBox {...chartBoxRevenue}/>
            </section>
            <section className="box box7"><BigChartBox/></section>
            <section className="box box8"><BarChartBox {...barChartBoxVisit}/></section>
            <section className="box box9"><BarChartBox {...barChartBoxRevenue}/></section>
        </main>
    )
}

export default Home