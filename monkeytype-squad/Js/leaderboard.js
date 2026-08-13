import { db, auth, isOffline, appId } from './firebase.js';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

const state = window.__appState || (window.__appState = {
    currentUser: null,
    userProfileData: { username: 'Loading...' },
    userStats: {},
    currentView: 'test',
    mode: 'time',
    length: 30,
    lbMode: 'time',
    lbLength: 30
});

window.lbModesList = ['time', 'words'];
window.lbLengthsList = { time: [15, 30, 60, 120], words: [10, 25, 50, 100] };

const lbStatus = document.getElementById('lb-status');
const lbCategoryTitle = document.getElementById('lb-category-title');
const leaderboardList = document.getElementById('leaderboard-list');
const lbLengthTabs = document.getElementById('lb-length-tabs');
const lbModeBtns = document.querySelectorAll('.lb-mode-btn');

async function fetchLeaderboard() {
    const lbMode = state.lbMode || 'time';
    const lbLength = state.lbLength || 30;

    if (lbCategoryTitle) lbCategoryTitle.innerText = `Top Streaks for ${lbMode} ${lbLength}`;
    if (isOffline || !db) {
        if (lbStatus) {
            lbStatus.innerText = 'Offline';
            lbStatus.className = 'text-xs text-red-500 font-mono bg-[var(--sub-alt-color)] px-3 py-1.5 rounded-lg border border-theme';
        }
        if (leaderboardList) leaderboardList.innerHTML = '<div class="p-8 text-center text-[var(--sub-color)] text-sm">Cannot connect to leaderboard.</div>';
        return;
    }

    if (lbStatus) {
        lbStatus.innerText = 'Syncing...';
        lbStatus.className = 'text-xs text-[var(--main-color)] font-mono bg-[var(--sub-alt-color)] px-3 py-1.5 rounded-lg border border-theme';
    }

    try {
        const lbRef = collection(db, 'artifacts', appId, 'public', 'data', `leaderboard_${lbMode}_${lbLength}`);
        const querySnap = await getDocs(lbRef);

        let results = [];
        querySnap.forEach((docSnap) => {
            const data = docSnap.data();
            // Removed the 'eyob' check so legitimate users can use the name
            if (data.username && data.username.toLowerCase() !== 'testuser') {
                results.push({ id: docSnap.id, ...data });
            }
        });

        results.sort((a, b) => {
            if ((b.streak || 0) !== (a.streak || 0)) return (b.streak || 0) - (a.streak || 0);
            if ((b.wpm || 0) !== (a.wpm || 0)) return (b.wpm || 0) - (a.wpm || 0);
            return ((a.username || '').toLowerCase()).localeCompare((b.username || '').toLowerCase());
        });

        const seen = new Set();
        results = results.filter((row) => {
            const key = (row.username || '').trim().toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        }).slice(0, 50);

        let html = '';
        results.forEach((data, idx) => {
            const rank = idx + 1;
            const isSelf = state.currentUser && (data.uid === state.currentUser.uid || data.id === state.currentUser.uid);
            html += `
                <div class="grid grid-cols-12 gap-2 px-6 py-3 text-xs items-center ${isSelf ? 'border-l-4 border-[var(--main-color)] bg-[var(--sub-alt-color)] text-[var(--main-color)] font-bold shadow-md' : 'text-[var(--text-color)] hover:bg-[var(--border-color)] transition-colors border-l-4 border-transparent'}">
                    <div class="col-span-1 text-center font-mono ${rank <= 3 && (data.streak || 0) > 0 ? 'text-[var(--main-color)] font-bold' : 'text-[var(--sub-color)]'}">
                        ${rank === 1 && (data.streak || 0) > 0 ? '<i class="fa-solid fa-crown text-amber-400"></i>' : `#${rank}`}
                    </div>
                    <div class="col-span-5 md:col-span-6 flex items-center gap-2 truncate">
                        <i class="fa-solid fa-user-ninja text-[var(--sub-color)] text-sm"></i>
                        <span class="truncate">${data.username || 'Anonymous'}</span>
                    </div>
                    <div class="col-span-3 md:col-span-3 text-right font-bold font-mono text-[var(--main-color)]">
                        ${(data.streak || 0)} 🔥
                    </div>
                    <div class="col-span-3 md:col-span-2 text-right font-mono text-[var(--sub-color)]">
                        ${(data.wpm || 0)} wpm
                    </div>
                </div>
            `;
        });

        if (leaderboardList) leaderboardList.innerHTML = results.length === 0 ? '<div class="p-8 text-center text-[var(--sub-color)] text-sm">No streaks recorded yet for this mode.</div>' : html;
        if (lbStatus) lbStatus.innerText = 'Live Sync';
    } catch (e) {
        if (leaderboardList) leaderboardList.innerHTML = '<div class="p-8 text-center text-red-500 text-sm">Error loading scores.</div>';
        console.warn('Leaderboard load failed:', e);
    }
}

function renderLbLengths() {
    if (!lbLengthTabs) return;
    lbLengthTabs.innerHTML = '';
    const lengths = state.lbMode === 'time' ? [15, 30, 60, 120] : [10, 25, 50, 100];
    if (!lengths.includes(state.lbLength)) state.lbLength = lengths[1];

    lengths.forEach((val) => {
        const btn = document.createElement('button');
        btn.className = `px-3 py-1.5 rounded-md transition-all text-xs font-semibold border ${val === state.lbLength ? 'bg-[var(--main-color)] text-black border-[var(--main-color)] shadow-sm' : 'bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] border-transparent'}`;
        btn.innerText = val;
        btn.dataset.val = val;
        btn.addEventListener('click', (e) => {
            state.lbLength = Number(e.currentTarget.dataset.val);
            renderLbLengths();
            fetchLeaderboard();
        });
        lbLengthTabs.appendChild(btn);
    });
}

window.fetchLeaderboard = fetchLeaderboard;
window.renderLbLengths = renderLbLengths;
window.lbModeBtns = lbModeBtns;

if (lbModeBtns && lbModeBtns.length) {
    lbModeBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            state.lbMode = e.currentTarget.dataset.mode;
            lbModeBtns.forEach((b) => {
                b.classList.remove('active', 'text-[var(--main-color)]', 'bg-[var(--sub-alt-color)]');
                b.classList.add('text-[var(--sub-color)]');
            });
            e.currentTarget.classList.add('active', 'text-[var(--main-color)]', 'bg-[var(--sub-alt-color)]');
            e.currentTarget.classList.remove('text-[var(--sub-color)]');
            renderLbLengths();
            fetchLeaderboard();
        });
    });
}

window.addEventListener('DOMContentLoaded', () => {
    renderLbLengths();
    fetchLeaderboard();
});