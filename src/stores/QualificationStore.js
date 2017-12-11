import { observable, action } from 'mobx';
import { getRequest } from 'helpers/api';

class QualificationStore {
  @observable mensRankings: Array<Object>;
  @observable womensRankings: Array<Object>;
  @observable loading: true;

  @action
  getRankings = async (gender): Promise<*> => {
    try {
      const res = await getRequest(`/api/rankings/${gender}`, {});
      if (res.data) {
        if (gender === 'mens') {
          this.mensRankings = res.data;
        } else {
          this.womensRankings = res.data;
        }
        this.loading = false;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export default QualificationStore;
