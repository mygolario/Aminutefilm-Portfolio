// Web Audio API Synthesizer for A Minute Film interactive sound effects
let audioCtx = null;
let humOscillator = null;
let humGain = null;
let isAudioMuted = true;

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const toggleGlobalAudio = () => {
  isAudioMuted = !isAudioMuted;
  if (isAudioMuted && humOscillator) {
    stopCinemaHum();
  }
  return !isAudioMuted;
};

export const getIsAudioMuted = () => isAudioMuted;

export const playClick = () => {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.03);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.035);
  } catch (e) {
    console.warn('Audio play click error', e);
  }
};

export const playLensRotate = () => {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.13);
  } catch (e) {
    console.warn('Audio lens error', e);
  }
};

export const playSuccess = () => {
  if (isAudioMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    [440, 554.37, 659.25, 880].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.45);
    });
  } catch (e) {
    console.warn('Audio success error', e);
  }
};

export const startCinemaHum = () => {
  if (isAudioMuted || humOscillator) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    humOscillator = ctx.createOscillator();
    humGain = ctx.createGain();

    humOscillator.type = 'sine';
    humOscillator.frequency.setValueAtTime(55, ctx.currentTime); // Deep cinematic sub-bass

    humGain.gain.setValueAtTime(0.001, ctx.currentTime);
    humGain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 2); // Gentle fade-in

    humOscillator.connect(humGain);
    humGain.connect(ctx.destination);

    humOscillator.start();
  } catch (e) {
    console.warn('Audio cinema hum error', e);
  }
};

export const stopCinemaHum = () => {
  if (humOscillator && humGain) {
    try {
      const ctx = getAudioContext();
      if (ctx) {
        humGain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        setTimeout(() => {
          if (humOscillator) {
            humOscillator.stop();
            humOscillator.disconnect();
            humOscillator = null;
            humGain = null;
          }
        }, 500);
      }
    } catch (e) {
      humOscillator = null;
      humGain = null;
    }
  }
};
