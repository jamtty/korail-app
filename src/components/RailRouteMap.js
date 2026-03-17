/**
 * RailRouteMap - 코레일 SVG 노선도 컴포넌트
 * - scale >= 1.5 이상 확대 시 상행선/하행선 두 줄 표시
 * - 역 클릭, 구간 클릭, 열차 위치 마커 지원
 */
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';

// ─────────────────────────────────────────────
// 노선 색상 정의
// ─────────────────────────────────────────────
export const LINES = {
  gyeongbuHs:   { name: '경부고속선', color: '#E8192C', upColor: '#FF717D', dash: '10 5' },
  gyeongbu:     { name: '경부선',      color: '#0054A6', upColor: '#3D85D4' },
  suseoHs:      { name: '수서평택선', color: '#9B27AF', upColor: '#C860DC', dash: '10 5' },
  honamHs:      { name: '호남고속선', color: '#F5A623', upColor: '#FFC35A', dash: '10 5' },
  honam:        { name: '호남선',      color: '#00A650', upColor: '#2CC76E' },
  jeolla:       { name: '전라선',      color: '#00863C', upColor: '#00AE52' },
  donghae:      { name: '동해선',      color: '#0095DA', upColor: '#33AEEA' },
  gyeongjeon:   { name: '경전선',      color: '#8C6239', upColor: '#B07D50' },
  gyeongui:     { name: '경의선',      color: '#555555', upColor: '#777777' },
};

// ─────────────────────────────────────────────
// SVG 뷰박스 크기
// ─────────────────────────────────────────────
const VW = 1060;
const VH = 620;

// ─────────────────────────────────────────────
// 역 정의
// 각 역: id, name, x, y, lines[]
// ─────────────────────────────────────────────
export const STATIONS = {
  // ── 경부선 메인 라인 (y=260)
  haengsin:      { id: 'haengsin',      name: '행신',        x: 40,   y: 260, lines: ['gyeongbu'] },
  neunggok:      { id: 'neunggok',      name: '능곡',        x: 70,   y: 260, lines: ['gyeongbu'] },
  neungseo:      { id: 'neungseo',      name: '능서',        x: 85,   y: 260, lines: ['gyeongbu'] },
  yongsan:       { id: 'yongsan',       name: '용산',        x: 100,  y: 260, lines: ['gyeongbu'] },
  youngdeungpo:  { id: 'youngdeungpo',  name: '영등포',      x: 155,  y: 260, lines: ['gyeongbu'] },
  anyang:        { id: 'anyang',        name: '안양',        x: 185,  y: 260, lines: ['gyeongbu'] },
  seoul:         { id: 'seoul',         name: '서울',        x: 135,  y: 260, lines: ['gyeongbu', 'gyeongui'] },
  noryangjin:    { id: 'noryangjin',    name: '노량진',      x: 118,  y: 260, lines: ['gyeongbu'] },
  geumcheon:     { id: 'geumcheon',     name: '금천구청',    x: 210,  y: 260, lines: ['gyeongbu'] },
  gwangmyeong:   { id: 'gwangmyeong',   name: '광명',        x: 230,  y: 260, lines: ['gyeongbuHs', 'gyeongbu'] },

  // 경부선 수원 우회 (금천→수원→병점→오산 → 아래 볼록)
  suwon:         { id: 'suwon',         name: '수원',        x: 240,  y: 240, lines: ['gyeongbu'] },
  byeongjeom:    { id: 'byeongjeom',    name: '병점',        x: 265,  y: 240, lines: ['gyeongbu'] },
  seojungri:     { id: 'seojungri',     name: '서정리',      x: 290,  y: 240, lines: ['gyeongbu'] },
  osan:          { id: 'osan',          name: '오산',        x: 310,  y: 240, lines: ['gyeongbu'] },
  pyeongtaek:    { id: 'pyeongtaek',    name: '평택',        x: 340,  y: 260, lines: ['gyeongbu'] },
  seonghwan:     { id: 'seonghwan',     name: '성환',        x: 360,  y: 260, lines: ['gyeongbu'] },
  cheonan:       { id: 'cheonan',       name: '천안',        x: 390,  y: 240, lines: ['gyeongbu'] },
  cheonanasan:   { id: 'cheonanasan',   name: '천안아산',    x: 390,  y: 260, lines: ['gyeongbuHs'] },

  // 경부선 천안~대전 위 우회
  sinjeonui:     { id: 'sinjeonui',     name: '신전의',      x: 410,  y: 240, lines: ['gyeongbu'] },
  jochiwon:      { id: 'jochiwon',      name: '조치원',      x: 430,  y: 240, lines: ['gyeongbu'] },
  daejeonJochajang: { id: 'daejeonJochajang', name: '매포',       x: 460, y: 240, lines: ['gyeongbu'] },
  sintanjin:     { id: 'sintanjin',     name: '신탄진',      x: 480,  y: 240, lines: ['gyeongbu'] },

  osong:         { id: 'osong',         name: '오송',        x: 440,  y: 260, lines: ['gyeongbuHs', 'honamHs'] },
  daejeon:       { id: 'daejeon',       name: '대전',        x: 500,  y: 260, lines: ['gyeongbu', 'gyeongbuHs'] },
  seodaejeon:    { id: 'seodaejeon',    name: '서대전',      x: 490,  y: 290, lines: ['gyeongbu', 'honam'] },

  // 경부선 대전~김천 위 우회
  okcheon:       { id: 'okcheon',       name: '옥천',        x: 520,  y: 240, lines: ['gyeongbu'] },
  iwon:          { id: 'iwon',          name: '이원',        x: 540,  y: 240, lines: ['gyeongbu'] },
  simcheon:      { id: 'simcheon',      name: '심천',        x: 555,  y: 240, lines: ['gyeongbu'] },
  jitan:         { id: 'jitan',         name: '지탄',        x: 570,  y: 240, lines: ['gyeongbu'] },
  yeongdong:     { id: 'yeongdong',     name: '영동',        x: 590,  y: 240, lines: ['gyeongbu'] },
  hwanggan:      { id: 'hwanggan',      name: '황간',        x: 610,  y: 240, lines: ['gyeongbu'] },
  chupungnyeong: { id: 'chupungnyeong', name: '추풍령',      x: 630,  y: 240, lines: ['gyeongbu'] },
  gimcheon:      { id: 'gimcheon',      name: '김천(구미)',   x: 660,  y: 260, lines: ['gyeongbu', 'gyeongbuHs'] },

  // 경부고속선 대전~김천 위 우회
  gumi:          { id: 'gumi',          name: '구미',        x: 685,  y: 240, lines: ['gyeongbu'] },
  waegwan:       { id: 'waegwan',       name: '왜관',        x: 705,  y: 240, lines: ['gyeongbu'] },
  daegu:         { id: 'daegu',         name: '대구',        x: 725,  y: 240, lines: ['gyeongbu'] },
  dongdaegu:     { id: 'dongdaegu',     name: '동대구',      x: 755,  y: 260, lines: ['gyeongbu', 'gyeongbuHs', 'gyeongjeon'] },

  // 경부선 동대구~삼랑진~부산
  gyeongsan:     { id: 'gyeongsan',     name: '경산',        x: 775,  y: 240, lines: ['gyeongbu'] },
  namseongHyeon: { id: 'namseongHyeon', name: '남성현',      x: 795,  y: 240, lines: ['gyeongbu'] },
  cheongdo:      { id: 'cheongdo',      name: '청도',        x: 810,  y: 240, lines: ['gyeongbu'] },
  sangdong:      { id: 'sangdong',      name: '상동',        x: 825,  y: 240, lines: ['gyeongbu'] },
  miryang:       { id: 'miryang',       name: '밀양',        x: 845,  y: 240, lines: ['gyeongbu'] },
  samnangjin:    { id: 'samnangjin',    name: '삼랑진',      x: 865,  y: 240, lines: ['gyeongbu', 'gyeongjeon'] },
  gyeongju:      { id: 'gyeongju',      name: '경주',        x: 905,  y: 240, lines: ['gyeongbu'] },

  // 경부고속선 신경주~울산~부산 (동해선 분기)
  singyeongju:   { id: 'singyeongju',   name: '신경주',      x: 875,  y: 260, lines: ['gyeongbuHs', 'donghae'] },
  ulsan:         { id: 'ulsan',         name: '울산',        x: 940,  y: 260, lines: ['gyeongbuHs'] },
  busan:         { id: 'busan',         name: '부산',        x: 1010, y: 260, lines: ['gyeongbu', 'gyeongbuHs'] },

  // ── 수서평택선 (SRT: 수서→동탄→지제→천안아산 합류)
  suseo:         { id: 'suseo',         name: '수서',        x: 190,  y: 180, lines: ['suseoHs'] },
  dongtan:       { id: 'dongtan',       name: '동탄',        x: 280,  y: 180, lines: ['suseoHs'] },
  jije:          { id: 'jije',          name: '지제',        x: 320,  y: 220, lines: ['suseoHs'] },

  // ── 호남고속선/호남선 (y=360)
  gongju_hs:     { id: 'gongju_hs',     name: '공주',        x: 390,  y: 310, lines: ['honamHs'] },
  iksan:         { id: 'iksan',         name: '익산',        x: 440,  y: 360, lines: ['honamHs', 'honam', 'jeolla'] },
  jeongup:       { id: 'jeongup',       name: '정읍',        x: 560,  y: 380, lines: ['honam'] },
  gwangjuSongjeong: { id: 'gwangjuSongjeong', name: '광주송정', x: 700, y: 360, lines: ['honamHs', 'honam'] },
  mokpo:         { id: 'mokpo',         name: '목포',        x: 860,  y: 380, lines: ['honam'] },

  // 호남선 서대전~계룡~연산~논산~강경~함열~익산
  gyeryong:      { id: 'gyeryong',      name: '계룡',        x: 490,  y: 320, lines: ['honam'] },
  yeonsan:       { id: 'yeonsan',       name: '연산',        x: 490,  y: 340, lines: ['honam'] },
  nonsan:        { id: 'nonsan',        name: '논산',        x: 490,  y: 360, lines: ['honam'] },
  ganggyeong:    { id: 'ganggyeong',    name: '강경',        x: 470,  y: 380, lines: ['honam'] },
  hamyeol:       { id: 'hamyeol',       name: '함열',        x: 455,  y: 380, lines: ['honam'] },

  // 호남선 익산~목포 (y=380, 호남고속선 y=360과 분리)
  kimje:         { id: 'kimje',         name: '김제',        x: 480,  y: 380, lines: ['honam'] },
  sintaein:      { id: 'sintaein',      name: '신태인',      x: 510,  y: 380, lines: ['honam'] },
  baekyangni:    { id: 'baekyangni',    name: '백양리',      x: 580,  y: 380, lines: ['honam'] },
  jangsong:      { id: 'jangsong',      name: '장성',        x: 620,  y: 380, lines: ['honam'] },
  naju:          { id: 'naju',          name: '나주',        x: 740,  y: 380, lines: ['honam'] },
  hampy:         { id: 'hampy',         name: '함평',        x: 775,  y: 380, lines: ['honam'] },
  muandong:      { id: 'muandong',      name: '무안동',      x: 810,  y: 380, lines: ['honam'] },

  // ── 전라선 (익산→전주→남원→순천→여수: 대각 아래)
  samrye:        { id: 'samrye',        name: '삼례',        x: 440,  y: 400, lines: ['jeolla'] },
  jeonju:        { id: 'jeonju',        name: '전주',        x: 440,  y: 420, lines: ['jeolla'] },
  imsil:         { id: 'imsil',         name: '임실',        x: 460,  y: 440, lines: ['jeolla'] },
  namwon:        { id: 'namwon',        name: '남원',        x: 480,  y: 460, lines: ['jeolla'] },
  gokseong:      { id: 'gokseong',      name: '곡성',        x: 520,  y: 500, lines: ['jeolla'] },
  gurye:         { id: 'gurye',         name: '구례구',      x: 560,  y: 500, lines: ['jeolla'] },
  sunghee:       { id: 'sunghee',       name: '순천',        x: 600,  y: 500, lines: ['jeolla'] },
  yeosu:         { id: 'yeosu',         name: '여수엑스포',  x: 700,  y: 520, lines: ['jeolla'] },

  // ── 경전선 (삼랑진→한림정→진영[꼽임]→진레→창원중앙→마산→진주): 진영에서 오른쪽 수평 꼽임 (니은자)
  hallimjeong:   { id: 'hallimjeong',   name: '한림정',    x: 852,  y: 268, lines: ['gyeongjeon'] },
  jinyeong:      { id: 'jinyeong',      name: '진영',        x: 840,  y: 295, lines: ['gyeongjeon'] },
  jinrye:        { id: 'jinrye',        name: '진레',        x: 878,  y: 295, lines: ['gyeongjeon'] },
  changwonJung:  { id: 'changwonJung',  name: '창원중앙',    x: 918,  y: 295, lines: ['gyeongjeon'] },
  masan:         { id: 'masan',         name: '마산',        x: 955,  y: 295, lines: ['gyeongjeon'] },
  jinju:         { id: 'jinju',         name: '진주',        x: 940,  y: 330, lines: ['gyeongjeon'] },

  // ── 동해선 (부산→부전→해운대→포항)
  bujeon:        { id: 'bujeon',        name: '부전',        x: 1010, y: 240, lines: ['donghae'] },
  haeundae:      { id: 'haeundae',      name: '해운대',      x: 1010, y: 200, lines: ['donghae'] },
  pohang:        { id: 'pohang',        name: '포항',        x: 940,  y: 140, lines: ['donghae', 'gyeongbuHs'] },

  // ── 경의선 (행신→능공→수색→서울: y=220, 경부선 y=240/260과 분리)
  susaek:        { id: 'susaek',        name: '수색',        x: 115,  y: 220, lines: ['gyeongui'] },
  neunggokGu:    { id: 'neunggokGu',    name: '능공',        x: 80,   y: 220, lines: ['gyeongui'] },
  haengsinGu:    { id: 'haengsinGu',    name: '행신',        x: 50,   y: 220, lines: ['gyeongui'] },
};


// ─────────────────────────────────────────────
// 상세 경로 정의
// ─────────────────────────────────────────────
function buildPaths(detailed) {
  const S = STATIONS;
  // 꺾임점 헬퍼: 수평 먼저 → 수직 (or 45도 대각 → 수평)
  const P = (x, y) => ({ x, y });
  const paths = [];

  // ── 경부고속선 (빨강 점선) y=260 수평 직선 ────────────────
  // 정차역: 서울→광명→천안아산→오송→대전→김천(구미)→동대구→신경주→울산→부산
  paths.push({ id: 'hs_seoul_gwangmyeong',       line: 'gyeongbuHs', points: [S.seoul, S.gwangmyeong] });
  paths.push({ id: 'hs_gwangmyeong_cheonanasan', line: 'gyeongbuHs', points: [S.gwangmyeong, S.cheonanasan] });
  paths.push({ id: 'hs_cheonanasan_osong',        line: 'gyeongbuHs', points: [S.cheonanasan, S.osong] });
  paths.push({ id: 'hs_osong_daejeon',            line: 'gyeongbuHs', points: [S.osong, S.daejeon] });
  paths.push({ id: 'hs_daejeon_gimcheon',         line: 'gyeongbuHs', points: [S.daejeon, S.gimcheon] });
  paths.push({ id: 'hs_gimcheon_dongdaegu',       line: 'gyeongbuHs', points: [S.gimcheon, S.dongdaegu] });
  paths.push({ id: 'hs_dongdaegu_singyeongju',   line: 'gyeongbuHs', points: [S.dongdaegu, S.singyeongju] });
  paths.push({ id: 'hs_singyeongju_ulsan',        line: 'gyeongbuHs', points: [S.singyeongju, S.ulsan] });
  paths.push({ id: 'hs_ulsan_busan',              line: 'gyeongbuHs', points: [S.ulsan, S.busan] });
  // 신경주 → 포항: 수직(위) 후 수평
  paths.push({ id: 'hs_singyeongju_pohang',      line: 'gyeongbuHs',
    points: [S.singyeongju, P(875, 140), S.pohang] });

  // ── 경부일반선 (파랑) ─────────────────────────────────
  paths.push({ id: 'gb_haengsin_seoul',     line: 'gyeongbu', points: [S.haengsin, S.neunggok, S.neungseo, S.yongsan, S.noryangjin, S.seoul] });
  paths.push({ id: 'gb_seoul_geumcheon',    line: 'gyeongbu', points: [S.seoul, S.youngdeungpo, S.anyang, S.geumcheon] });
  // 금천(210,260) → 수원(240,240) 위로 꺾임 → 병점 → 서정리 → 오산 → 평택(340,260) 내려옴
  paths.push({ id: 'gb_geumcheon_suwon',    line: 'gyeongbu',
    points: [S.geumcheon, P(230,240), S.suwon, S.byeongjeom, S.seojungri, S.osan, P(330,240), S.pyeongtaek] });
  paths.push({ id: 'gb_pyeongtaek_cheonan', line: 'gyeongbu',
    points: [S.pyeongtaek, S.seonghwan, P(380,240), S.cheonan] });
  // 천안(390,240) → 위 우회 유도 → 대전(500,260)
  paths.push({ id: 'gb_cheonan_daejeon',    line: 'gyeongbu',
    points: [S.cheonan, S.sinjeonui, S.jochiwon, S.daejeonJochajang, S.sintanjin, P(490,240), S.daejeon] });
  // 대전(500,260) → 위 우회 → 김천(660,260)
  paths.push({ id: 'gb_daejeon_gimcheon',   line: 'gyeongbu',
    points: [S.daejeon, P(510,240), S.okcheon, S.iwon, S.simcheon, S.jitan, S.yeongdong, S.hwanggan, S.chupungnyeong, P(650,240), S.gimcheon] });
  // 김천(660,260) → 위 우회 → 동대구(755,260)
  paths.push({ id: 'gb_gimcheon_dongdaegu', line: 'gyeongbu',
    points: [S.gimcheon, P(670,240), S.gumi, S.waegwan, S.daegu, P(745,240), S.dongdaegu] });
  // 동대구(755,260) → 위 우회(y=240) → 삼랑진 → 경주 → 부산
  paths.push({ id: 'gb_dongdaegu_busan',    line: 'gyeongbu',
    points: [S.dongdaegu, P(765,240), S.gyeongsan, S.namseongHyeon, S.cheongdo, S.sangdong, S.miryang, P(855,240), S.samnangjin, S.gyeongju, P(990,240), S.busan] });
  // 서대전 지선
  paths.push({ id: 'gb_daejeon_seodaejeon', line: 'gyeongbu', points: [S.daejeon, S.seodaejeon] });

  // ── 수서평택선 (보라) ─────────────────────────────────
  // 수서(190,180) → 동탄(280,180) → 지제(320,220) 45° → P(390,220) → 천안아산(390,260) 수직
  paths.push({ id: 'suseo_main', line: 'suseoHs',
    points: [S.suseo, S.dongtan, S.jije, P(390, 220), S.cheonanasan] });

  // ── 호남고속선 (주황) ─────────────────────────────────
  // 오송(440,260) →45°↙→ 공주(390,310) →45°↘→ 익산(440,360) →수평→ 광주송정(700,360)
  // 하나의 연속 polyline으로 연결 (꺾임점 렌더링 연속성 유지)
  paths.push({ id: 'honamHs_main', line: 'honamHs',
    points: [S.osong, S.gongju_hs, S.iksan, S.gwangjuSongjeong] });

  // ── 호남선 (초록) ─────────────────────────────────────
  // 서대전(490,290) → 계룡(490,320) → 연산(490,340) → 논산(490,360) → 강경 → 함열 → 익산
  paths.push({ id: 'honam_seodaejeon_nonsan', line: 'honam',
    points: [S.seodaejeon, S.gyeryong, S.yeonsan, S.nonsan] });
  paths.push({ id: 'honam_nonsan_iksan',      line: 'honam',
    // 논산(490,360)에서 y=380으로 내려가 강경·함열 경유, 익산(440,360) 스텁으로 복귀
    points: [S.nonsan, P(460,380), S.ganggyeong, S.hamyeol, P(440,380), S.iksan] });
  // 익산(y=360) → y=380 스텁 → 김제~목포 (y=380, 호남고속선 y=360과 분리)
  paths.push({ id: 'honam_iksan_jeongeup',    line: 'honam', points: [S.iksan, P(440,380), S.kimje, S.sintaein, S.jeongup] });
  paths.push({ id: 'honam_jeongeup_gwangju',  line: 'honam', points: [S.jeongup, S.baekyangni, S.jangsong, P(700,380), S.gwangjuSongjeong] });
  paths.push({ id: 'honam_gwangju_mokpo',     line: 'honam', points: [S.gwangjuSongjeong, P(700,380), S.naju, S.hampy, S.muandong, S.mokpo] });

  // ── 전라선 (진한 초록) ────────────────────────────────
  // 익산(440,380) → 삼례(440,400) → 전주(440,420) 수직
  // → 임실(460,440) → 남원(480,460) 45° 대각
  // → 곡성(520,500) 45° → 구례구(560,500) → 순천(600,500) 수평
  // → 여수(680,500) 수평
  paths.push({ id: 'jeolla_main', line: 'jeolla',
    points: [S.iksan, S.samrye, S.jeonju, S.imsil, S.namwon, P(500,480), S.gokseong, S.gurye, S.sunghee, P(700,500), S.yeosu] });

  // ── 경전선 (갈색) ─────────────────────────────────────
  // 삼랑진→한림정→진영 [켽임]→진레→창원중앙→마산→진주: 진영에서 V자 꼽임
  paths.push({ id: 'gyeongjeon_samnangjin_jinyeong', line: 'gyeongjeon',
    points: [S.samnangjin, S.hallimjeong, S.jinyeong] });
  paths.push({ id: 'gyeongjeon_jinyeong_jinju',      line: 'gyeongjeon',
    points: [S.jinyeong, S.jinrye, S.changwonJung, S.masan, S.jinju] });

  // ── 동해선 (하늘 파랑) ────────────────────────────────
  // 부산(1010,260) → 부전(1010,240) → 해운대(1010,200) 수직 위
  // → 포항(940,140) 45°
  paths.push({ id: 'donghae_busan_pohang', line: 'donghae',
    points: [S.busan, S.bujeon, S.haeundae, P(1010,140), S.pohang] });

  // ── 경의선 (행신→능곡→수색→서울 대각 연결) ───────────────────────────────────
  paths.push({ id: 'gyeongui_main', line: 'gyeongui',
    points: [S.haengsinGu, S.neunggokGu, S.susaek, P(135, 260), S.seoul] });

  return paths;
}

// ─────────────────────────────────────────────
// SVG path d 문자열 생성 (polyline 또는 bezier)
// ─────────────────────────────────────────────
function pointsToD(points) {
  if (!points || points.length === 0) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    d += ` L ${points[i].x} ${points[i].y}`;
  }
  return d;
}

// 두 역 사이 offset 평행선 좌표 계산
function parallelOffset(x1, y1, x2, y2, offset) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = -dy / len, ny = dx / len;
  return {
    x1: x1 + nx * offset, y1: y1 + ny * offset,
    x2: x2 + nx * offset, y2: y2 + ny * offset,
  };
}

// 여러 점 polyline을 offset으로 이동
function offsetPolyline(points, offset) {
  if (points.length < 2) return points;
  const result = [];
  for (let i = 0; i < points.length; i++) {
    let avgNx = 0, avgNy = 0, count = 0;
    if (i > 0) {
      const dx = points[i].x - points[i - 1].x;
      const dy = points[i].y - points[i - 1].y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      avgNx += -dy / len; avgNy += dx / len; count++;
    }
    if (i < points.length - 1) {
      const dx = points[i + 1].x - points[i].x;
      const dy = points[i + 1].y - points[i].y;
      const len = Math.sqrt(dx * dx + dy * dy) || 1;
      avgNx += -dy / len; avgNy += dx / len; count++;
    }
    if (count > 0) { avgNx /= count; avgNy /= count; }
    result.push({ x: points[i].x + avgNx * offset, y: points[i].y + avgNy * offset });
  }
  return result;
}

// ─────────────────────────────────────────────
// 역 라벨 위치 (기본 'bottom')
// ─────────────────────────────────────────────
const LABEL_POS = {
  haengsin: 'bottom', neunggok: 'top', neungseo: 'top',
  yongsan: 'bottom', youngdeungpo: 'bottom', anyang: 'top',
  geumcheon: 'bottom', gwangmyeong: 'bottom',
  seoul: 'top', noryangjin: 'bottom',
  suseo: 'top', dongtan: 'top', jije: 'top',
  cheonanasan: 'bottom',
  suwon: 'top', byeongjeom: 'top', osan: 'top', seojungri: 'top',
  pyeongtaek: 'bottom', seonghwan: 'top',
  cheonan: 'bottom', sinjeonui: 'top', jochiwon: 'top',
  osong: 'bottom',
  daejeonJochajang: 'top', sintanjin: 'top',
  daejeon: 'bottom', seodaejeon: 'right',
  okcheon: 'top', iwon: 'top', simcheon: 'top', jitan: 'top',
  yeongdong: 'top', hwanggan: 'top', chupungnyeong: 'top',
  gimcheon: 'bottom', sindong: 'top',
  gumi: 'top', waegwan: 'top', daegu: 'top',
  dongdaegu: 'bottom', geoncheong: 'top',
  gyeongsan: 'top', namseongHyeon: 'top', cheongdo: 'top',
  sangdong: 'top', miryang: 'top', samnangjin: 'bottom',
  gyeongju: 'top', singyeongju: 'bottom',
  ulsan: 'bottom', busan: 'bottom',
  pohang: 'right',
  bujeon: 'left', haeundae: 'right',
  gongju_hs: 'left',
  iksan: 'bottom', jeongup: 'bottom', gwangjuSongjeong: 'bottom', mokpo: 'right',
  nonsan: 'right', ganggyeong: 'bottom', hamyeol: 'bottom',
  gyeryong: 'left', yeonsan: 'left',
  kimje: 'bottom', sintaein: 'bottom', baekyangni: 'bottom',
  jangsong: 'top', naju: 'top', hampy: 'top', muandong: 'top',
  samrye: 'right', jeonju: 'right', imsil: 'right', namwon: 'right',
  gokseong: 'bottom', gurye: 'bottom', sunghee: 'bottom', yeosu: 'bottom',
  masan: 'top', jinju: 'right', hallimjeong: 'left', jinyeong: 'bottom', jinrye: 'top', changwonJung: 'top',
  susaek: 'top', neunggokGu: 'top', haengsinGu: 'bottom',
};

// ─────────────────────────────────────────────
// 단일 노선 렌더 (상행/하행 분리 여부)
// ─────────────────────────────────────────────
function LinePath({ pathDef, color, upColor, dash, scale, highlighted, onClick }) {
  const showDouble = scale >= 1.5;
  // 선 두께를 scale에 반비례로 고정 → 확대해도 화면 픽셀 폭 유지
  const strokeW = (showDouble ? 3 : 4) / scale;
  const offset = 7 / scale;

  if (showDouble) {
    const upPoints = offsetPolyline(pathDef.points, -offset);
    const downPoints = offsetPolyline(pathDef.points, offset);
    const upStroke = highlighted ? '#FF8800' : (upColor || color);
    const downStroke = highlighted ? '#FF4400' : color;
    return (
      <g onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
        {/* 상행 */}
        <path
          d={pointsToD(upPoints)}
          stroke={upStroke}
          strokeWidth={strokeW}
          fill="none"
          strokeDasharray={dash || ''}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={1}
        />
        {/* 하행 */}
        <path
          d={pointsToD(downPoints)}
          stroke={downStroke}
          strokeWidth={strokeW}
          fill="none"
          strokeDasharray={dash || ''}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={1}
        />
        {/* 복선 중앙 구분선 */}
        <path
          d={pointsToD(pathDef.points)}
          stroke="#aaa"
          strokeWidth={1 / scale}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.7}
          style={{ pointerEvents: 'none' }}
        />
        {/* 가운데 히트 영역 */}
        <path
          d={pointsToD(pathDef.points)}
          stroke="transparent"
          strokeWidth={14}
          fill="none"
        />
      </g>
    );
  }

  return (
    <g onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <path
        d={pointsToD(pathDef.points)}
        stroke={highlighted ? '#FF6600' : color}
        strokeWidth={strokeW}
        fill="none"
        strokeDasharray={dash || ''}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.9}
      />
      <path
        d={pointsToD(pathDef.points)}
        stroke="transparent"
        strokeWidth={14}
        fill="none"
      />
    </g>
  );
}

// ─────────────────────────────────────────────
// 역 노드 컴포넌트
// ─────────────────────────────────────────────
function StationNode({ station, highlighted, scale, onClick, onMouseEnter, onMouseLeave }) {
  const { x, y, name, lines } = station;
  const mainLine = lines[0];
  const isJunction = lines.length > 1;
  const isTerminal = ['haengsin', 'busan', 'mokpo', 'yeosu', 'pohang', 'suseo', 'dongtan', 'jinju'].includes(station.id);

  // 역 원 반지름과 스트로크를 scale 반비례로 고정 → 화면 픽셀 크기 유지
  const r = (isJunction ? 7 : (isTerminal ? 6 : 4.5)) / scale;
  const lineColor = LINES[mainLine]?.color || '#555';
  const strokeColor = highlighted ? '#FF4400' : lineColor;
  const strokeW = (isJunction ? 2.5 : 2) / scale;

  const pos = LABEL_POS[station.id] || 'bottom';
  const labelOffset = 10;  // SVG 단위 고정 → 확대 시 함께 벌어짐
  let lx = x, ly = y;
  if (pos === 'bottom') { ly = y + labelOffset; }
  else if (pos === 'top') { ly = y - labelOffset; }
  else if (pos === 'left') { lx = x - labelOffset; }
  else if (pos === 'right') { lx = x + labelOffset; }

  const nameLines = name.split('\n');
  const fontSize = 6;  // SVG 단위 고정 → viewBox 줌에 따라 자연스럽게 확대/축소
  const showLabel = scale >= 0.7;

  return (
    <g
      onClick={onClick}
      onMouseEnter={(e) => onMouseEnter && onMouseEnter(e, station)}
      onMouseLeave={onMouseLeave}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      aria-label={name}
    >
      {/* 히트 영역 */}
      <circle cx={x} cy={y} r={r + 6} fill="transparent" />
      {/* 역 원 */}
      {isJunction ? (
        <>
          {/* 파이 차트: 각 노선 색상 섹터 */}
          {lines.map((lineId, i) => {
            const n = lines.length;
            const startAngle = (360 / n) * i - 90;
            const endAngle   = (360 / n) * (i + 1) - 90;
            const x1 = x + r * Math.cos(startAngle * Math.PI / 180);
            const y1 = y + r * Math.sin(startAngle * Math.PI / 180);
            const x2 = x + r * Math.cos(endAngle   * Math.PI / 180);
            const y2 = y + r * Math.sin(endAngle   * Math.PI / 180);
            const largeArc = (360 / n) > 180 ? 1 : 0;
            const segColor = LINES[lineId]?.color || '#555';
            return (
              <path
                key={lineId}
                d={`M ${x} ${y} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`}
                fill={segColor}
              />
            );
          })}
          {/* 섹터 구분 흰 테두리 */}
          <circle cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth={1.2/scale} />
        </>
      ) : (
        <circle cx={x} cy={y} r={r} fill="#fff" stroke={strokeColor} strokeWidth={strokeW} />
      )}
      {highlighted && (
        <circle cx={x} cy={y} r={r + 6/scale} fill="none" stroke="#FF4400" strokeWidth={1.5/scale} opacity={0.5} strokeDasharray={`${3/scale} ${2/scale}`} />
      )}
      {/* 역명 레이블 */}
      {showLabel && nameLines.map((line, i) => (
        <text
          key={i}
          x={lx}
          y={ly + i * (fontSize + 2)}
          textAnchor={pos === 'left' ? 'end' : pos === 'right' ? 'start' : 'middle'}
          dominantBaseline="middle"
          fontSize={fontSize}
          fontWeight={isJunction || isTerminal ? 'bold' : 'normal'}
          fill={highlighted ? '#FF4400' : '#222'}
          style={{ pointerEvents: 'none', userSelect: 'none' }}
        >
          {line}
        </text>
      ))}
    </g>
  );
}

// ─────────────────────────────────────────────
// 방향 화살표 (상행/하행)
// ─────────────────────────────────────────────
function DirectionArrow({ x1, y1, x2, y2, color, offset }) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = Math.sqrt(dx * dx + dy * dy) || 1;
  const nx = dx / len, ny = dy / len;
  const px = -ny, py = nx;

  const arrowSize = 5;
  const midRatio = 0.55;
  const ax = x1 + dx * midRatio + px * offset;
  const ay = y1 + dy * midRatio + py * offset;

  return (
    <g>
      <line
        x1={x1 + px * offset} y1={y1 + py * offset}
        x2={x2 + px * offset} y2={y2 + py * offset}
        stroke={color} strokeWidth={1.5} opacity={0.35} strokeDasharray="5 4"
      />
      <polygon
        points={`
          ${ax + nx * arrowSize},${ay + ny * arrowSize}
          ${ax - nx * arrowSize + py * arrowSize * 0.6},${ay - ny * arrowSize - px * arrowSize * 0.6}
          ${ax - nx * arrowSize - py * arrowSize * 0.6},${ay - ny * arrowSize + px * arrowSize * 0.6}
        `}
        fill={color} opacity={0.45}
      />
    </g>
  );
}

// ─────────────────────────────────────────────
// 열차 마커
// ─────────────────────────────────────────────
function TrainMarker({ train, station }) {
  if (!station) return null;
  const { x, y } = station;
  const color = train.color || '#0164E6';
  const dir = train.direction === 'up' ? '↑' : '↓';
  return (
    <g>
      <rect x={x - 14} y={y - 28} width={28} height={18} rx={5} fill={color} />
      <text x={x} y={y - 19} textAnchor="middle" dominantBaseline="middle"
        fontSize={8} fill="#fff" fontWeight="bold"
        style={{ pointerEvents: 'none', userSelect: 'none' }}>
        {dir}{train.id.slice(-4)}
      </text>
    </g>
  );
}

// ─────────────────────────────────────────────
// 메인 컴포넌트
// ─────────────────────────────────────────────
export default function RailRouteMap({
  width = '100%',
  height = 560,
  scale = 1,
  onStationClick,
  onSectionClick,
  onEmptyClick,
  highlightStations = [],
  highlightSections = [],
  trainPositions = [],
  showDirection = true,
  className = '',
  style: styleProp = {},
}) {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  // center: SVG 좌표계 기준 뷰포트 중심점 (viewBox 기반 줌/패닝)
  const [center, setCenter] = useState({ x: 550, y: 350 });
  const [tooltip, setTooltip] = useState(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const centerStart = useRef({ x: 550, y: 350 });

  // scale이 1로 리셋될 때 중심 복원
  useEffect(() => {
    if (scale === 1) {
      setCenter({ x: 550, y: 350 });
    }
  }, [scale]);

  const paths = useMemo(() => buildPaths(scale >= 1.5), [scale]);

  const handleStationClick = useCallback((station) => {
    if (onStationClick) onStationClick(station);
  }, [onStationClick]);

  const handleSectionClick = useCallback((section) => {
    if (onSectionClick) onSectionClick(section);
  }, [onSectionClick]);

  // SVG 픽셀 → SVG 유닛 비율
  const getRatio = useCallback(() => {
    if (!svgRef.current) return { rx: 1, ry: 1 };
    const rect = svgRef.current.getBoundingClientRect();
    return {
      rx: VW / (rect.width || 1),
      ry: VH / (rect.height || 1),
    };
  }, []);

  const handleMouseDown = useCallback((e) => {
    isDragging.current = true;
    dragMoved.current = false;
    dragStart.current = { x: e.clientX, y: e.clientY };
    centerStart.current = { ...center };
    e.preventDefault();
  }, [center]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging.current) return;
    const mdx = e.clientX - dragStart.current.x;
    const mdy = e.clientY - dragStart.current.y;
    if (Math.abs(mdx) > 3 || Math.abs(mdy) > 3) {
      dragMoved.current = true;
    }
    const { rx, ry } = getRatio();
    // 화면 픽셀 이동 → SVG 유닛 변환 (scale 나누기로 확대 시 더 민감하게 반응)
    const dx = mdx * rx / scale;
    const dy = mdy * ry / scale;
    setCenter({ x: centerStart.current.x - dx, y: centerStart.current.y - dy });
  }, [getRatio, scale]);

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleStationMouseEnter = useCallback((e, station) => {
    setTooltip({ station });
  }, []);

  const handleStationMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);

  // 툴팅 SVG 좌표 → 화면 좌표 (scale/center 변화 시 자동 재계산)
  const tooltipScreenPos = useMemo(() => {
    if (!tooltip || !svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const vbLeft = center.x - VW / (2 * scale);
    const vbTop  = center.y - VH / (2 * scale);
    const vbW    = VW / scale;
    const vbH    = VH / scale;
    return {
      x: ((tooltip.station.x - vbLeft) / vbW) * rect.width  + 14,
      y: ((tooltip.station.y - vbTop)  / vbH) * rect.height + 14,
    };
  }, [tooltip, center, scale]);

  // 방향 화살표 삭제 (dirArrows 사용 안 함)

  return (
    <div
      ref={containerRef}
      className={`rail-route-map ${className}`}
      style={{ position: 'relative', background: 'transparent', overflow: 'hidden', width, height, ...styleProp }}
    >
      <svg
        ref={svgRef}
        width={width}
        height={height}
        viewBox={`${center.x - VW / (2 * scale)} ${center.y - VH / (2 * scale)} ${VW / scale} ${VH / scale}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ display: 'block', cursor: isDragging.current ? 'grabbing' : 'grab' }}
        aria-label="코레일 노선도"
        role="img"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* ── 빈 공간 클릭 배경 ── */}
        <rect
          x={-10000} y={-10000} width={30000} height={30000}
          fill="transparent"
          onClick={() => { if (!dragMoved.current && onEmptyClick) onEmptyClick(); }}
        />

        {/* ── 노선 경로 ── */}
        {paths.map((p) => {
          const lineConf = LINES[p.line] || {};
          const highlighted = highlightSections.includes(p.id);
          return (
            <LinePath
              key={p.id}
              pathDef={p}
              color={lineConf.color || '#888'}
              upColor={lineConf.upColor}
              dash={lineConf.dash}
              scale={scale}
              highlighted={highlighted}
              onClick={onSectionClick ? () => handleSectionClick(p) : undefined}
            />
          );
        })}

        {/* ── 방향 화살표: 비활성화 ── */}

        {/* ── 역 노드 ── */}
        {Object.values(STATIONS).map((station) => {
          const highlighted = highlightStations.includes(station.id);
          return (
            <StationNode
              key={station.id}
              station={station}
              highlighted={highlighted}
              scale={scale}
              onClick={onStationClick ? () => handleStationClick(station) : undefined}
              onMouseEnter={handleStationMouseEnter}
              onMouseLeave={handleStationMouseLeave}
            />
          );
        })}

        {/* ── 열차 마커 ── */}
        {trainPositions.map((train) => (
          <TrainMarker key={train.id} train={train} station={STATIONS[train.stationId]} />
        ))}
      </svg>
      {tooltipScreenPos && (() => {
        const ts = Math.max(0.65, Math.min(2.0, scale));
        return (
          <div style={{
            position: 'absolute',
            left: tooltipScreenPos.x,
            top: tooltipScreenPos.y,
            background: 'rgba(24,24,32,0.93)',
            color: '#fff',
            padding: `${Math.round(6 * ts)}px ${Math.round(10 * ts)}px`,
            borderRadius: `${Math.round(7 * ts)}px`,
            fontSize: `${Math.round(12 * ts)}px`,
            pointerEvents: 'none',
            zIndex: 200,
            lineHeight: '1.65',
            whiteSpace: 'nowrap',
            boxShadow: '0 2px 10px rgba(0,0,0,0.35)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: `${Math.round(2 * ts)}px` }}>{tooltip.station.name}</div>
            <div style={{ color: '#aac4ff', fontSize: `${Math.round(11 * ts)}px` }}>
              {tooltip.station.lines.map(l => LINES[l]?.name || l).join(' · ')}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
