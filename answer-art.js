// 문장 20개에 맞춘 "선생님 정답 그림" (간단한 크레파스 느낌 SVG 일러스트)
// sentences.js의 인덱스와 1:1로 대응됩니다.
const ANSWER_SVG = [

// 0. A lazy cat is sleeping on a messy sofa.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="40" y="170" width="320" height="90" rx="26" fill="#B08463"/>
  <rect x="55" y="140" width="80" height="50" rx="18" fill="#FF8FC4" transform="rotate(-8 95 165)"/>
  <rect x="270" y="150" width="70" height="46" rx="16" fill="#FFD43B" transform="rotate(6 305 173)"/>
  <ellipse cx="200" cy="175" rx="78" ry="38" fill="#FFA94D"/>
  <circle cx="245" cy="150" r="26" fill="#FFA94D"/>
  <polygon points="228,130 236,105 248,128" fill="#FFA94D"/>
  <polygon points="260,128 268,102 278,130" fill="#FFA94D"/>
  <path d="M150 178 Q100 160 95 190" stroke="#4A3F35" stroke-width="6" fill="none" stroke-linecap="round"/>
  <path d="M232 146 q4 4 0 8" stroke="#4A3F35" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M256 146 q4 4 0 8" stroke="#4A3F35" stroke-width="3" fill="none" stroke-linecap="round"/>
  <text x="275" y="100" font-size="26" fill="#4A3F35" font-family="sans-serif">Z z z</text>
</svg>`,

// 1. A handsome prince is flying a giant kite in the park.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="220" width="400" height="80" fill="#63D471"/>
  <polygon points="300,40 350,80 300,120 250,80" fill="#FF6B6B" stroke="#4A3F35" stroke-width="4"/>
  <path d="M300 120 q10 30 -10 50 q15 10 0 30 q12 12 -5 30" stroke="#5C8DFF" stroke-width="3" fill="none"/>
  <line x1="300" y1="120" x2="150" y2="210" stroke="#4A3F35" stroke-width="3"/>
  <circle cx="150" cy="150" r="30" fill="#FFD9B3"/>
  <polygon points="130,128 150,108 170,128 160,122 150,130 140,122" fill="#FFD43B"/>
  <rect x="128" y="178" width="44" height="55" rx="10" fill="#5C8DFF"/>
  <line x1="150" y1="210" x2="150" y2="258" stroke="#4A3F35" stroke-width="7" stroke-linecap="round"/>
  <line x1="138" y1="258" x2="138" y2="280" stroke="#4A3F35" stroke-width="7" stroke-linecap="round"/>
  <line x1="162" y1="258" x2="162" y2="280" stroke="#4A3F35" stroke-width="7" stroke-linecap="round"/>
</svg>`,

// 2. There is a huge rainbow over a tiny mountain.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <path d="M40 260 A160 160 0 0 1 360 260" stroke="#FF6B6B" stroke-width="12" fill="none"/>
  <path d="M62 260 A138 138 0 0 1 338 260" stroke="#FFA94D" stroke-width="12" fill="none"/>
  <path d="M84 260 A116 116 0 0 1 316 260" stroke="#FFD43B" stroke-width="12" fill="none"/>
  <path d="M106 260 A94 94 0 0 1 294 260" stroke="#63D471" stroke-width="12" fill="none"/>
  <path d="M128 260 A72 72 0 0 1 272 260" stroke="#5C8DFF" stroke-width="12" fill="none"/>
  <polygon points="200,210 230,260 170,260" fill="#B08463" stroke="#4A3F35" stroke-width="4"/>
  <polygon points="200,210 212,230 188,230" fill="#FFF9EE"/>
</svg>`,

// 3. A clumsy boy is riding his bike in the heavy rain.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <line x1="40" y1="30" x2="20" y2="80" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="100" y1="20" x2="80" y2="70" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="160" y1="30" x2="140" y2="80" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="240" y1="20" x2="220" y2="70" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="310" y1="30" x2="290" y2="80" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="360" y1="20" x2="340" y2="70" stroke="#4FC3F7" stroke-width="4"/>
  <line x1="20" y1="260" x2="380" y2="260" stroke="#4A3F35" stroke-width="4"/>
  <circle cx="140" cy="230" r="34" fill="none" stroke="#4A3F35" stroke-width="7"/>
  <circle cx="260" cy="230" r="34" fill="none" stroke="#4A3F35" stroke-width="7"/>
  <path d="M140 230 L195 190 L260 230 M195 190 L205 150 M195 190 L160 180" stroke="#FF6B6B" stroke-width="6" fill="none" stroke-linecap="round"/>
  <circle cx="205" cy="130" r="22" fill="#FFD9B3"/>
  <path d="M190 150 q15 20 35 5" stroke="#4A3F35" stroke-width="5" fill="none" stroke-linecap="round"/>
  <text x="250" y="110" font-size="30" fill="#4A3F35" font-family="sans-serif">!</text>
</svg>`,

// 4. Three tiny ducks are swimming in a giant pond.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <ellipse cx="200" cy="170" rx="190" ry="100" fill="#4FC3F7"/>
  <path d="M60 150 q15 10 30 0" stroke="#FFF9EE" stroke-width="4" fill="none"/>
  <path d="M300 200 q15 10 30 0" stroke="#FFF9EE" stroke-width="4" fill="none"/>
  <g>
    <ellipse cx="130" cy="150" rx="22" ry="15" fill="#FFD43B"/>
    <circle cx="150" cy="140" r="11" fill="#FFD43B"/>
    <polygon points="160,140 175,137 160,145" fill="#FFA94D"/>
  </g>
  <g>
    <ellipse cx="210" cy="190" rx="22" ry="15" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <circle cx="230" cy="180" r="11" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <polygon points="240,180 255,177 240,185" fill="#FFA94D"/>
  </g>
  <g>
    <ellipse cx="290" cy="150" rx="22" ry="15" fill="#FFD43B"/>
    <circle cx="310" cy="140" r="11" fill="#FFD43B"/>
    <polygon points="320,140 335,137 320,145" fill="#FFA94D"/>
  </g>
</svg>`,

// 5. An ugly dog is chasing a bouncy ball in the yard.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="220" width="400" height="80" fill="#63D471"/>
  <ellipse cx="140" cy="200" rx="60" ry="34" fill="#B08463"/>
  <circle cx="210" cy="175" r="30" fill="#B08463"/>
  <polygon points="195,150 180,110 205,148" fill="#B08463"/>
  <polygon points="225,148 245,118 232,155" fill="#B08463"/>
  <circle cx="200" cy="170" r="4" fill="#4A3F35"/>
  <circle cx="222" cy="174" r="4" fill="#4A3F35"/>
  <path d="M205 190 q8 14 -4 18" stroke="#FF8FC4" stroke-width="5" fill="none" stroke-linecap="round"/>
  <line x1="110" y1="225" x2="105" y2="250" stroke="#4A3F35" stroke-width="7" stroke-linecap="round"/>
  <line x1="150" y1="228" x2="150" y2="252" stroke="#4A3F35" stroke-width="7" stroke-linecap="round"/>
  <path d="M90 205 q-25 -5 -20 -25" stroke="#B08463" stroke-width="8" fill="none" stroke-linecap="round"/>
  <circle cx="320" cy="210" r="22" fill="#FF6B6B"/>
  <path d="M305 210 h30 M320 195 v30" stroke="#FFF9EE" stroke-width="3"/>
  <path d="M250 215 q15 -6 30 0 q15 6 30 -2" stroke="#4A3F35" stroke-width="2" fill="none" stroke-dasharray="4 5"/>
</svg>`,

// 6. A pretty girl is eating a giant ice cream on a hot summer day.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="330" cy="55" r="30" fill="#FFD43B"/>
  <g stroke="#FFD43B" stroke-width="5" stroke-linecap="round">
    <line x1="330" y1="10" x2="330" y2="0"/>
    <line x1="370" y1="30" x2="380" y2="22"/>
    <line x1="370" y1="80" x2="380" y2="88"/>
  </g>
  <circle cx="160" cy="150" r="34" fill="#FFD9B3"/>
  <polygon points="130,135 150,110 160,135" fill="#4A3F35"/>
  <polygon points="190,135 170,110 160,135" fill="#4A3F35"/>
  <path d="M135 165 q10 1 2 10" fill="#FF8FC4"/>
  <path d="M185 165 q-10 1 -2 10" fill="#FF8FC4"/>
  <polygon points="140,185 180,185 160,260" fill="#B08463" stroke="#4A3F35" stroke-width="3"/>
  <circle cx="160" cy="175" r="34" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
  <circle cx="160" cy="145" r="30" fill="#FF8FC4"/>
  <circle cx="160" cy="118" r="8" fill="#FF6B6B"/>
</svg>`,

// 7. Funny snowmen are standing in front of a cozy house.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="150" y="100" width="140" height="130" fill="#FFD9B3"/>
  <polygon points="140,100 220,40 300,100" fill="#FF6B6B"/>
  <rect x="205" y="160" width="36" height="70" fill="#B08463"/>
  <rect x="165" y="120" width="30" height="30" fill="#4FC3F7"/>
  <g>
    <circle cx="70" cy="220" r="28" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <circle cx="70" cy="175" r="20" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <polygon points="70,175 95,182 70,186" fill="#FFA94D"/>
    <circle cx="63" cy="170" r="3" fill="#4A3F35"/>
    <circle cx="77" cy="170" r="3" fill="#4A3F35"/>
    <rect x="52" y="148" width="36" height="8" fill="#4A3F35" transform="rotate(-8 70 152)"/>
    <line x1="48" y1="220" x2="25" y2="205" stroke="#4A3F35" stroke-width="4"/>
    <line x1="92" y1="220" x2="115" y2="210" stroke="#4A3F35" stroke-width="4"/>
  </g>
  <g>
    <circle cx="340" cy="225" r="24" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <circle cx="340" cy="186" r="17" fill="#FFF9EE" stroke="#4A3F35" stroke-width="2"/>
    <polygon points="340,186 362,192 340,196" fill="#FFA94D"/>
    <circle cx="334" cy="182" r="2.5" fill="#4A3F35"/>
    <circle cx="346" cy="182" r="2.5" fill="#4A3F35"/>
    <path d="M330 196 q10 6 20 0" stroke="#4A3F35" stroke-width="2" fill="none"/>
  </g>
</svg>`,

// 8. A girl is reading a book under a big tree.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="180" y="140" width="34" height="110" fill="#B08463"/>
  <circle cx="150" cy="110" r="65" fill="#63D471"/>
  <circle cx="220" cy="90" r="55" fill="#63D471"/>
  <circle cx="255" cy="130" r="50" fill="#63D471"/>
  <circle cx="300" cy="220" r="26" fill="#FFD9B3"/>
  <polygon points="300,205 280,190 320,190" fill="#4A3F35"/>
  <polygon points="275,260 325,260 310,225 290,225" fill="#FF8FC4"/>
  <rect x="268" y="245" width="40" height="26" fill="#FFF9EE" stroke="#4A3F35" stroke-width="3"/>
  <line x1="288" y1="245" x2="288" y2="271" stroke="#4A3F35" stroke-width="2"/>
</svg>`,

// 9. The sun is rising behind the tall buildings.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <circle cx="200" cy="150" r="60" fill="#FFA94D"/>
  <g stroke="#FFA94D" stroke-width="5" stroke-linecap="round">
    <line x1="200" y1="60" x2="200" y2="40"/>
    <line x1="130" y1="90" x2="115" y2="75"/>
    <line x1="270" y1="90" x2="285" y2="75"/>
  </g>
  <rect x="40" y="130" width="60" height="150" fill="#5C8DFF"/>
  <rect x="110" y="90" width="55" height="190" fill="#4FC3F7"/>
  <rect x="235" y="110" width="55" height="170" fill="#4FC3F7"/>
  <rect x="300" y="150" width="60" height="130" fill="#5C8DFF"/>
  <g fill="#FFF9EE">
    <rect x="55" y="150" width="12" height="12"/><rect x="75" y="150" width="12" height="12"/>
    <rect x="55" y="180" width="12" height="12"/><rect x="75" y="180" width="12" height="12"/>
    <rect x="250" y="130" width="12" height="12"/><rect x="268" y="130" width="12" height="12"/>
    <rect x="315" y="170" width="12" height="12"/><rect x="335" y="170" width="12" height="12"/>
  </g>
</svg>`,

// 10. People are walking with umbrellas on a rainy street.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="240" width="400" height="60" fill="#8A7B6C"/>
  <g stroke="#4FC3F7" stroke-width="3">
    <line x1="30" y1="20" x2="15" y2="60"/><line x1="90" y1="10" x2="75" y2="50"/>
    <line x1="180" y1="20" x2="165" y2="60"/><line x1="260" y1="10" x2="245" y2="50"/>
    <line x1="330" y1="20" x2="315" y2="60"/>
  </g>
  <path d="M90 170 A50 50 0 0 1 190 170 Z" fill="#FF6B6B"/>
  <line x1="140" y1="170" x2="140" y2="250" stroke="#4A3F35" stroke-width="4"/>
  <line x1="128" y1="250" x2="128" y2="270" stroke="#4A3F35" stroke-width="6" stroke-linecap="round"/>
  <line x1="152" y1="250" x2="152" y2="270" stroke="#4A3F35" stroke-width="6" stroke-linecap="round"/>
  <path d="M220 185 A45 45 0 0 1 310 185 Z" fill="#C58CFF"/>
  <line x1="265" y1="185" x2="265" y2="255" stroke="#4A3F35" stroke-width="4"/>
  <line x1="254" y1="255" x2="254" y2="275" stroke="#4A3F35" stroke-width="6" stroke-linecap="round"/>
  <line x1="276" y1="255" x2="276" y2="275" stroke="#4A3F35" stroke-width="6" stroke-linecap="round"/>
</svg>`,

// 11. A family is having a picnic under the blue sky.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="160" fill="#C9E8FB"/>
  <circle cx="330" cy="50" r="24" fill="#FFF9EE"/>
  <circle cx="310" cy="60" r="20" fill="#FFF9EE"/>
  <circle cx="60" cy="55" r="22" fill="#FFF9EE"/>
  <rect x="100" y="190" width="200" height="90" fill="#FF6B6B"/>
  <rect x="100" y="190" width="40" height="90" fill="#FFF9EE"/>
  <rect x="180" y="190" width="40" height="90" fill="#FFF9EE"/>
  <rect x="260" y="190" width="40" height="90" fill="#FFF9EE"/>
  <circle cx="150" cy="220" r="16" fill="#FFD9B3"/>
  <polygon points="135,250 165,250 158,222 142,222" fill="#63D471"/>
  <circle cx="200" cy="215" r="16" fill="#FFD9B3"/>
  <polygon points="185,245 215,245 208,217 192,217" fill="#5C8DFF"/>
  <circle cx="250" cy="220" r="16" fill="#FFD9B3"/>
  <polygon points="235,250 265,250 258,222 242,222" fill="#FF8FC4"/>
  <path d="M310 230 a20 16 0 0 1 40 0 l-4 28 h-32 z" fill="#B08463"/>
</svg>`,

// 12. A cat and a mouse are playing hide and seek.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="150" y="90" width="110" height="170" fill="#B08463" stroke="#4A3F35" stroke-width="3"/>
  <circle cx="135" cy="160" r="30" fill="#FFA94D"/>
  <polygon points="118,140 110,115 132,138" fill="#FFA94D"/>
  <polygon points="150,138 160,112 162,140" fill="#FFA94D"/>
  <circle cx="128" cy="158" r="4" fill="#4A3F35"/>
  <circle cx="146" cy="158" r="4" fill="#4A3F35"/>
  <path d="M260 230 q25 10 30 -10" stroke="#8A7B6C" stroke-width="5" fill="none"/>
  <circle cx="285" cy="225" r="18" fill="#D9D0C3"/>
  <circle cx="276" cy="212" r="7" fill="#D9D0C3"/>
  <circle cx="294" cy="212" r="7" fill="#D9D0C3"/>
  <circle cx="280" cy="222" r="2.5" fill="#4A3F35"/>
  <circle cx="291" cy="222" r="2.5" fill="#4A3F35"/>
</svg>`,

// 13. Stars are shining brightly over the quiet village.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="300" fill="#39426B"/>
  <g fill="#FFD43B">
    <path d="M90 50 l6 16 17 2 -13 11 4 17 -14 -9 -14 9 4 -17 -13 -11 17 -2 z"/>
    <path d="M300 40 l5 13 14 1 -11 9 4 14 -12 -7 -12 7 4 -14 -11 -9 14 -1 z"/>
    <circle cx="200" cy="80" r="3"/><circle cx="240" cy="110" r="3"/>
    <circle cx="150" cy="120" r="3"/><circle cx="340" cy="90" r="3"/>
    <circle cx="60" cy="110" r="3"/>
  </g>
  <g fill="#1F2742">
    <polygon points="20,260 70,260 70,210 45,185 20,210"/>
    <rect x="100" y="230" width="60" height="30"/>
    <polygon points="100,230 130,205 160,230"/>
    <rect x="200" y="215" width="70" height="45"/>
    <polygon points="200,215 235,190 270,215"/>
    <rect x="310" y="235" width="55" height="25"/>
    <polygon points="310,235 337,212 365,235"/>
  </g>
  <rect x="118" y="238" width="12" height="12" fill="#FFD43B"/>
  <rect x="222" y="228" width="12" height="12" fill="#FFD43B"/>
  <rect x="330" y="242" width="10" height="10" fill="#FFD43B"/>
</svg>`,

// 14. Leaves are falling from the trees in autumn.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="250" width="400" height="50" fill="#B08463"/>
  <rect x="170" y="140" width="30" height="110" fill="#B08463"/>
  <circle cx="140" cy="100" r="55" fill="#FFA94D"/>
  <circle cx="200" cy="80" r="50" fill="#FF6B6B"/>
  <circle cx="250" cy="110" r="48" fill="#FFD43B"/>
  <g fill="#FFA94D">
    <ellipse cx="80" cy="170" rx="10" ry="6" transform="rotate(20 80 170)"/>
    <ellipse cx="320" cy="150" rx="10" ry="6" transform="rotate(-25 320 150)"/>
  </g>
  <g fill="#FF6B6B">
    <ellipse cx="110" cy="210" rx="10" ry="6" transform="rotate(10 110 210)"/>
    <ellipse cx="270" cy="200" rx="10" ry="6" transform="rotate(-15 270 200)"/>
  </g>
  <g fill="#FFD43B">
    <ellipse cx="200" cy="230" rx="10" ry="6" transform="rotate(30 200 230)"/>
    <ellipse cx="340" cy="230" rx="10" ry="6" transform="rotate(-10 340 230)"/>
  </g>
</svg>`,

// 15. A rocket is flying past the moon and stars.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="300" fill="#1F2742"/>
  <circle cx="320" cy="70" r="36" fill="#FFD43B"/>
  <circle cx="335" cy="60" r="30" fill="#1F2742"/>
  <g fill="#FFF9EE">
    <circle cx="60" cy="50" r="3"/><circle cx="110" cy="90" r="2.5"/>
    <circle cx="40" cy="140" r="3"/><circle cx="160" cy="40" r="2.5"/>
    <circle cx="90" cy="200" r="3"/>
  </g>
  <g transform="rotate(-35 150 200)">
    <polygon points="150,110 130,170 170,170" fill="#FF6B6B"/>
    <rect x="130" y="170" width="40" height="70" fill="#FFF9EE"/>
    <circle cx="150" cy="195" r="10" fill="#4FC3F7"/>
    <polygon points="130,195 110,220 130,230" fill="#FF6B6B"/>
    <polygon points="170,195 190,220 170,230" fill="#FF6B6B"/>
    <polygon points="138,240 162,240 150,275" fill="#FFA94D"/>
    <polygon points="142,240 158,240 150,262" fill="#FFD43B"/>
  </g>
</svg>`,

// 16. A brave firefighter is climbing a tall ladder in the smoke.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="230" y="40" width="140" height="240" fill="#8A7B6C"/>
  <rect x="255" y="90" width="50" height="60" fill="#FF6B6B"/>
  <path d="M265 140 q10 -20 -5 -30 q20 5 15 -15 q15 10 5 -15" fill="#FFA94D"/>
  <g fill="#AAB4C2" opacity="0.8">
    <ellipse cx="195" cy="65" rx="45" ry="24"/>
    <ellipse cx="255" cy="45" rx="38" ry="22"/>
  </g>
  <g stroke="#B08463" stroke-width="6">
    <line x1="120" y1="280" x2="190" y2="60"/>
    <line x1="160" y1="280" x2="230" y2="60"/>
    <line x1="128" y1="250" x2="182" y2="250"/>
    <line x1="137" y1="210" x2="191" y2="210"/>
    <line x1="146" y1="170" x2="200" y2="170"/>
    <line x1="155" y1="130" x2="209" y2="130"/>
  </g>
  <circle cx="165" cy="190" r="18" fill="#FFD9B3"/>
  <path d="M148 182 a18 14 0 0 1 36 0 z" fill="#FF6B6B"/>
  <rect x="150" y="205" width="32" height="40" rx="8" fill="#FFD43B"/>
</svg>`,

// 17. An elephant is standing next to a tiny car.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="250" width="400" height="30" fill="#D8CBB4"/>
  <ellipse cx="190" cy="170" rx="110" ry="75" fill="#AAB4C2"/>
  <circle cx="90" cy="130" r="55" fill="#AAB4C2"/>
  <ellipse cx="80" cy="120" rx="30" ry="38" fill="#9AA4B2"/>
  <path d="M60 170 q-20 40 5 70 q10 10 20 0" stroke="#AAB4C2" stroke-width="18" fill="none" stroke-linecap="round"/>
  <circle cx="75" cy="118" r="4" fill="#4A3F35"/>
  <g fill="#AAB4C2">
    <rect x="130" y="225" width="22" height="45"/><rect x="180" y="230" width="22" height="42"/>
    <rect x="240" y="230" width="22" height="42"/><rect x="280" y="222" width="22" height="48"/>
  </g>
  <rect x="330" y="225" width="60" height="30" rx="10" fill="#FF6B6B"/>
  <rect x="340" y="208" width="35" height="20" rx="8" fill="#FF6B6B"/>
  <circle cx="345" cy="256" r="9" fill="#4A3F35"/>
  <circle cx="378" cy="256" r="9" fill="#4A3F35"/>
</svg>`,

// 18. A curious monkey is swinging from a tree next to the zoo gate.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="80" y="60" width="26" height="220" fill="#B08463"/>
  <circle cx="93" cy="55" r="60" fill="#63D471"/>
  <line x1="106" y1="90" x2="190" y2="110" stroke="#B08463" stroke-width="8"/>
  <g stroke="#4A3F35" stroke-width="4">
    <line x1="260" y1="150" x2="260" y2="280"/>
    <line x1="340" y1="150" x2="340" y2="280"/>
    <line x1="260" y1="150" x2="340" y2="150"/>
    <line x1="280" y1="150" x2="280" y2="280"/>
    <line x1="300" y1="150" x2="300" y2="280"/>
    <line x1="320" y1="150" x2="320" y2="280"/>
  </g>
  <path d="M190 110 q10 20 0 35" stroke="#8A5A3C" stroke-width="5" fill="none"/>
  <circle cx="195" cy="165" r="26" fill="#B08463"/>
  <circle cx="195" cy="150" r="18" fill="#D8B48C"/>
  <circle cx="188" cy="148" r="2.5" fill="#4A3F35"/>
  <circle cx="202" cy="148" r="2.5" fill="#4A3F35"/>
  <path d="M188 155 q7 6 14 0" stroke="#4A3F35" stroke-width="2" fill="none"/>
  <path d="M195 190 q25 15 10 40" stroke="#B08463" stroke-width="6" fill="none" stroke-linecap="round"/>
</svg>`,

// 19. Two pirates are digging for treasure on the island.
`<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="400" height="230" fill="#CFEFFB"/>
  <path d="M0 230 Q100 210 200 230 T400 230 V300 H0 Z" fill="#4FC3F7"/>
  <ellipse cx="200" cy="245" rx="190" ry="45" fill="#EAD9A5"/>
  <path d="M110 235 q-5 -60 10 -90" stroke="#8A5A3C" stroke-width="10" fill="none"/>
  <circle cx="122" cy="135" r="30" fill="#63D471"/>
  <circle cx="100" cy="150" r="24" fill="#63D471"/>
  <ellipse cx="200" cy="225" rx="30" ry="12" fill="#4A3F35" opacity="0.5"/>
  <rect x="255" y="215" width="60" height="34" rx="4" fill="#B08463" stroke="#4A3F35" stroke-width="3"/>
  <path d="M255 215 q30 -26 60 0" fill="#FFD43B" stroke="#4A3F35" stroke-width="3"/>
  <circle cx="270" cy="240" r="5" fill="#FFD43B"/><circle cx="285" cy="236" r="5" fill="#FFD43B"/><circle cx="300" cy="240" r="5" fill="#FFD43B"/>
  <g>
    <circle cx="150" cy="195" r="16" fill="#FFD9B3"/>
    <path d="M136 188 a16 12 0 0 1 32 0 z" fill="#FF6B6B"/>
    <rect x="136" y="210" width="28" height="30" fill="#4A3F35"/>
    <line x1="150" y1="238" x2="170" y2="268" stroke="#8A7B6C" stroke-width="5"/>
  </g>
  <g>
    <circle cx="340" cy="190" r="16" fill="#FFD9B3"/>
    <path d="M326 183 a16 12 0 0 1 32 0 z" fill="#4A3F35"/>
    <rect x="326" y="205" width="28" height="30" fill="#5C8DFF"/>
    <line x1="340" y1="233" x2="320" y2="263" stroke="#8A7B6C" stroke-width="5"/>
  </g>
</svg>`

];

function getAnswerArt(index) {
  return ANSWER_SVG[index] || `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
    <text x="200" y="150" font-size="60" text-anchor="middle">🎨</text>
  </svg>`;
}
