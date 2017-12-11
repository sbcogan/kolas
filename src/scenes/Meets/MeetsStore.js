// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';

class MeetsStore {
  @observable meets: Object[] = [];
  @observable activeMeetId: number;
  @observable queryString: string = '';

  @computed
  get activeMeet(): Object {
    return this.meets.find(meet => meet.ID === this.activeMeetId) || {};
  }

  @computed
  get visibleMeets(): Array<Object> {
    return this.queryString === ''
      ? this.meets
      : this.meets.filter(meet => meet.name.includes(this.queryString));
  }

  @action
  changeQueryString = (query: string) => {
    this.queryString = query;
  };

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
