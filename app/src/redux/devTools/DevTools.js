// https://github.com/reduxjs/redux-devtools/blob/fc1ab01ca16303005b8bd66b60bce085bf1542e5/docs/Walkthrough.md

// Exported from redux-devtools
import { createDevTools } from 'redux-devtools';

// Monitors are separate packages, and you can make a custom one
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

// createDevTools takes a monitor and produces a DevTools component
export const DevTools = createDevTools(
  // Monitors are individually adjustable with props.
  // Consult their repositories to learn about those props.
  // Here, we put LogMonitor inside a DockMonitor.
  // Note: DockMonitor is visible by default.
  <DockMonitor toggleVisibilityKey="ctrl-h" changePositionKey="ctrl-q" defaultIsVisible={true}>
    <LogMonitor theme="tomorrow" />
  </DockMonitor>
);
