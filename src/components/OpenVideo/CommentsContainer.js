// react
import { useState } from 'react';
import { useHistory } from 'react-router';
import ReactTimeAgo from 'react-time-ago';
import styles from './OpenVideo.module.scss';
// service
import { updatedNotifications, createComments, deleteComment, updateComment, editableComment, uneditableComment } from '../../service/service';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import { setAlertOn } from '../../redux/actions/alertNotifier';
// components
import UserLogo from '../common/UserLogo/UserLogo';
import { Input, Button } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';

export default function CommentsContainer({ currentVideo, comments, id }) {
    const [inputValue, setInputValue] = useState('');
    const [editedComment, setEditedComment] = useState('');

    const history = useHistory();
    const dispatch = useDispatch();

    const user = useSelector(getUser);

    const onInputChange = (e) => {
        const value = e.currentTarget.value;
        if (value.length > 100) {
            return dispatch(setAlertOn('error', 'Comment should not exceed 100 characters!'));
        }
        setInputValue(value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && inputValue) {
            createComments(id, user, inputValue);
            updatedNotifications(currentVideo, user, 'comment');
            setInputValue('');
        }
    }

    const onEditChange = (e) => {
        const value = e.currentTarget.value;
        if (value.length > 100) {
            return dispatch(setAlertOn('error', 'Comment should not exceed 100 characters!'));
        }
        setEditedComment(value);
    }

    const updateIt = (e, id) => {
        if (e.key === 'Enter') {
            if (!editedComment) {
                return dispatch(setAlertOn('warning', 'Make some changes first.'));
            }
            updateComment(id, editedComment);
            setEditedComment('');
            dispatch(setAlertOn('success', 'Successfully edited comment.'));
        }
    }

    return (
        <div>
            <div className={styles.commentsContainer}>
                <div className={styles.numberComments}>{comments.length} Comments</div>
                <div onClick={() => !user.uid ? history.push('/signin') : null}>
                    < Input placeholder='Add a public comment...' className={styles.input}
                        onChange={onInputChange} onKeyPress={handleKeyPress} value={inputValue} />
                </div>
                {comments ?
                    comments.map((comment) => (
                        <div key={comment.commentID} className={styles.mainComm} >

                            <div onClick={() => history.push(`/user/${comment.userID}`)}>
                                <UserLogo author={comment.displayName} authorPhotoURL={comment.photoURL} />
                            </div>
                            <div className={styles.commentsContainer}>
                                <div className={styles.someComment}>
                                    <div className={styles.timeContainer}>
                                        <p className={styles.userName}>{comment.displayName}</p>
                                        {comment.timestamp ? <ReactTimeAgo className={styles.time}
                                            date={comment.timestamp.toDate()} locale="en-US" /> : null}
                                    </div>
                                    {comment.isEdit ? <div className={styles.editCommentContainer}>
                                        <Input
                                            defaultValue={comment.comment}
                                            onChange={onEditChange}
                                            onKeyPress={(e) => updateIt(e, comment.commentID)}
                                        />
                                        <Button onClick={() => uneditableComment(comment.commentID)} variant="contained" color="primary">Cancel</Button>
                                    </div>
                                        : <p className={styles.comment}>{comment.comment}</p>}
                                    <div className={styles.editContainer}>
                                        {user && user.uid === comment.userID ?
                                            <Edit key={comment.commentID} onClick={() => editableComment(comment.commentID)} /> : null}
                                        {user && (user.uid === comment.userID || user.uid === comment.authorID) ?
                                            <Delete onClick={() => deleteComment(comment.commentID)} /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    : <div className={styles.addFirstComment}>Add your first comment...</div>}
            </div>
        </div>
    )
}