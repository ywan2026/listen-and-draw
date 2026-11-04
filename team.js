function initTeamScreen() {
const TEAM_PICKER_COLORS = ['#FF6B6B', '#FFA94D', '#FFD43B', '#63D471', '#4FC3F7', '#C58CFF'];
const TEAM_COUNT = 6;

let myTeam = localStorage.getItem('ladTeam');
let myName = localStorage.getItem('ladName');
let selectedTeam = null; // 이름 입력 단계에서 임시로 선택된 조
let order = null;
let currentRound = 0;
let roundUnsub = null;
let latestRoundData = {};
let tickInterval = null;
let teamNames = {};
let scores = {};
let previousPhase = null;
let lastTickSecond = null;

const pickerScreen = document.getElementById('pickerScreen');
const nameScreen = document.getElementById('nameScreen');
const gameScreen = document.getElementById('gameScreen');
const teamPicker = document.getElementById('teamPicker');
const chosenBadge = document.getElementById('chosenBadge');
const nameInput = document.getElementById('nameInput');
const teamTitle = document.getElementById('teamTitle');
const roundLabel = document.getElementById('roundLabel');
const phaseBanner = document.getElementById('phaseBanner');
const answerCard = document.getElementById('answerCard');
const answerText = document.getElementById('answerText');
const reviewCard = document.getElementById('reviewCard');
const reviewGrid = document.getElementById('reviewGrid');
const reviewAnswerArtBox = document.getElementById('reviewAnswerArtBox');
const scoreboardEl = document.getElementById('scoreboard');

function teamLabel(id) {
  const name = teamNames[id];
  return name ? `${id}조 ${name}` : `${id}조`;
}

// ---------- 1단계: 조 선택 ----------
function renderPicker() {
  teamPicker.innerHTML = '';
  for (let i = 1; i <= TEAM_COUNT; i++) {
    const btn = document.createElement('button');
    btn.textContent = `${i}조`;
    btn.style.background = TEAM_PICKER_COLORS[i - 1];
    btn.addEventListener('click', () => goToNameStep(String(i)));
    teamPicker.appendChild(btn);
  }
}

function goToNameStep(id) {
  selectedTeam = id;
  chosenBadge.textContent = `${id}조`;
  chosenBadge.style.background = TEAM_PICKER_COLORS[Number(id) - 1];
  nameInput.value = '';
  db.ref('teamNames/' + id).once('value', (snap) => {
    const existing = snap.val();
    if (existing) nameInput.value = existing;
  });
  pickerScreen.style.display = 'none';
  nameScreen.style.display = '';
  nameInput.focus();
}

document.getElementById('backToPickerBtn').addEventListener('click', showPicker);
document.getElementById('confirmNameBtn').addEventListener('click', confirmName);
nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') confirmName(); });

function confirmName() {
  const name = nameInput.value.trim();
  if (name.length < 2) {
    nameInput.style.borderColor = '#FF6B6B';
    nameInput.placeholder = '2글자 이상 적어주세요!';
    return;
  }
  myTeam = selectedTeam;
  myName = name;
  localStorage.setItem('ladTeam', myTeam);
  localStorage.setItem('ladName', myName);
  db.ref('teamNames/' + myTeam).set(myName);
  enterGame();
}

document.getElementById('switchTeamBtn').addEventListener('click', () => {
  myTeam = null;
  myName = null;
  localStorage.removeItem('ladTeam');
  localStorage.removeItem('ladName');
  showPicker();
});

function showPicker() {
  pickerScreen.style.display = '';
  nameScreen.style.display = 'none';
  gameScreen.style.display = 'none';
  renderPicker();
}

function enterGame() {
  pickerScreen.style.display = 'none';
  nameScreen.style.display = 'none';
  gameScreen.style.display = '';
  teamTitle.textContent = `🖍️ ${teamLabel(myTeam)} 그림판`;
  setupPresence();
  setupCanvas();
  subscribeSession();
}

// ---------- presence ----------
function setupPresence() {
  const ref = db.ref('presence/' + myTeam);
  ref.set(true);
  ref.onDisconnect().remove();
}

// ---------- 세션(순서 + 현재 라운드) 구독 ----------
function subscribeSession() {
  db.ref('session/order').on('value', (snap) => {
    order = snap.val();
    updateRoundLabel();
    if (order) subscribeRound();
    else phaseBanner.textContent = '⏳ 선생님이 게임을 준비하고 있어요...';
  });
  db.ref('session/currentRound').on('value', (snap) => {
    currentRound = snap.val() || 0;
    updateRoundLabel();
    if (order) subscribeRound();
  });
}

function updateRoundLabel() {
  const total = order ? order.length : SENTENCES.length;
  roundLabel.textContent = `SENTENCE ${String(currentRound + 1).padStart(2, '0')} / ${total}`;
}

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

function renderRoundState() {
  const data = latestRoundData;
  const phase = data.phase || 'idle';

  if (phase === 'revealed' && previousPhase !== 'revealed') {
    playReveal();
  }
  previousPhase = phase;

  if (phase === 'idle') {
    phaseBanner.className = 'phase-banner idle';
    phaseBanner.textContent = '🎧 선생님이 문장을 들려줄 거예요. 귀 기울여 보세요!';
    board.setLocked(true);
    answerCard.style.display = 'none';
    reviewCard.style.display = 'none';
    stopTicking();
  } else if (phase === 'playing') {
    board.setLocked(false);
    answerCard.style.display = 'none';
    reviewCard.style.display = 'none';
    startTicking();
  } else if (phase === 'revealed') {
    phaseBanner.className = 'phase-banner revealed';
    phaseBanner.textContent = '🎉 시간 종료! 모두의 그림을 비교해 봐요.';
    board.setLocked(true);
    stopTicking();
    if (order) {
      answerText.textContent = SENTENCES[order[currentRound]];
      answerCard.style.display = '';
      renderReview(data);
    }
  }
}

function startTicking() {
  stopTicking();
  lastTickSecond = null;
  tickInterval = setInterval(() => {
    const data = latestRoundData;
    if (!data || data.phase !== 'playing') { stopTicking(); return; }
    const remainingMs = (data.timerEndAt || 0) - Date.now();
    const remaining = Math.max(0, Math.ceil(remainingMs / 1000));
    phaseBanner.className = 'phase-banner playing';
    phaseBanner.textContent = `🖍️ 그리고 있어요! 남은 시간: ${remaining}초`;
    if (remaining <= 5 && remaining >= 1 && remaining !== lastTickSecond) {
      lastTickSecond = remaining;
      playTick();
    }
    if (remainingMs <= 0) {
      board.setLocked(true);
      phaseBanner.textContent = '⏳ 선생님 화면에서 결과를 공개할 거예요...';
      stopTicking();
    }
  }, 200);
}
function stopTicking() {
  if (tickInterval) { clearInterval(tickInterval); tickInterval = null; }
}

function renderReview(data) {
  if (!order) return;
  const drawings = data.drawings || {};
  const starsMap = data.stars || {};
  const maxStars = Math.max(0, ...Object.values(starsMap));
  reviewGrid.innerHTML = '';

  // 정답 그림은 1조~6조 그리드 위, 별도 한 줄로 표시
  reviewAnswerArtBox.innerHTML = getAnswerArt(order[currentRound]);

  for (let i = 1; i <= TEAM_COUNT; i++) {
    const id = String(i);
    reviewGrid.appendChild(makeReviewCard(id, drawings[id], starsMap[id] || 0, maxStars));
  }
  reviewCard.style.display = '';
}

function makeReviewCard(id, dataUrl, myStars, maxStars) {
  const card = document.createElement('div');
  card.className = 'team-card' + (myStars > 0 && myStars === maxStars ? ' winner' : '');
  const labelEl = document.createElement('div');
  labelEl.className = 'team-label';
  labelEl.textContent = teamLabel(id) + (id === myTeam ? ' (우리 조)' : '');
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
  starRow.innerHTML = '★'.repeat(myStars) + '☆'.repeat(3 - myStars);
  starRow.style.fontSize = '22px';
  starRow.style.color = myStars ? '#FFD43B' : '#D8C9A8';
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
    const medal = rank === 0 && (scores[id] || 0) > 0 ? '🥇' : rank === 1 && (scores[id] || 0) > 0 ? '🥈' : rank === 2 && (scores[id] || 0) > 0 ? '🥉' : (rank + 1);
    row.innerHTML = `
      <span class="sb-rank">${medal}</span>
      <span class="sb-name">${teamLabel(id)}${id === myTeam ? ' (우리 조)' : ''}</span>
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
  if (myTeam) teamTitle.textContent = `🖍️ ${teamLabel(myTeam)} 그림판`;
  if (latestRoundData.phase === 'revealed') renderRoundState();
});

// ---------- 그림판 ----------
let board;
function setupCanvas() {
  const canvas = document.getElementById('drawCanvas');
  board = createDrawingBoard(canvas, {
    onStroke: () => {
      if (latestRoundData.phase === 'playing') {
        db.ref('rounds/' + currentRound + '/drawings/' + myTeam).set(board.getDataURL());
      }
    }
  });
  board.setLocked(true);

  const swatches = document.getElementById('swatches');
  swatches.innerHTML = '';
  CRAYON_COLORS.forEach((c, idx) => {
    const sw = document.createElement('span');
    sw.className = 'swatch' + (idx === 0 ? ' active' : '');
    sw.style.background = c.hex;
    sw.addEventListener('click', () => {
      board.setColor(c.hex);
      [...swatches.children].forEach(el => el.classList.remove('active'));
      sw.classList.add('active');
      document.getElementById('eraserBtn').classList.remove('selected');
    });
    swatches.appendChild(sw);
  });
  document.getElementById('eraserBtn').addEventListener('click', (e) => {
    board.setEraser(true);
    e.target.classList.toggle('selected');
  });
  document.getElementById('undoBtn').addEventListener('click', () => board.undo());
  document.getElementById('clearBtn').addEventListener('click', () => board.clear());
  document.getElementById('widthRange').addEventListener('input', (e) => board.setWidth(Number(e.target.value)));
}

// ---------- 시작 ----------
if (myTeam && myName) {
  enterGame();
} else if (myTeam) {
  goToNameStep(myTeam);
} else {
  showPicker();
}

}
