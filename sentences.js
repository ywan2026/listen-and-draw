// 오늘의 문장 목록 (총 20개)
// 0~7  : 쉬운 문장 + 재미있는 형용사 (귀엽고 웃긴 그림이 나오도록)
// 8~19 : 기본 난이도 문장
//
// ⚠️ 문장을 수정해도 괜찮지만, answer-art.js의 그림은 "원래 순서(인덱스)"에
// 맞춰 그려져 있어요. 문장을 완전히 다른 내용으로 바꾸면 그림과 안 맞을 수 있으니,
// 그런 경우엔 저에게 다시 요청해주세요!
const SENTENCES = [
  // --- 0~7: 쉬운 문장 + 형용사 ---
  "A lazy cat is sleeping on a messy sofa.",
  "A handsome prince is flying a giant kite in the park.",
  "There is a huge rainbow over a tiny mountain.",
  "A clumsy boy is riding his bike in the heavy rain.",
  "Three tiny ducks are swimming in a giant pond.",
  "An ugly dog is chasing a bouncy ball in the yard.",
  "A pretty girl is eating a giant ice cream on a hot summer day.",
  "Funny snowmen are standing in front of a cozy house.",

  // --- 8~15: 기본 난이도 ---
  "A girl is reading a book under a big tree.",
  "The sun is rising behind the tall buildings.",
  "People are walking with umbrellas on a rainy street.",
  "A family is having a picnic under the blue sky.",
  "A cat and a mouse are playing hide and seek.",
  "Stars are shining brightly over the quiet village.",
  "Leaves are falling from the trees in autumn.",
  "A rocket is flying past the moon and stars.",
  "A brave firefighter is climbing a tall ladder in the smoke.",
  "An elephant is standing next to a tiny car.",
  "A curious monkey is swinging from a tree next to the zoo gate.",
  "Two pirates are digging for treasure on the island."
];
