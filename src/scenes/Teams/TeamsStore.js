// @flow
import { observable, computed, action } from 'mobx';
import { getRequest } from 'helpers/api';

class TeamsStore {
  @observable teams: Object[] = [];
  @observable activeTeamId: number;
  @observable loading: boolean = true;

  @computed
  get activeMeet(): Object {
    return this.teams.find(team => team.ID === this.activeTeamId) || {};
  }

  @action
  setActiveMeet = (id: number): void => {
    this.activeTeamId = id;
  };

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
