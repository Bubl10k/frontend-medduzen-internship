export const selectUserById = state => state.users.selectedUser;
export const selectUserState = state => state.users;
export const selectUser = (state, userId) => 
  state.users.users.results.find(user => user.id == userId);
