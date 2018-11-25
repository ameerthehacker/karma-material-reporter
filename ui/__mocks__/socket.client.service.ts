export class SocketClientServiceMock {
  public listenMap = {};

  public io(url: string) {
    const on = (key, fn) => {
      this.listenMap[key] = fn;
    };
    on.bind(this);

    return {
      send() {},
      emit() {},
      on
    };
  }
}
