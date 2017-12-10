import { action, observable } from 'mobx';

class LoginStore {
  @observable error: string;
  @observable email: string = '';
  @observable pass: string = '';

  @action
  changeEmail = (email: string): void => {
    this.email = email;
  };

  @action
  changePass = (pass: string): void => {
    this.pass = pass;
  };

  @action
  loginUser = async (user: UserStore, history: RouterHistory): Promise<*> => {
    if (this.email === '') {
      this.error = 'Please enter your email';
      return;
    }
    if (this.pass === '') {
      this.error = 'Please enter your password';
      return;
    }
    try {
      const res = await user.login({
        email: this.email,
        password: this.pass
      });
      if (res.error) {
        this.error = res.error.message;
      } else {
        this.error = null;
        history.push('/kolas');
      }
    } catch (err) {
      this.error = err.message;
    }
  };
}

export default LoginStore;
