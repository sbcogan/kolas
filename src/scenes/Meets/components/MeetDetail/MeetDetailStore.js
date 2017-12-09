import { action, observable, computed } from 'mobx';
import { getRequest } from 'helpers/api';

class MeetDetailStore {
  id: string;
  @observable meet: Array<Object>;
  @observable loading: boolean = true;

  @computed
  get mensResults(): Object {
    return this.meet
      .filter(team => team.gender === 'mens')
      .map((team, i) => ({ ...team, key: i }))
      .sort((a, b) => a.placement - b.placement);
  }

  @computed
  get womensResults(): Object {
    return this.meet
      .filter(team => team.gender === 'womens')
      .map((team, i) => ({ ...team, key: i }))
      .sort((a, b) => a.placement - b.placement);
  }

  @action
  getMeet = async (): Promise<*> => {
    try {
      const res = await getRequest(`/api/meets/${this.id}`, {});
      if (res.data) {
        console.log(res.data);
        this.meet = res.data;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  constructor(options: { id: string }) {
    this.id = options.id;
  }
}

export default MeetDetailStore;
