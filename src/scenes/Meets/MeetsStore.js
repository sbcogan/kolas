// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class MeetsStore {
  @observable meets: Object[] = [];

  @action
  getMeets = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/meets', {});
      if (res.data) {
        this.teams = res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default MeetsStore;