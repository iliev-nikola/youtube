import React from 'react';
import styles from './Slidebar.module.css';
export default function Slidebar({ Icon, type, slidebar }) {
    return (
        <div className={slidebar ? styles.open : styles.slidebars}>
            <Icon />
            <div className={slidebar ? styles.openTitle : styles.closeTitle}>{type}</div>
        </div>
    )
}
