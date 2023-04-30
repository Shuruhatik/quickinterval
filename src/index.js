"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickInterval = void 0;
/**
 * Class representing an interval with pause, resume, reset, and delay change capabilities.
 */
class QuickInterval {
    /**
     * @param {function} callback - The function to be executed at each interval.
     * @param {number} delay - The interval delay in milliseconds.
     */
    constructor(callback, delay) {
        this.timerId = null;
        this.startTime = null;
        this.elapsed = 0;
        this.paused = false;
        this.pauseStart = null;
        this.pauseElapsed = 0;
        this.callback = callback;
        this.delay = delay;
    }
    /**
     * Starts the interval.
     */
    start() {
        if (this.timerId || this.paused) {
            return;
        }
        this.startTime = new Date().getTime();
        this.timerId = setTimeout(this.execute.bind(this), this.delay);
    }
    execute() {
        var _a, _b;
        if (this.paused) {
            this.pauseElapsed += new Date().getTime() - ((_a = this.pauseStart) !== null && _a !== void 0 ? _a : 0);
            this.timerId = setTimeout(this.execute.bind(this), this.delay);
            return;
        }
        this.callback();
        const elapsed = new Date().getTime() - ((_b = this.startTime) !== null && _b !== void 0 ? _b : 0);
        this.elapsed = elapsed - this.pauseElapsed;
        this.startTime += elapsed;
        this.timerId = setTimeout(this.execute.bind(this), this.delay - this.elapsed);
    }
    /**
   * Pauses the interval.
   */
    pause() {
        if (this.paused) {
            return;
        }
        this.paused = true;
        this.pauseStart = new Date().getTime();
        clearTimeout(this.timerId);
        this.timerId = null;
    }
    /**
    * Resumes the interval.
    */
    resume() {
        var _a;
        if (!this.paused || this.timerId) {
            return;
        }
        this.paused = false;
        this.startTime += new Date().getTime() - ((_a = this.pauseStart) !== null && _a !== void 0 ? _a : 0);
        this.timerId = setTimeout(this.execute.bind(this), this.delay - this.pauseElapsed);
        this.pauseStart = null;
        this.pauseElapsed = 0;
    }
    /**
    * Resets the interval.
    */
    reset() {
        clearTimeout(this.timerId);
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
    isRunning() {
        return !!this.timerId && !this.paused;
    }
    /**
     * Gets the time elapsed since the interval started.
     * @returns {number} - The elapsed time in milliseconds.
     */
    getTimeElapsed() {
        return this.elapsed;
    }
    /**
     * Sets the delay of the interval.
     * @param {number} delay - The new delay in milliseconds.
     */
    setDelay(delay) {
        var _a;
        this.delay = delay;
        if (this.timerId && !this.paused) {
            this.elapsed = new Date().getTime() - ((_a = this.startTime) !== null && _a !== void 0 ? _a : 0);
            this.startTime += this.elapsed;
            clearTimeout(this.timerId);
            this.timerId = setTimeout(this.execute.bind(this), this.delay - this.elapsed);
        }
    }
    /**
   * Gets the remaining time until the next interval iteration.
   * @returns {number} - The remaining time in milliseconds.
   */
    getRemainingTime() {
        if (this.paused || !this.timerId) {
            return this.delay - this.elapsed - this.pauseElapsed;
        }
        const timeSinceLastExecution = new Date().getTime() - this.startTime;
        const remainingTime = this.delay - (timeSinceLastExecution % this.delay);
        return remainingTime;
    }
}
exports.QuickInterval = QuickInterval;
//# sourceMappingURL=index.js.map