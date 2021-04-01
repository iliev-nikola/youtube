import { DARK_MODE, LIGHT_MODE } from './theme.reducer';
import { auth, db } from '../firebase';
import { getCurrentUser } from '../utils';
export const darkMode = (theme) => ({
    type: DARK_MODE,
    payload: theme
});

export const lightMode = (theme) => ({
    type: LIGHT_MODE,
    payload: theme
});


export const handleDarkMode = () => {
    return function (dispatch, getState) {

        // console.log(db.collection('users').doc(currentUser));

        // db.collection('users').doc(currentUser).get()
        //     .then(res => {
        //         console.log(res.data())
        //     })

        // let a = db.collection('users').where('uid', '==', currentUser).get()
        //     .then(res => {
        //         res.forEach(res => console.log(res.data().theme))
        //     })
        if (getCurrentUser()) {
            db.collection('users').doc(getCurrentUser().uid).get()
                .then(res => res.id);
        }
        const theme = getState().theme;
        // db.collection('videos2').doc(id).update({ likes: likes.likes + 1 });
        let bgColor, textColor, bgColor2, headerColor, hovColor, titColor, fontCol, searchCol, searchBord;
        switch (theme.theme) {
            case 'dark':
                theme.theme = 'light';
                // db.collection('users').where('uid', '==', currentUser).get()
                //     .then(res => {
                //         res.forEach(res => res.update({ theme: 'light' }));
                //     })
                bgColor = '#181818';
                bgColor2 = '#202020';
                textColor = '#000';
                headerColor = '#e3e3e3';
                hovColor = '#383838';
                titColor = '#dfdfdf';
                fontCol = '#9d9d9d';
                searchCol = '#323232';
                searchBord = '#2c2c2c';
                break;
            case 'light':
                theme.theme = 'dark';
                bgColor = '#f9f9f9';
                bgColor2 = '#ffffff';
                headerColor = '#606060';
                hovColor = '#f2f2f2';
                titColor = '#030303';
                fontCol = '#858585';
                searchCol = '#f8f8f8';
                searchBord = '#dadada';
                break;
            default:
                theme.theme = 'light';
                break;
        }
        document.querySelector('body').style.setProperty('--bg-color', bgColor);
        document.querySelector('body').style.setProperty('--text-color', textColor);
        document.querySelector('body').style.setProperty('--bg-color-32', bgColor2);
        document.querySelector('body').style.setProperty('--header-color', headerColor);
        document.querySelector('body').style.setProperty('--hov-color', hovColor);
        document.querySelector('body').style.setProperty('--tit-color', titColor);
        document.querySelector('body').style.setProperty('--font-color', fontCol);
        document.querySelector('body').style.setProperty('--search-color', searchCol);
        document.querySelector('body').style.setProperty('--search-bord', searchBord);
    }
}
