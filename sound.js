// 공용 효과음 (외부 파일 없이 Web Audio API로 직접 생성)
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    audioCtx = new AC();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function beep(freq, duration, startDelay = 0, type = 'sine', volume = 0.18) {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const now = ctx.currentTime + startDelay;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(volume, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  } catch (e) {
    // 오디오 재생이 안 되는 환경이면 조용히 무시
  }
}

// 타이머 5초 전부터 매초 나는 '째깍' 소리
function playTick() {
  beep(1000, 0.08, 0, 'square', 0.16);
}

// 결과 공개 팡파레 (3음 상승)
function playReveal() {
  beep(523.25, 0.16, 0, 'sine', 0.2);     // C5
  beep(659.25, 0.16, 0.14, 'sine', 0.2);  // E5
  beep(783.99, 0.28, 0.28, 'sine', 0.22); // G5
}
