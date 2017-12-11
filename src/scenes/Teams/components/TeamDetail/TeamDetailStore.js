import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';
import QualificationStore from 'stores/QualificationStore';

class TeamDetailStore {
  id: string;
  qual: QualificationStore;
  @observable loading: boolean = true;
  @observable team: Object;
  @observable recentMeets: Array<Object> = [];

  @action
  getTeam = async (): Promise<*> => {
    try {
      const res = await getRequest(`/api/teams/${this.id}`, {});
      if (res.data) {
        this.team = res.data.team;
        this.recentMeets = res.data.meets;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };

  constructor(options: { id: string, qual: QualificationStore }) {
    this.id = options.id;
    this.qual = options.qual;
  }
}

export default TeamDetailStore;
