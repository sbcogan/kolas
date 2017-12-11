// @flow
import { observable, action } from 'mobx';

type Gender = 'mens' | 'womens';

class KolasStore {
  @observable activeGender: Gender = 'mens';
  @observable activeGender: Gender = 'mens';
  @observable queryString: string = '';

  @action
  changeQuery = (query: string) => {
    this.queryString = query;
  };

  @action changeGender = (gender: Gender) => (this.activeGender = gender);
}

export default KolasStore;
