const {
  useState,
  useEffect,
  useRef,
  useCallback
} = React;
const FONT_SCALE_MIN = 0.7;
const FONT_SCALE_MAX = 1.6;
const FONT_SCALE_STEP = 0.1;
const TWEAK_DEFAULTS = {
  "circleStyle": "filled",
  "fontScale": 1.0
};
const PANELS_DATA = [{
  id: 'cover',
  label: '',
  bg: 'oklch(38% 0.08 14)',
  fg: 'oklch(92% 0.03 60)',
  accent: 'oklch(68% 0.14 48)',
  circleSize: 420,
  circleOpacity: 0.07
}, {
  id: 'namaste',
  label: '00 · Opening',
  bg: 'oklch(24% 0.09 22)',
  fg: 'oklch(93% 0.03 60)',
  accent: 'oklch(72% 0.15 48)',
  circleSize: 320,
  circleOpacity: 0.1
}, {
  id: 'my-heart',
  label: '01 · My Heart',
  bg: 'oklch(88% 0.07 60)',
  fg: 'oklch(20% 0.06 30)',
  accent: 'oklch(42% 0.12 30)',
  circleSize: 220,
  circleOpacity: 0.18
}, {
  id: 'our-hearts',
  label: '02 · Our Hearts',
  bg: 'oklch(82% 0.07 18)',
  fg: 'oklch(20% 0.06 10)',
  accent: 'oklch(40% 0.09 10)',
  circleSize: 360,
  circleOpacity: 0.15
}, {
  id: 'more-hearts',
  label: '03 · More Hearts',
  bg: 'oklch(74% 0.06 160)',
  fg: 'oklch(18% 0.05 170)',
  accent: 'oklch(35% 0.08 170)',
  circleSize: 500,
  circleOpacity: 0.13
}, {
  id: 'all-hearts',
  label: '04 · Open to All Hearts',
  bg: 'oklch(20% 0.09 270)',
  fg: 'oklch(92% 0.03 80)',
  accent: 'oklch(72% 0.14 270)',
  circleSize: 700,
  circleOpacity: 0.12
}, {
  id: 'gathering-hearts',
  label: '05 · Gathering All Hearts',
  bg: 'oklch(26% 0.11 270)',
  fg: 'oklch(92% 0.03 80)',
  accent: 'oklch(75% 0.13 310)',
  circleSize: 560,
  circleOpacity: 0.11
}, {
  id: 'return',
  label: '06 · The Return',
  bg: 'oklch(78% 0.12 78)',
  fg: 'oklch(18% 0.06 40)',
  accent: 'oklch(35% 0.10 40)',
  circleSize: 240,
  circleOpacity: 0.18
}, {
  id: 'cycles',
  label: 'The Arc',
  bg: 'oklch(95% 0.02 70)',
  fg: 'oklch(20% 0.05 30)',
  accent: 'oklch(42% 0.10 30)',
  circleSize: 340,
  circleOpacity: 0.08
}, {
  id: 'theology',
  label: 'Ground',
  bg: 'oklch(19% 0.07 270)',
  fg: 'oklch(92% 0.03 80)',
  accent: 'oklch(70% 0.12 270)',
  circleSize: 460,
  circleOpacity: 0.1
}, {
  id: 'for-you',
  label: 'For You',
  bg: 'oklch(22% 0.06 25)',
  fg: 'oklch(92% 0.03 60)',
  accent: 'oklch(70% 0.14 50)',
  circleSize: 300,
  circleOpacity: 0.1
}];
function ConcentricHearts({
  cx,
  cy,
  scale = 1,
  color,
  opacities = [0.22, 0.35, 0.5],
  dotOpacity = 0.75
}) {
  const t = `translate(${cx}, ${cy}) scale(${scale}) translate(-200, -133)`;
  return React.createElement("g", {
    transform: t
  }, React.createElement("path", {
    d: "M200,198 C200,198 126,158 126,110 C126,82 146,68 163,68 C178,68 191,78 200,94 C209,78 222,68 237,68 C254,68 274,82 274,110 C274,158 200,198 200,198Z",
    fill: "none",
    stroke: color,
    strokeWidth: 0.7 / scale,
    opacity: opacities[0]
  }), React.createElement("path", {
    d: "M200,183 C200,183 142,150 142,110 C142,88 158,76 170,76 C183,76 194,86 200,100 C206,86 217,76 230,76 C242,76 258,88 258,110 C258,150 200,183 200,183Z",
    fill: "none",
    stroke: color,
    strokeWidth: 0.8 / scale,
    opacity: opacities[1]
  }), React.createElement("path", {
    d: "M200,168 C200,168 158,143 158,112 C158,94 170,84 179,84 C189,84 197,92 200,103 C203,92 211,84 221,84 C230,84 242,94 242,112 C242,143 200,168 200,168Z",
    fill: "none",
    stroke: color,
    strokeWidth: 1 / scale,
    opacity: opacities[2]
  }), React.createElement("circle", {
    cx: "200",
    cy: "84",
    r: 5 / scale,
    fill: color,
    opacity: dotOpacity
  }), React.createElement("circle", {
    cx: "200",
    cy: "84",
    r: 2 / scale,
    fill: "none",
    stroke: color,
    strokeWidth: 0.5 / scale,
    opacity: "0.3"
  }));
}
const GraphicCover = () => React.createElement("svg", {
  viewBox: "0 0 400 300",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement("rect", {
  width: "400",
  height: "300",
  fill: "oklch(38% 0.08 14)"
}), React.createElement("radialGradient", {
  id: "cov-glow",
  cx: "50%",
  cy: "50%",
  r: "50%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(68% 0.14 48)",
  stopOpacity: "0.22"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(68% 0.14 48)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "150",
  r: "160",
  fill: "url(#cov-glow)"
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 155,
  scale: 1.55,
  color: "oklch(68% 0.14 48)",
  opacities: [0.18, 0.32, 0.48],
  dotOpacity: 0
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 155,
  scale: 1.15,
  color: "oklch(68% 0.14 48)",
  opacities: [0.38, 0.6, 0.82],
  dotOpacity: 0.9
}), React.createElement("circle", {
  cx: "200",
  cy: "108",
  r: "5",
  fill: "oklch(88% 0.08 60)",
  opacity: "0.9"
}));
const GraphicNameste = () => React.createElement("svg", {
  viewBox: "100 75 200 150",
  preserveAspectRatio: "xMidYMid meet",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement("rect", {
  x: "100",
  y: "75",
  width: "200",
  height: "150",
  fill: "oklch(24% 0.09 22)"
}), React.createElement("radialGradient", {
  id: "nam-glow",
  cx: "50%",
  cy: "48%",
  r: "45%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(72% 0.15 48)",
  stopOpacity: "0.18"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(72% 0.15 48)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "144",
  r: "140",
  fill: "url(#nam-glow)"
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 148,
  scale: 1.0,
  color: "oklch(72% 0.15 48)",
  opacities: [0.22, 0.35, 0.5],
  dotOpacity: 0.75
}), React.createElement("path", {
  d: "M200,90 C188,98 174,114 169,133 C164,152 166,173 170,188 C174,203 180,214 186,218 L200,218 L200,90Z",
  fill: "none",
  stroke: "oklch(72% 0.15 48)",
  strokeWidth: "1.3",
  opacity: "0.75",
  strokeLinejoin: "round"
}), React.createElement("path", {
  d: "M200,90 C212,98 226,114 231,133 C236,152 234,173 230,188 C226,203 220,214 214,218 L200,218 L200,90Z",
  fill: "none",
  stroke: "oklch(72% 0.15 48)",
  strokeWidth: "1.3",
  opacity: "0.75",
  strokeLinejoin: "round"
}), React.createElement("line", {
  x1: "200",
  y1: "90",
  x2: "200",
  y2: "218",
  stroke: "oklch(72% 0.15 48)",
  strokeWidth: "0.6",
  opacity: "0.3",
  strokeDasharray: "3,5"
}), React.createElement("path", {
  d: "M174,244 Q200,232 226,244",
  fill: "none",
  stroke: "oklch(72% 0.15 48)",
  strokeWidth: "1",
  opacity: "0.45"
}));
const GraphicMyHeart = () => React.createElement("svg", {
  viewBox: "100 75 200 150",
  preserveAspectRatio: "xMidYMid meet",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement("rect", {
  x: "100",
  y: "75",
  width: "200",
  height: "150",
  fill: "oklch(88% 0.07 60)"
}), React.createElement("radialGradient", {
  id: "mh-glow",
  cx: "50%",
  cy: "50%",
  r: "40%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(42% 0.12 30)",
  stopOpacity: "0.1"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(42% 0.12 30)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "150",
  r: "130",
  fill: "url(#mh-glow)"
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 155,
  scale: 1.05,
  color: "oklch(42% 0.12 30)",
  opacities: [0.1, 0.18, 0.28],
  dotOpacity: 0
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 155,
  scale: 0.72,
  color: "oklch(42% 0.12 30)",
  opacities: [0.25, 0.42, 0.6],
  dotOpacity: 0.75
}), React.createElement("circle", {
  cx: "200",
  cy: "118",
  r: "4",
  fill: "oklch(88% 0.07 60)",
  opacity: "0.85"
}));
const GraphicOurHearts = () => React.createElement("svg", {
  viewBox: "100 75 200 150",
  preserveAspectRatio: "xMidYMid meet",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement("rect", {
  x: "100",
  y: "75",
  width: "200",
  height: "150",
  fill: "oklch(82% 0.07 18)"
}), React.createElement("radialGradient", {
  id: "oh-glow",
  cx: "50%",
  cy: "50%",
  r: "50%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(40% 0.09 10)",
  stopOpacity: "0.08"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(40% 0.09 10)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "150",
  r: "160",
  fill: "url(#oh-glow)"
}), React.createElement(ConcentricHearts, {
  cx: 175,
  cy: 152,
  scale: 0.65,
  color: "oklch(40% 0.09 10)",
  opacities: [0.15, 0.3, 0.52],
  dotOpacity: 0.65
}), React.createElement(ConcentricHearts, {
  cx: 225,
  cy: 152,
  scale: 0.65,
  color: "oklch(40% 0.09 10)",
  opacities: [0.15, 0.3, 0.52],
  dotOpacity: 0.65
}), React.createElement("radialGradient", {
  id: "oh-overlap",
  cx: "50%",
  cy: "52%",
  r: "18%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(40% 0.09 10)",
  stopOpacity: "0.18"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(40% 0.09 10)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "156",
  r: "55",
  fill: "url(#oh-overlap)"
}));
const GraphicMoreHearts = () => {
  const accent = "oklch(35% 0.08 170)";
  const inner = [[200, 80], [270, 110], [290, 175], [248, 232], [152, 232], [110, 175], [130, 110]];
  const outer = [[200, 38], [318, 80], [340, 200], [270, 272], [130, 272], [60, 200], [82, 80]];
  return React.createElement("svg", {
    viewBox: "40 25 320 260",
    preserveAspectRatio: "xMidYMid meet",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%"
  }, React.createElement("rect", {
    x: "40",
    y: "25",
    width: "320",
    height: "260",
    fill: "oklch(74% 0.06 160)"
  }), inner.map(([x, y], i) => React.createElement("line", {
    key: i,
    x1: "200",
    y1: "150",
    x2: x,
    y2: y,
    stroke: accent,
    strokeWidth: "0.6",
    opacity: "0.18"
  })), outer.map(([x, y], i) => React.createElement("line", {
    key: i,
    x1: inner[i][0],
    y1: inner[i][1],
    x2: x,
    y2: y,
    stroke: accent,
    strokeWidth: "0.4",
    opacity: "0.1"
  })), outer.map(([x, y], i) => React.createElement(ConcentricHearts, {
    key: i,
    cx: x,
    cy: y,
    scale: 0.09,
    color: accent,
    opacities: [0.2, 0.35, 0.55],
    dotOpacity: 0
  })), inner.map(([x, y], i) => React.createElement(ConcentricHearts, {
    key: i,
    cx: x,
    cy: y,
    scale: 0.13,
    color: accent,
    opacities: [0.25, 0.42, 0.62],
    dotOpacity: 0
  })), React.createElement(ConcentricHearts, {
    cx: 200,
    cy: 152,
    scale: 0.48,
    color: accent,
    opacities: [0.3, 0.52, 0.75],
    dotOpacity: 0
  }));
};
const GraphicAllHearts = () => {
  const color = "oklch(72% 0.14 270)";
  const positions = [];
  const R = 130;
  let seed = 1337;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 95; i++) {
    const rr = Math.sqrt(rand()) * R,
      theta = rand() * Math.PI * 2;
    positions.push({
      x: 200 + rr * Math.cos(theta),
      y: 195 + rr * Math.sin(theta) * 0.55,
      sc: 0.045 + rand() * 0.055,
      op: 0.16 + rand() * 0.38
    });
  }
  return React.createElement("svg", {
    viewBox: "0 0 400 300",
    preserveAspectRatio: "xMidYMid slice",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%",
    style: {
      display: 'block'
    }
  }, React.createElement("rect", {
    x: "-400",
    y: "-300",
    width: "1200",
    height: "900",
    fill: "oklch(20% 0.09 270)"
  }), React.createElement("radialGradient", {
    id: "ah-glow",
    cx: "50%",
    cy: "50%",
    r: "65%"
  }, React.createElement("stop", {
    offset: "0%",
    stopColor: "oklch(72% 0.14 270)",
    stopOpacity: "0.22"
  }), React.createElement("stop", {
    offset: "100%",
    stopColor: "oklch(72% 0.14 270)",
    stopOpacity: "0"
  })), React.createElement("circle", {
    cx: "200",
    cy: "195",
    r: "220",
    fill: "url(#ah-glow)"
  }), positions.map(({
    x,
    y,
    sc,
    op
  }, i) => React.createElement(ConcentricHearts, {
    key: i,
    cx: x,
    cy: y,
    scale: sc,
    color: color,
    opacities: [0, 0, op],
    dotOpacity: 0
  })), React.createElement("path", {
    d: "M200,195 Q90,170 10,195",
    fill: "none",
    stroke: color,
    strokeWidth: "1.8",
    opacity: "0.55",
    strokeLinecap: "round"
  }), React.createElement("path", {
    d: "M200,195 Q310,170 390,195",
    fill: "none",
    stroke: color,
    strokeWidth: "1.8",
    opacity: "0.55",
    strokeLinecap: "round"
  }), React.createElement(ConcentricHearts, {
    cx: 10,
    cy: 195,
    scale: 0.08,
    color: color,
    opacities: [0, 0, 0.5],
    dotOpacity: 0
  }), React.createElement(ConcentricHearts, {
    cx: 390,
    cy: 195,
    scale: 0.08,
    color: color,
    opacities: [0, 0, 0.5],
    dotOpacity: 0
  }), React.createElement(ConcentricHearts, {
    cx: 200,
    cy: 197,
    scale: 0.7,
    color: color,
    opacities: [0.3, 0.52, 0.75],
    dotOpacity: 0
  }));
};
const GraphicGathering = () => {
  const accent = "oklch(75% 0.13 310)",
    bg = "oklch(26% 0.11 270)",
    R = 118,
    cx = 200,
    cy = 155;
  const innerHearts = [];
  [[0.25, 0.3], [0.5, 0.15], [0.75, 0.28], [0.15, 0.55], [0.38, 0.48], [0.62, 0.5], [0.85, 0.52], [0.22, 0.72], [0.5, 0.68], [0.78, 0.7], [0.35, 0.88], [0.65, 0.85], [0.5, 0.5], [0.12, 0.42], [0.88, 0.42], [0.3, 0.62], [0.7, 0.6], [0.45, 0.35], [0.55, 0.38], [0.18, 0.82]].forEach(([nx, ny]) => {
    const hx = cx - R + nx * R * 2,
      hy = cy - R + ny * R * 2;
    if (Math.sqrt((hx - cx) ** 2 + (hy - cy) ** 2) < R * 0.85) innerHearts.push([hx, hy]);
  });
  return React.createElement("svg", {
    viewBox: "70 30 260 250",
    preserveAspectRatio: "xMidYMid meet",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%"
  }, React.createElement("defs", null, React.createElement("clipPath", {
    id: "ga-clip"
  }, React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: R
  })), React.createElement("radialGradient", {
    id: "ga-glow",
    cx: "50%",
    cy: "52%",
    r: "45%"
  }, React.createElement("stop", {
    offset: "0%",
    stopColor: accent,
    stopOpacity: "0.22"
  }), React.createElement("stop", {
    offset: "100%",
    stopColor: accent,
    stopOpacity: "0"
  }))), React.createElement("rect", {
    x: "70",
    y: "30",
    width: "260",
    height: "250",
    fill: bg
  }), React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: R,
    fill: "url(#ga-glow)"
  }), React.createElement("circle", {
    cx: cx,
    cy: cy,
    r: R,
    fill: "none",
    stroke: accent,
    strokeWidth: "1",
    opacity: "0.5"
  }), React.createElement("g", {
    clipPath: "url(#ga-clip)"
  }, innerHearts.map(([hx, hy], i) => React.createElement("g", {
    key: i
  }, React.createElement("line", {
    x1: hx,
    y1: hy,
    x2: cx + (hx - cx) * 0.28,
    y2: cy + (hy - cy) * 0.28,
    stroke: accent,
    strokeWidth: "0.6",
    opacity: "0.2",
    strokeDasharray: "2,4"
  }), React.createElement(ConcentricHearts, {
    cx: hx,
    cy: hy,
    scale: 0.1,
    color: accent,
    opacities: [0.1, 0.22, 0.4],
    dotOpacity: 0
  })))), React.createElement(ConcentricHearts, {
    cx: cx,
    cy: cy - 2,
    scale: 0.48,
    color: accent,
    opacities: [0.25, 0.44, 0.65],
    dotOpacity: 0
  }));
};
const GraphicReturn = () => {
  const pts = [];
  for (let t = 0; t <= 4.5 * Math.PI; t += 0.05) {
    const r = 2 + t * 8.2;
    pts.push(`${t === 0 ? 'M' : 'L'}${(200 + r * Math.cos(t)).toFixed(1)},${(150 + r * Math.sin(t)).toFixed(1)}`);
  }
  return React.createElement("svg", {
    viewBox: "40 30 320 240",
    preserveAspectRatio: "xMidYMid meet",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%"
  }, React.createElement("rect", {
    x: "40",
    y: "30",
    width: "320",
    height: "240",
    fill: "oklch(78% 0.12 78)"
  }), React.createElement("radialGradient", {
    id: "ret-glow",
    cx: "50%",
    cy: "50%",
    r: "45%"
  }, React.createElement("stop", {
    offset: "0%",
    stopColor: "oklch(35% 0.10 40)",
    stopOpacity: "0.12"
  }), React.createElement("stop", {
    offset: "100%",
    stopColor: "oklch(35% 0.10 40)",
    stopOpacity: "0"
  })), React.createElement("circle", {
    cx: "200",
    cy: "150",
    r: "150",
    fill: "url(#ret-glow)"
  }), React.createElement("path", {
    d: pts.join(' '),
    fill: "none",
    stroke: "oklch(35% 0.10 40)",
    strokeWidth: "1.2",
    opacity: "0.55",
    strokeLinecap: "round"
  }), React.createElement(ConcentricHearts, {
    cx: 200,
    cy: 153,
    scale: 0.48,
    color: "oklch(35% 0.10 40)",
    opacities: [0.18, 0.32, 0.52],
    dotOpacity: 0.78
  }), React.createElement("circle", {
    cx: 200 + 2 + 5 * Math.PI * 18,
    cy: "150",
    r: "3",
    fill: "oklch(35% 0.10 40)",
    opacity: "0.4"
  }));
};
const GraphicCycles = () => React.createElement("svg", {
  viewBox: "10 30 380 220",
  preserveAspectRatio: "xMidYMid meet",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 245,
  scale: 0.32,
  color: "oklch(42% 0.10 30)",
  opacities: [0.07, 0.12, 0.2],
  dotOpacity: 0
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 245,
  scale: 0.62,
  color: "oklch(42% 0.10 30)",
  opacities: [0.05, 0.09, 0.14],
  dotOpacity: 0
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 245,
  scale: 0.98,
  color: "oklch(42% 0.10 30)",
  opacities: [0.03, 0.06, 0.1],
  dotOpacity: 0
}), React.createElement("path", {
  d: "M140,200 Q200,80 260,200",
  fill: "none",
  stroke: "oklch(42% 0.10 30)",
  strokeWidth: "1.5",
  opacity: "0.9"
}), React.createElement("circle", {
  cx: "140",
  cy: "200",
  r: "4",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.7"
}), React.createElement("circle", {
  cx: "260",
  cy: "200",
  r: "4",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.7"
}), React.createElement("text", {
  x: "200",
  y: "112",
  textAnchor: "middle",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "11",
  fontStyle: "italic",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.5"
}, "I"), React.createElement("path", {
  d: "M100,215 Q200,55 300,215",
  fill: "none",
  stroke: "oklch(42% 0.10 30)",
  strokeWidth: "1.2",
  opacity: "0.55"
}), React.createElement("circle", {
  cx: "100",
  cy: "215",
  r: "3.5",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.45"
}), React.createElement("circle", {
  cx: "300",
  cy: "215",
  r: "3.5",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.45"
}), React.createElement("text", {
  x: "200",
  y: "75",
  textAnchor: "middle",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "11",
  fontStyle: "italic",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.35"
}, "II"), React.createElement("path", {
  d: "M55,228 Q200,28 345,228",
  fill: "none",
  stroke: "oklch(42% 0.10 30)",
  strokeWidth: "0.9",
  opacity: "0.3"
}), React.createElement("circle", {
  cx: "55",
  cy: "228",
  r: "3",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.28"
}), React.createElement("circle", {
  cx: "345",
  cy: "228",
  r: "3",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.28"
}), React.createElement("text", {
  x: "200",
  y: "46",
  textAnchor: "middle",
  fontFamily: "Cormorant Garamond, serif",
  fontSize: "11",
  fontStyle: "italic",
  fill: "oklch(42% 0.10 30)",
  opacity: "0.22"
}, "III"), React.createElement("line", {
  x1: "50",
  y1: "235",
  x2: "350",
  y2: "235",
  stroke: "oklch(42% 0.10 30)",
  strokeWidth: "0.7",
  opacity: "0.2"
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 237,
  scale: 0.1,
  color: "oklch(42% 0.10 30)",
  opacities: [0.2, 0.38, 0.6],
  dotOpacity: 0.7
}));
const GraphicTheology = () => {
  const color = "oklch(70% 0.12 270)";
  const heartPath = "M200,218 C200,218 122,176 122,125 C122,95 143,81 161,81 C177,81 191,92 200,109 C209,92 223,81 239,81 C257,81 278,95 278,125 C278,176 200,218 200,218Z";
  return React.createElement("svg", {
    viewBox: "0 0 400 300",
    xmlns: "http://www.w3.org/2000/svg",
    width: "100%",
    height: "100%"
  }, React.createElement("defs", null, React.createElement("clipPath", {
    id: "th-heart-clip"
  }, React.createElement("path", {
    d: heartPath
  })), React.createElement("radialGradient", {
    id: "th-glow",
    cx: "50%",
    cy: "50%",
    r: "50%"
  }, React.createElement("stop", {
    offset: "0%",
    stopColor: color,
    stopOpacity: "0.12"
  }), React.createElement("stop", {
    offset: "100%",
    stopColor: color,
    stopOpacity: "0"
  }))), React.createElement("rect", {
    width: "400",
    height: "300",
    fill: "oklch(19% 0.07 270)"
  }), React.createElement("circle", {
    cx: "200",
    cy: "150",
    r: "160",
    fill: "url(#th-glow)"
  }), React.createElement("path", {
    d: heartPath,
    fill: "none",
    stroke: color,
    strokeWidth: "1.1",
    opacity: "0.55"
  }), React.createElement("path", {
    d: heartPath,
    fill: color,
    opacity: "0.04"
  }), React.createElement("g", {
    clipPath: "url(#th-heart-clip)"
  }, React.createElement("circle", {
    cx: "200",
    cy: "152",
    r: "62",
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: "0.35"
  }), React.createElement("line", {
    x1: "200",
    y1: "98",
    x2: "200",
    y2: "200",
    stroke: color,
    strokeWidth: "0.9",
    opacity: "0.3"
  }), React.createElement("line", {
    x1: "172",
    y1: "128",
    x2: "228",
    y2: "128",
    stroke: color,
    strokeWidth: "0.9",
    opacity: "0.3"
  }), React.createElement("polygon", {
    points: "200,96 224,138 176,138",
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: "0.28"
  }), React.createElement("polygon", {
    points: "200,208 176,166 224,166",
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: "0.28"
  }), React.createElement("path", {
    d: "M182,124 Q164,152 182,180 Q168,152 182,124",
    fill: "none",
    stroke: color,
    strokeWidth: "0.8",
    opacity: "0.3"
  }), [0, 1, 2].map(i => React.createElement("circle", {
    key: i,
    cx: "200",
    cy: "152",
    r: 18 + i * 14,
    fill: "none",
    stroke: color,
    strokeWidth: "0.5",
    opacity: 0.18 - i * 0.04,
    strokeDasharray: "4,6"
  })), React.createElement("circle", {
    cx: "200",
    cy: "152",
    r: "5",
    fill: color,
    opacity: "0.6"
  }), React.createElement("circle", {
    cx: "200",
    cy: "152",
    r: "2",
    fill: "oklch(19% 0.07 270)",
    opacity: "0.9"
  })), [0, 1, 2, 3, 4, 5, 6, 7].map(i => {
    const a = i / 8 * Math.PI * 2 - Math.PI / 2,
      r = 140;
    return React.createElement(ConcentricHearts, {
      key: i,
      cx: 200 + r * Math.cos(a),
      cy: 150 + r * Math.sin(a),
      scale: 0.1,
      color: color,
      opacities: [0.1, 0.22, 0.38],
      dotOpacity: 0
    });
  }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => {
    const a = i / 12 * Math.PI * 2 - Math.PI / 2 + Math.PI / 12,
      r = 170;
    return React.createElement(ConcentricHearts, {
      key: i,
      cx: 200 + r * Math.cos(a),
      cy: 150 + r * Math.sin(a),
      scale: 0.07,
      color: color,
      opacities: [0.07, 0.14, 0.26],
      dotOpacity: 0
    });
  }));
};
const GraphicForYou = () => React.createElement("svg", {
  viewBox: "0 0 400 300",
  xmlns: "http://www.w3.org/2000/svg",
  width: "100%",
  height: "100%"
}, React.createElement("rect", {
  width: "400",
  height: "300",
  fill: "oklch(22% 0.06 25)"
}), React.createElement("radialGradient", {
  id: "fy-glow",
  cx: "50%",
  cy: "42%",
  r: "38%"
}, React.createElement("stop", {
  offset: "0%",
  stopColor: "oklch(70% 0.14 50)",
  stopOpacity: "0.3"
}), React.createElement("stop", {
  offset: "60%",
  stopColor: "oklch(70% 0.14 50)",
  stopOpacity: "0.08"
}), React.createElement("stop", {
  offset: "100%",
  stopColor: "oklch(70% 0.14 50)",
  stopOpacity: "0"
})), React.createElement("circle", {
  cx: "200",
  cy: "126",
  r: "140",
  fill: "url(#fy-glow)"
}), React.createElement("path", {
  d: "M155,240 L155,128 Q155,80 200,80 Q245,80 245,128 L245,240",
  fill: "none",
  stroke: "oklch(70% 0.14 50)",
  strokeWidth: "1.2",
  opacity: "0.65"
}), React.createElement("path", {
  d: "M168,240 L168,132 Q168,96 200,96 Q232,96 232,132 L232,240",
  fill: "none",
  stroke: "oklch(70% 0.14 50)",
  strokeWidth: "0.7",
  opacity: "0.35"
}), [-40, -25, -12, 0, 12, 25, 40].map((angle, i) => {
  const rad = angle * Math.PI / 180,
    len = 55 + Math.abs(angle) * 0.3;
  return React.createElement("line", {
    key: i,
    x1: "200",
    y1: "80",
    x2: 200 + Math.sin(rad) * len,
    y2: 80 - Math.cos(rad) * len,
    stroke: "oklch(70% 0.14 50)",
    strokeWidth: "0.7",
    opacity: 0.08 + (1 - Math.abs(angle) / 45) * 0.18
  });
}), React.createElement("line", {
  x1: "120",
  y1: "240",
  x2: "280",
  y2: "240",
  stroke: "oklch(70% 0.14 50)",
  strokeWidth: "0.8",
  opacity: "0.3"
}), React.createElement("line", {
  x1: "140",
  y1: "248",
  x2: "260",
  y2: "248",
  stroke: "oklch(70% 0.14 50)",
  strokeWidth: "0.5",
  opacity: "0.18"
}), React.createElement(ConcentricHearts, {
  cx: 200,
  cy: 138,
  scale: 0.38,
  color: "oklch(70% 0.14 50)",
  opacities: [0.18, 0.32, 0.5],
  dotOpacity: 0.7
}));
function PanelGraphic({
  children,
  style
}) {
  return React.createElement("div", {
    style: {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,
      ...style
    }
  }, children);
}
function PanelCover({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  return React.createElement(React.Fragment, null, React.createElement(PanelGraphic, {
    style: {
      top: '-10%',
      left: '-10%',
      width: '120%',
      height: '120%'
    }
  }, React.createElement(GraphicCover, null)), React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
      zIndex: 5,
      padding: isMobile ? '7vh 28px 8vh' : '9vh 60px 11vh'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.35em',
      textTransform: 'uppercase',
      color: p.accent,
      opacity: 0.85
    }
  }, "A Practice by John Records with Doug Matchett"), React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isMobile ? sz(46) : `clamp(${sz(58)}px, 7.5vw, ${sz(110)}px)`,
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "The One Heart", React.createElement("br", null), React.createElement("em", {
    style: {
      fontStyle: 'italic',
      fontWeight: 300
    }
  }, "Practice")), React.createElement("div", {
    style: {
      width: 60,
      height: 1,
      background: p.accent,
      margin: '0 auto',
      opacity: 0.7
    }
  })), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: isMobile ? sz(13) : sz(16),
      color: p.fg,
      opacity: 0.55,
      letterSpacing: '0.08em',
      maxWidth: 340,
      margin: 0
    }
  }, "A body-based contemplative practice for an open world")));
}
function PanelNameste({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: 220,
      position: 'relative',
      overflow: 'hidden',
      opacity: 0.7,
      flexShrink: 0
    }
  }, React.createElement(GraphicNameste, null)), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      padding: '32px 24px 40px',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16
    }
  }, "The Opening"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(52),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "Namaste"), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: sz(20),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.85,
      borderLeft: `3px solid ${p.accent}`,
      paddingLeft: 20,
      marginBottom: 20
    }
  }, "\"You are holy. I see it. I bow to it.\""), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.72,
      marginBottom: 16
    }
  }, "The practice begins with the traditional greeting \u2014 hands pressed together at the heart, bowing to the holiness in another."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(16),
      lineHeight: 1.6,
      color: p.accent,
      opacity: 0.9
    }
  }, "This is the doorway. Everything that follows moves through it.")));
  const vpad = isShort ? '44px 60px 44px 80px' : '80px 60px 80px 80px';
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: vpad,
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 16 : 28
    }
  }, "The Opening"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(56) : sz(78),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 20 : 32
    }
  }, "Namaste"), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 400,
      fontSize: isShort ? sz(22) : sz(28),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.85,
      borderLeft: `3px solid ${p.accent}`,
      paddingLeft: 24,
      margin: `0 0 ${isShort ? 18 : 28}px`
    }
  }, "\"You are holy. I see it. I bow to it.\""), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(16),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.72,
      marginBottom: isShort ? 12 : 20
    }
  }, "The practice begins with the traditional greeting \u2014 hands pressed together at the heart, bowing to the holiness in another."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(16) : sz(19),
      lineHeight: 1.6,
      color: p.accent,
      opacity: 0.9
    }
  }, "This is the doorway. Everything that follows moves through it.")), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      position: 'relative',
      zIndex: 5,
      borderLeft: `1px solid ${p.accent}22`,
      overflow: 'hidden'
    }
  }, React.createElement(GraphicNameste, null)));
}
function PanelMyHeart({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.18
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicMyHeart, null))), React.createElement("div", {
    style: {
      padding: '40px 24px 28px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage One"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(60),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em'
    }
  }, "My"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(60),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "Heart"), React.createElement("div", {
    style: {
      width: 40,
      height: 1,
      background: p.accent,
      marginBottom: 24,
      opacity: 0.7
    }
  }), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7
    }
  }, "Hands come to rest at the center of the chest. The practitioner turns attention inward \u2014 to their own heart, their own life, their own experience of this moment.")), React.createElement("div", {
    style: {
      padding: '0 24px 40px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(22),
      lineHeight: 1.4,
      color: p.fg,
      opacity: 0.88,
      marginBottom: 20
    }
  }, "\"This is where I am. This is what I carry.\""), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(13),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.65,
      paddingTop: 20,
      borderTop: `1px solid ${p.accent}30`
    }
  }, "The gesture is intimate and self-receiving. The practice begins here because it must \u2014 with the honest, embodied, present self.")));
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.1fr 0.9fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      top: 0,
      right: 0,
      width: '62%',
      height: '100%',
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'stretch',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicMyHeart, null))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 40px 44px 80px' : '80px 40px 80px 80px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Stage One"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(64) : sz(90),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 6
    }
  }, "My"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(64) : sz(90),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 20 : 36
    }
  }, "Heart"), React.createElement("div", {
    style: {
      width: 48,
      height: 1,
      background: p.accent,
      marginBottom: isShort ? 20 : 32,
      opacity: 0.7
    }
  }), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7,
      maxWidth: 380
    }
  }, "Hands come to rest at the center of the chest. The practitioner turns attention inward \u2014 to their own heart, their own life, their own experience of this moment.")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: isShort ? '36px 80px 36px 20px' : '60px 80px 60px 20px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(24) : sz(34),
      lineHeight: 1.4,
      color: p.fg,
      opacity: 0.88,
      marginBottom: 20
    }
  }, "\"This is where I am. This is what I carry.\""), React.createElement("div", {
    style: {
      flex: 1
    }
  }), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(15),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.65,
      marginTop: 20,
      paddingTop: 20,
      borderTop: `1px solid ${p.accent}30`
    }
  }, "The gesture is intimate and self-receiving. The practice begins here because it must \u2014 with the honest, embodied, present self.")));
}
function PanelOurHearts({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.2
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicOurHearts, null))), React.createElement("div", {
    style: {
      padding: '40px 24px 40px',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage Two"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(64),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "Our"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(64),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 28
    }
  }, "Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.72,
      marginBottom: 20
    }
  }, "The arms open slightly, widening from the chest \u2014 an opening that includes the partner, or a held sense of those close to us. The field expands."), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(18),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.88
    }
  }, "\"Your heart matters too. We are in this together.\"")));
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 60px 44px 80px' : '80px 60px 80px 80px',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Stage Two"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(72) : sz(100),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "Our"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(72) : sz(100),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 24 : 40
    }
  }, "Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.72,
      marginBottom: isShort ? 16 : 24
    }
  }, "The arms open slightly, widening from the chest \u2014 an opening that includes the partner, or a held sense of those close to us. The field expands."), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(26),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.88
    }
  }, "\"Your heart matters too. We are in this together.\"")), React.createElement("div", {
    style: {
      position: 'relative',
      borderLeft: `1px solid ${p.accent}18`,
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0
    }
  }, React.createElement(GraphicOurHearts, null))));
}
function PanelMoreHearts({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.22
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicMoreHearts, null))), React.createElement("div", {
    style: {
      padding: '40px 24px 40px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage Three"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(62),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "More"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(62),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 28
    }
  }, "Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.72,
      marginBottom: 24
    }
  }, "The arms continue to widen, now encompassing a larger circle \u2014 community, strangers, those across difference, those in suffering or joy beyond our immediate sight."), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(18),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.85,
      borderLeft: `2px solid ${p.accent}`,
      paddingLeft: 16
    }
  }, "\"There are more of us. The circle is wider than I usually remember.\"")));
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 80px' : '80px',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      top: '50%',
      right: '-4%',
      transform: 'translateY(-50%)',
      width: '60%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicMoreHearts, null))), React.createElement("div", {
    style: {
      maxWidth: '55%',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Stage Three"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(68) : sz(96),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "More"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(68) : sz(96),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 28 : 48
    }
  }, "Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.72,
      marginBottom: isShort ? 20 : 32
    }
  }, "The arms continue to widen, now encompassing a larger circle \u2014 community, strangers, those across difference, those in suffering or joy beyond our immediate sight."), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(26),
      lineHeight: 1.5,
      color: p.fg,
      opacity: 0.85,
      borderLeft: `2px solid ${p.accent}`,
      paddingLeft: 20
    }
  }, "\"There are more of us. The circle is wider than I usually remember.\"")));
}
function PanelAllHearts({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  return React.createElement(React.Fragment, null, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicAllHearts, null))), React.createElement("div", {
    style: {
      width: '100%',
      minHeight: isMobile ? '100svh' : '100%',
      position: 'relative',
      zIndex: 5,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: isMobile ? '48px 24px 0' : isShort ? '40px 80px 0' : '60px 80px 0'
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage Four"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isMobile ? sz(48) : isShort ? sz(60) : sz(80),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 6
    }
  }, "Open to"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isMobile ? sz(48) : isShort ? sz(60) : sz(80),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "All Hearts"), React.createElement("div", {
    style: {
      width: 60,
      height: 1,
      background: p.accent,
      marginBottom: 20,
      opacity: 0.4
    }
  }), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isMobile ? sz(17) : sz(22),
      lineHeight: 1.5,
      color: p.accent,
      maxWidth: 460
    }
  }, "\"Arms open, nothing withheld.\"")));
}
function PanelGatheringHearts({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.2
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicGathering, null))), React.createElement("div", {
    style: {
      padding: '40px 24px 24px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage Five"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(46),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "Gathering"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(46),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "All Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75,
      marginBottom: 16
    }
  }, "While lovingly sensing All Hearts, the Gatherer of Hearts \u2014 called by different names in different traditions \u2014 gently moves the arms in a bringing-together motion, and gathers all hearts into One Heart, where they have always been."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75,
      marginBottom: 24
    }
  }, "This culminates in the praying hands \u2014 the Namaste gesture \u2014 which is not other than One Heart.")), React.createElement("div", {
    style: {
      padding: '0 24px 40px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(20),
      lineHeight: 1.45,
      color: p.fg,
      opacity: 0.9
    }
  }, "\"All Hearts gathered into One Heart \u2014 where they have always been.\"")));
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      bottom: '0%',
      right: '-4%',
      width: '52%',
      height: '64%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicGathering, null))), React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(ellipse 70% 70% at 50% 50%, ${p.accent}10, transparent)`,
      zIndex: 2
    }
  }), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 60px 44px 80px' : '80px 60px 80px 80px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Stage Five"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(56) : sz(76),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "Gathering"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(56) : sz(76),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 24 : 44
    }
  }, "All Hearts"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75,
      marginBottom: isShort ? 18 : 32
    }
  }, "While lovingly sensing All Hearts, the Gatherer of Hearts \u2014 called by different names in different traditions \u2014 gently moves the arms in a bringing-together motion, and gathers all hearts into One Heart, where they have always been."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75
    }
  }, "This culminates in the praying hands \u2014 the Namaste gesture \u2014 which is not other than One Heart.")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: isShort ? '36px 60px 36px 60px' : '60px 80px 80px 60px',
      borderLeft: `1px solid ${p.accent}25`,
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(24) : sz(34),
      lineHeight: 1.45,
      color: p.fg,
      opacity: 0.9,
      marginBottom: isShort ? 20 : 36
    }
  }, "\"All Hearts gathered into One Heart \u2014 where they have always been.\""), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, [0, 1, 2].map(i => React.createElement("div", {
    key: i,
    style: {
      width: 28 - i * 4,
      height: 28 - i * 4,
      borderRadius: '50%',
      border: `1.5px solid ${p.accent}`,
      opacity: 0.5 + i * 0.15
    }
  })), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 28,
      color: p.accent,
      opacity: 0.5,
      margin: '0 4px'
    }
  }, "\u2192"), React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: p.accent,
      opacity: 0.25
    }
  })), React.createElement("div", {
    style: {
      marginTop: 16,
      fontFamily: 'var(--font-body)',
      fontSize: 12,
      letterSpacing: '0.15em',
      textTransform: 'uppercase',
      color: p.accent,
      opacity: 0.5
    }
  }, "Many \xB7 One")));
}
function PanelReturn({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      padding: '40px 24px 24px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Stage Six"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(58),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "The"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(58),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 24
    }
  }, "Return"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75,
      marginBottom: 24
    }
  }, "The hands return to the heart. But the return is not a retreat \u2014 it is a homecoming informed by the full journey outward and back inward."), React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(20),
      lineHeight: 1.4,
      color: p.fg,
      opacity: 0.9,
      marginBottom: 24
    }
  }, "\"I return to my heart \u2014 the same heart, and not the same.\"")), React.createElement("div", {
    style: {
      padding: '0 24px 40px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '4/3'
    }
  }, React.createElement(GraphicReturn, null))));
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '0.9fr 1.1fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: isShort ? '40px 40px 44px 80px' : '60px 40px 80px 80px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Stage Six"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(64) : sz(90),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 4
    }
  }, "The"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(64) : sz(90),
      lineHeight: 0.95,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 24 : 44
    }
  }, "Return"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.75
    }
  }, "The hands return to the heart. But the return is not a retreat \u2014 it is a homecoming informed by the full journey outward and back inward.")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: isShort ? '36px 60px 36px 60px' : '60px 80px 80px 60px',
      borderLeft: `1px solid ${p.accent}30`,
      position: 'relative',
      zIndex: 6,
      overflow: 'hidden'
    }
  }, React.createElement("blockquote", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(26) : sz(36),
      lineHeight: 1.4,
      color: p.fg,
      opacity: 0.9,
      marginBottom: isShort ? 18 : 32
    }
  }, "\"I return to my heart \u2014 the same heart, and not the same.\""), React.createElement("div", {
    style: {
      flex: 1,
      minHeight: 0,
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '4/3'
    }
  }, React.createElement(GraphicReturn, null)))));
}
function PanelCycles({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  const cycles = [{
    num: 'I',
    name: 'The Ordinary Self',
    desc: 'The practice begins where we always begin — with the daily, embodied, somewhat distracted self. Tired from the news. Managing the to-do list. Carrying its particular griefs. This is the honest starting point.',
    italic: 'The smaller self. The necessary beginning.'
  }, {
    num: 'II',
    name: 'The Higher Self',
    desc: 'By the second cycle, something has shifted. The act of moving through the stages has changed the one who is practicing. A more spacious self comes forward — less defended, more permeable.',
    italic: 'Holds the ordinary, daily self with compassion.'
  }, {
    num: 'III',
    name: 'The Highest Self',
    desc: 'A third quality of presence may emerge — less "mine" in the ordinary sense, more transparent to the larger life. The place where the particular heart and the heart of all things are most nearly one.',
    italic: 'The divine does not stand apart from the personal — it moves through it.'
  }];
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5,
      padding: '40px 24px 40px'
    }
  }, React.createElement(PanelGraphic, {
    style: {
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '100%',
      height: '35%',
      opacity: 0.25
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicCycles, null))), React.createElement("div", {
    style: {
      marginBottom: 28,
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 10,
      opacity: 0.7
    }
  }, "Structure"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(38),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 14
    }
  }, "Three Cycles"), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(13),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.72,
      marginBottom: 12
    }
  }, "For those beginning the practice, three or more cycles of the full gesture sequence are recommended. Each cycle is qualitatively different \u2014 not repetition, but deepening."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(15),
      lineHeight: 1.7,
      color: p.accent,
      opacity: 0.85
    }
  }, "With time, One Heart may perceptibly awaken in the practitioner after a single cycle \u2014 or even by the simple act of placing a hand upon the heart.")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24,
      position: 'relative',
      zIndex: 6
    }
  }, cycles.map((c, i) => React.createElement("div", {
    key: i,
    style: {
      borderTop: `2px solid ${p.accent}${i === 0 ? 'cc' : i === 1 ? '77' : '44'}`,
      paddingTop: 18
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      marginBottom: 10
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: 36,
      lineHeight: 1,
      color: p.fg,
      opacity: 0.18
    }
  }, c.num), React.createElement("div", {
    style: {
      width: 12 + i * 10,
      height: 12 + i * 10,
      borderRadius: '50%',
      border: `1.5px solid ${p.accent}`,
      opacity: 0.45 + i * 0.15,
      flexShrink: 0
    }
  })), React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: sz(20),
      lineHeight: 1.2,
      color: p.fg,
      marginBottom: 10,
      letterSpacing: '-0.01em'
    }
  }, c.name), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(13),
      lineHeight: 1.7,
      color: p.fg,
      opacity: 0.65,
      marginBottom: 10
    }
  }, c.desc), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.55,
      color: p.accent,
      opacity: 0.85
    }
  }, c.italic)))));
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5,
      padding: isShort ? '40px 80px 24px' : '60px 80px 40px'
    }
  }, React.createElement(PanelGraphic, {
    style: {
      bottom: '4%',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '78%',
      height: '46%',
      opacity: 0.4,
      pointerEvents: 'none'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicCycles, null))), React.createElement("div", {
    style: {
      marginBottom: isShort ? 14 : 24
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(11),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 8 : 12,
      opacity: 0.7
    }
  }, "Structure"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(40) : sz(56),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 10 : 18
    }
  }, "Three Cycles"), React.createElement("div", {
    style: {
      display: 'flex',
      gap: 48,
      alignItems: 'flex-start'
    }
  }, React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(16),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.72,
      maxWidth: 420
    }
  }, "For those beginning the practice, three or more cycles of the full gesture sequence are recommended. Each cycle is qualitatively different \u2014 not repetition, but deepening."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.7,
      color: p.accent,
      opacity: 0.85,
      maxWidth: 420
    }
  }, "With time, One Heart may perceptibly awaken in the practitioner after a single cycle \u2014 or even by the simple act of placing a hand upon the heart."))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: isShort ? 32 : 48
    }
  }, cycles.map((c, i) => React.createElement("div", {
    key: i,
    style: {
      borderTop: `2px solid ${p.accent}${i === 0 ? 'cc' : i === 1 ? '77' : '44'}`,
      paddingTop: isShort ? 14 : 22
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      marginBottom: isShort ? 8 : 14
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? 32 : 44,
      lineHeight: 1,
      color: p.fg,
      opacity: 0.18,
      letterSpacing: '0.05em'
    }
  }, c.num), React.createElement("div", {
    style: {
      width: 14 + i * 14,
      height: 14 + i * 14,
      borderRadius: '50%',
      border: `1.5px solid ${p.accent}`,
      opacity: 0.45 + i * 0.15,
      flexShrink: 0
    }
  })), React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 500,
      fontSize: isShort ? sz(18) : sz(24),
      lineHeight: 1.2,
      color: p.fg,
      marginBottom: isShort ? 8 : 16,
      letterSpacing: '-0.01em'
    }
  }, c.name), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.7,
      color: p.fg,
      opacity: 0.65,
      marginBottom: isShort ? 8 : 16
    }
  }, c.desc), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(16),
      lineHeight: 1.55,
      color: p.accent,
      opacity: 0.85
    }
  }, c.italic)))));
}
function PanelTheology({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  const traditions = ['Hindu', 'Buddhist', 'Christian', 'Jewish'];
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.14
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicTheology, null))), React.createElement("div", {
    style: {
      padding: '40px 24px 24px',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "Foundation"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(40),
      lineHeight: 1.1,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: 20
    }
  }, "Theological", React.createElement("br", null), React.createElement("em", {
    style: {
      fontStyle: 'italic'
    }
  }, "Ground")), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7,
      marginBottom: 18
    }
  }, "Rooted in ", React.createElement("strong", {
    style: {
      fontWeight: 400
    }
  }, "panentheism"), " \u2014 the view that all things exist within the divine, and the divine within all things, while also exceeding them."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.6,
      color: p.accent,
      opacity: 0.9,
      marginBottom: 28
    }
  }, "\"The particular and the universal are not enemies. They are the pulse of reality.\"")), React.createElement("div", {
    style: {
      padding: '0 24px 40px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      opacity: 0.6,
      marginBottom: 18
    }
  }, "Drawing from"), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, traditions.map((t, i) => React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      paddingBottom: 14,
      borderBottom: i < traditions.length - 1 ? `1px solid ${p.accent}18` : 'none'
    }
  }, React.createElement("div", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      border: `1px solid ${p.accent}`,
      opacity: 0.6,
      flexShrink: 0
    }
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: sz(20),
      color: p.fg,
      letterSpacing: '-0.01em'
    }
  }, t)))), React.createElement("p", {
    style: {
      marginTop: 20,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(13),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.65
    }
  }, "Practitioners need not hold any of these traditions explicitly. The practice is accessible across and beyond any particular framework.")));
  return React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement(PanelGraphic, {
    style: {
      top: '50%',
      right: '-6%',
      transform: 'translateY(-50%)',
      width: '44%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement("div", {
    style: {
      width: 620,
      height: 465
    }
  }, React.createElement(GraphicTheology, null))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 60px 44px 80px' : '80px 60px 80px 80px',
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: isShort ? 12 : 20,
      opacity: 0.8
    }
  }, "Foundation"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(46) : sz(62),
      lineHeight: 1.1,
      color: p.fg,
      letterSpacing: '-0.02em',
      marginBottom: isShort ? 20 : 32
    }
  }, "Theological", React.createElement("br", null), React.createElement("em", {
    style: {
      fontStyle: 'italic'
    }
  }, "Ground")), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7,
      marginBottom: isShort ? 16 : 24
    }
  }, "Rooted in ", React.createElement("strong", {
    style: {
      fontWeight: 400
    }
  }, "panentheism"), " \u2014 the view that all things exist within the divine, and the divine within all things, while also exceeding them."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(18) : sz(22),
      lineHeight: 1.6,
      color: p.accent,
      opacity: 0.9
    }
  }, "\"The particular and the universal are not enemies. They are the pulse of reality.\"")), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: isShort ? '44px 80px 44px 60px' : '80px 80px 80px 60px',
      position: 'relative',
      zIndex: 6
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      opacity: 0.6,
      marginBottom: isShort ? 16 : 24
    }
  }, "Drawing from"), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  }, traditions.map((t, i) => React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      paddingBottom: isShort ? 12 : 20,
      borderBottom: i < traditions.length - 1 ? `1px solid ${p.accent}18` : 'none',
      marginBottom: isShort ? 12 : 0
    }
  }, React.createElement("div", {
    style: {
      width: 10,
      height: 10,
      borderRadius: '50%',
      border: `1px solid ${p.accent}`,
      opacity: 0.6,
      flexShrink: 0
    }
  }), React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 400,
      fontSize: isShort ? sz(18) : sz(24),
      color: p.fg,
      letterSpacing: '-0.01em'
    }
  }, t)))), React.createElement("p", {
    style: {
      marginTop: isShort ? 16 : 28,
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(15),
      lineHeight: 1.75,
      color: p.fg,
      opacity: 0.65
    }
  }, "Practitioners need not hold any of these traditions explicitly. The practice is accessible across and beyond any particular framework.")));
}
function PanelForYou({
  p,
  tweaks,
  isMobile,
  isShort
}) {
  const sz = n => Math.round(n * tweaks.fontScale);
  if (isMobile) return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      minHeight: '100svh',
      position: 'relative',
      zIndex: 5,
      padding: '40px 24px'
    }
  }, React.createElement(PanelGraphic, {
    style: {
      inset: 0,
      width: '100%',
      height: '100%',
      opacity: 0.16
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      height: '100%'
    }
  }, React.createElement(GraphicForYou, null))), React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: 28,
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 12,
      opacity: 0.8
    }
  }, "This practice is for"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: sz(34),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em'
    }
  }, "Those trying to stay ", React.createElement("em", {
    style: {
      fontStyle: 'italic'
    }
  }, "open"))), React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      position: 'relative',
      zIndex: 5,
      flex: 1
    }
  }, React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(14),
      lineHeight: 1.85,
      color: p.fg,
      opacity: 0.72
    }
  }, "For activists who are burning out. For contemplatives whose practice has become private. For ordinary people who want to remember, daily, that their heart belongs to a larger whole."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.6,
      color: p.accent
    }
  }, "\"Short enough to do in a few minutes. Deep enough to practice for a lifetime.\"")), React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: 32,
      position: 'relative',
      zIndex: 5
    }
  }, React.createElement("div", {
    style: {
      width: 48,
      height: 1,
      background: p.accent,
      margin: '0 auto 16px',
      opacity: 0.4
    }
  }), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(13),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7
    }
  }, React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, "By ", React.createElement("strong", {
    style: {
      fontWeight: 400
    }
  }, "John Records with Doug Matchett")), React.createElement("div", null, React.createElement("a", {
    href: "/love-in-action-revised/",
    target: "_blank",
    rel: "noopener",
    style: {
      color: p.accent,
      textDecoration: 'none',
      letterSpacing: '0.05em',
      opacity: 0.85,
      borderBottom: `1px solid ${p.accent}44`
    }
  }, "Love in Action")), React.createElement("div", {
    style: {
      marginTop: 8,
      opacity: 0.45
    }
  }, React.createElement("em", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: sz(13)
    }
  }, "This practice is offered freely, as a gift.")))));
  return React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'relative',
      zIndex: 5,
      padding: isShort ? '40px 80px' : '60px 80px'
    }
  }, React.createElement("div", {
    style: {
      textAlign: 'center',
      marginBottom: isShort ? 20 : 32
    }
  }, React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontSize: sz(10),
      letterSpacing: '0.3em',
      textTransform: 'uppercase',
      color: p.accent,
      marginBottom: 16,
      opacity: 0.8
    }
  }, "This practice is for"), React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontWeight: 300,
      fontSize: isShort ? sz(46) : sz(62),
      lineHeight: 1.0,
      color: p.fg,
      letterSpacing: '-0.02em'
    }
  }, "Those trying to stay ", React.createElement("em", {
    style: {
      fontStyle: 'italic'
    }
  }, "open"))), React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1.4fr',
      gap: 40,
      flex: 1,
      minHeight: 0
    }
  }, React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      gap: isShort ? 16 : 28
    }
  }, React.createElement("p", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(17),
      lineHeight: 1.85,
      color: p.fg,
      opacity: 0.72
    }
  }, "For activists who are burning out. For contemplatives whose practice has become private. For ordinary people who want to remember, daily, that their heart belongs to a larger whole."), React.createElement("p", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 300,
      fontSize: isShort ? sz(18) : sz(22),
      lineHeight: 1.6,
      color: p.accent
    }
  }, "\"Short enough to do in a few minutes. Deep enough to practice for a lifetime.\"")), React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }
  }, React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '4/3',
      transform: 'scale(1.1)',
      transformOrigin: 'center center'
    }
  }, React.createElement(GraphicForYou, null)))), React.createElement("div", {
    style: {
      textAlign: 'center',
      marginTop: isShort ? 14 : 24
    }
  }, React.createElement("div", {
    style: {
      width: 60,
      height: 1,
      background: p.accent,
      margin: `0 auto ${isShort ? 12 : 20}px`,
      opacity: 0.4
    }
  }), React.createElement("div", {
    style: {
      fontFamily: 'var(--font-body)',
      fontWeight: 300,
      fontSize: sz(15),
      lineHeight: 1.8,
      color: p.fg,
      opacity: 0.7
    }
  }, React.createElement("div", {
    style: {
      marginBottom: 6
    }
  }, "By ", React.createElement("strong", {
    style: {
      fontWeight: 400
    }
  }, "John Records with Doug Matchett")), React.createElement("div", null, React.createElement("a", {
    href: "/love-in-action-revised/",
    target: "_blank",
    rel: "noopener",
    style: {
      color: p.accent,
      textDecoration: 'none',
      letterSpacing: '0.05em',
      opacity: 0.85,
      borderBottom: `1px solid ${p.accent}44`
    }
  }, "Love in Action")), React.createElement("div", {
    style: {
      marginTop: 8,
      opacity: 0.45
    }
  }, React.createElement("em", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: sz(15)
    }
  }, "This practice is offered freely, as a gift.")))));
}
function ArrowLeft({
  color
}) {
  return React.createElement("svg", {
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: color,
    strokeOpacity: "0.3",
    strokeWidth: "1"
  }), React.createElement("path", {
    d: "M18 10L12 16L18 22",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
function ArrowRight({
  color
}) {
  return React.createElement("svg", {
    viewBox: "0 0 32 32",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, React.createElement("circle", {
    cx: "16",
    cy: "16",
    r: "15",
    stroke: color,
    strokeOpacity: "0.3",
    strokeWidth: "1"
  }), React.createElement("path", {
    d: "M14 10L20 16L14 22",
    stroke: color,
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }));
}
const PANEL_COMPONENTS = [PanelCover, PanelNameste, PanelMyHeart, PanelOurHearts, PanelMoreHearts, PanelAllHearts, PanelGatheringHearts, PanelReturn, PanelCycles, PanelTheology, PanelForYou];
function App() {
  const [current, setCurrent] = useState(() => {
    try {
      return parseInt(localStorage.getItem('ohp-slide') || '0', 10) || 0;
    } catch {
      return 0;
    }
  });
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [tweaksOpen, setTweaksOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const getVisibleHeight = () => window.visualViewport?.height ?? window.innerHeight;
  const [isShort, setIsShort] = useState(() => window.innerWidth >= 768 && getVisibleHeight() < 860);
  const trackRef = useRef(null);
  const n = PANELS_DATA.length;
  useEffect(() => {
    const handler = () => {
      setIsMobile(window.innerWidth < 768);
      setIsShort(window.innerWidth >= 768 && getVisibleHeight() < 860);
    };
    window.addEventListener('resize', handler);
    window.visualViewport?.addEventListener('resize', handler);
    return () => {
      window.removeEventListener('resize', handler);
      window.visualViewport?.removeEventListener('resize', handler);
    };
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem('ohp-slide', current);
    } catch {}
  }, [current]);
  const scrollTo = useCallback(idx => {
    if (!trackRef.current) return;
    const mobile = window.innerWidth < 768;
    if (mobile) {
      const panel = trackRef.current.children[idx];
      if (panel) trackRef.current.scrollTo({
        top: panel.offsetTop,
        behavior: 'smooth'
      });
    } else {
      trackRef.current.scrollTo({
        left: idx * window.innerWidth,
        behavior: 'smooth'
      });
    }
  }, []);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const mobile = window.innerWidth < 768;
    if (mobile) {
      const panel = el.children[current];
      if (panel) el.scrollTop = panel.offsetTop;
    } else {
      el.scrollLeft = current * window.innerWidth;
    }
    const handler = () => {
      const m = window.innerWidth < 768;
      if (m) {
        const panels = Array.from(el.children);
        const scrollTop = el.scrollTop;
        let closest = 0,
          minDist = Infinity;
        panels.forEach((p, i) => {
          const dist = Math.abs(p.offsetTop - scrollTop);
          if (dist < minDist) {
            minDist = dist;
            closest = i;
          }
        });
        setCurrent(closest);
      } else {
        setCurrent(Math.round(el.scrollLeft / window.innerWidth));
      }
    };
    el.addEventListener('scroll', handler, {
      passive: true
    });
    return () => el.removeEventListener('scroll', handler);
  }, [isMobile]);
  useEffect(() => {
    const handler = e => {
      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && current < n - 1) scrollTo(current + 1);
      if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && current > 0) scrollTo(current - 1);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [current, scrollTo, n]);
  useEffect(() => {
    const handler = e => {
      if (e.data?.type === '__activate_edit_mode') setTweaksOpen(true);
      if (e.data?.type === '__deactivate_edit_mode') setTweaksOpen(false);
    };
    window.addEventListener('message', handler);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', handler);
  }, []);
  const setTweak = (key, val) => {
    const next = {
      ...tweaks,
      [key]: val
    };
    setTweaks(next);
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits: next
    }, '*');
  };
  const decreaseFontScale = () => setTweak('fontScale', Math.round(Math.max(FONT_SCALE_MIN, tweaks.fontScale - FONT_SCALE_STEP) * 10) / 10);
  const increaseFontScale = () => setTweak('fontScale', Math.round(Math.min(FONT_SCALE_MAX, tweaks.fontScale + FONT_SCALE_STEP) * 10) / 10);
  const p = PANELS_DATA[current];
  return React.createElement(React.Fragment, null, React.createElement("div", {
    className: "track",
    ref: trackRef
  }, PANELS_DATA.map((panel, i) => {
    const PanelComp = PANEL_COMPONENTS[i];
    return React.createElement("section", {
      key: panel.id,
      className: "panel",
      "data-screen-label": `${String(i + 1).padStart(2, '0')} ${panel.label || panel.id}`,
      style: {
        background: panel.bg
      }
    }, panel.label && React.createElement("div", {
      className: "panel-label",
      style: {
        color: panel.fg,
        opacity: 0.35
      }
    }, panel.label), React.createElement(PanelComp, {
      p: panel,
      tweaks: tweaks,
      isMobile: isMobile,
      isShort: isShort
    }));
  })), React.createElement("div", {
    className: "nav-dots"
  }, PANELS_DATA.map((_, i) => React.createElement("button", {
    key: i,
    className: `dot ${i === current ? 'active' : ''}`,
    onClick: () => scrollTo(i),
    "aria-label": `Go to panel ${i + 1}`
  }))), React.createElement("button", {
    className: `arrow arrow-left ${current > 0 ? 'visible' : ''}`,
    onClick: () => scrollTo(current - 1),
    "aria-label": "Previous"
  }, React.createElement(ArrowLeft, {
    color: p.fg
  })), React.createElement("button", {
    className: `arrow arrow-right ${current < n - 1 ? 'visible' : ''}`,
    onClick: () => scrollTo(current + 1),
    "aria-label": "Next"
  }, React.createElement(ArrowRight, {
    color: p.fg
  })), React.createElement("div", {
    className: "top-controls"
  }, React.createElement("a", {
    className: "home-link",
    href: "https://johnrecords.org/",
    "aria-label": "Return to John's Reading Nook",
    title: "John's Reading Nook"
  }, React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, React.createElement("path", {
    d: "M3 11l9-8 9 8"
  }), React.createElement("path", {
    d: "M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"
  })), React.createElement("span", null, "Nook")), React.createElement("div", {
    className: "font-control",
    role: "group",
    "aria-label": "Font size"
  }, React.createElement("button", {
    className: "font-btn",
    onClick: decreaseFontScale,
    disabled: tweaks.fontScale <= FONT_SCALE_MIN,
    "aria-label": "Smaller text",
    title: "Smaller"
  }, "A\u2212"), React.createElement("span", {
    className: "font-display"
  }, Math.round(tweaks.fontScale * 100), "%"), React.createElement("button", {
    className: "font-btn",
    onClick: increaseFontScale,
    disabled: tweaks.fontScale >= FONT_SCALE_MAX,
    "aria-label": "Larger text",
    title: "Larger"
  }, "A+"))), React.createElement("div", {
    className: `tweaks-panel ${tweaksOpen ? 'open' : ''}`
  }, React.createElement("div", {
    className: "tweaks-title"
  }, "Tweaks"), React.createElement("div", {
    className: "tweak-row"
  }, React.createElement("span", {
    className: "tweak-label"
  }, "Circle style"), React.createElement("div", {
    className: "tweak-options"
  }, ['outline', 'filled'].map(v => React.createElement("button", {
    key: v,
    className: `tweak-btn ${tweaks.circleStyle === v ? 'sel' : ''}`,
    onClick: () => setTweak('circleStyle', v)
  }, v.charAt(0).toUpperCase() + v.slice(1))))), React.createElement("div", {
    className: "tweak-row"
  }, React.createElement("span", {
    className: "tweak-label"
  }, "Font scale"), React.createElement("div", {
    className: "tweak-options"
  }, [['Sm', 0.85], ['Md', 1.0], ['Lg', 1.2]].map(([label, val]) => React.createElement("button", {
    key: val,
    className: `tweak-btn ${Math.abs(tweaks.fontScale - val) < 0.06 ? 'sel' : ''}`,
    onClick: () => setTweak('fontScale', val)
  }, label))))));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App, null));
