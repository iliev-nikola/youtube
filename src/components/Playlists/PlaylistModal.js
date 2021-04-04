import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import { Modal, FormControlLabel, Checkbox, TextField, List } from '@material-ui/core';
import styles from './PlaylistModal.module.scss';
import { getPlaylists } from '../../redux/actions/playlists';
import { addVideoToPlaylist, createPlaylist, removeVideoFromPlaylist } from '../../service';
export default function PlaylistModal({ video }) {
    const user = useSelector(getUser);
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    const playlists = useSelector(state => state.playlist.playlists);
    // const handleChange = (event) => {
    //     setState({[event.target.name]: event.target.checked });
    // };
    useEffect(() => {
        if (user) {
            console.log(user)
            dispatch(getPlaylists(user));
        }
    }, [user])
    const [open, setOpen] = useState(false);

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
        if (e.key === 'Enter' && inputValue) {
            createPlaylist(user, inputValue);
            setInputValue('');
        }
    }

    const addOrRemoveVideo = (e, playlist) => {
        if (e.target.checked) {
            addVideoToPlaylist(video, playlist.playlistID);
        } else {
            removeVideoFromPlaylist(video, playlist.playlistID);
        }
    }
    const body = (
        <div className={styles.modalContainer}>
            <List>
                {
                    playlists ? playlists.map((playlist, index) => (
                        <FormControlLabel key={index} control={<Checkbox onClick={(e) => { addOrRemoveVideo(e, playlist) }} name={playlist.playlistName} value={playlist.playlistName} />} label={playlist.playlistName} />
                    )) : null}
                <TextField id="standard-basic" label="Standard" value={inputValue} onKeyPress={handleKeyPress} onChange={(e) => onInputChange(e)} />
            </List>
        </div>
    );

    return (
        <div>
            <button type="button" onClick={handleOpen}>
                Open Modal
        </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
        </div>
    )
}