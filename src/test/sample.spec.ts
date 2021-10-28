const HelloWorld = () => {
  return 'Hello World';
}

describe('HelloWorld()', () => {
  it('Say hello world', () => {
    expect(HelloWorld()).toBe('Hello World');
  })
})

describe('The Truthiness', () => {
  it('Test null', () => {
    const n = false;
    expect(n).not.toBeNull()
    expect(n).toBeDefined()
    expect(n).toBeFalse()
    expect(n).not.toBeTruthy()
    expect(n).not.toBeUndefined()
  })
})

describe('The Number Matcher', () => {
  it('Value is 0.4', () => {
    const value = 0.2 + 0.3;
    // expect('3').toBeGreaterThan(3)
    // expect(value).toBeGreaterThanOrEqual(3.5)
    // expect(value).toBeLessThan(5)
    // expect(value).toBeLessThanOrEqual(4.5)
    expect(value).toBe(0.5);
    expect(value).toBeCloseTo(0.499); // floating or double
    // expect('3').toEqual('3')
  })
})

/**
 * String matcher => toMatch
 */
describe('The String Matcher', () => {
  it('Find "camp" in "Enigmacamp"', () => {
    const bootcamp: string = 'Enigmacamp';
    expect(bootcamp).toMatch(/camp/)
  })

})

describe('The Array Matcher', () => {
  const bootcamp = ["Enigma", "Enigma Camp", "Enigma Lagi", "Enigma Terus"];
  it("Indonesia's best bootcamp is 'Enigma'", () => {
    expect(bootcamp).toContain("Enigma")
  })
})


describe('The testing Asynchronous', () => {
  describe('#Callbak', () => {
    const fetchData = (cb: Function) => {
      setTimeout(() => {
        cb("Enigmacamp")
      }, 1000);
    }
    it('The data is Enigmacamp', (done) => {
      const callback = (data) => {
        expect(data).toBe("Enigmacamp");
        done()
      }
      fetchData(callback);
    })
  })

  describe('#Promise', () => {
    const fetchData = () => {
      return new Promise((resolve) => {
        resolve("Enigmacamp");
      });
    }

    it("the data is Enigmacamp", () => {
      return fetchData().then((data) => {
        expect(data).toBe("Enigmacamp");
      });
    });
  })

  describe('#Async/Await', () => {
    const fetchData = () => {
      return new Promise((resolve, reject) => {
        try {
          resolve("Enigmacamp");
        } catch {
          reject("error");
        }
      });
    }

    //   it("the data is Enigmacmap", async () => {
    //     await fetchData(data) {
    //       expect(data).toBe("Enigmacamp");
    //     })
    // });
  })

})
