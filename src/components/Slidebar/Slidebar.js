import React from 'react';
import styles from './Slidebar.module.css';
import { Tooltip } from '@material-ui/core';
export default function Slidebar({ Icon, type, slidebar }) {
    return (
        <Tooltip title={type} placement="right-end">
            <div className={slidebar ? styles.open : styles.slidebars}>
                <Icon />
                <div className={slidebar ? styles.openTitle : styles.closeTitle}>{type}</div>
            </div>
        </Tooltip>
    )
}
