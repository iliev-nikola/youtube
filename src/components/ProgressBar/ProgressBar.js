import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './ProgressBar.module.scss'

export default function ProgressBar({ isOn }) {
    return (
        <div className={styles.bar}>
            {isOn ? <LinearProgress color="secondary" /> : null}
        </div>
    );
}