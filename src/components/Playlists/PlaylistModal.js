import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import { Modal, FormControlLabel, Checkbox, TextField, List, Button } from '@material-ui/core';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import styles from './Playlists.module.scss';
import { addVideoToPlaylist, createPlaylist, removeVideoFromPlaylist } from '../../service';
import DeleteIcon from '@material-ui/icons/Delete';
import { deletePlaylist } from '../../service';
import PopUp from '../OpenVideo/PopupState';
import { setAlertOn } from '../../redux/actions/alertNotifier';
import { getPlaylists } from '../../redux/actions/playlists';

export default function PlaylistModal({ video }) {
    const user = useSelector(getUser);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlist.playlists);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (user) {
            dispatch(getPlaylists(user));
        }
    }, [user]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleKeyPress = (e) => {
        if ((e.key === 'Enter' || e.type === 'click') && inputValue) {
            createPlaylist(user, inputValue);
            setInputValue('');
        }
    }

    const addOrRemoveVideo = (e, playlist) => {
        if (e.target.checked) {
            if (playlist.videos.some(el => el.authorID === user.uid)) {
                return;
            }
            addVideoToPlaylist(video, playlist.id);
            dispatch(setAlertOn('info', `Added to ${playlist.name}`));
        } else {
            removeVideoFromPlaylist(video, playlist.id);
            dispatch(setAlertOn('info', `Removed from ${playlist.name}`));
        }
    }
    const text = 'Sign in to add this video to a playlist.';
    const loggedUserPlaylist = (
        <div onClick={handleOpen}><PlaylistAddIcon /> <span>SAVE</span></div>
    );
    const unloggedUserPlaylist = (
        <div><PopUp text={text} button={<><PlaylistAddIcon /><span>SAVE</span></>} content={'Want to watch this again later?'} /></div>
    );

    return (
        <div>
            <div className={styles.playlistContainer}>
                {user ? loggedUserPlaylist : unloggedUserPlaylist}
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={styles.modalContainer}>
                    <List>
                        {
                            playlists ? playlists.map((playlist, index) => (
                                <div className={styles.playlist} key={playlist.id}>
                                    <FormControlLabel
                                        key={index}
                                        control={<Checkbox
                                            onClick={(e) => { addOrRemoveVideo(e, playlist) }}
                                            name={playlist.name} value={playlist.name}
                                            checked={playlist.videos.some(el => el.authorID === user.uid)} />}
                                        label={playlist.name} />
                                    <DeleteIcon onClick={() => deletePlaylist(playlist.id)} className={styles.trash} />
                                </div>
                            )) : null}
                    </List>
                    <TextField id="standard-basic" placeholder={'Enter playlist name...'} value={inputValue} onKeyPress={handleKeyPress} onChange={(e) => onInputChange(e)} />
                    <div><Button variant="contained" color="secondary" onClick={handleKeyPress}>CREATE</Button></div>
                </div>
            </Modal>
        </div>
    )
}