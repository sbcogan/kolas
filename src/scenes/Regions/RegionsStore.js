// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class RegionsStore {
  @observable regions: Object[] = [];
  @observable loading: boolean = true;

  @action
  getRegions = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/regions', {});
      if (res.data) {
        this.regions = res.data;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default RegionsStore;
