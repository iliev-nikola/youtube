export const getUserStore = store => store.user;
export const getUser = store => getUserStore(store).user;