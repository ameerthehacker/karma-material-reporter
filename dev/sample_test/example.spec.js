describe('example suite1', () => {
  it('passing test1', () => {
    expect(1).toBe(1);
  })
  it('passing test2', () => {
    expect(1).toBe(0);
  })
  describe('example suite4', () => {
    it('passing test4', () => {
      expect(1).toBe(1);
    })
  });
});

describe('example suite2', () => {
  it('passing test3', () => {
    expect(1).toBe(1);
  })
});