/* eslint-disable no-undef */
import generateUniqueId from '../../src/utils/generateUniqueId';

describe('geneateUniqueId testing', () => {
  it('should return random strings', () => {
    const nArray = [];
    const iterations = 1000;
    for (let i = 0; i < iterations; i += 1) {
      nArray.push(generateUniqueId());
    }

    while (nArray.length) {
      const n = nArray.pop();
      const found = nArray.find((e) => e === n);
      expect(found).toBeFalsy();
    }
  });

  it('should generate a 8-digit hexadecimal strings', () => {
    const nArray = [];
    const iterations = 1000;
    for (let i = 0; i < iterations; i += 1) {
      nArray.push(generateUniqueId());
    }

    const wrongLenth = nArray.find((n) => !n.match(/[0-9a-fA-F]{8}$/));
    expect(wrongLenth).toBeFalsy();
  });
});
