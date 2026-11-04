// ⚠️ 이 파일은 꼭 본인의 Firebase 프로젝트 값으로 바꿔야 게임이 동작해요.
// README.md의 "1. Firebase 프로젝트 만들기"를 먼저 따라한 뒤,
// Firebase 콘솔 > 프로젝트 설정 > 일반 탭 맨 아래 "내 앱"에서 나오는
// firebaseConfig 값을 그대로 복사해서 아래에 붙여넣으세요.

const firebaseConfig = {
  apiKey: "AIzaSyBzJ9GlSLz69F7wh-Ghbbnj9U2dnmqRXhU",
  authDomain: "listen-and-draw.firebaseapp.com",
  databaseURL: "https://listen-and-draw-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "listen-and-draw",
  storageBucket: "listen-and-draw.firebasestorage.app",
  messagingSenderId: "359511249626",
  appId: "1:359511249626:web:7015898c7f8ae84d1e4be3"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
