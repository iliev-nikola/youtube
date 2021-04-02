export const getUser = store => store.user.user;
export const getUserID = state => getUser(state).uid;