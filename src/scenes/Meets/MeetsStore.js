// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';

class MeetsStore {
  @observable meets: Object[] = [];
  @observable activeMeetId: number;

  @computed
  get activeMeet(): Object {
    return this.meets.find(meet => meet.ID === this.activeMeetId) || {};
  }

  @action
  setActiveMeet = (id: number): void => {
    this.activeMeetId = id;
  };

  @action
  getMeets = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/meets', {});
      if (res.data) {
        this.meets = res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default MeetsStore;
