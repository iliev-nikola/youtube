import { db } from '../../service/firebase';

export const FETCH_SUBSCRIBES = 'FETCH_SUBSCRIBES';

export const getSubscribes = (subscribes) => ({
    type: FETCH_SUBSCRIBES,
    payload: subscribes,
});


export const showSubscribes = (user) => {
    return function (dispatch) {
        db.collection('users').doc(user.uid)
            .onSnapshot((doc) => {
                let subscribes = [];
                doc.data().subscribes.forEach(el => {

                    db.collection('videos').where('authorID', '==', el).get()
                        .then(res => res.docs.map(el => el.data()))
                        .then(res => subscribes.push(...res));
                })
                dispatch(getSubscribes(subscribes));
            })
    }
};