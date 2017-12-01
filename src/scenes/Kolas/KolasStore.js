// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class KolasStore {
  @observable rankings: Object = {};

  @action
  getRankings = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/rankings', {});
      if (res.data) {
        this.rankings = res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default KolasStore;
