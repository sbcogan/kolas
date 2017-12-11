// @flow
import * as React from 'react';
import { Provider } from 'mobx-react';

// stores
import UiStore from './UiStore';
import UserStore from './UserStore';
import QualificationStore from './QualificationStore';

export const ui = new UiStore();
export const user = new UserStore();
export const qual = new QualificationStore();

qual.getRankings('mens');
qual.getRankings('womens');

const StoreProvider = ({ children }: { children: React.Node }) =>
  <Provider ui={ui} user={user} qual={qual}>
    {children}
  </Provider>;

export default StoreProvider;
