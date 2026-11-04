// 역할 선택(선생님/학생) + 선생님 비밀번호 화면 전환을 담당하는 작은 컨트롤러
const TEACHER_PASSWORD = '6840';

const roleScreen = document.getElementById('roleScreen');
const teacherPasswordScreen = document.getElementById('teacherPasswordScreen');
const teacherScreenRoot = document.getElementById('teacherScreenRoot');
const teamScreenRoot = document.getElementById('teamScreenRoot');
const teacherPasswordInput = document.getElementById('teacherPasswordInput');
const passwordError = document.getElementById('passwordError');

let teacherInited = false;
let teamInited = false;

function showOnly(el) {
  [roleScreen, teacherPasswordScreen, teacherScreenRoot, teamScreenRoot].forEach((s) => {
    s.style.display = s === el ? '' : 'none';
  });
}

document.getElementById('roleTeacherBtn').addEventListener('click', () => {
  passwordError.style.display = 'none';
  teacherPasswordInput.value = '';
  showOnly(teacherPasswordScreen);
  teacherPasswordInput.focus();
});

document.getElementById('roleStudentBtn').addEventListener('click', () => {
  showOnly(teamScreenRoot);
  if (!teamInited) {
    teamInited = true;
    initTeamScreen();
  }
});

document.getElementById('passwordBackBtn').addEventListener('click', () => {
  showOnly(roleScreen);
});

function tryTeacherLogin() {
  if (teacherPasswordInput.value.trim() === TEACHER_PASSWORD) {
    showOnly(teacherScreenRoot);
    if (!teacherInited) {
      teacherInited = true;
      initTeacherScreen();
    }
  } else {
    passwordError.style.display = '';
    teacherPasswordInput.value = '';
    teacherPasswordInput.focus();
  }
}
document.getElementById('passwordConfirmBtn').addEventListener('click', tryTeacherLogin);
teacherPasswordInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') tryTeacherLogin();
});

// 선생님/학생 화면 상단의 "🔑 역할 바꾸기" 버튼: 새로고침으로 깔끔하게 역할 선택 화면으로 복귀
document.querySelectorAll('.back-to-role-btn').forEach((btn) => {
  btn.addEventListener('click', () => location.reload());
});
