import { observable } from "mobx";


class AppStore {
  @observable drawerSwitch = {
    top: false,
    left: false,
    bottom: false,
    right: false
  }
}

export default AppStore