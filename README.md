
QuickInterval [![NPM version](https://img.shields.io/npm/v/quickinterval.svg?style=flat-square&color=informational)](https://npmjs.com/package/quickinterval)
====
**QuickInterval** is a flexible and user-friendly package for creating intervals that execute a specified callback function. It offers useful features such as pause, resume, reset, and dynamic interval delay adjustment. The class is designed to work within a Node.js environment, making it a reliable choice for your interval needs.

## Features
- Less RAM consumption because it depends on the frequency of Timeout Nodejs, which saves more memory than Interval NodeJS
- Start and stop the interval execution
- Pause and resume the interval execution
- Reset the interval and start again
- Change the interval delay dynamically
- Get the elapsed time of the interval

## Installation
Install with  [npm](https://www.npmjs.com/)  /  [yarn](https://yarnpkg.com/)  /  [pnpm](https://pnpm.js.org/):
```bash
npm add quickinterval
yarn add quickinterval
pnpm add quickinterval
```

## Usage
```typescript
import { QuickInterval } from 'quickinterval';

const interval = new QuickInterval(() => {
  console.log('Hello World!');
}, 1000);

interval.start(); // start the interval

interval.pause(); // pause the interval

interval.resume(); // resume the interval

interval.reset(); // reset the interval

const isRunning = interval.isRunning(); // check if the interval is running

const timeElapsed = interval.getTimeElapsed(); // get the time elapsed since the interval started

interval.setDelay(2000); // set a new delay for the interval
```

## API

### Constructor
`new QuickInterval(callback: () => void, delay: number)`

Creates a new instance of the QuickInterval class.
- `callback`: A function to be called repeatedly at the specified interval.
- `delay`: The delay, in milliseconds, between each execution of the callback function.

### Methods

- `start(): void`
Starts the interval.

- `pause(): void`
Pauses the interval.

- `resume(): void`
Resumes the interval.

- `reset(): void`
Resets the interval.

- `isRunning(): boolean`
Returns true if the interval is running, false otherwise.

- `getRemainingTime(): number`
Gets the remaining time until the next interval iteration.

- `getTimeElapsed(): number`
Returns the time elapsed since the interval started, in milliseconds.

- `setDelay(delay: number): void`
Sets a new delay for the interval. If the interval is currently running, it will be restarted with the new delay. 

### Properties
- `callback: () => void`
The callback function to be executed at the specified interval.

- `delay: number`
The delay, in milliseconds, between each execution of the callback function.

- `timerId: NodeJS.Timeout | null`

The ID of the timer used to execute the callback function.

- `startTime: number | null`
The time, in milliseconds, when the interval was started.

- `elapsed: number`
The time, in milliseconds, that has elapsed since the interval started.

- `paused: boolean`
A flag indicating whether the interval is currently paused.

- `pauseStart: number | null`
The time, in milliseconds, when the interval was paused.

- `pauseElapsed: number`
The time, in milliseconds, that has elapsed while the interval was paused.

## Sponsors 
- Love what I do? Send me some [coffee](https://buymeacoff.ee/shuruhatik) !?  ☕
- Can't send coffees?   Your support will help me to continue working on open-source projects like this.  🙏😇
<div align="center">
    <p>
		<img src="https://i.imgur.com/0Vm4FRF.png" width="212" height="44" alt="Powered by Shuruhatik"/>
	</p>
</div>

## Help
If you don't understand something in the documentation, you are experiencing problems, or you just need a gentle
nudge in the right direction, please don't hesitate to join our official [Discord Server](https://dsc.gg/shuruhatik) .


  
## License
Refer to the [LICENSE](LICENSE) file.
