import * as actions from './sync';
import * as api from '../api';


export const saveUsers = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  const users = getState().users;
  const isSucceeded = await api.saveAllUsers(users);
  dispatch(actions.endLoading());
  dispatch(
    actions.openModal(isSucceeded ? 'success' : 'error')
  );
};

const addUser = dispatch => user => dispatch(
  actions.addUser(user)
);

export const loadUsers = () => async (dispatch, getState) => {
  dispatch(actions.startLoading());
  const page = getState().pages + 1;
  const users = await api.loadAllUsers(page);
  users.forEach(addUser(dispatch));
  dispatch(actions.endLoading());
};