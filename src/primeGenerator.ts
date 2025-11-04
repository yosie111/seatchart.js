/**
 * בודקת אם מספר הוא ראשוני
 * מספר ראשוני הוא מספר טבעי גדול מ-1 שמתחלק רק ב-1 ובעצמו
 *
 * @param {number} num - המספר לבדיקה
 * @returns {boolean} - true אם המספר ראשוני, false אם לא
 *
 * @example
 * ```javascript
 * isPrime(7);   // true - 7 הוא מספר ראשוני
 * isPrime(10);  // false - 10 מתחלק ב-2 וב-5
 * isPrime(2);   // true - 2 הוא המספר הראשוני הזוגי היחיד
 * isPrime(1);   // false - 1 אינו ראשוני
 * isPrime(17);  // true - 17 הוא מספר ראשוני
 * ```
 */
export function isPrime(num: number): boolean {
  // מספרים קטנים מ-2 אינם ראשוניים
  if (num < 2) return false;

  // 2 הוא המספר הראשוני הזוגי היחיד
  if (num === 2) return true;

  // כל המספרים הזוגיים (מלבד 2) אינם ראשוניים
  if (num % 2 === 0) return false;

  // בודקים חלוקה רק במספרים אי-זוגיים עד שורש המספר
  // אם יש מחלק גדול יותר משורש המספר, אז בהכרח יש גם מחלק קטן יותר
  // לכן מספיק לבדוק עד שורש המספר
  for (let i = 3; i <= Math.sqrt(num); i += 2) {
    if (num % i === 0) return false;
  }

  // אם לא מצאנו אף מחלק, המספר ראשוני
  return true;
}

/**
 * Generator למספרים ראשוניים
 * מייצר (yields) את כל המספרים הראשוניים מ-2 עד n (כולל)
 *
 * Generator הוא פונקציה מיוחדת שיכולה להשהות את הביצוע שלה ולהחזיר ערכים אחד אחרי השני
 * במקום להחזיר את כל התוצאה בבת אחת
 *
 * @param {number} n - המספר המקסימלי (כולל)
 * @yields {number} - מספרים ראשוניים מ-2 עד n
 *
 * @example
 * // דוגמה 1: לולאה על כל המספרים הראשוניים עד 20
 * for (const prime of primeGenerator(20)) {
 *   console.log(prime); // יציג: 2, 3, 5, 7, 11, 13, 17, 19
 * }
 *
 * @example
 * // דוגמה 2: המרה למערך באמצעות spread operator
 * const primesArray = [...primeGenerator(10)];
 * console.log(primesArray); // [2, 3, 5, 7]
 *
 * @example
 * // דוגמה 3: שימוש ידני ב-generator
 * const gen = primeGenerator(5);
 * console.log(gen.next().value); // 2
 * console.log(gen.next().value); // 3
 * console.log(gen.next().value); // 5
 * console.log(gen.next().done);  // true
 */
export function* primeGenerator(n: number): Generator<number, void, undefined> {
  // אם n קטן מ-2, אין מספרים ראשוניים לייצר
  if (n < 2) return;

  // עוברים על כל המספרים מ-2 עד n
  for (let i = 2; i <= n; i++) {
    // אם המספר ראשוני, מחזירים אותו באמצעות yield
    // yield משהה את הפונקציה ומחזיר את הערך למי שקרא ל-generator
    // בפעם הבאה שהפונקציה תיקרא, היא תמשיך מאותה נקודה
    if (isPrime(i)) {
      yield i;
    }
  }
}

/**
 * פונקציה עזר: מחזירה מערך של כל המספרים הראשוניים עד n
 * זו גרסה פשוטה יותר לשימוש אם רוצים את כל המספרים במערך
 *
 * @param {number} n - המספר המקסימלי (כולל)
 * @returns {number[]} - מערך של מספרים ראשוניים
 *
 * @example
 * const primes = getPrimesArray(15);
 * console.log(primes); // [2, 3, 5, 7, 11, 13]
 */
export function getPrimesArray(n: number): number[] {
  // משתמשים ב-spread operator (...) כדי להמיר את ה-generator למערך
  return [...primeGenerator(n)];
}
