import { Satellite } from './satellite';

describe('Satellite', () => {
  it('should create an instance', () => {
    expect(new Satellite("SiriusXM", "Communication", "2009-03-21", "LOW", true)).toBeTruthy();
  });
});
