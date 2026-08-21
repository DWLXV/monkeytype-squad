import { db, auth, isOffline, appId } from './firebase.js';
import { doc, setDoc, getDoc } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js';

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

// --- Song Management System ---
let customSongs = JSON.parse(localStorage.getItem('monkeytype_songs')) || [
    { title: "Default Song", lyrics: "this is a default song to test the lyrics feature typing speed", font: "'Great Vibes', cursive" }
];

window.selectedSongIndex = 0;
window.editingSongIndex = null;

function populateSongDropdown() {
    const dropdownList = document.getElementById('song-dropdown-list');
    const selectedName = document.getElementById('selected-song-name');
    if (!dropdownList || !selectedName) return;

    dropdownList.innerHTML = '';

    if (customSongs[window.selectedSongIndex]) {
        selectedName.innerText = customSongs[window.selectedSongIndex].title;
    } else {
        selectedName.innerText = "Select Song";
    }

    customSongs.forEach((song, index) => {
        const item = document.createElement('div');
        const isActive = index === window.selectedSongIndex;

        item.className = `group flex justify-between items-center px-4 py-2 text-xs font-mono cursor-pointer transition-colors ${isActive ? 'bg-[var(--bg-color)] text-[var(--main-color)] font-bold' : 'text-[var(--sub-color)] hover:bg-[var(--bg-color)] hover:text-[var(--text-color)]'}`;

        const titleSpan = document.createElement('span');
        titleSpan.innerText = song.title;
        item.appendChild(titleSpan);

        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex gap-2 items-center';

        const editBtn = document.createElement('button');
        editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editBtn.className = 'text-[var(--sub-color)] hover:text-[var(--main-color)] transition-colors opacity-0 group-hover:opacity-100 p-1 outline-none';
        editBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            window.editingSongIndex = index;
            document.getElementById('new-song-title').value = song.title;
            document.getElementById('new-song-lyrics').value = song.lyrics;

            // Set the font dropdown to the song's saved font
            const fontSelect = document.getElementById('fontSelect');
            if (fontSelect && song.font) {
                fontSelect.value = song.font;
                fontSelect.style.fontFamily = song.font; // <--- This forces the dropdown to show the current font
            }

            document.getElementById('modal-title-text').innerHTML = '<i class="fa-solid fa-pen text-[var(--main-color)]"></i> Edit Custom Song';
            document.getElementById('save-song-btn').innerText = 'Update Song';

            document.getElementById('add-song-modal').classList.remove('opacity-0', 'pointer-events-none');
            document.getElementById('add-song-modal-card').classList.remove('scale-95');
            document.getElementById('add-song-modal-card').classList.add('scale-100');
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteBtn.className = 'text-[var(--sub-color)] hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 p-1 outline-none';

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            if (confirm(`Are you sure you want to delete "${song.title}"?`)) {
                customSongs.splice(index, 1);
                localStorage.setItem('monkeytype_songs', JSON.stringify(customSongs));

                if (window.selectedSongIndex === index) {
                    window.selectedSongIndex = 0;
                    if (state.mode === 'song' && customSongs.length > 0) resetTest();
                } else if (window.selectedSongIndex > index) {
                    window.selectedSongIndex--;
                }

                if (customSongs.length === 0) {
                    state.mode = 'time';
                }
                populateSongDropdown();
            }
        });

        actionsDiv.appendChild(editBtn);
        actionsDiv.appendChild(deleteBtn);
        item.appendChild(actionsDiv);

        item.addEventListener('click', () => {
            window.selectedSongIndex = index;
            selectedName.innerText = song.title;
            dropdownList.classList.add('opacity-0', 'pointer-events-none');

            populateSongDropdown();
            if (state.mode === 'song') resetTest();
        });

        dropdownList.appendChild(item);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('song-dropdown-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        const list = document.getElementById('song-dropdown-list');
        list.classList.toggle('opacity-0');
        list.classList.toggle('pointer-events-none');
    });

    document.addEventListener('click', (e) => {
        const list = document.getElementById('song-dropdown-list');
        if (list && !e.target.closest('#config-songs')) {
            list.classList.add('opacity-0', 'pointer-events-none');
        }
    });
});

const wordList = ["the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for", "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you", "do", "but", "from", "or", "which", "one", "would", "all", "will", "there", "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other", "so", "what", "time", "up", "go", "about", "than", "into", "could", "state", "only", "new", "year", "some", "take", "come", "these", "know", "see", "use", "get", "like", "then", "first", "any", "work", "now", "may", "such", "give", "over", "think", "most", "even", "find", "day", "also", "after", "way", "many", "must", "look", "before", "great", "back", "through", "long", "where", "much", "should", "well", "people", "down", "own", "just", "because", "good", "each", "those", "feel", "seem", "how", "high", "too", "place", "little", "world", "very", "still", "nation", "hand", "old", "life", "tell", "write", "become", "here", "show", "house", "both", "between", "need", "mean", "call", "develop", "under", "last", "right", "move", "thing", "general", "school", "never", "same", "another", "begin", "while", "number", "part", "turn", "real", "leave", "might", "want", "point", "form", "off", "child", "few", "small", "since", "against", "ask", "late", "home", "interest", "large", "person", "end", "open", "public", "follow", "during", "present", "without", "again", "hold", "govern", "around", "possible", "head", "consider", "word", "program", "problem", "however", "lead", "system", "set", "order", "eye", "plan", "run", "keep", "face", "fact", "group", "play", "stand", "increase", "early", "course", "change", "help", "line"];

let words = [];
let currentWordIndex = 0;
let activeWordElement = null;
let hasStarted = false;
let timer = null;
let timeRemaining = 0;
let timeElapsed = 0;
let correctChars = 0;
let incorrectChars = 0;
let extraChars = 0;
let missedChars = 0;
let currentStreak = 0;
let bestStreak = 0;
let isPerfectTest = true;

const configBar = document.getElementById('config-bar');
const typingTestDiv = document.getElementById('typing-test');
const wordsContainer = document.getElementById('words-container');
const caret = document.getElementById('caret');
const liveStats = document.getElementById('live-stats');
const focusOverlay = document.getElementById('focus-overlay');
const restartBtn = document.getElementById('restart-btn');
const streakValue = document.getElementById('streak-value');
const bestStreakValue = document.getElementById('best-streak-value');
const streakDisplay = document.getElementById('streak-display');
const languageIndicator = document.getElementById('language-indicator');
const restartBtnContainer = document.getElementById('restart-btn-container');
const testContainer = document.getElementById('typing-test-container');
const resultsScreen = document.getElementById('results-screen');

async function syncCurrentStreak() {
    const key = `${state.mode}_${state.length}`;

    if (!state.userStats[key]) {
        state.userStats[key] = {};
    }

    state.userStats[key].currentStreak = currentStreak;
    localStorage.setItem(`streak_current_${key}`, currentStreak);

    if (state.currentUser && !isOffline && db) {
        try {
            const profileRef = doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data');
            const targetedPayload = {
                stats: {
                    [key]: {
                        currentStreak: currentStreak
                    }
                }
            };
            await setDoc(profileRef, targetedPayload, { merge: true });
        } catch (e) {
            console.warn('Could not sync current streak:', e);
        }
    }
}

function loadStreaks() {
    const key = `${state.mode}_${state.length}`;

    if (!state.userStats[key]) {
        state.userStats[key] = {};
    }

    bestStreak = state.userStats[key].bestStreak !== undefined ? state.userStats[key].bestStreak : 0;

    if (state.currentUser && state.userStats[key].currentStreak !== undefined) {
        currentStreak = state.userStats[key].currentStreak;
    } else {
        const localStreak = localStorage.getItem(`streak_current_${key}`);
        currentStreak = localStreak ? parseInt(localStreak) : 0;
    }

    updateStreakUI();
}

function updateStreakUI(flashing = false, failed = false) {
    if (currentStreak > bestStreak) bestStreak = currentStreak;
    streakValue.innerText = currentStreak;
    bestStreakValue.innerText = bestStreak;

    if (currentStreak > 0) streakDisplay.classList.add('streak-active');
    else streakDisplay.classList.remove('streak-active');

    if (failed) {
        streakDisplay.classList.add('streak-broken');
        setTimeout(() => streakDisplay.classList.remove('streak-broken'), 500);
    } else if (flashing) {
        streakDisplay.classList.add('streak-success');
        setTimeout(() => streakDisplay.classList.remove('streak-success'), 1000);
    }
}

function renderWords() {
    wordsContainer.innerHTML = '';
    wordsContainer.style.top = '0px';
    words = [];

    if (state.mode === 'song') {
        const selectedIndex = window.selectedSongIndex || 0;
        const song = customSongs[selectedIndex];

        if (song) {
            // APPLY FONT TO CONTAINER
            if (song.font) {
                wordsContainer.style.fontFamily = song.font;
            } else {
                wordsContainer.style.fontFamily = '';
            }

            const lines = song.lyrics.split('\n');
            let emptyLineCount = 0;
            const wordData = [];

            lines.forEach((line) => {
                const lineWords = line.trim().split(/\s+/).filter(w => w.length > 0);

                if (lineWords.length === 0) {
                    emptyLineCount++;
                } else {
                    if (emptyLineCount > 0 && wordData.length > 0) {
                        wordData[wordData.length - 1].blankLinesAfter = emptyLineCount;
                        emptyLineCount = 0;
                    }
                    lineWords.forEach((w) => {
                        wordData.push({ text: w, isEnter: false, blankLinesAfter: 0 });
                    });
                    wordData.push({ text: '↵', isEnter: true, blankLinesAfter: 0 });
                }
            });

            words = wordData.map(w => w.text);

            wordData.forEach(data => {
                const wordEl = document.createElement('div');
                wordEl.className = 'word';

                if (data.isEnter) {
                    wordEl.dataset.isEnter = 'true';
                    const letterEl = document.createElement('span');
                    letterEl.className = 'letter';
                    letterEl.innerHTML = '&#8629;';
                    wordEl.appendChild(letterEl);
                } else {
                    for (let i = 0; i < data.text.length; i++) {
                        const letterEl = document.createElement('span');
                        letterEl.className = 'letter';
                        letterEl.innerText = data.text[i];
                        wordEl.appendChild(letterEl);
                    }
                }

                if (data.blankLinesAfter > 0) {
                    wordEl.style.marginBottom = `calc(var(--test-line-height) * ${data.blankLinesAfter})`;
                }
                wordsContainer.appendChild(wordEl);

                if (data.isEnter) {
                    const breakEl = document.createElement('div');
                    breakEl.style.flexBasis = '100%';
                    breakEl.style.height = '0';
                    breakEl.style.margin = '0';
                    wordsContainer.appendChild(breakEl);
                }
            });
        }
    } else {
        // RESET FONT FOR STANDARD TYPING MODES
        wordsContainer.style.fontFamily = '';

        const wordCount = state.mode === 'time' ? 1000 : state.length;
        for (let i = 0; i < wordCount; i++) {
            words.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }
        words.forEach((wordText) => {
            const wordEl = document.createElement('div');
            wordEl.className = 'word';
            for (let i = 0; i < wordText.length; i++) {
                const letterEl = document.createElement('span');
                letterEl.className = 'letter';
                letterEl.innerText = wordText[i];
                wordEl.appendChild(letterEl);
            }
            wordsContainer.appendChild(wordEl);
        });
    }

    currentWordIndex = 0;
    activeWordElement = wordsContainer.children[currentWordIndex];
    if (activeWordElement) activeWordElement.classList.add('active');
    updateCaretPosition();
}

function updateCaretPosition() {
    const wordEl = wordsContainer.children[currentWordIndex];
    if (!wordEl) return;

    let activeLetterIndex = -1;
    const letters = wordEl.children;
    for (let i = 0; i < letters.length; i++) {
        if (!letters[i].classList.contains('correct') && !letters[i].classList.contains('incorrect')) {
            activeLetterIndex = i;
            break;
        }
    }

    let targetEl;
    let appendRight = false;
    if (activeLetterIndex === -1) {
        targetEl = letters[letters.length - 1];
        appendRight = true;
    } else {
        targetEl = letters[activeLetterIndex];
    }

    if (targetEl) {
        let leftPos = targetEl.offsetLeft;
        let topPos = targetEl.offsetTop;
        if (appendRight) leftPos += targetEl.offsetWidth;

        const compStyle = getComputedStyle(document.documentElement);
        const lineHeightStr = compStyle.getPropertyValue('--test-line-height').trim();
        const lineHeight = parseInt(lineHeightStr.replace('px', '')) || 48;

        let caretTop;
        if (topPos > lineHeight) {
            wordsContainer.style.top = `-${topPos - lineHeight}px`;
            caretTop = lineHeight + (lineHeight * 0.1);
        } else {
            wordsContainer.style.top = '0px';
            caretTop = topPos + (lineHeight * 0.1);
        }

        caret.style.transform = `translate(${leftPos}px, ${caretTop}px)`;
    }
}

function breakStreak() {
    if (isPerfectTest) {
        isPerfectTest = false;
        currentStreak = 0;
        updateStreakUI(false, true);
        syncCurrentStreak();
    }
}

function startTest() {
    hasStarted = true;
    isPerfectTest = true;
    timeElapsed = 0;

    // Apply the exact chosen font to the words container when typing starts
    if (state.mode === 'song') {
        const song = customSongs[window.selectedSongIndex || 0];
        if (song && song.font) {
            wordsContainer.style.fontFamily = song.font;
        }
    }

    configBar.style.opacity = '0';
    languageIndicator.style.opacity = '0';
    restartBtnContainer.style.opacity = '0';
    setTimeout(() => {
        configBar.classList.add('invisible');
        languageIndicator.classList.add('invisible');
    }, 300);

    if (state.mode === 'time') {
        timeRemaining = state.length;
        liveStats.innerText = timeRemaining;
        timer = setInterval(() => {
            timeRemaining -= 1;
            timeElapsed += 1;
            liveStats.innerText = timeRemaining;
            if (timeRemaining <= 0) endTest();
        }, 1000);
    } else {
        liveStats.innerText = `0/${state.length}`;
        timer = setInterval(() => {
            timeElapsed += 1;
        }, 1000);
    }
}

function resetTest() {
    clearInterval(timer);
    hasStarted = false;
    isPerfectTest = true;
    correctChars = 0;
    incorrectChars = 0;
    extraChars = 0;
    missedChars = 0;

    resultsScreen.classList.add('hide');
    testContainer.classList.remove('hide');
    liveStats.classList.remove('hide');
    configBar.classList.remove('hide', 'invisible');
    configBar.style.opacity = '1';
    languageIndicator.classList.remove('hide', 'invisible');
    languageIndicator.style.opacity = '1';
    restartBtnContainer.classList.remove('hide');
    restartBtnContainer.style.opacity = '1';

    renderWords();

    if (state.mode === 'song') {
        liveStats.innerText = `0/${words.length}`;
    } else {
        liveStats.innerText = state.mode === 'time' ? state.length : `0/${state.length}`;
    }

    setTimeout(() => {
        if (state.currentView === 'test') typingTestDiv.focus();
    }, 10);
}

async function updateAccountStats(statMode, statLength, localBestStreak, wpm) {
    const key = `${statMode}_${statLength}`;
    if (!state.currentUser) return;

    if (!isOffline && db) {
        try {
            const profileRef = doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data');
            const snap = await getDoc(profileRef);
            let dbStats = {};
            if (snap.exists() && snap.data().stats) {
                dbStats = snap.data().stats;
            }

            if (!state.userStats[key]) state.userStats[key] = {};
            if (!dbStats[key]) dbStats[key] = {};

            const trueBestStreak = Math.max(localBestStreak || 0, dbStats[key].bestStreak || 0, state.userStats[key].bestStreak || 0);
            const trueBestWpm = Math.max(wpm || 0, dbStats[key].bestWpm || 0, state.userStats[key].bestWpm || 0);

            state.userStats[key].bestStreak = trueBestStreak;
            state.userStats[key].bestWpm = trueBestWpm;

            await setDoc(profileRef, { stats: state.userStats }, { merge: true });

            const userScoreRef = doc(db, 'artifacts', appId, 'public', 'data', `leaderboard_${statMode}_${statLength}`, state.currentUser.uid);
            await setDoc(userScoreRef, { username: state.userProfileData.username, streak: trueBestStreak, wpm: trueBestWpm, updatedAt: Date.now(), uid: state.currentUser.uid }, { merge: true });

            if (typeof window.syncUserRegistry === 'function') await window.syncUserRegistry();
        } catch (e) {
            console.warn('Could not sync typing stats:', e);
        }
    } else {
        if (!state.userStats[key]) state.userStats[key] = { bestStreak: 0, bestWpm: 0 };
        if (localBestStreak > state.userStats[key].bestStreak) state.userStats[key].bestStreak = localBestStreak;
        if (wpm > state.userStats[key].bestWpm) state.userStats[key].bestWpm = wpm;
    }
}

async function endTest() {
    clearInterval(timer);
    hasStarted = false;
    if (timeElapsed === 0) timeElapsed = 1;

    for (let i = 0; i < currentWordIndex; i++) {
        const w = wordsContainer.children[i];
        if (w) {
            w.querySelectorAll('.letter').forEach((l) => {
                if (!l.classList.contains('correct') && !l.classList.contains('incorrect') && !l.classList.contains('extra')) missedChars++;
            });
        }
    }

    const totalErrors = incorrectChars + extraChars + missedChars;
    const totalAttempted = correctChars + totalErrors;
    const accuracy = totalAttempted === 0 ? 0 : (correctChars / totalAttempted) * 100;
    const wpm = Math.round((correctChars / 5) / (timeElapsed / 60));

    const meetsSpeed = state.mode === 'time' ? correctChars >= ((state.length / 3) * 5) : timeElapsed <= (state.length * 3);

    if (isPerfectTest) {
        if (totalAttempted > 0 && accuracy === 100 && meetsSpeed) {
            currentStreak += 1;
            updateStreakUI(true, false);
        } else {
            isPerfectTest = false;
            currentStreak = 0;
            updateStreakUI(false, true);
        }
    }

    syncCurrentStreak();

    document.getElementById('result-wpm').innerText = wpm;
    document.getElementById('result-acc').innerText = `${Math.round(accuracy)}%`;
    document.getElementById('result-type').innerText = `${state.mode} ${state.length}`;
    document.getElementById('result-chars').innerText = `${correctChars}/${incorrectChars}/${extraChars}/${missedChars}`;
    document.getElementById('result-time').innerText = `${timeElapsed}s`;

    if (isPerfectTest && totalAttempted > 0) {
        document.getElementById('result-streak').innerHTML = `<span style="color: var(--main-color)">+1 Perfect</span> (${currentStreak})`;
    } else {
        document.getElementById('result-streak').innerHTML = `Broken <span class="text-sm" style="color: var(--sub-color)">(0)</span>`;
    }
    document.getElementById('result-best-streak').innerText = bestStreak;

    testContainer.classList.add('hide');
    liveStats.classList.add('hide');
    configBar.classList.add('hide');
    languageIndicator.classList.add('hide');
    restartBtnContainer.classList.add('hide');
    resultsScreen.classList.remove('hide');

    if (document.activeElement) document.activeElement.blur();

    await updateAccountStats(state.mode, state.length, bestStreak, wpm);
}

function setupConfigListeners() {
    const modeItems = document.querySelectorAll('.config-item[data-mode]');
    const lengthContainer = document.getElementById('config-lengths');
    const songContainer = document.getElementById('config-songs');

    function lengthClickHandler(e) {
        document.querySelectorAll('#config-lengths .config-item').forEach((i) => i.classList.remove('active'));
        e.currentTarget.classList.add('active');
        state.length = Number(e.currentTarget.dataset.val);
        loadStreaks();
        resetTest();
    }

    modeItems.forEach((item) => {
        item.addEventListener('click', (e) => {
            modeItems.forEach((i) => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
            state.mode = e.currentTarget.dataset.mode;

            if (state.mode === 'song') {
                lengthContainer.classList.add('hide');
                songContainer.classList.remove('hide');
                state.length = customSongs[document.getElementById('song-select')?.value || 0]?.lyrics.split(/\s+/).length || 0;
            } else {
                lengthContainer.classList.remove('hide');
                songContainer.classList.add('hide');

                lengthContainer.innerHTML = '';
                const lengths = state.mode === 'time' ? [15, 30, 60, 120] : [10, 25, 50, 100];
                lengths.forEach((val, idx) => {
                    const span = document.createElement('span');
                    span.className = `config-item ${idx === 1 ? 'active' : ''}`;
                    span.dataset.val = val;
                    span.innerText = val;
                    span.addEventListener('click', lengthClickHandler);
                    lengthContainer.appendChild(span);
                });
                state.length = lengths[1];
            }

            loadStreaks();
            resetTest();
        });
    });

    document.querySelectorAll('#config-lengths .config-item[data-val]').forEach((i) => i.addEventListener('click', lengthClickHandler));
}

window.loadStreaks = loadStreaks;
window.updateStreakUI = updateStreakUI;
window.renderWords = renderWords;
window.updateCaretPosition = updateCaretPosition;
window.resetTest = resetTest;
window.setupConfigListeners = setupConfigListeners;
window.endTest = endTest;
window.__appState = state;

window.wordsContainer = wordsContainer;
window.currentView = state.currentView;
window.mode = state.mode;
window.length = state.length;

if (typingTestDiv) {
    typingTestDiv.addEventListener('keydown', (e) => {
        if (state.currentView !== 'test' || !state.currentUser) return;
        if (!hasStarted && e.key.length === 1 && !e.metaKey && !e.ctrlKey) startTest();

        const currentWordEl = wordsContainer.children[currentWordIndex];
        if (!currentWordEl) return;

        const isEnterWord = currentWordEl.dataset.isEnter === 'true';

        if (e.key === 'Enter') {
            if (isEnterWord) {
                currentWordEl.children[0].classList.add('correct');
                correctChars += 1;
                currentWordIndex += 1;

                if (currentWordIndex >= wordsContainer.children.length) {
                    endTest();
                    return;
                }
                updateCaretPosition();

                if (state.mode === 'song' || state.mode === 'words') {
                    const total = state.mode === 'song' ? words.length : state.length;
                    liveStats.innerText = `${currentWordIndex}/${total}`;
                }
            } else if (currentWordIndex + 1 < wordsContainer.children.length &&
                wordsContainer.children[currentWordIndex + 1].dataset.isEnter === 'true') {

                const letters = currentWordEl.children;
                let hasError = false;
                for (let i = 0; i < letters.length; i++) {
                    const l = letters[i];
                    if (l.classList.contains('incorrect') || (!l.classList.contains('correct') && !l.classList.contains('extra'))) {
                        hasError = true;
                        break;
                    }
                }
                if (hasError) {
                    currentWordEl.classList.add('error-underline');
                    breakStreak();
                }

                currentWordIndex += 1;

                const enterWordEl = wordsContainer.children[currentWordIndex];
                enterWordEl.children[0].classList.add('correct');
                correctChars += 1;
                currentWordIndex += 1;
                const nextElement = wordsContainer.children[currentWordIndex];
                if (nextElement && nextElement.style.flexBasis === '100%') {
                    currentWordIndex++;
                }
                if (currentWordIndex >= words.length) {
                    endTest();
                    return;
                }
                updateCaretPosition();

                if (state.mode === 'song' || state.mode === 'words') {
                    const total = state.mode === 'song' ? words.length : state.length;
                    liveStats.innerText = `${currentWordIndex}/${total}`;
                }
            }
            return;
        }

        if (e.ctrlKey || e.metaKey || e.altKey || ['Tab', 'Escape', 'Enter', 'Shift', 'CapsLock', 'Alt'].includes(e.key)) return;
        e.preventDefault();

        const letters = currentWordEl.children;
        let untypedIndex = -1;
        for (let i = 0; i < letters.length; i++) {
            if (!letters[i].classList.contains('correct') && !letters[i].classList.contains('incorrect')) {
                untypedIndex = i;
                break;
            }
        }

        if (e.key === ' ') {
            if (isEnterWord) return;

            if (currentWordIndex + 1 < wordsContainer.children.length &&
                wordsContainer.children[currentWordIndex + 1].dataset.isEnter === 'true') {
                return;
            }

            if (untypedIndex === 0 && !letters[0].classList.contains('incorrect')) return;
            let hasError = false;
            for (let i = 0; i < letters.length; i++) {
                const l = letters[i];
                if (l.classList.contains('incorrect') || (!l.classList.contains('correct') && !l.classList.contains('extra'))) {
                    hasError = true;
                    break;
                }
            }
            if (hasError) {
                currentWordEl.classList.add('error-underline');
                breakStreak();
            }

            currentWordIndex += 1;
            if (currentWordIndex >= words.length) {
                endTest();
                return;
            }
            updateCaretPosition();

            if (state.mode === 'words' || state.mode === 'song') {
                const total = state.mode === 'song' ? words.length : state.length;
                liveStats.innerText = `${currentWordIndex}/${total}`;
                if (currentWordIndex >= total) endTest();
            }
            return;
        }

        if (e.key === 'Backspace') {
            if (untypedIndex === 0 || isEnterWord) {
                if (currentWordIndex > 0) {
                    const prevWord = wordsContainer.children[currentWordIndex - 1];
                    const prevIsEnter = prevWord.dataset.isEnter === 'true';

                    if (prevIsEnter) {
                        prevWord.children[0].classList.remove('correct', 'incorrect');
                        currentWordIndex -= 1;
                        correctChars -= 1;

                        if (currentWordIndex > 0) {
                            const wordBeforeEnter = wordsContainer.children[currentWordIndex - 1];
                            if (wordBeforeEnter.classList.contains('error-underline')) {
                                wordBeforeEnter.classList.remove('error-underline');
                                currentWordIndex -= 1;
                            }
                        }

                        updateCaretPosition();
                        if (state.mode === 'song' || state.mode === 'words') {
                            const total = state.mode === 'song' ? words.length : state.length;
                            liveStats.innerText = `${currentWordIndex}/${total}`;
                        }
                    } else if (prevWord.classList.contains('error-underline')) {
                        prevWord.classList.remove('error-underline');
                        currentWordIndex -= 1;
                        updateCaretPosition();
                        if (state.mode === 'song' || state.mode === 'words') {
                            const total = state.mode === 'song' ? words.length : state.length;
                            liveStats.innerText = `${currentWordIndex}/${total}`;
                        }
                    }
                }
            } else {
                const idxToRemove = untypedIndex === -1 ? letters.length - 1 : untypedIndex - 1;
                const letterEl = letters[idxToRemove];
                if (letterEl && letterEl.classList.contains('extra')) {
                    letterEl.remove();
                } else if (letterEl) {
                    letterEl.classList.remove('correct', 'incorrect');
                }
                updateCaretPosition();
            }
            return;
        }

        if (e.key.length === 1) {
            if (isEnterWord) return;

            if (untypedIndex !== -1) {
                if (e.key === letters[untypedIndex].innerText) {
                    letters[untypedIndex].classList.add('correct');
                    correctChars += 1;
                } else {
                    breakStreak();
                    letters[untypedIndex].classList.add('incorrect');
                    incorrectChars += 1;
                }
            } else {
                breakStreak();
                const extra = document.createElement('span');
                extra.className = 'letter incorrect extra';
                extra.innerText = e.key;
                currentWordEl.appendChild(extra);
                extraChars += 1;
            }
            updateCaretPosition();
        }
    });
}

if (focusOverlay) focusOverlay.addEventListener('click', () => typingTestDiv.focus());
if (restartBtn) restartBtn.addEventListener('click', resetTest);
if (document.getElementById('next-test-btn')) document.getElementById('next-test-btn').addEventListener('click', resetTest);

if (typingTestDiv) {
    typingTestDiv.addEventListener('keydown', () => {
        caret.classList.add('typing');
        clearTimeout(caret.typingTimeout);
        caret.typingTimeout = setTimeout(() => caret.classList.remove('typing'), 500);
    });
}

window.addEventListener('DOMContentLoaded', () => {
    if (typeof window.setupConfigListeners === 'function') window.setupConfigListeners();
    if (typeof window.resetTest === 'function') window.resetTest();
});

window.addEventListener('mousemove', () => {
    document.body.classList.remove('hide-mouse');
});

typingTestDiv.addEventListener('keydown', (e) => {
    if (state.currentView === 'test' && !['Shift', 'Alt', 'Control', 'Meta'].includes(e.key)) {
        document.body.classList.add('hide-mouse');
    }
});

window.addEventListener('keydown', (e) => {
    if (state.currentView === 'test' && e.key === 'Tab') {
        e.preventDefault();

        if (!resultsScreen.classList.contains('hide')) {
            document.getElementById('next-test-btn').focus();
        } else {
            document.getElementById('restart-btn').focus();
        }
    }
});

// --- Add Song Modal Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    populateSongDropdown();

    const addSongModal = document.getElementById('add-song-modal');
    const addSongCard = document.getElementById('add-song-modal-card');

    document.getElementById('add-song-modal-trigger')?.addEventListener('click', () => {
        window.editingSongIndex = null;
        document.getElementById('new-song-title').value = '';
        document.getElementById('new-song-lyrics').value = '';

        // Reset the font dropdown when adding a new song
        const fontSelect = document.getElementById('fontSelect');
        if (fontSelect) {
            fontSelect.selectedIndex = 0;
            fontSelect.style.fontFamily = fontSelect.value; // <--- Resets it back to standard font
        }

        document.getElementById('modal-title-text').innerHTML = '<i class="fa-solid fa-music text-[var(--main-color)]"></i> Add Custom Song';
        document.getElementById('save-song-btn').innerText = 'Save Song';

        addSongModal.classList.remove('opacity-0', 'pointer-events-none');
        addSongCard.classList.remove('scale-95');
        addSongCard.classList.add('scale-100');
    });

    document.getElementById('close-song-modal')?.addEventListener('click', () => {
        addSongModal.classList.add('opacity-0', 'pointer-events-none');
        addSongCard.classList.remove('scale-100');
        addSongCard.classList.add('scale-95');
    });

    document.getElementById('save-song-btn')?.addEventListener('click', () => {
        const title = document.getElementById('new-song-title').value.trim();
        const lyrics = document.getElementById('new-song-lyrics').value.trim();

        // Grab the chosen font
        const fontSelect = document.getElementById('fontSelect');
        const font = fontSelect ? fontSelect.value : "'Great Vibes', cursive";

        if (!title || !lyrics) {
            alert('Please enter both a title and lyrics!');
            return;
        }

        if (window.editingSongIndex !== null) {
            // Update existing song with font
            customSongs[window.editingSongIndex] = { title, lyrics, font };
            window.selectedSongIndex = window.editingSongIndex;
            window.editingSongIndex = null;
        } else {
            // Add new song with font
            customSongs.push({ title, lyrics, font });
            window.selectedSongIndex = customSongs.length - 1;
        }

        localStorage.setItem('monkeytype_songs', JSON.stringify(customSongs));

        populateSongDropdown();

        document.getElementById('new-song-title').value = '';
        document.getElementById('new-song-lyrics').value = '';
        document.getElementById('close-song-modal').click();

        if (state.mode === 'song') resetTest();
    });
});
