
import { topDealUsers } from '../../data'
import './topbox.scss'


const Topbox = ()=> {
    return (
        <main className='topbox'>
            <h1>Top Deals</h1>
            
            <section className="list">
                { topDealUsers?.map(user =>(
                        <div key={user?.id} className='listItem'>
                            <div className="user">
                                <img src={user?.img} alt="" />
                                <div className="userTexts">
                                    <span className="username">{user?.username}</span>
                                    <div className="email">{user?.email}</div>
                                </div>
                            </div>
                            <span className="amount">${user?.amount}</span>
                        </div>
                ))
                }

            </section>
        </main>
    )
}

export default Topbox