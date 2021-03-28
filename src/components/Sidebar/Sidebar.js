import React from 'react';
import styles from './Sidebar.module.scss';
import { Tooltip } from '@material-ui/core';
export default function Sidebar({ Icon, type, sidebar }) {
    return (
        <Tooltip title={type} placement="right">
            <div className={sidebar ? styles.open : styles.sidebars}>
                <Icon />
                <div className={sidebar ? styles.openTitle : styles.closeTitle}>{type}</div>
            </div>
        </Tooltip>
    )
}
