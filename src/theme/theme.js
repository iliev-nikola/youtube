import { DARK_MODE, LIGHT_MODE } from './theme.reducer';

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
        const theme = getState().theme;
        // db.collection('videos2').doc(id).update({ likes: likes.likes + 1 });
        let bgColor, textColor, bgColor2, headerColor, hovColor, titColor, fontCol, searchCol, searchBord, tColor, bColor;
        let gColor;
        switch (theme.theme) {
            case 'dark':
                theme.theme = 'light';
                bgColor = '#181818';
                bgColor2 = '#202020';
                textColor = '#000';
                headerColor = '#e3e3e3';
                hovColor = '#383838';
                titColor = '#dfdfdf';
                fontCol = '#9d9d9d';
                searchCol = '#323232';
                searchBord = '#2c2c2c';
                tColor = '#ffffff';
                bColor = '#3c9ff4';
                gColor='#717171';
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
                tColor = '#181818';
                bColor = '#5993e0';
                gColor = '#828282';
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
        document.querySelector('body').style.setProperty('--t-color', tColor);
        document.querySelector('body').style.setProperty('--b-color', bColor);
        document.querySelector('body').style.setProperty('--g-color', gColor);
    }
}
