import { db, auth, isOffline, appId } from './firebase.js';
import './typingEngine.js';
import './auth.js';
import './leaderboard.js';

window.__appState = window.__appState || {
    currentUser: null,
    userProfileData: { username: 'Loading...' },
    userStats: {},
    currentView: 'test',
    mode: 'time',
    length: 30,
    lbMode: 'time',
    lbLength: 30
};

const state = window.__appState;

const navTestBtn = document.getElementById('nav-test-btn');
const navLeaderboardBtn = document.getElementById('nav-leaderboard-btn');
const viewTest = document.getElementById('view-test');
const viewLeaderboard = document.getElementById('view-leaderboard');
const logoBtn = document.getElementById('logo-btn');
const configBar = document.getElementById('config-bar');
const themeBtns = document.querySelectorAll('.theme-btn');
const colorBtns = document.querySelectorAll('.color-btn');
const fontBtns = document.querySelectorAll('.font-btn');

function applyTheme(themeMode, colorHex) {
    const root = document.documentElement;
    if (themeMode === 'light') {
        root.style.setProperty('--bg-color', '#F8F9FA');
        root.style.setProperty('--sub-alt-color', '#E9ECEF');
        root.style.setProperty('--text-color', '#212529');
        root.style.setProperty('--sub-color', '#6C757D');
        root.style.setProperty('--border-color', '#DEE2E6');
    } else {
        root.style.setProperty('--bg-color', '#181818');
        root.style.setProperty('--sub-alt-color', '#242526');
        root.style.setProperty('--text-color', '#D1D2C7');
        root.style.setProperty('--sub-color', '#5E6266');
        root.style.setProperty('--border-color', '#262626');
    }

    root.style.setProperty('--main-color', colorHex);
    root.style.setProperty('--caret-color', colorHex);

    themeBtns.forEach(btn => btn.classList.toggle('border-[var(--main-color)]', btn.dataset.theme === themeMode));
    colorBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.color === colorHex));

    localStorage.setItem('monkeytype_theme', themeMode);
    localStorage.setItem('monkeytype_color', colorHex);
}

function applyFontSize(sizeStr) {
    const root = document.documentElement;
    if (sizeStr === '2') {
        root.style.setProperty('--test-font-size', '1.25rem');
        root.style.setProperty('--test-line-height', '36px');
        root.style.setProperty('--test-height', '108px');
    } else if (sizeStr === '4') {
        root.style.setProperty('--test-font-size', '2.25rem');
        root.style.setProperty('--test-line-height', '60px');
        root.style.setProperty('--test-height', '180px');
    } else {
        root.style.setProperty('--test-font-size', '1.75rem');
        root.style.setProperty('--test-line-height', '48px');
        root.style.setProperty('--test-height', '144px');
    }

    fontBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.size === sizeStr));
    localStorage.setItem('monkeytype_font_size', sizeStr);

    if (window.wordsContainer && window.wordsContainer.children.length > 0 && typeof window.updateCaretPosition === 'function') {
        window.updateCaretPosition();
    }
}

function loadPreferences() {
    const savedTheme = localStorage.getItem('monkeytype_theme') || 'dark';
    const savedColor = localStorage.getItem('monkeytype_color') || '#13C9C9';
    const savedFont = localStorage.getItem('monkeytype_font_size') || '3';
    applyTheme(savedTheme, savedColor);
    applyFontSize(savedFont);
}

function switchView(target) {
    state.currentView = target;
    viewTest.classList.add('hide');
    viewLeaderboard.classList.add('hide');
    navTestBtn.className = 'px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--sub-color)] hover:text-[var(--text-color)] transition-all flex items-center gap-1.5';
    navLeaderboardBtn.className = 'px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--sub-color)] hover:text-[var(--text-color)] transition-all flex items-center gap-1.5';
    configBar.classList.add('invisible');

    if (target === 'test') {
        viewTest.classList.remove('hide');
        configBar.classList.remove('invisible');
        navTestBtn.classList.add('text-[var(--main-color)]', 'bg-[var(--bg-color)]', 'shadow-sm');
        navTestBtn.classList.remove('text-[var(--sub-color)]', 'hover:text-[var(--text-color)]');
    } else if (target === 'leaderboard') {
        viewLeaderboard.classList.remove('hide');
        navLeaderboardBtn.classList.add('text-[var(--main-color)]', 'bg-[var(--bg-color)]', 'shadow-sm');
        navLeaderboardBtn.classList.remove('text-[var(--sub-color)]', 'hover:text-[var(--text-color)]');
        state.lbMode = state.mode;
        state.lbLength = state.length;
        if (window.lbModeBtns) {
            window.lbModeBtns.forEach((b) => {
                const active = b.dataset.mode === state.lbMode;
                b.classList.toggle('active', active);
                b.classList.toggle('text-[var(--main-color)]', active);
                b.classList.toggle('bg-[var(--sub-alt-color)]', active);
                b.classList.toggle('text-[var(--sub-color)]', !active);
            });
        }
        if (typeof window.renderLbLengths === 'function') window.renderLbLengths();
        if (typeof window.fetchLeaderboard === 'function') window.fetchLeaderboard();
    }
}

window.applyTheme = applyTheme;
window.applyFontSize = applyFontSize;
window.loadPreferences = loadPreferences;
window.switchView = switchView;

themeBtns.forEach((btn) => btn.addEventListener('click', (e) => applyTheme(e.target.dataset.theme, localStorage.getItem('monkeytype_color') || '#13C9C9')));
colorBtns.forEach((btn) => btn.addEventListener('click', (e) => applyTheme(localStorage.getItem('monkeytype_theme') || 'dark', e.target.dataset.color)));
fontBtns.forEach((btn) => btn.addEventListener('click', (e) => applyFontSize(e.target.dataset.size)));
navTestBtn.addEventListener('click', () => switchView('test'));
navLeaderboardBtn.addEventListener('click', () => switchView('leaderboard'));
logoBtn.addEventListener('click', () => switchView('test'));

window.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    if (typeof window.setupConfigListeners === 'function') window.setupConfigListeners();
    if (typeof window.renderLbLengths === 'function') window.renderLbLengths();
    if (typeof window.resetTest === 'function') window.resetTest();
    switchView('test');
});