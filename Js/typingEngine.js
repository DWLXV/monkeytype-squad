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
    
    // Only initialize locally to prevent null errors, do not force bestStreak to 0
    if (!state.userStats[key]) {
        state.userStats[key] = {};
    }

    // 1. Update the state
    state.userStats[key].currentStreak = currentStreak;

    // 2. Save locally so it survives page refreshes immediately
    localStorage.setItem(`streak_current_${key}`, currentStreak);

    // 3. Save to Firebase if the user is logged in
    if (state.currentUser && !isOffline && db) {
        try {
            const profileRef = doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data');
            
            // Send a targeted payload that ONLY updates the current streak
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
    
    // Ensure the stats object exists without hard-resetting existing data
    if (!state.userStats[key]) {
        state.userStats[key] = {};
    }
    
    // Safely pull the best streak, defaulting to 0 only if it's truly undefined
    bestStreak = state.userStats[key].bestStreak !== undefined ? state.userStats[key].bestStreak : 0;

    // Load current streak from Firebase state or fallback to Local Storage
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
    const wordCount = state.mode === 'time' ? 300 : state.length;
    words = [];
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

        // Use hardware-accelerated transform instead of top/left
        caret.style.transform = `translate(${leftPos}px, ${caretTop}px)`;
    }
}

function breakStreak() {
    if (isPerfectTest) {
        isPerfectTest = false;
        currentStreak = 0;
        updateStreakUI(false, true);
        syncCurrentStreak(); // Save the broken streak instantly
    }
}

function startTest() {
    hasStarted = true;
    isPerfectTest = true;
    timeElapsed = 0;
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

    // Fixed typo: changed "rresultsScreen" to "resultsScreen"
    resultsScreen.classList.add('hide');
    testContainer.classList.remove('hide');
    liveStats.classList.remove('hide');
    configBar.classList.remove('hide', 'invisible');
    configBar.style.opacity = '1';
    languageIndicator.classList.remove('hide', 'invisible');
    languageIndicator.style.opacity = '1';
    restartBtnContainer.classList.remove('hide');
    restartBtnContainer.style.opacity = '1';

    liveStats.innerText = state.mode === 'time' ? state.length : `0/${state.length}`;
    renderWords();
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

            // 1. Fetch the absolute latest truth from the database
            const snap = await getDoc(profileRef);
            let dbStats = {};
            if (snap.exists() && snap.data().stats) {
                dbStats = snap.data().stats;
            }

            // 2. Ensure objects exist to prevent undefined errors
            if (!state.userStats[key]) state.userStats[key] = { bestStreak: 0, bestWpm: 0 };
            if (!dbStats[key]) dbStats[key] = { bestStreak: 0, bestWpm: 0 };

            // 3. Calculate the true highest scores between local data, database data, and the new score
            const trueBestStreak = Math.max(localBestStreak, dbStats[key].bestStreak, state.userStats[key].bestStreak);
            const trueBestWpm = Math.max(wpm, dbStats[key].bestWpm, state.userStats[key].bestWpm);

            // 4. Set local state to the true highest scores
            state.userStats[key].bestStreak = trueBestStreak;
            state.userStats[key].bestWpm = trueBestWpm;

            // 5. Save the guaranteed highest scores back to the database
            await setDoc(profileRef, { stats: state.userStats }, { merge: true });

            const userScoreRef = doc(db, 'artifacts', appId, 'public', 'data', `leaderboard_${statMode}_${statLength}`, state.currentUser.uid);
            await setDoc(userScoreRef, { username: state.userProfileData.username, streak: trueBestStreak, wpm: trueBestWpm, updatedAt: Date.now(), uid: state.currentUser.uid }, { merge: true });

            if (typeof window.syncUserRegistry === 'function') await window.syncUserRegistry();
        } catch (e) {
            console.warn('Could not sync typing stats:', e);
        }
    } else {
        // Offline fallback logic
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

    // Save the updated streak status
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

    // Unfocus everything to prevent accidental space/enter clicks
    if (document.activeElement) document.activeElement.blur();

    await updateAccountStats(state.mode, state.length, bestStreak, wpm);
}

function setupConfigListeners() {
    const modeItems = document.querySelectorAll('.config-item[data-mode]');
    const lengthContainer = document.getElementById('config-lengths');

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
        if (e.ctrlKey || e.metaKey || e.altKey || ['Tab', 'Escape', 'Enter', 'Shift', 'CapsLock', 'Alt'].includes(e.key)) return;

        e.preventDefault();
        const currentWordEl = wordsContainer.children[currentWordIndex];
        if (!currentWordEl) return;
        const letters = currentWordEl.children;

        let untypedIndex = -1;
        for (let i = 0; i < letters.length; i++) {
            if (!letters[i].classList.contains('correct') && !letters[i].classList.contains('incorrect')) {
                untypedIndex = i;
                break;
            }
        }

        if (e.key === ' ') {
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

            if (state.mode === 'words') {
                liveStats.innerText = `${currentWordIndex}/${state.length}`;
                if (currentWordIndex >= state.length) endTest();
            }
            return;
        }

        if (e.key === 'Backspace') {
            if (untypedIndex === 0) {
                if (currentWordIndex > 0) {
                    const prevWord = wordsContainer.children[currentWordIndex - 1];
                    if (prevWord && prevWord.classList.contains('error-underline')) {
                        prevWord.classList.remove('error-underline');
                        currentWordIndex -= 1;
                        updateCaretPosition();
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

    typingTestDiv.addEventListener('focus', () => focusOverlay.classList.add('hidden'));
    typingTestDiv.addEventListener('blur', () => {
        if (resultsScreen.classList.contains('hide') && state.currentView === 'test') focusOverlay.classList.remove('hidden');
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
    // Only hide the cursor if we are actually typing in the test
    if (state.currentView === 'test' && !['Shift', 'Alt', 'Control', 'Meta'].includes(e.key)) {
        document.body.classList.add('hide-mouse');
    }
});
// Enforce the "Tab + Enter" flow for restarting tests
window.addEventListener('keydown', (e) => {
    if (state.currentView === 'test' && e.key === 'Tab') {
        e.preventDefault(); // Stop the default browser tab behavior

        if (!resultsScreen.classList.contains('hide')) {
            // If the test is finished, Tab focuses the Next Test button
            document.getElementById('next-test-btn').focus();
        } else {
            // If currently typing, Tab focuses the Quick Restart button
            document.getElementById('restart-btn').focus();
        }
    }
});
