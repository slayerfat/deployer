export class AppService {

  /**
   * Uses process.hrtime() to make a timer in milliseconds.
   *
   * @param time
   * @returns {number[] | number}
   */
  public static timer(time?): number[] | number {
    if (!time) {
      return process.hrtime();
    }

    const end = process.hrtime(time);
    return Math.round((end[0] * 1000) + (end[1] / 1000000));
  }
}
