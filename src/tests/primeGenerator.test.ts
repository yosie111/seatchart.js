import { primeGenerator, getPrimesArray } from '../primeGenerator';

describe('primeGenerator', () => {
  // טסט 1: בדיקת מספרים ראשוניים קטנים
  test('generates prime numbers up to 10', () => {
    const primes = [...primeGenerator(10)];
    expect(primes).toEqual([2, 3, 5, 7]);
  });

  // טסט 2: בדיקת מספרים ראשוניים עד 20
  test('generates prime numbers up to 20', () => {
    const primes = [...primeGenerator(20)];
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19]);
  });

  // טסט 3: בדיקה שאין מספרים ראשוניים מתחת ל-2
  test('returns no primes for n < 2', () => {
    expect([...primeGenerator(1)]).toEqual([]);
    expect([...primeGenerator(0)]).toEqual([]);
    expect([...primeGenerator(-5)]).toEqual([]);
  });

  // טסט 4: בדיקת המספר 2 (הראשוני הזוגי היחיד)
  test('includes 2 as the only even prime', () => {
    const primes = [...primeGenerator(2)];
    expect(primes).toEqual([2]);
  });

  // טסט 5: בדיקת מספרים גדולים יותר
  test('generates primes up to 50', () => {
    const primes = [...primeGenerator(50)];
    expect(primes).toEqual([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]);
  });

  // טסט 6: בדיקה שה-generator באמת מחזיר generator object
  test('returns a generator object', () => {
    const gen = primeGenerator(10);
    expect(gen.next().value).toBe(2);
    expect(gen.next().value).toBe(3);
    expect(gen.next().value).toBe(5);
    expect(gen.next().value).toBe(7);
    expect(gen.next().done).toBe(true);
  });

  // טסט 7: בדיקת שימוש ב-for...of loop
  test('works with for...of loop', () => {
    const primes: number[] = [];
    for (const prime of primeGenerator(15)) {
      primes.push(prime);
    }
    expect(primes).toEqual([2, 3, 5, 7, 11, 13]);
  });
});

describe('getPrimesArray', () => {
  // טסט 1: בדיקה שהפונקציה מחזירה מערך
  test('returns array of primes', () => {
    const primes = getPrimesArray(10);
    expect(Array.isArray(primes)).toBe(true);
    expect(primes).toEqual([2, 3, 5, 7]);
  });

  // טסט 2: בדיקה שהתוצאה זהה ל-primeGenerator
  test('returns same result as spreading primeGenerator', () => {
    const n = 30;
    const withGenerator = [...primeGenerator(n)];
    const withFunction = getPrimesArray(n);
    expect(withFunction).toEqual(withGenerator);
  });

  // טסט 3: בדיקת מערך ריק
  test('returns empty array for n < 2', () => {
    expect(getPrimesArray(1)).toEqual([]);
    expect(getPrimesArray(0)).toEqual([]);
  });
});
