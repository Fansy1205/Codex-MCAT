import './styles.css';

const storageKey = 'mcat-os-state-v1';
const appBase = import.meta.env.BASE_URL;
const testHost = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
  ? '192.168.129.131'
  : window.location.hostname;

const subjects = [
  {
    id: 'cp',
    name: 'Chem/Phys',
    fullName: 'Chemical and Physical Foundations',
    color: '#0f5f6f',
    areas: [
      ['general-chem', 'General Chemistry', ['Atomic structure', 'Periodic trends', 'Bonding', 'Stoichiometry', 'Thermodynamics', 'Kinetics', 'Equilibrium', 'Acids and bases', 'Electrochemistry', 'Solutions']],
      ['organic', 'Organic Chemistry', ['Functional groups', 'Stereochemistry', 'Separations', 'Spectroscopy', 'Carbonyl reactions', 'Biologically relevant reactions']],
      ['physics', 'Physics', ['Units and vectors', 'Kinematics', 'Forces', 'Work and energy', 'Fluids', 'Electrostatics', 'Circuits', 'Magnetism', 'Waves and sound', 'Light and optics', 'Nuclear decay']],
      ['biochem-cp', 'Biochemistry', ['Amino acids', 'Protein structure', 'Enzyme kinetics', 'Metabolism overview', 'Bioenergetics']]
    ]
  },
  {
    id: 'cars',
    name: 'CARS',
    fullName: 'Critical Analysis and Reasoning Skills',
    color: '#8c3f5d',
    areas: [
      ['foundations', 'Comprehension', ['Main idea', 'Passage structure', 'Author attitude', 'Tone shifts', 'Evidence location']],
      ['reasoning', 'Reasoning Within Text', ['Inference', 'Assumption', 'Function of paragraph', 'Analogy', 'Strengthen and weaken']],
      ['beyond', 'Reasoning Beyond Text', ['Application', 'New information', 'Hypothetical scenarios', 'Author agreement']]
    ]
  },
  {
    id: 'bb',
    name: 'Bio/Biochem',
    fullName: 'Biological and Biochemical Foundations',
    color: '#566b2f',
    areas: [
      ['molecules', 'Biomolecules', ['Amino acids', 'Proteins', 'Carbohydrates', 'Lipids', 'Nucleic acids', 'Enzymes']],
      ['cells', 'Cells', ['Membranes', 'Organelles', 'Cell cycle', 'Mitosis and meiosis', 'Transport', 'Signal transduction']],
      ['genetics', 'Genetics', ['DNA replication', 'Transcription', 'Translation', 'Gene regulation', 'Mendelian genetics', 'Biotechnology']],
      ['systems', 'Organ Systems', ['Nervous system', 'Endocrine system', 'Cardiovascular system', 'Respiratory system', 'Renal system', 'Digestive system', 'Musculoskeletal system', 'Immune system']],
      ['metabolism', 'Metabolism', ['Glycolysis', 'TCA cycle', 'Oxidative phosphorylation', 'Gluconeogenesis', 'Glycogen', 'Fatty acid metabolism', 'Amino acid metabolism']]
    ]
  },
  {
    id: 'ps',
    name: 'Psych/Soc',
    fullName: 'Psychological, Social, and Biological Foundations',
    color: '#936318',
    areas: [
      ['behavior', 'Behavior and Learning', ['Classical conditioning', 'Operant conditioning', 'Observational learning', 'Motivation', 'Emotion', 'Stress']],
      ['cognition', 'Cognition', ['Sensation', 'Perception', 'Attention', 'Memory', 'Language', 'Consciousness']],
      ['identity', 'Self and Others', ['Self-concept', 'Identity', 'Social behavior', 'Attitudes', 'Prejudice', 'Group dynamics']],
      ['society', 'Society and Culture', ['Social structure', 'Demographics', 'Social stratification', 'Health disparities', 'Institutions', 'Culture']],
      ['research', 'Research Methods', ['Study design', 'Variables', 'Validity', 'Reliability', 'Statistics', 'Ethics']]
    ]
  }
];

const questions = [
  {
    id: 'q-aa-charge',
    subject: 'bb',
    topic: 'Amino acids',
    stem: 'At physiological pH, which amino acid side chain is most likely to carry a positive charge?',
    choices: ['Aspartate', 'Lysine', 'Serine', 'Phenylalanine'],
    answer: 1,
    explanation: 'Lysine has a basic side chain with a high pKa, so it is usually protonated and positively charged near physiological pH.'
  },
  {
    id: 'q-mm-vmax',
    subject: 'bb',
    topic: 'Enzyme kinetics',
    stem: 'A competitive inhibitor is added to an enzyme reaction. Which parameter changes most directly?',
    choices: ['Vmax decreases only', 'Km increases while Vmax is unchanged', 'Km decreases while Vmax increases', 'Both Km and Vmax decrease equally'],
    answer: 1,
    explanation: 'Competitive inhibition raises the apparent Km because more substrate is needed to reach half Vmax, while Vmax can still be reached.'
  },
  {
    id: 'q-optics',
    subject: 'cp',
    topic: 'Light and optics',
    stem: 'A converging lens forms a real image when the object is placed beyond the focal point. The image is best described as:',
    choices: ['Upright and virtual', 'Inverted and real', 'Upright and real', 'Inverted and virtual'],
    answer: 1,
    explanation: 'For a converging lens with the object outside the focal length, the image is real and inverted.'
  },
  {
    id: 'q-acid-buffer',
    subject: 'cp',
    topic: 'Acids and bases',
    stem: 'A buffer is most effective when:',
    choices: ['pH equals pKa of the weak acid', 'pH is 3 units above pKa', 'all weak acid is consumed', 'strong acid and strong base are equimolar'],
    answer: 0,
    explanation: 'Buffer capacity is greatest when weak acid and conjugate base concentrations are similar, which occurs near pH = pKa.'
  },
  {
    id: 'q-cars-tone',
    subject: 'cars',
    topic: 'Author attitude',
    stem: 'A passage criticizes a theory as elegant but unsupported by evidence. The author attitude is most likely:',
    choices: ['Unreservedly admiring', 'Skeptical', 'Indifferent', 'Confused'],
    answer: 1,
    explanation: 'The contrast between elegance and lack of evidence signals skepticism rather than admiration.'
  },
  {
    id: 'q-validity',
    subject: 'ps',
    topic: 'Validity',
    stem: 'A study measures what it claims to measure. This most directly describes:',
    choices: ['Reliability', 'Internal validity', 'Construct validity', 'Random assignment'],
    answer: 2,
    explanation: 'Construct validity concerns whether an operational measure captures the intended theoretical construct.'
  },
  {
    id: 'q-conditioning',
    subject: 'ps',
    topic: 'Classical conditioning',
    stem: 'A neutral tone is repeatedly paired with food until the tone alone causes salivation. The tone has become the:',
    choices: ['Unconditioned stimulus', 'Conditioned stimulus', 'Unconditioned response', 'Negative reinforcer'],
    answer: 1,
    explanation: 'After pairing with the unconditioned stimulus, the formerly neutral tone becomes a conditioned stimulus.'
  },
  {
    id: 'q-fluid',
    subject: 'cp',
    topic: 'Fluids',
    stem: 'According to continuity, an incompressible fluid flowing through a narrower tube section will have:',
    choices: ['Lower speed', 'Higher speed', 'Zero pressure', 'Unchanged speed regardless of area'],
    answer: 1,
    explanation: 'A1v1 = A2v2, so velocity increases as cross-sectional area decreases.'
  },
  {
    id: 'q-electrochem-anode',
    subject: 'cp',
    topic: 'Electrochemistry',
    stem: 'In a galvanic cell, oxidation occurs at the:',
    choices: ['Cathode only', 'Anode only', 'Salt bridge', 'Voltmeter'],
    answer: 1,
    explanation: 'Oxidation occurs at the anode and reduction occurs at the cathode in both galvanic and electrolytic cells.'
  },
  {
    id: 'q-periodic-radius',
    subject: 'cp',
    topic: 'Periodic trends',
    stem: 'Across a period from left to right, atomic radius generally decreases because:',
    choices: ['Shielding increases dramatically', 'Effective nuclear charge increases', 'Electrons enter lower shells', 'Neutrons repel valence electrons'],
    answer: 1,
    explanation: 'Effective nuclear charge increases across a period, pulling valence electrons closer to the nucleus.'
  },
  {
    id: 'q-stereo',
    subject: 'cp',
    topic: 'Stereochemistry',
    stem: 'Two molecules with the same connectivity but non-superimposable mirror-image structures are:',
    choices: ['Constitutional isomers', 'Enantiomers', 'Diastereomers', 'Tautomers'],
    answer: 1,
    explanation: 'Enantiomers are stereoisomers that are non-superimposable mirror images.'
  },
  {
    id: 'q-dna-direction',
    subject: 'bb',
    topic: 'DNA replication',
    stem: 'DNA polymerase adds nucleotides to which end of a growing DNA strand?',
    choices: ['5 prime phosphate end', '3 prime hydroxyl end', 'Both ends equally', 'The template strand only'],
    answer: 1,
    explanation: 'DNA polymerase extends DNA by adding nucleotides to the free 3 prime hydroxyl group.'
  },
  {
    id: 'q-membrane-fluidity',
    subject: 'bb',
    topic: 'Membranes',
    stem: 'At low temperatures, which membrane change generally increases fluidity?',
    choices: ['More saturated fatty acids', 'More unsaturated fatty acids', 'Longer fatty acid tails only', 'More peptide bonds'],
    answer: 1,
    explanation: 'Unsaturated fatty acid tails introduce kinks that reduce tight packing and help maintain membrane fluidity.'
  },
  {
    id: 'q-glucose-tca',
    subject: 'bb',
    topic: 'TCA cycle',
    stem: 'The TCA cycle directly produces which reduced electron carrier?',
    choices: ['NADH', 'DNA', 'cAMP', 'tRNA'],
    answer: 0,
    explanation: 'The TCA cycle generates NADH and FADH2, which feed electrons into oxidative phosphorylation.'
  },
  {
    id: 'q-cars-main',
    subject: 'cars',
    topic: 'Main idea',
    stem: 'If every paragraph supports a criticism of a popular interpretation, the best main idea will usually:',
    choices: ['Summarize the criticism and its target', 'Quote the most technical sentence', 'Focus only on the first example', 'Introduce outside historical facts'],
    answer: 0,
    explanation: 'CARS main idea answers should capture the central claim and scope of the whole passage, not a detail or outside information.'
  },
  {
    id: 'q-cars-function',
    subject: 'cars',
    topic: 'Function of paragraph',
    stem: 'A paragraph that presents a counterexample immediately after a broad claim most likely functions to:',
    choices: ['Narrow or challenge that claim', 'Repeat the thesis verbatim', 'Define an unrelated term', 'Signal the conclusion has ended'],
    answer: 0,
    explanation: 'Counterexamples usually qualify, limit, or challenge a preceding generalization.'
  },
  {
    id: 'q-operant',
    subject: 'ps',
    topic: 'Operant conditioning',
    stem: 'A student studies more because studying removes parental criticism. This is an example of:',
    choices: ['Positive reinforcement', 'Negative reinforcement', 'Positive punishment', 'Extinction'],
    answer: 1,
    explanation: 'Negative reinforcement increases behavior by removing an aversive stimulus.'
  },
  {
    id: 'q-memory',
    subject: 'ps',
    topic: 'Memory',
    stem: 'The primacy effect is usually attributed most strongly to:',
    choices: ['Better rehearsal of early list items', 'Sensory adaptation', 'Random assignment', 'Group polarization'],
    answer: 0,
    explanation: 'Early items are more likely to be rehearsed and transferred to long-term memory.'
  },
  {
    id: 'q-stratification',
    subject: 'ps',
    topic: 'Social stratification',
    stem: 'Unequal access to wealth, power, and prestige in a society is most directly described as:',
    choices: ['Social stratification', 'Social facilitation', 'Assimilation', 'Role strain'],
    answer: 0,
    explanation: 'Social stratification refers to hierarchical ranking and unequal distribution of social resources.'
  }
];

const topicGuides = {
  'Amino acids': {
    mustKnow: ['Know one-letter and three-letter codes for the high-yield amino acids.', 'Classify side chains by charge, polarity, aromaticity, and sulfur content.', 'Connect pKa and pH to protonation state.'],
    drill: 'Draw all 20 side chains from memory, then sort them into charged, polar, hydrophobic, aromatic, and special cases.'
  },
  'Enzyme kinetics': {
    mustKnow: ['Michaelis-Menten: Km reflects substrate concentration at half Vmax.', 'Competitive inhibition increases apparent Km with unchanged Vmax.', 'Noncompetitive inhibition lowers Vmax with unchanged Km in the ideal case.'],
    drill: 'Sketch Lineweaver-Burk shifts for competitive, noncompetitive, and uncompetitive inhibitors.'
  },
  'Acids and bases': {
    mustKnow: ['Use Henderson-Hasselbalch when a weak acid/base pair is present.', 'Buffers work best when pH is close to pKa.', 'Strong acid/base reactions go essentially to completion.'],
    drill: 'For each buffer question, write the conjugate pair before calculating.'
  },
  'Fluids': {
    mustKnow: ['Continuity links area and velocity for incompressible flow.', 'Bernoulli links pressure, height, and speed.', 'Poiseuille flow is highly sensitive to radius.'],
    drill: 'Memorize which variables increase or decrease when tube radius changes.'
  },
  'Electrochemistry': {
    mustKnow: ['Oxidation at anode, reduction at cathode.', 'Galvanic cells are spontaneous with positive cell potential.', 'Electrons flow through the wire from anode to cathode.'],
    drill: 'For every cell diagram, label anode, cathode, electron flow, and ion flow.'
  },
  'Main idea': {
    mustKnow: ['Main idea must cover the entire passage.', 'Avoid answers that are too narrow, too extreme, or outside the text.', 'Author purpose and passage structure are often more useful than facts.'],
    drill: 'After each paragraph, write a five-word function label before answering questions.'
  },
  'Author attitude': {
    mustKnow: ['Track evaluative adjectives and contrast words.', 'Separate author view from quoted or described views.', 'Choose moderate tone unless the passage clearly supports intensity.'],
    drill: 'Underline three tone signals and translate them into one attitude word.'
  },
  'Validity': {
    mustKnow: ['Construct validity asks whether a measure captures the intended concept.', 'Internal validity concerns causal confidence.', 'External validity concerns generalizability.'],
    drill: 'For each study, name the independent variable, dependent variable, and biggest validity threat.'
  },
  'Operant conditioning': {
    mustKnow: ['Reinforcement increases behavior; punishment decreases behavior.', 'Positive adds a stimulus; negative removes a stimulus.', 'Do not equate negative with bad.'],
    drill: 'Classify scenarios using two steps: behavior up/down, stimulus added/removed.'
  },
  'Memory': {
    mustKnow: ['Primacy often reflects rehearsal and long-term memory.', 'Recency often reflects short-term or working memory.', 'Encoding specificity links retrieval to context.'],
    drill: 'Create one example each for primacy, recency, recall, recognition, and relearning.'
  }
};

const errorReasons = [
  '概念不会',
  '题干误读',
  'Passage 定位失败',
  '公式/单位错误',
  '选项排除错误',
  '时间压力失误'
];

const phases = [
  { id: 'foundation', untilDays: 58, name: '内容覆盖期', focus: '完成知识地图第一轮，配合短题巩固。' },
  { id: 'integration', untilDays: 28, name: '整合刷题期', focus: '以 passage 为核心，把错题回流到知识点。' },
  { id: 'simulation', untilDays: 0, name: '模考冲刺期', focus: '固定节奏模考，减少重复错误和时间损耗。' }
];

const defaultState = {
  onboarded: false,
  examDate: '2026-09-12',
  targetScore: 515,
  minutesPerDay: 90,
  activeTab: 'today',
  selectedTopicId: null,
  completedTopics: {},
  topicNotes: {},
  attempts: [],
  reviewQueue: [],
  quiz: null
};

let state = loadState();

function loadState() {
  try {
    return { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || '{}') };
  } catch {
    return { ...defaultState };
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function daysUntilExam() {
  const now = new Date();
  const date = new Date(`${state.examDate || defaultState.examDate}T12:00:00+08:00`);
  return Math.max(0, Math.ceil((date - now) / 86400000));
}

function currentPhase() {
  const days = daysUntilExam();
  return phases.find((phase) => days >= phase.untilDays) || phases.at(-1);
}

function allTopics() {
  return subjects.flatMap((subject) =>
    subject.areas.flatMap(([areaId, areaName, topics]) =>
      topics.map((topic) => ({
        id: `${subject.id}-${areaId}-${slug(topic)}`,
        subject: subject.id,
        subjectName: subject.name,
        areaName,
        name: topic
      }))
    )
  );
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function topicStats(topicName) {
  const related = state.attempts.filter((attempt) => attempt.topic === topicName);
  const wrong = related.filter((attempt) => !attempt.correct).length;
  const correct = related.length - wrong;
  return { total: related.length, wrong, correct, accuracy: related.length ? Math.round((correct / related.length) * 100) : null };
}

function subjectStats(subjectId) {
  const related = state.attempts.filter((attempt) => attempt.subject === subjectId);
  const correct = related.filter((attempt) => attempt.correct).length;
  return {
    attempts: related.length,
    accuracy: related.length ? Math.round((correct / related.length) * 100) : null,
    completed: allTopics().filter((topic) => topic.subject === subjectId && state.completedTopics[topic.id]).length,
    total: allTopics().filter((topic) => topic.subject === subjectId).length
  };
}

function weakTopics(limit = 6) {
  const scored = allTopics().map((topic) => {
    const stats = topicStats(topic.name);
    const completedPenalty = state.completedTopics[topic.id] ? 0 : 1;
    const wrongWeight = stats.wrong * 3;
    const accuracyPenalty = stats.accuracy === null ? 0 : Math.max(0, 80 - stats.accuracy) / 10;
    return { ...topic, stats, score: wrongWeight + accuracyPenalty + completedPenalty };
  });
  return scored.sort((a, b) => b.score - a.score).slice(0, limit);
}

function todaysPlan() {
  const phase = currentPhase();
  const weak = weakTopics(4);
  const fresh = allTopics().filter((topic) => !state.completedTopics[topic.id]).slice(0, 6);
  const selected = [...weak, ...fresh].filter((topic, index, arr) => arr.findIndex((other) => other.id === topic.id) === index).slice(0, 5);
  const plan = [];

  if (phase.id === 'foundation') {
    plan.push({ type: 'learn', title: '知识点学习', minutes: Math.round(state.minutesPerDay * 0.45), detail: selected.slice(0, 2).map((topic) => topic.name).join(' + ') || '复盘已学知识' });
    plan.push({ type: 'practice', title: '碎片练习', minutes: Math.round(state.minutesPerDay * 0.25), detail: '8-12 题，优先覆盖今天知识点' });
    plan.push({ type: 'review', title: '错题回访', minutes: Math.round(state.minutesPerDay * 0.2), detail: reviewDueText() });
    plan.push({ type: 'cars', title: 'CARS 微训练', minutes: Math.round(state.minutesPerDay * 0.1), detail: '1 篇短 passage 或 5 道推理题' });
  } else if (phase.id === 'integration') {
    plan.push({ type: 'practice', title: 'Passage 训练', minutes: Math.round(state.minutesPerDay * 0.45), detail: '2-3 组混合 passage，限时完成' });
    plan.push({ type: 'review', title: '错因拆解', minutes: Math.round(state.minutesPerDay * 0.3), detail: reviewDueText() });
    plan.push({ type: 'learn', title: '薄弱点补洞', minutes: Math.round(state.minutesPerDay * 0.25), detail: selected.slice(0, 3).map((topic) => topic.name).join(' + ') });
  } else {
    plan.push({ type: 'practice', title: '单科限时模拟', minutes: Math.round(state.minutesPerDay * 0.55), detail: '按 59 题/95 分钟节奏拆分训练' });
    plan.push({ type: 'review', title: '高频错点再测', minutes: Math.round(state.minutesPerDay * 0.3), detail: reviewDueText() });
    plan.push({ type: 'strategy', title: '考场策略检查', minutes: Math.round(state.minutesPerDay * 0.15), detail: '时间分配、跳题规则、公式清单' });
  }

  return plan;
}

function reviewDueText() {
  const due = dueReviews();
  if (!due.length) return '暂无到期错题，改做薄弱知识点快测';
  return `${due.length} 个错题知识点到期：${due.slice(0, 2).map((item) => item.topic).join('、')}`;
}

function dueReviews() {
  const today = startOfDay(new Date()).getTime();
  return state.reviewQueue.filter((item) => startOfDay(new Date(item.dueAt)).getTime() <= today && !item.cleared);
}

function startOfDay(date) {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
}

function render() {
  const app = document.querySelector('#app');
  app.innerHTML = `
    <main class="shell">
      <section class="top-panel">
        <div class="status-row">
          <span class="pill">${currentPhase().name}</span>
          <span>${daysUntilExam()} 天后考试</span>
        </div>
        <h1>MCAT OS</h1>
        <p>${currentPhase().focus}</p>
        <div class="score-row">
          <div>
            <strong>${overallAccuracy()}</strong>
            <span>总正确率</span>
          </div>
          <div>
            <strong>${completedCount()}</strong>
            <span>知识点完成</span>
          </div>
          <div>
            <strong>${dueReviews().length}</strong>
            <span>今日复测</span>
          </div>
        </div>
      </section>

      <nav class="tabs" aria-label="主导航">
        ${tabButton('today', '今日')}
        ${tabButton('map', '知识')}
        ${tabButton('practice', '练习')}
        ${tabButton('review', '错题')}
        ${tabButton('settings', '设置')}
      </nav>

      <section class="content">
        ${renderActiveTab()}
      </section>
    </main>
  `;

  bindEvents();
}

function tabButton(id, label) {
  return `<button class="tab ${state.activeTab === id ? 'active' : ''}" data-tab="${id}" type="button">${label}</button>`;
}

function overallAccuracy() {
  if (!state.attempts.length) return '--';
  const correct = state.attempts.filter((attempt) => attempt.correct).length;
  return `${Math.round((correct / state.attempts.length) * 100)}%`;
}

function completedCount() {
  return `${Object.keys(state.completedTopics).length}/${allTopics().length}`;
}

function renderActiveTab() {
  if (state.activeTab === 'map') return renderMap();
  if (state.activeTab === 'practice') return renderPractice();
  if (state.activeTab === 'review') return renderReview();
  if (state.activeTab === 'settings') return renderSettings();
  return renderToday();
}

function renderToday() {
  return `
    <div class="section-head">
      <div>
        <h2>今天的复习节奏</h2>
        <p>按 ${state.minutesPerDay} 分钟生成，可随时调整。</p>
      </div>
      <button class="icon-btn" data-action="start-quick" type="button" aria-label="开始快测">▶</button>
    </div>
    <div class="timeline">
      ${todaysPlan().map((item) => `
        <article class="task">
          <div class="task-icon">${taskIcon(item.type)}</div>
          <div>
            <h3>${item.title}</h3>
            <p>${item.detail}</p>
          </div>
          <strong>${item.minutes}m</strong>
        </article>
      `).join('')}
    </div>
    <div class="panel">
      <h2>薄弱雷达</h2>
      <div class="weak-list">
        ${weakTopics(5).map((topic) => `
          <button class="weak-item" data-topic-id="${topic.id}" type="button">
            <span>${topic.name}</span>
            <small>${topic.subjectName} · ${topic.stats.accuracy === null ? '未测' : `${topic.stats.accuracy}%`}</small>
          </button>
        `).join('')}
      </div>
    </div>
    <div class="panel">
      <div class="mini-head">
        <h2>本周安排</h2>
        <span>${weeklyPlan().reduce((sum, day) => sum + day.minutes, 0)}m</span>
      </div>
      <div class="week-list">
        ${weeklyPlan().map((day) => `
          <article class="week-day ${day.isToday ? 'today' : ''}">
            <div>
              <strong>${day.label}</strong>
              <p>${day.focus}</p>
            </div>
            <span>${day.minutes}m</span>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

function taskIcon(type) {
  return { learn: 'L', practice: 'T', review: 'R', cars: 'C', strategy: 'S' }[type] || '•';
}

function weeklyPlan() {
  const labels = ['今天', '明天', '第 3 天', '第 4 天', '第 5 天', '第 6 天', '第 7 天'];
  const weak = weakTopics(10);
  const fresh = allTopics().filter((topic) => !state.completedTopics[topic.id]);
  const pool = [...weak, ...fresh].filter((topic, index, arr) => arr.findIndex((other) => other.id === topic.id) === index);
  return labels.map((label, index) => {
    const topic = pool[index % Math.max(pool.length, 1)];
    const phase = currentPhase();
    const isRestorative = index === 6;
    let focus = topic ? `${topic.subjectName}: ${topic.name}` : '混合复盘';
    if (phase.id === 'integration' && index % 2 === 1) focus = 'Passage 训练 + 错因拆解';
    if (phase.id === 'simulation' && index % 3 === 0) focus = '单科限时模拟 + 复盘';
    if (isRestorative) focus = '轻量复盘 + CARS 保温';
    return {
      label,
      focus,
      minutes: isRestorative ? Math.max(30, Math.round(state.minutesPerDay * 0.55)) : state.minutesPerDay,
      isToday: index === 0
    };
  });
}

function renderMap() {
  const selectedTopic = state.selectedTopicId ? allTopics().find((topic) => topic.id === state.selectedTopicId) : null;
  return `
    <div class="section-head">
      <div>
        <h2>AAMC 知识地图</h2>
        <p>第一版按官方考试结构组织，可逐步扩充笔记和题库。</p>
      </div>
    </div>
    <div class="subject-grid">
      ${subjects.map((subject) => {
        const stats = subjectStats(subject.id);
        return `
          <article class="subject-card" style="--accent:${subject.color}">
            <header>
              <div>
                <h3>${subject.name}</h3>
                <p>${subject.fullName}</p>
              </div>
              <strong>${stats.completed}/${stats.total}</strong>
            </header>
            <div class="progress"><span style="width:${Math.round((stats.completed / stats.total) * 100)}%"></span></div>
            ${subject.areas.map(([areaId, areaName, topics]) => `
              <details>
                <summary>${areaName}</summary>
                <div class="topic-list">
                  ${topics.map((name) => {
                    const id = `${subject.id}-${areaId}-${slug(name)}`;
                    const stats = topicStats(name);
                    return `
                      <button class="topic ${state.completedTopics[id] ? 'done' : ''}" data-topic-id="${id}" type="button">
                        <span>${name}</span>
                        <small>${stats.accuracy === null ? '未测' : `${stats.accuracy}%`}</small>
                      </button>
                    `;
                  }).join('')}
                </div>
              </details>
            `).join('')}
          </article>
        `;
      }).join('')}
    </div>
    ${selectedTopic ? renderTopicDetail(selectedTopic) : ''}
  `;
}

function renderTopicDetail(topic) {
  const guide = topicGuides[topic.name] || {
    mustKnow: ['先掌握定义、适用条件和常见陷阱。', '做题时把题干信息映射到这个知识点。', '复盘时记录自己错在概念、读题还是选项。'],
    drill: '用 3 道快题测试能否在不同语境中识别这个知识点。'
  };
  const stats = topicStats(topic.name);
  return `
    <aside class="topic-detail">
      <div class="detail-bar">
        <div>
          <p>${topic.subjectName} · ${topic.areaName}</p>
          <h2>${topic.name}</h2>
        </div>
        <button class="ghost" data-action="close-topic" type="button">关闭</button>
      </div>
      <div class="detail-stats">
        <span>${stats.accuracy === null ? '未测' : `${stats.accuracy}% 正确率`}</span>
        <span>${stats.wrong} 次错误</span>
        <span>${state.completedTopics[topic.id] ? '已完成' : '未完成'}</span>
      </div>
      <div class="guide-list">
        ${guide.mustKnow.map((item) => `<p>${item}</p>`).join('')}
      </div>
      <div class="drill-box">
        <strong>推荐训练</strong>
        <p>${guide.drill}</p>
      </div>
      <label class="note-box">
        <span>我的笔记</span>
        <textarea data-note-topic="${topic.id}" rows="5" placeholder="写下容易忘的点、公式、错题提醒...">${state.topicNotes[topic.id] || ''}</textarea>
      </label>
      <div class="detail-actions">
        <button class="primary" data-action="save-note" data-topic-id="${topic.id}" type="button">保存笔记</button>
        <button class="ghost" data-action="toggle-topic" data-topic-id="${topic.id}" type="button">${state.completedTopics[topic.id] ? '标记未完成' : '标记完成'}</button>
        <button class="ghost" data-action="topic-quiz" data-topic-name="${topic.name}" type="button">练这个点</button>
      </div>
    </aside>
  `;
}

function renderPractice() {
  if (state.quiz) return renderQuiz();
  return `
    <div class="section-head">
      <div>
        <h2>碎片化模拟</h2>
        <p>先用内置样题跑通流程，后续可继续扩题。</p>
      </div>
    </div>
    <div class="mode-grid">
      ${practiceMode('quick', '5 分钟快测', '4 题混合概念，适合排队和通勤。')}
      ${practiceMode('passage', '15 分钟 Passage', '6 题限时训练，兼顾速度和定位。')}
      ${practiceMode('review', '错题再测', `${dueReviews().length || '无'} 个到期项目。`)}
      ${practiceMode('section', '单科小节', '按科目抽题，模拟 section 节奏。')}
    </div>
    <div class="panel">
      <h2>科目表现</h2>
      <div class="metric-list">
        ${subjects.map((subject) => {
          const stats = subjectStats(subject.id);
          return `<div class="metric"><span>${subject.name}</span><strong>${stats.accuracy === null ? '--' : `${stats.accuracy}%`}</strong></div>`;
        }).join('')}
      </div>
    </div>
  `;
}

function practiceMode(mode, title, detail) {
  return `
    <button class="mode-card" data-mode="${mode}" type="button">
      <span>${title}</span>
      <small>${detail}</small>
    </button>
  `;
}

function renderQuiz() {
  const quiz = state.quiz;
  const question = quiz.items[quiz.index];
  const selected = quiz.answers[question.id];
  return `
    <div class="quiz">
      <div class="quiz-head">
        <button class="ghost" data-action="exit-quiz" type="button">退出</button>
        <span>${quiz.index + 1}/${quiz.items.length}</span>
      </div>
      <p class="topic-label">${subjectName(question.subject)} · ${question.topic}</p>
      <h2>${question.stem}</h2>
      <div class="choices">
        ${question.choices.map((choice, index) => `
          <button class="choice ${selected === index ? 'selected' : ''}" data-choice="${index}" type="button">${choice}</button>
        `).join('')}
      </div>
      ${selected === undefined ? '' : `
        <div class="explanation ${selected === question.answer ? 'correct' : 'wrong'}">
          <strong>${selected === question.answer ? '答对了' : '需要回访'}</strong>
          <p>${question.explanation}</p>
        </div>
        ${selected === question.answer ? '' : renderReasonPicker(question)}
      `}
      <button class="primary" data-action="next-question" ${selected === undefined ? 'disabled' : ''} type="button">
        ${quiz.index === quiz.items.length - 1 ? '完成本组' : '下一题'}
      </button>
    </div>
  `;
}

function renderReasonPicker(question) {
  const attempt = [...state.attempts].reverse().find((item) => item.questionId === question.id);
  const currentReason = attempt?.reason || inferReason(question.subject);
  return `
    <div class="reason-box">
      <strong>这题错因</strong>
      <div class="reason-grid">
        ${errorReasons.map((reason) => `
          <button class="reason ${currentReason === reason ? 'active' : ''}" data-reason="${reason}" data-question-id="${question.id}" type="button">${reason}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function renderReview() {
  const due = dueReviews();
  const recentWrong = state.attempts.filter((attempt) => !attempt.correct).slice(-12).reverse();
  return `
    <div class="section-head">
      <div>
        <h2>错题闭环</h2>
        <p>错题会按当天、2 天、7 天、14 天回访。</p>
      </div>
      <button class="icon-btn" data-action="start-review" type="button" aria-label="开始复测">↺</button>
    </div>
    <div class="panel">
      <h2>今日到期</h2>
      ${due.length ? due.map((item) => `
        <article class="review-item">
          <div>
            <strong>${item.topic}</strong>
            <p>${subjectName(item.subject)} · 第 ${item.stage + 1} 次回访 · ${item.reason}</p>
          </div>
          <button class="ghost" data-review-id="${item.id}" type="button">标记掌握</button>
        </article>
      `).join('') : '<p class="empty">今天没有到期错题。可以做一次薄弱点快测。</p>'}
    </div>
    <div class="panel">
      <h2>最近错误</h2>
      ${recentWrong.length ? recentWrong.map((attempt) => `
        <article class="review-item">
          <div>
            <strong>${attempt.topic}</strong>
            <p>${attempt.reason} · ${new Date(attempt.at).toLocaleDateString('zh-CN')}</p>
          </div>
        </article>
      `).join('') : '<p class="empty">还没有错题记录。</p>'}
    </div>
  `;
}

function renderSettings() {
  const mobileUrl = `${window.location.protocol}//${testHost}:${window.location.port || '5173'}/`;
  return `
    <div class="section-head">
      <div>
        <h2>备考设置</h2>
        <p>第一版先保存在本机浏览器。</p>
      </div>
    </div>
    <form class="settings">
      <label>
        <span>考试日期</span>
        <input name="examDate" type="date" value="${state.examDate}" />
      </label>
      <label>
        <span>目标分数</span>
        <input name="targetScore" type="number" min="472" max="528" value="${state.targetScore}" />
      </label>
      <label>
        <span>每日可用时间</span>
        <input name="minutesPerDay" type="number" min="20" max="480" step="10" value="${state.minutesPerDay}" />
      </label>
      <button class="primary" type="submit">保存设置</button>
    </form>
    <div class="panel">
      <h2>手机测试</h2>
      <div class="test-url">${mobileUrl}</div>
      <p class="empty">让 iPhone 和电脑处在同一网络，用 Safari 打开上面的地址。点击分享按钮，选择“添加到主屏幕”，之后就能像小程序一样进入。</p>
      <div class="install-checks">
        <span>移动端布局</span>
        <strong>已适配</strong>
        <span>本地进度</span>
        <strong>自动保存</strong>
        <span>离线缓存</span>
        <strong>${'serviceWorker' in navigator ? '生产模式启用' : '当前浏览器不支持'}</strong>
      </div>
    </div>
    <button class="danger" data-action="reset" type="button">清空本地进度</button>
  `;
}

function subjectName(id) {
  return subjects.find((subject) => subject.id === id)?.name || id;
}

function bindEvents() {
  document.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => {
      state.activeTab = button.dataset.tab;
      saveState();
      render();
    });
  });

  document.querySelectorAll('[data-topic-id]:not([data-action])').forEach((button) => {
    button.addEventListener('click', () => {
      const topic = allTopics().find((item) => item.id === button.dataset.topicId);
      if (!topic) return;
      state.selectedTopicId = topic.id;
      state.activeTab = 'map';
      saveState();
      render();
    });
  });

  document.querySelector('[data-action="close-topic"]')?.addEventListener('click', () => {
    state.selectedTopicId = null;
    saveState();
    render();
  });

  document.querySelector('[data-action="save-note"]')?.addEventListener('click', (event) => {
    const topicId = event.currentTarget.dataset.topicId;
    const note = document.querySelector(`[data-note-topic="${topicId}"]`)?.value || '';
    state.topicNotes[topicId] = note;
    saveState();
    render();
  });

  document.querySelector('[data-action="topic-quiz"]')?.addEventListener('click', (event) => {
    startQuiz('topic', event.currentTarget.dataset.topicName);
  });

  document.querySelector('[data-action="toggle-topic"]')?.addEventListener('click', (event) => {
    const topicId = event.currentTarget.dataset.topicId;
    state.completedTopics[topicId] = !state.completedTopics[topicId];
    saveState();
    render();
  });

  document.querySelectorAll('[data-mode]').forEach((button) => {
    button.addEventListener('click', () => startQuiz(button.dataset.mode));
  });

  document.querySelector('[data-action="start-quick"]')?.addEventListener('click', () => startQuiz('quick'));
  document.querySelector('[data-action="start-review"]')?.addEventListener('click', () => startQuiz('review'));
  document.querySelector('[data-action="exit-quiz"]')?.addEventListener('click', () => {
    state.quiz = null;
    saveState();
    render();
  });

  document.querySelectorAll('[data-choice]').forEach((button) => {
    button.addEventListener('click', () => answerQuestion(Number(button.dataset.choice)));
  });

  document.querySelectorAll('[data-reason]').forEach((button) => {
    button.addEventListener('click', () => updateReason(button.dataset.questionId, button.dataset.reason));
  });

  document.querySelector('[data-action="next-question"]')?.addEventListener('click', nextQuestion);

  document.querySelectorAll('[data-review-id]').forEach((button) => {
    button.addEventListener('click', () => {
      state.reviewQueue = state.reviewQueue.map((item) => item.id === button.dataset.reviewId ? { ...item, cleared: true } : item);
      saveState();
      render();
    });
  });

  document.querySelector('.settings')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.examDate = form.get('examDate') || defaultState.examDate;
    state.targetScore = Number(form.get('targetScore'));
    state.minutesPerDay = Number(form.get('minutesPerDay'));
    saveState();
    render();
  });

  document.querySelector('[data-action="reset"]')?.addEventListener('click', () => {
    if (!confirm('确定清空本地进度吗？')) return;
    state = { ...defaultState };
    saveState();
    render();
  });
}

function startQuiz(mode, topicName = null) {
  let items = [...questions];
  if (mode === 'topic' && topicName) {
    items = questions.filter((question) => question.topic === topicName);
    if (!items.length) items = questions.filter((question) => question.subject === allTopics().find((topic) => topic.name === topicName)?.subject);
  }
  if (mode === 'review') {
    const dueTopics = dueReviews().map((item) => item.topic);
    items = questions.filter((question) => dueTopics.includes(question.topic));
    if (!items.length) items = questions.filter((question) => weakTopics(4).some((topic) => topic.name === question.topic));
  }
  if (mode === 'section') {
    const weakestSubject = subjects
      .map((subject) => ({ id: subject.id, stats: subjectStats(subject.id) }))
      .sort((a, b) => (a.stats.accuracy ?? 0) - (b.stats.accuracy ?? 0))[0]?.id;
    items = questions.filter((question) => question.subject === weakestSubject);
  }
  if (mode === 'passage') items = questions.filter((question) => ['cars', 'bb', 'ps'].includes(question.subject));

  items = shuffle(items).slice(0, mode === 'quick' ? 4 : 6);
  if (!items.length) items = shuffle(questions).slice(0, 4);
  state.quiz = { mode, index: 0, items, answers: {}, startedAt: Date.now() };
  state.activeTab = 'practice';
  saveState();
  render();
}

function answerQuestion(choice) {
  const quiz = state.quiz;
  const question = quiz.items[quiz.index];
  if (quiz.answers[question.id] !== undefined) return;
  quiz.answers[question.id] = choice;
  const correct = choice === question.answer;
  const attempt = {
    id: `${question.id}-${Date.now()}`,
    questionId: question.id,
    subject: question.subject,
    topic: question.topic,
    correct,
    choice,
    at: new Date().toISOString(),
    reason: correct ? '掌握' : inferReason(question.subject)
  };
  state.attempts.push(attempt);
  if (!correct) enqueueReview(attempt);
  saveState();
  render();
}

function inferReason(subject) {
  if (subject === 'cars') return '推理或定位错误';
  if (subject === 'cp') return '概念/公式应用错误';
  if (subject === 'ps') return '术语区分错误';
  return '知识点掌握不稳';
}

function updateReason(questionId, reason) {
  const latest = [...state.attempts].reverse().find((attempt) => attempt.questionId === questionId && !attempt.correct);
  if (!latest) return;
  state.attempts = state.attempts.map((attempt) => attempt.id === latest.id ? { ...attempt, reason } : attempt);
  state.reviewQueue = state.reviewQueue.map((item) => item.attemptId === latest.id ? { ...item, reason } : item);
  saveState();
  render();
}

function enqueueReview(attempt) {
  const offsets = [0, 2, 7, 14];
  offsets.forEach((offset, stage) => {
    const due = new Date();
    due.setDate(due.getDate() + offset);
    state.reviewQueue.push({
      id: `${attempt.id}-r${stage}`,
      attemptId: attempt.id,
      subject: attempt.subject,
      topic: attempt.topic,
      reason: attempt.reason,
      stage,
      dueAt: due.toISOString(),
      cleared: false
    });
  });
}

function nextQuestion() {
  if (!state.quiz) return;
  if (state.quiz.index < state.quiz.items.length - 1) {
    state.quiz.index += 1;
  } else {
    state.quiz = null;
  }
  saveState();
  render();
}

function shuffle(items) {
  return items.map((item) => [Math.random(), item]).sort((a, b) => a[0] - b[0]).map((pair) => pair[1]);
}

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(`${appBase}sw.js`).catch(() => {});
  });
}

render();
