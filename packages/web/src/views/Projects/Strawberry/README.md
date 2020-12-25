# how time is tracked

```
{
  startTime: number[] // times that it started
  timeSpent: number[] // time spent on each pause
  paused: boolean
}
```

The timer is not exact. When it is stopped, the extra milliseconds are discarded.
This has the effect that always when the timer is tarted, it will take one second to change.

