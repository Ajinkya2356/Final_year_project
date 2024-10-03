// src/actions/userActions.ts
export const loginUser = (userData: unknown) => ({
    type: 'LOGIN_USER',
    payload: userData,
});