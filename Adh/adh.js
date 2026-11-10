(function() {
  const API_BASE = 'https://aadhaar-family.asurpapa.workers.dev/api';
  const API_KEY  = 'HAPPY_DIWALI';

  const aadhaarInput  = document.getElementById('aadhaarInput');
  const fetchBtn      = document.getElementById('fetchBtn');
  const statusBox     = document.getElementById('statusBox');
  const reportContent = document.getElementById('reportContent');
  const audioToggle   = document.getElementById('audioToggle');
  const audioLabel    = document.getElementById('audioLabel');
  const bgAudio       = document.getElementById('bgAudio');

  // Volume set for background music
  bgAudio.volume = 0.5;
  bgAudio.loop = true;

  let bgStarted = false;

  // Start background music (adh.mp3) as soon as user tries to type in the input
  aadhaarInput.addEventListener('focus', startBgMusic, { once: false });
  aadhaarInput.addEventListener('input', startBgMusic, { once: false });
  aadhaarInput.addEventListener('keydown', startBgMusic, { once: false });

  function startBgMusic() {
    if (bgStarted) return;
    bgStarted = true;
    bgAudio.play().catch(err => {
      console.warn('[BG MP3] Autoplay blocked:', err.message);
    });
  }

  /* ============ HORROR AUDIO (Web Audio API) ============ */
  let audioCtx=null, masterGain=null, droneOsc=null, droneOsc2=null, noiseNode=null;
  let isSoundOn=false, heartbeatTimer=null;

  function initAudio() {
    if (audioCtx) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    audioCtx = new AC();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);

    droneOsc = audioCtx.createOscillator();
    droneOsc.type='sine'; droneOsc.frequency.value=55;
    const g1 = audioCtx.createGain(); g1.gain.value=0.32;
    droneOsc.connect(g1); g1.connect(masterGain);

    droneOsc2 = audioCtx.createOscillator();
    droneOsc2.type='sine'; droneOsc2.frequency.value=57.5;
    const g2 = audioCtx.createGain(); g2.gain.value=0.22;
    droneOsc2.connect(g2); g2.connect(masterGain);

    const bufSize = 2 * audioCtx.sampleRate;
    const nb = audioCtx.createBuffer(1, bufSize, audioCtx.sampleRate);
    const d = nb.getChannelData(0);
    for (let i=0;i<bufSize;i++) d[i]=Math.random()*2-1;
    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = nb; noiseNode.loop = true;
    const nf = audioCtx.createBiquadFilter();
    nf.type='bandpass'; nf.frequency.value=400; nf.Q.value=0.5;
    const ng = audioCtx.createGain(); ng.gain.value=0.045;
    noiseNode.connect(nf); nf.connect(ng); ng.connect(masterGain);

    droneOsc.start(); droneOsc2.start(); noiseNode.start();

    const lfo = audioCtx.createOscillator();
    lfo.type='sine'; lfo.frequency.value=0.1;
    const lg = audioCtx.createGain(); lg.gain.value=3;
    lfo.connect(lg); lg.connect(droneOsc.detune); lfo.start();

    if (!heartbeatTimer) {
      heartbeatTimer = setInterval(() => {
        if (audioCtx && isSoundOn) playHeartbeat();
      }, 1400);
    }
  }

  function playHeartbeat() {
    if (!audioCtx || !isSoundOn) return;
    const t = audioCtx.currentTime;
    [0, 0.18].forEach((off, i) => {
      const osc = audioCtx.createOscillator();
      osc.type='sine';
      osc.frequency.setValueAtTime(60, t+off);
      osc.frequency.exponentialRampToValueAtTime(35, t+off+0.12);
      const g = audioCtx.createGain();
      g.gain.setValueAtTime(0.0001, t+off);
      g.gain.exponentialRampToValueAtTime(i===0?0.25:0.18, t+off+0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t+off+0.15);
      osc.connect(g); g.connect(masterGain);
      osc.start(t+off); osc.stop(t+off+0.2);
    });
  }

  function playScare() {
    if (!audioCtx || !isSoundOn) return;
    const t = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    osc.type='sawtooth';
    osc.frequency.setValueAtTime(120, t);
    osc.frequency.exponentialRampToValueAtTime(40, t+0.6);
    const g = audioCtx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.18, t+0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t+0.7);
    const f = audioCtx.createBiquadFilter();
    f.type='lowpass'; f.frequency.value=800;
    osc.connect(f); f.connect(g); g.connect(masterGain);
    osc.start(t); osc.stop(t+0.8);
  }

  function playSuccess() {
    if (!audioCtx || !isSoundOn) return;
    const t = audioCtx.currentTime;
    [440, 660, 880].forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      osc.type='triangle'; osc.frequency.value=freq;
      const g = audioCtx.createGain();
      const s = t + i*0.08;
      g.gain.setValueAtTime(0.0001, s);
      g.gain.exponentialRampToValueAtTime(0.1, s+0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, s+0.4);
      osc.connect(g); g.connect(masterGain);
      osc.start(s); osc.stop(s+0.5);
    });
  }

  function setSoundOn(on) {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') audioCtx.resume();
    isSoundOn = on;
    const now = audioCtx.currentTime;
    masterGain.gain.cancelScheduledValues(now);
    masterGain.gain.linearRampToValueAtTime(on ? 0.6 : 0, now + 0.5);
    audioToggle.classList.toggle('muted', !on);
    audioLabel.textContent = on ? 'SOUND ON' : 'MUTED';
    audioToggle.childNodes[0].nodeValue = on ? '🔊 ' : '🔇 ';

    // Also mute/unmute the background MP3
    if (on) {
      bgAudio.play().catch(() => {});
    } else {
      bgAudio.pause();
    }
  }

  audioToggle.addEventListener('click', () => {
    setSoundOn(!isSoundOn);
    if (isSoundOn) playScare();
  });

  // First interaction anywhere = start audio + mp3
  function firstInteraction() {
    if (!isSoundOn) setSoundOn(true);
    startBgMusic();
    document.removeEventListener('click', firstInteraction);
    document.removeEventListener('keydown', firstInteraction);
  }
  document.addEventListener('click', firstInteraction);
  document.addEventListener('keydown', firstInteraction);

  /* ============ HELPERS ============ */
  function escapeHtml(text) {
    if (text === null || text === undefined) return '';
    return String(text).replace(/&/g,'&amp;').replace(/</g,'&lt;')
      .replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
  }

  function setStatus(msg, type) {
    statusBox.textContent = msg;
    statusBox.className = 'status-message';
    if (type === 'error') statusBox.classList.add('error-message');
    else if (type === 'success') statusBox.classList.add('success-message');
  }

  function showDefaultState() {
    reportContent.innerHTML = `
      <div class="empty-state">
        <span class="big-skull">💀</span>
        NO DATA ACCESSED
        <span class="hint-text">⚡ Enter Aadhaar number & press ACCESS REPORT</span>
      </div>`;
  }

  /* ============ RENDER ============ */
  function renderReport(data) {
    if (!data || typeof data !== 'object') {
      reportContent.innerHTML = `<div class="empty-state">INVALID DATA RECEIVED</div>`;
      return;
    }
    const members = Array.isArray(data.members) ? data.members : [];
    let html = '';

    html += `
      <div class="card">
        <div class="card-title">FAMILY PROFILE</div>
        <div class="info-grid">
          <div class="info-item"><span class="info-label">AADHAAR</span><span class="info-value">${escapeHtml(data.aadhaar||'—')}</span></div>
          <div class="info-item"><span class="info-label">RATION CARD</span><span class="info-value">${escapeHtml(data.ration_card||'—')}</span></div>
          <div class="info-item"><span class="info-label">TOTAL MEMBERS</span><span class="info-value">${escapeHtml(data.total_records ?? '—')}</span></div>
          <div class="info-item"><span class="info-label">HEAD OF FAMILY</span><span class="info-value">${escapeHtml(data.head_family||'—')}</span></div>
          <div class="info-item"><span class="info-label">SCHEME</span><span class="info-value">${escapeHtml(data.scheme||'—')}</span></div>
          <div class="info-item"><span class="info-label">FPS ID</span><span class="info-value">${escapeHtml(data.fps_id||'—')}</span></div>
        </div>
      </div>`;

    html += `
      <div class="card">
        <div class="card-title">LOCATION DATA</div>
        <div class="info-grid">
          <div class="info-item" style="grid-column: span 2;"><span class="info-label">ADDRESS</span><span class="info-value">${escapeHtml(data.address||'—')}</span></div>
          <div class="info-item"><span class="info-label">DISTRICT</span><span class="info-value">${escapeHtml(data.district||'—')}</span></div>
          <div class="info-item"><span class="info-label">STATE</span><span class="info-value">${escapeHtml(data.state||'—')}</span></div>
        </div>
      </div>`;

    html += `<div class="card"><div class="card-title">MEMBER DATABASE (${members.length})</div>`;
    if (members.length === 0) {
      html += `<div style="color:#7a0055; padding:1rem 0; text-align:center; font-family:'Orbitron',sans-serif; letter-spacing:2px; font-size:.8rem;">NO MEMBERS FOUND</div>`;
    } else {
      html += `<table class="member-table"><thead><tr><th>NAME</th><th>RELATION</th><th>UID STATUS</th></tr></thead><tbody>`;
      members.forEach(m => {
        const uid = m.uid === 'Yes'
          ? '<span class="uid-badge">✔ VERIFIED</span>'
          : `<span style="color:#7a0055;">${escapeHtml(m.uid||'—')}</span>`;
        html += `<tr><td>${escapeHtml(m.name||'—')}</td><td>${escapeHtml(m.relationship||'—')}</td><td>${uid}</td></tr>`;
      });
      html += `</tbody></table>`;
    }
    html += `</div>`;

    reportContent.innerHTML = html;
  }

  /* ============ FETCH — SIMPLE DIRECT ============ */
  async function fetchReport(aadhaar) {
    const clean = aadhaar.replace(/\s/g, '');
    if (!/^\d{12}$/.test(clean)) {
      setStatus('⛔ INVALID AADHAAR — 12 DIGITS REQUIRED', 'error');
      showDefaultState();
      if (isSoundOn) playScare();
      return;
    }

    fetchBtn.disabled = true;
    fetchBtn.innerHTML = '<span class="spinner"></span> SCANNING...';
    setStatus('⏳ CONNECTING TO DATABASE...', 'info');
    reportContent.innerHTML = `<div class="empty-state">DECRYPTING DATA...</div>`;

    try {
      const url = `${API_BASE}?key=${encodeURIComponent(API_KEY)}&aadhaar=${encodeURIComponent(clean)}`;
      console.log('[FETCH]', url);

      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Accept': 'application/json' }
      });

      console.log('[RESPONSE STATUS]', res.status);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} — ${res.statusText}`);
      }

      const data = await res.json();
      console.log('[DATA]', data);

      if (data.status === false) {
        throw new Error(data.message || 'API REJECTED REQUEST');
      }

      renderReport(data);
      setStatus(`✅ ACCESS GRANTED — ${data.total_records || data.members?.length || 0} RECORDS FOUND`, 'success');
      if (isSoundOn) playSuccess();

    } catch (err) {
      console.error('[FETCH ERROR]', err);
      let msg = err.message || 'UNKNOWN ERROR';
      if (msg.includes('Failed to fetch') || msg.includes('NetworkError')) {
        msg = 'NETWORK ERROR — API server reachable nahi hai';
      }
      setStatus(`❌ ${msg}`, 'error');
      reportContent.innerHTML = `
        <div class="empty-state">
          <span class="big-skull">💀</span>
          CONNECTION FAILED
          <span class="hint-text">F12 → Console me detailed error dekho</span>
        </div>`;
      if (isSoundOn) playScare();
    } finally {
      fetchBtn.disabled = false;
      fetchBtn.innerHTML = '<span>⚡</span> ACCESS REPORT';
    }
  }

  fetchBtn.addEventListener('click', () => fetchReport(aadhaarInput.value.trim()));
  aadhaarInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); fetchBtn.click(); }
  });

  showDefaultState();
})();