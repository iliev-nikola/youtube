export const getUser = state => state.user.user || {};
export const getUserID = state => getUser(state).uid;
export const getUserLoading = state => state.user.isLoading;