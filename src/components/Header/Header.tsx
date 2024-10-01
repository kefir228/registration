import React from 'react'
import './Header.css'

import myImg from './img/13530435871582518280-128.png'

interface HeaderProps {
    log: string;
}

export const Header = ({ log}: HeaderProps) => {
    return (
        <div className='header'>
            <img className='img' src={myImg} alt="Logo" />
            <span className='log'>{log}</span>
        </div>
    )
}