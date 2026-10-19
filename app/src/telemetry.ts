import { AppState, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from './api/client';

// Lightweight first-party telemetry: screen views, heartbeat, JS + unexpected-exit crashes.
// Skipped in dev so Metro reloads don't pollute the dashboard.
const QUEUE = 'telemetry_queue';
const UID = 'telemetry_anon_uid';
const EXIT = 'telemetry_exit_state';
const SESSION_GAP_MS = 30 * 60 * 1000;

const rnd = (p: string) => p + Math.random().toString(36).slice(2, 11) + '_' + Date.now();
const c: any = Platform.constants;
const device =
  Platform.OS === 'android'
    ? `${c.Brand ?? ''} ${c.Model ?? 'Android'}`.trim()
    : c.interfaceIdiom === 'pad'
    ? 'iPad'
    : 'iPhone';
const os = `${Platform.OS === 'android' ? 'Android' : 'iOS'} ${c.Release ?? c.osVersion ?? ''}`.trim();
const version: string = require('../package.json').version;

let uid = '';
let userId = '';
let sid = rnd('s_');
let screen = '';
let queue: any[] = [];
let ready: Promise<void>;
let sending = false;

async function flush() {
  if (sending || !queue.length) return;
  sending = true;
  const batch = queue.slice(0, 25);
  try {
    await apiClient.post('/telemetry', { events: batch }, { headers: { 'Content-Type': 'text/plain' } });
    queue = queue.slice(batch.length);
    await AsyncStorage.setItem(QUEUE, JSON.stringify(queue));
  } catch {
    // keep queued; retried on next event / app start
  } finally {
    sending = false;
  }
}

async function track(type: 'page' | 'ping' | 'crash', extra: object = {}) {
  if (__DEV__) return;
  await ready;
  queue = [
    ...queue,
    { sid, uid: userId || uid, platform: Platform.OS, type, v: version, device, os, page: screen, ...extra },
  ].slice(-50);
  // Persist first: a fatal crash may kill the process before the network call finishes.
  await AsyncStorage.setItem(QUEUE, JSON.stringify(queue)).catch(() => {});
  flush();
}

export const setTelemetryUser = (id?: string) => {
  userId = id || '';
};

export const trackScreen = (name?: string) => {
  if (!name || name === screen) return;
  screen = name;
  track('page');
};

export function initTelemetry() {
  ready = (async () => {
    try {
      queue = JSON.parse((await AsyncStorage.getItem(QUEUE)) || '[]');
      uid = (await AsyncStorage.getItem(UID)) || '';
      if (!uid) await AsyncStorage.setItem(UID, (uid = rnd('anon_')));
      // Still "running" from last launch = process died while foregrounded (native crash/OOM/kill).
      if ((await AsyncStorage.getItem(EXIT)) === 'running') {
        queue.push({ sid, uid, platform: Platform.OS, type: 'crash', v: version, device, os, page: '', fatal: true, msg: 'Unexpected exit (native crash / OOM / killed)' });
      }
      await AsyncStorage.setItem(EXIT, 'running');
    } catch {}
  })();

  const g: any = globalThis;
  const prev = g.ErrorUtils?.getGlobalHandler?.();
  g.ErrorUtils?.setGlobalHandler?.((err: any, fatal?: boolean) => {
    track('crash', { fatal: !!fatal, msg: String(err?.message ?? err), stack: String(err?.stack ?? '') });
    prev?.(err, fatal);
  });

  let hiddenAt = 0;
  AppState.addEventListener('change', state => {
    if (state === 'background') {
      hiddenAt = Date.now();
      AsyncStorage.setItem(EXIT, 'clean').catch(() => {});
    } else if (state === 'active') {
      AsyncStorage.setItem(EXIT, 'running').catch(() => {});
      if (hiddenAt && Date.now() - hiddenAt > SESSION_GAP_MS) {
        sid = rnd('s_');
        track('page');
      }
      flush();
    }
  });
  setInterval(() => AppState.currentState === 'active' && track('ping'), 30000);
  track('page');
}
