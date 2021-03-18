import React from 'react';
import styles from './Slidebar.module.css';
export default function Slidebar({ Icon, type }) {
    return (
        <div className={styles.slidebars}>
            <Icon />
            <div>{type}</div>
        </div>
    )
}
