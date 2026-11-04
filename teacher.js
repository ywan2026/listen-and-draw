const TEAM_COUNT = 6;
let order = null; // 셔플된 문장 인덱스 배열
let currentRound = 0; // order 배열 안에서의 위치(0~19)
let roundUnsub = null;
let latestRoundData = {};
let teamNames = {};
let scores = {};

const sentenceGrid = document.getElementById('sentenceGrid');
const roundLabel = document.getElementById('roundLabel');
const sentenceText = document.getElementById('sentenceText');
const phaseText = document.getElementById('phaseText');
const timerBadge = document.getElementById('timerBadge');
const teamsGrid = document.getElementById('teamsGrid');
const revealHint = document.getElementById('revealHint');
const presenceBox = document.getElementById('presenceBox');
const scoreboardEl = document.getElementById('scoreboard');

function shuffledIndices(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function teamLabel(id) {
  const name = teamNames[id];
  return name ? `${id}조 ${name}` : `${id}조`;
}

// ---------- 문장 그리드 ----------
function renderSentenceGrid() {
  sentenceGrid.innerHTML = '';
  if (!order) return;
  order.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.textContent = String(i + 1).padStart(2, '0');
    if (i === currentRound) btn.classList.add('active');
    btn.addEventListener('click', () => goToRound(i));
    sentenceGrid.appendChild(btn);
  });
}

function goToRound(i) {
  if (!order || i < 0 || i >= order.length) return;
  currentRound = i;
  db.ref('session/currentRound').set(currentRound);
  renderSentenceGrid();
  subscribeRound();
  updateSentenceLabel();
}

function currentSentence() {
  if (!order) return '문장을 불러오는 중...';
  return SENTENCES[order[currentRound]];
}

function updateSentenceLabel() {
  roundLabel.textContent = `SENTENCE ${String(currentRound + 1).padStart(2, '0')} / ${order ? order.length : SENTENCES.length}`;
  sentenceText.textContent = currentSentence();
}

document.getElementById('prevBtn').addEventListener('click', () => goToRound(currentRound - 1));
document.getElementById('nextBtn').addEventListener('click', () => goToRound(currentRound + 1));

// ---------- TTS ----------
document.getElementById('listenBtn').addEventListener('click', () => {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(currentSentence());
  u.lang = 'en-US';
  u.rate = 0.92;
  speechSynthesis.speak(u);
});
document.getElementById('stopBtn').addEventListener('click', () => speechSynthesis.cancel());

// ---------- 타이머 시작 (라운드 (재)시작) ----------
function startRound(duration) {
  const roundRef = db.ref('rounds/' + currentRound);
  roundRef.once('value', (snap) => {
    const prev = snap.val() || {};
    const prevStars = prev.stars || {};
    const fixups = Object.keys(prevStars).map((teamId) =>
      db.ref('scores/' + teamId).transaction((cur) => (cur || 0) - prevStars[teamId])
    );
    Promise.all(fixups).then(() => {
      roundRef.set({
        phase: 'playing',
        timerDuration: duration,
        timerEndAt: Date.now() + duration * 1000,
        drawings: {},
        stars: {}
      });
    });
  });
}
document.getElementById('t20Btn').addEventListener('click', () => startRound(20));
document.getElementById('t30Btn').addEventListener('click', () => startRound(30));

// ---------- 새 게임 시작 ----------
document.getElementById('newGameBtn').addEventListener('click', () => {
  if (!confirm('정말 새 게임을 시작할까요?\n문장 순서가 다시 섞이고, 모든 점수가 초기화돼요!')) return;
  const newOrder = shuffledIndices(SENTENCES.length);
  db.ref('session/order').set(newOrder);
  db.ref('session/currentRound').set(0);
  db.ref('rounds').remove();
  db.ref('scores').remove();
});

// ---------- 라운드 구독 ----------
function subscribeRound() {
  if (roundUnsub) roundUnsub();
  const ref = db.ref('rounds/' + currentRound);
  const handler = (snap) => {
    latestRoundData = snap.val() || {};
    renderRoundState();
  };
  ref.on('value', handler);
  roundUnsub = () => ref.off('value', handler);
}

let tickInterval = null;
function renderRoundState() {
  const data = latestRoundData;
  const phase = data.phase || 'idle';

  if (phase === 'idle') {
    phaseText.textContent = '문장을 듣고 난 뒤, 시간을 선택해서 라운드를 시작하세요.';
    timerBadge.textContent = '--';
    timerBadge.className = 'timer-badge';
    revealHint.style.display = '';
    teamsGrid.innerHTML = '';
    stopTicking();
  } else if (phase === 'playing') {
    phaseText.textContent = '🖍️ 그리는 중이에요! 학생들 화면에 타이머가 흘러가고 있어요.';
    revealHint.style.display = '';
    teamsGrid.innerHTML = '';
    startTicking();
  } else if (phase === 'revealed') {
    phaseText.textContent = '🎉 결과가 공개됐어요! 그림을 보고 별점을 매겨보세요.';
    timerBadge.textContent = '끝';
    timerBadge.className = 'timer-badge done';
    revealHint.style.display = 'none';
    stopTicking();
    renderTeamsGrid(data);
  }
}

function startTicking() {
  stopTicking();
  tickInterval = setInterval(() => {
    const data = latestRoundData;
    if (!data || data.phase !== 'playing') { stopTicking(); return; }
    const remainingMs = (data.timerEndAt || 0) - Date.now();
    const remaining = Math.max(0, Math.ceil(remainingMs / 1000));
    timerBadge.textContent = remaining;
    timerBadge.className = 'timer-badge' + (remaining <= 5 ? ' warn' : '');
    if (remainingMs <= 0) {
      finishRound();
    }
  }, 200);
}
function stopTicking() {
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
}

function finishRound() {
  stopTicking();
  db.ref('rounds/' + currentRound + '/phase').set('revealed');
}

// ---------- 별점 매기기 ----------
function setStars(teamId, value) {
  const starsRef = db.ref('rounds/' + currentRound + '/stars/' + teamId);
  starsRef.once('value', (snap) => {
    const old = snap.val() || 0;
    const next = old === value ? 0 : value; // 같은 별을 다시 누르면 취소
    const delta = next - old;
    if (delta !== 0) {
      db.ref('scores/' + teamId).transaction((cur) => (cur || 0) + delta);
    }
    starsRef.set(next || null);
  });
}

function renderTeamsGrid(data) {
  if (!order) return;
  const drawings = data.drawings || {};
  const starsMap = data.stars || {};
  const maxStars = Math.max(0, ...Object.values(starsMap));
  teamsGrid.innerHTML = '';

  // 선생님 정답 그림 카드
  const answerCard = document.createElement('div');
  answerCard.className = 'team-card';
  answerCard.innerHTML = `<div class="team-label">✏️ 정답 그림</div>`;
  const artWrap = document.createElement('div');
  artWrap.style.cssText = 'width:100%;aspect-ratio:4/3;background:#fff;border-radius:10px;border:1px solid var(--line);overflow:hidden;';
  artWrap.innerHTML = getAnswerArt(order[currentRound]);
  answerCard.appendChild(artWrap);
  teamsGrid.appendChild(answerCard);

  for (let i = 1; i <= TEAM_COUNT; i++) {
    const id = String(i);
    const myStars = starsMap[id] || 0;
    teamsGrid.appendChild(makeTeamCard(id, drawings[id], myStars, maxStars));
  }
}

function makeTeamCard(id, dataUrl, myStars, maxStars) {
  const card = document.createElement('div');
  card.className = 'team-card' + (myStars > 0 && myStars === maxStars ? ' winner' : '');

  const labelEl = document.createElement('div');
  labelEl.className = 'team-label';
  labelEl.textContent = teamLabel(id);
  card.appendChild(labelEl);

  if (dataUrl) {
    const img = document.createElement('img');
    img.src = dataUrl;
    card.appendChild(img);
  } else {
    const ph = document.createElement('div');
    ph.className = 'placeholder';
    ph.textContent = '제출한 그림 없음';
    card.appendChild(ph);
  }

  if (myStars > 0 && myStars === maxStars) {
    const crown = document.createElement('div');
    crown.className = 'crown';
    crown.textContent = '👑';
    card.appendChild(crown);
  }

  const starRow = document.createElement('div');
  starRow.className = 'star-row';
  for (let s = 1; s <= 3; s++) {
    const starBtn = document.createElement('button');
    starBtn.className = 'star-btn' + (s <= myStars ? ' filled' : '');
    starBtn.textContent = s <= myStars ? '★' : '☆';
    starBtn.addEventListener('click', () => setStars(id, s));
    starRow.appendChild(starBtn);
  }
  card.appendChild(starRow);

  return card;
}

// ---------- 점수판 ----------
function renderScoreboard() {
  const ids = Array.from({ length: TEAM_COUNT }, (_, i) => String(i + 1));
  ids.sort((a, b) => (scores[b] || 0) - (scores[a] || 0) || Number(a) - Number(b));
  scoreboardEl.innerHTML = '';
  ids.forEach((id, rank) => {
    const row = document.createElement('div');
    row.className = 'scoreboard-row';
    const medal = rank === 0 && (scores[id] || 0) > 0 ? '🥇' : rank === 1 && (scores[id] || 0) > 0 ? '🥈' : rank === 2 && (scores[id] || 0) > 0 ? '🥉' : '';
    row.innerHTML = `
      <span class="sb-rank">${medal || (rank + 1)}</span>
      <span class="sb-name">${teamLabel(id)}</span>
      <span class="sb-score">${scores[id] || 0}점</span>
    `;
    scoreboardEl.appendChild(row);
  });
}

db.ref('scores').on('value', (snap) => {
  scores = snap.val() || {};
  renderScoreboard();
});
db.ref('teamNames').on('value', (snap) => {
  teamNames = snap.val() || {};
  renderScoreboard();
  if (latestRoundData.phase === 'revealed') renderTeamsGrid(latestRoundData);
});

// ---------- 접속한 조 표시 ----------
db.ref('presence').on('value', (snap) => {
  const val = snap.val() || {};
  const ids = Object.keys(val).sort((a, b) => Number(a) - Number(b));
  presenceBox.textContent = ids.length ? `접속한 조: ${ids.map(teamLabel).join(', ')}` : '접속한 조: 없음';
});

// ---------- 초기화 ----------
db.ref('session/order').on('value', (snap) => {
  const val = snap.val();
  if (val) {
    order = val;
  } else {
    // 처음 실행: 순서가 없으면 새로 만들어 저장
    order = shuffledIndices(SENTENCES.length);
    db.ref('session/order').set(order);
  }
  renderSentenceGrid();
  updateSentenceLabel();
  subscribeRound();
});

db.ref('session/currentRound').on('value', (snap) => {
  currentRound = snap.val() || 0;
  renderSentenceGrid();
  updateSentenceLabel();
  subscribeRound();
});
