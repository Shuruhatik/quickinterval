/**
 * Class representing an interval with pause, resume, reset, and delay change capabilities.
 */
declare class QuickInterval {
    private callback;
    private delay;
    private timerId;
    private startTime;
    private elapsed;
    private paused;
    private pauseStart;
    private pauseElapsed;
    /**
     * @param {function} callback - The function to be executed at each interval.
     * @param {number} delay - The interval delay in milliseconds.
     */
    constructor(callback: () => void, delay: number);
    /**
     * Starts the interval.
     */
    start(): void;
    private execute;
    /**
   * Pauses the interval.
   */
    pause(): void;
    /**
    * Resumes the interval.
    */
    resume(): void;
    /**
    * Resets the interval.
    */
    reset(): void;
    /**
     * Checks if the interval is running.
     * @returns {boolean} - True if the interval is running, false otherwise.
     */
    isRunning(): boolean;
    /**
     * Gets the time elapsed since the interval started.
     * @returns {number} - The elapsed time in milliseconds.
     */
    getTimeElapsed(): number;
    /**
     * Sets the delay of the interval.
     * @param {number} delay - The new delay in milliseconds.
     */
    setDelay(delay: number): void;
    /**
   * Gets the remaining time until the next interval iteration.
   * @returns {number} - The remaining time in milliseconds.
   */
    getRemainingTime(): number;
}
export { QuickInterval };
