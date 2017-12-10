import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class TeamDetailStore {
  id: string;
  @observable loading: boolean = true;
  @observable team: Array = [];

  @action
  getTeam = async (): Promise<*> => {
    try {
      const res = await getRequest(`/api/teams/${this.id}`, {});
      if (res.data) {
        this.team = res.data;
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

export default TeamDetailStore;
