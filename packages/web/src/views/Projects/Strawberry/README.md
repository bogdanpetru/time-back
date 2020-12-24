# how time is tracked

```
{
  startTime: number[] // times that it started
  timeSpent: number[] // time spent on each pause
  paused: boolean
}
```
- at first it is counted the time from when the interval is started
- when pause is hit, the time spent is saved with a flag
- when starting again, it can be after a refresh, or later
  - it takes into account: the time spent + and counts up from the time it is playied again