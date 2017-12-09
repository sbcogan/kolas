// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

type Gender = 'mens' | 'womens';

class KolasStore {
  @observable mensRankings: Array<Object> = [];
  @observable womensRankings: Array<Object> = [];
  @observable activeGender: Gender = 'mens';

  @action
  getRankings = async (): Promise<*> => {
    try {
      const res = await getRequest(`/api/rankings/${this.activeGender}`, {});
      if (res.data) {
        if (this.activeGender === 'mens') {
          this.mensRankings = res.data;
        } else {
          this.womensRankings = res.data;
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  @action changeGender = (gender: Gender) => (this.activeGender = gender);
}

export default KolasStore;
