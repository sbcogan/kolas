import { action, observable } from 'mobx';
import { type RouterHistory } from 'react-router-dom';
import UserStore from 'stores/UserStore';

class SignUpStore {
  @observable error: string;
  @observable name: string = '';
  @observable email: string = '';
  @observable password: string = '';

  @action
  changeName = (name: string): void => {
    this.name = name;
  };

  @action
  changeEmail = (email: string): void => {
    this.email = email;
  };

  @action
  changePassword = (password: string): void => {
    this.password = password;
  };

  @action
  signUpUser = async (user: UserStore, history: RouterHistory): Promise<*> => {
    if (this.name === '') {
      this.error = 'Please enter your name';
      return;
    }
    if (this.email === '') {
      this.error = 'Please enter your email';
      return;
    }
    if (this.password === '') {
      this.error = 'Please enter your password';
      return;
    }
    try {
      await user.signUp({
        name: this.name,
        email: this.email,
        password: this.password
      });
      const res = await user.login({
        email: this.email,
        password: this.password
      });
      if (res.error) {
        this.error = res.error.message;
      } else {
        history.push('/kolas');
      }
    } catch (err) {
      this.error = err.message;
    }
  };
}

export default SignUpStore;
