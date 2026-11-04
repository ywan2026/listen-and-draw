// ⚠️ 이 파일은 꼭 본인의 Firebase 프로젝트 값으로 바꿔야 게임이 동작해요.
// README.md의 "1. Firebase 프로젝트 만들기"를 먼저 따라한 뒤,
// Firebase 콘솔 > 프로젝트 설정 > 일반 탭 맨 아래 "내 앱"에서 나오는
// firebaseConfig 값을 그대로 복사해서 아래에 붙여넣으세요.

const firebaseConfig = {
  apiKey: "여기에-API-KEY를-붙여넣으세요",
  authDomain: "여기에-authDomain을-붙여넣으세요",
  databaseURL: "여기에-databaseURL을-붙여넣으세요", // Realtime Database 사용! Firestore 아님
  projectId: "여기에-projectId를-붙여넣으세요",
  storageBucket: "여기에-storageBucket을-붙여넣으세요",
  messagingSenderId: "여기에-messagingSenderId를-붙여넣으세요",
  appId: "여기에-appId를-붙여넣으세요"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
