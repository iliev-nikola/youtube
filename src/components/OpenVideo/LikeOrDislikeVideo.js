import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import styles from './OpenVideo.module.scss';

export default function LikeOrDislikeVideo({ content, button }) {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <div variant="contained" {...bindTrigger(popupState)}>
                        {button}
                    </div>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box p={2} className={styles.messageContainer}>
                            <Typography>
                                <div>
                                    <div>{content}</div>
                                    <div className={styles.info}>Sign in to make your opinion count.</div>
                                    <a href="/signin" className={styles.signin}>SIGN IN</a>
                                </div>
                            </Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}