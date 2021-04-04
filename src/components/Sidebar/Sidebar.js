import React from 'react';
import styles from './Sidebar.module.scss';
import { Tooltip } from '@material-ui/core';
export default function Sidebar({ Icon, type}) {
    return (
        <Tooltip title={type} placement="right">
            <div className={styles.sidebars}>
                <Icon />
            </div>
        </Tooltip>
    )
}
