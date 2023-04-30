/**
 * Class representing an interval with pause, resume, reset, and delay change capabilities.
 */
class QuickInterval {
  private callback: () => void;
  private delay: number;
  private timerId: NodeJS.Timeout | null = null;
  private startTime: number | null = null;
  private elapsed = 0;
  private paused = false;
  private pauseStart: number | null = null;
  private pauseElapsed = 0;
  /**
   * @param {function} callback - The function to be executed at each interval.
   * @param {number} delay - The interval delay in milliseconds.
   */
  constructor(callback: () => void, delay: number) {
    this.callback = callback;
    this.delay = delay;
  }

  /**
   * Starts the interval.
   */
  start(): void {
    if (this.timerId || this.paused) {
      return;
    }

    this.startTime = new Date().getTime();
    this.timerId = setTimeout(this.execute.bind(this), this.delay);
  }

  private execute(): void {
    if (this.paused) {
      this.pauseElapsed += new Date().getTime() - (this.pauseStart ?? 0);
      this.timerId = setTimeout(this.execute.bind(this), this.delay);
      return;
    }

    this.callback();

    const elapsed = new Date().getTime() - (this.startTime ?? 0);
    this.elapsed = elapsed - this.pauseElapsed;
    this.startTime! += elapsed;

    this.timerId = setTimeout(
      this.execute.bind(this),
      this.delay - this.elapsed
    );
  }

  /**
 * Pauses the interval.
 */
  pause(): void {
    if (this.paused) {
      return;
    }

    this.paused = true;
    this.pauseStart = new Date().getTime();
    clearTimeout(this.timerId!);
    this.timerId = null;
  }

  /**
  * Resumes the interval.
  */
  resume(): void {
    if (!this.paused || this.timerId) {
      return;
    }

    this.paused = false;
    this.startTime! += new Date().getTime() - (this.pauseStart ?? 0);
    this.timerId = setTimeout(
      this.execute.bind(this),
      this.delay - this.pauseElapsed
    );
    this.pauseStart = null;
    this.pauseElapsed = 0;
  }

  /**
  * Resets the interval.
  */
  reset(): void {
    clearTimeout(this.timerId!);
    this.timerId = null;
    this.startTime = new Date().getTime();
    this.elapsed = 0;
    this.paused = false;
    this.pauseStart = null;
    this.pauseElapsed = 0;
  }

  /**
   * Checks if the interval is running.
   * @returns {boolean} - True if the interval is running, false otherwise.
   */
  isRunning(): boolean {
    return !!this.timerId && !this.paused;
  }

  /**
   * Gets the time elapsed since the interval started.
   * @returns {number} - The elapsed time in milliseconds.
   */
  getTimeElapsed(): number {
    return this.elapsed;
  }

  /**
   * Sets the delay of the interval.
   * @param {number} delay - The new delay in milliseconds.
   */
  setDelay(delay: number): void {
    this.delay = delay;
    if (this.timerId && !this.paused) {
      this.elapsed = new Date().getTime() - (this.startTime ?? 0);
      this.startTime! += this.elapsed;
      clearTimeout(this.timerId);
      this.timerId = setTimeout(
        this.execute.bind(this),
        this.delay - this.elapsed
      );
    }
  }
  /**
 * Gets the remaining time until the next interval iteration.
 * @returns {number} - The remaining time in milliseconds.
 */
  getRemainingTime(): number {
    if (this.paused || !this.timerId) {
      return this.delay - this.elapsed - this.pauseElapsed;
    }

    const timeSinceLastExecution = new Date().getTime() - this.startTime!;
    const remainingTime = this.delay - (timeSinceLastExecution % this.delay);
    return remainingTime;
  }

}

export { QuickInterval }