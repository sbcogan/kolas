// @flow
import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class TeamsStore {
  @observable teams: Object[] = [];
  @observable loading: boolean = true;

  @action
  getTeams = async (): Promise<*> => {
    try {
      const res = await getRequest('/api/teams', {});
      if (res.data) {
        this.teams = res.data;
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default TeamsStore;
