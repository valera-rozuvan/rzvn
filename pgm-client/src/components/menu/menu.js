import React from 'react'
import { Link } from "react-router-dom"
import './menu.scss'


const Menu = (props) => {
    const items = [
        { link: '/keys', text: 'authorization' },
        { link: '/msg', text: 'messenger' },
        { link: '/about', text: 'about us' },
        { link: '/license', text: 'license' },
        { link: '/contact', text: 'contact us' }
    ];

    return (
        <div className={props.menuToggle ? 'menu-open' : 'menu-open-hide'} >
            <div className="menu-top-row">
                <div className="day-night-container">
                    <input type="checkbox" className="day-night" />
                </div>
                <button onClick={props.closeMe} className="menu-close" type="button" aria-label="close menu">
                    <svg className="close-menu-svg" width="20px" height="20px">
                        <use className="icon-menu-close" href="./sprite.svg#icon-menu-close"></use>
                    </svg>
                </button>
            </div>
            <ul className="list menu-list">
                {items.map(item => (
                    <li className="menu-item" key={item.link}>
                        <Link to={item.link} onClick={props.closeMe}>{item.text}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export { Menu }
