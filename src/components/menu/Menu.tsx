import {  NavLink } from 'react-router-dom'
import './menu.scss'

import { menu } from '../../data'
import { useContext } from 'react';
import { DarkModeContext } from '../../context/mode';
import MenuIcon from '../menuIcon/MenuIcon';







const Menu = ()=> {
    const { isMenuExpanded } = useContext(DarkModeContext);






    return (
        <aside className='menu'>
            {
                menu?.map(item=>(
                <div className="item" key={item?.id}>
                    <span className={`title ${!isMenuExpanded && 'titleClose'}`}>{item.title?.toUpperCase()}</span>

                    {
                        item?.listItems?.map(list=>(
                            <NavLink 
                                key={list?.id}
                                to={list?.url} 
                                className={({isActive, isPending})=> isPending ? 'pending link' : isActive ? `active link ${!isMenuExpanded && 'listClose'}`  : `link ${!isMenuExpanded && 'listClose'}`  }>

                                    <MenuIcon Icon={list.icon}/>
                                    {
                                        isMenuExpanded &&
                                    <span className="listItemTitle">{list?.title}</span>
                                    }
                            </NavLink>

                        ))

                    }
                </div>

                ))
            }
            
        </aside>
    )
}

export default Menu