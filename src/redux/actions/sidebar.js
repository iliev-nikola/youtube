export const SIDEBAR_OPEN = 'SIDEBAR_OPEN';
export const SIDEBAR_CLOSE = 'SIDEBAR_CLOSE';
export const TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR';

export const setOpenSidebar = () => ({
    type: SIDEBAR_OPEN,
});

export const setCloseSidebar = () => ({
    type: SIDEBAR_CLOSE,
});

export const toggleSidebar = () => ({
    type: TOGGLE_SIDEBAR,
});