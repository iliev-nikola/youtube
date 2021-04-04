export const getAlertState = state => state.alert;
export const getAlertStatus = state => getAlertState(state).isOpen;
export const getAlertType = state => getAlertState(state).type;
export const getAlertMessage = state => getAlertState(state).message;