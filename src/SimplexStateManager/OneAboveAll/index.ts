export class OneAboveAll {
  private static states: Record<string, unknown> = { };

  static getState(key: string) {
    return this.states[key];
  }

  static setState(key: string, value: unknown) {
    this.states[key] = value;
  }
}
