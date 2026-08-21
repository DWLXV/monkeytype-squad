import { db, auth, isOffline, appId } from './firebase.js';
import { doc, getDoc, setDoc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js'; 
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, reauthenticateWithCredential, updatePassword, EmailAuthProvider, deleteUser, updateEmail } from 'https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js';


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

let authMode = 'login';

const authModal = document.getElementById('auth-modal');
const authModalCard = document.getElementById('auth-modal-card');
const authModalTrigger = document.getElementById('auth-modal-trigger');
const closeAuthBtn = document.getElementById('close-auth-modal');
const authInputsSection = document.getElementById('auth-inputs-section');
const displayNameGroup = document.getElementById('display-name-group');
const displayUsernameInput = document.getElementById('display-username-input');
const loggedInSection = document.getElementById('logged-in-section');
const usernameInput = document.getElementById('username-input');
const passwordInput = document.getElementById('password-input');
const tabLogin = document.getElementById('tab-login');
const tabSignup = document.getElementById('tab-signup');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
const signupWarning = document.getElementById('signup-warning');
const forgotPasswordContainer = document.getElementById('forgot-password-container');
const forgotPasswordBtn = document.getElementById('forgot-password-btn');
const forgotPasswordMsg = document.getElementById('forgot-password-msg');
const logoutBtn = document.getElementById('logout-btn');
const toggleDeleteBtn = document.getElementById('toggle-delete-btn');
const deleteConfirmBox = document.getElementById('delete-confirm-box');
const deletePasswordInput = document.getElementById('delete-password-input');
const cancelDeleteBtn = document.getElementById('cancel-delete-btn');
const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
const profileNameDisplay = document.getElementById('profile-name-display');
const authError = document.getElementById('auth-error');
const settingsModal = document.getElementById('settings-modal');
const settingsModalCard = document.getElementById('settings-modal-card');
const settingsModalTrigger = document.getElementById('settings-modal-trigger');
const closeSettingsBtn = document.getElementById('close-settings-modal');
const settingsAccountSection = document.getElementById('settings-account-section');
const settingsNewUsername = document.getElementById('settings-new-username');
const settingsUsernamePassword = document.getElementById('settings-username-password'); // Added line
const btnSaveUsername = document.getElementById('btn-save-username');
const settingsCurrentPassword = document.getElementById('settings-current-password');
const settingsNewPassword = document.getElementById('settings-new-password');
const settingsConfirmPassword = document.getElementById('settings-confirm-password');
const btnSavePassword = document.getElementById('btn-save-password');
const settingsMessage = document.getElementById('settings-message');

const getDirectEmail = (username) => {
    const clean = username.toLowerCase().replace(/[^a-z0-9]/g, '');
    return `user_${clean}@squadtyping.app`;
};

function showSettingsMsg(msg, isError = false) {
    settingsMessage.innerText = msg;
    settingsMessage.classList.remove('hide');
    settingsMessage.className = `text-xs text-center font-medium py-2 rounded-lg border mt-4 ${isError ? 'text-red-500 bg-red-900/10 border-red-900/30' : 'text-green-500 bg-green-900/10 border-green-900/30'}`;
    setTimeout(() => settingsMessage.classList.add('hide'), 4000);
}

function setAuthMode(mode) {
    authMode = mode;
    authError.classList.add('hide');
    forgotPasswordMsg.classList.add('hide');

    if (mode === 'login') {
        tabLogin.classList.add('text-[var(--main-color)]', 'shadow-sm');
        tabLogin.classList.remove('text-[var(--sub-color)]');
        tabSignup.classList.remove('text-[var(--main-color)]', 'shadow-sm');
        tabSignup.classList.add('text-[var(--sub-color)]');
        loginBtn.classList.remove('hide');
        signupBtn.classList.add('hide');
        signupWarning.classList.add('hide');
        forgotPasswordContainer.classList.remove('hide');
        if (displayNameGroup) displayNameGroup.classList.add('hide'); // Hide 3rd field
    } else {
        tabSignup.classList.add('text-[var(--main-color)]', 'shadow-sm');
        tabSignup.classList.remove('text-[var(--sub-color)]');
        tabLogin.classList.remove('text-[var(--main-color)]', 'shadow-sm');
        tabLogin.classList.add('text-[var(--sub-color)]');
        signupBtn.classList.remove('hide');
        loginBtn.classList.add('hide');
        signupWarning.classList.remove('hide');
        forgotPasswordContainer.classList.add('hide');
        if (displayNameGroup) displayNameGroup.classList.remove('hide'); // Show 3rd field (3 text boxes total)
    }
}

async function loadUserProfile() {
    if (isOffline || !state.currentUser || !db) return;
    try {
        const profileRef = doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data');
        
        // Use a real-time listener instead of a one-time fetch
        onSnapshot(profileRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                if (data.username) state.userProfileData.username = data.username;
                if (data.stats) {
                    state.userStats = data.stats;
                    // Refresh the UI streak if the user is currently on the test view
                    if (typeof window.loadStreaks === 'function') window.loadStreaks();
                }
                if (profileNameDisplay) profileNameDisplay.innerText = state.userProfileData.username || 'Player';
            }
        });
    } catch (e) {
        console.warn('User profile could not be loaded:', e);
    }
}

async function syncUserRegistry() {
    if (isOffline || !state.currentUser || !db) return;
    try {
        const registryRef = doc(db, 'artifacts', appId, 'public', 'data', 'userRegistry', state.currentUser.uid);
        await setDoc(registryRef, {
            uid: state.currentUser.uid,
            username: state.userProfileData.username,
            email: state.currentUser.email,
            lastActive: Date.now(),
            stats: state.userStats
        }, { merge: true });
    } catch (e) {
        console.warn('Registry sync failed:', e);
    }
}

function openAuthModal() {
    setAuthMode('login');
    authError.classList.add('hide');
    usernameInput.value = '';
    passwordInput.value = '';
    deletePasswordInput.value = '';
    deleteConfirmBox.classList.add('hide');

    if (state.currentUser) {
        logoutBtn.classList.remove('hidden');
        toggleDeleteBtn.classList.remove('hidden');
        closeAuthBtn.classList.remove('hidden');
    } else {
        closeAuthBtn.classList.add('hidden');
    }

    authModal.classList.remove('opacity-0', 'pointer-events-none');
    authModalCard.classList.remove('scale-95');
    authModalCard.classList.add('scale-100');
}

function closeAuthModal() {
    if (!state.currentUser) return;
    authModal.classList.add('opacity-0', 'pointer-events-none');
    authModalCard.classList.remove('scale-100');
    authModalCard.classList.add('scale-95');
}

async function initAuth() {
    if (isOffline || !auth) {
        if (profileNameDisplay) profileNameDisplay.innerText = 'Offline Mode';
        return;
    }

    if (auth && typeof onAuthStateChanged === 'function') {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                if (user.isAnonymous) {
                    await signOut(auth);
                    return;
                }
                state.currentUser = user;
                await loadUserProfile();

                authInputsSection.classList.add('hidden');
                loggedInSection.classList.remove('hidden');
                loggedInSection.classList.add('flex');
                deleteConfirmBox.classList.add('hide');
                logoutBtn.classList.remove('hidden');
                toggleDeleteBtn.classList.remove('hidden');
                settingsAccountSection.classList.remove('hide');
                closeAuthBtn.classList.remove('hidden');
                closeAuthModal();
                await syncUserRegistry();
                if (typeof window.loadStreaks === 'function') window.loadStreaks();
                if (state.currentView === 'leaderboard' && typeof window.fetchLeaderboard === 'function') window.fetchLeaderboard();
            } else {
                state.currentUser = null;
                state.userProfileData = { username: 'Log In' };
                state.userStats = {};
                if (profileNameDisplay) profileNameDisplay.innerText = 'Log In';
                openAuthModal();
                authInputsSection.classList.remove('hidden');
                loggedInSection.classList.add('hidden');
                loggedInSection.classList.remove('flex');
                settingsAccountSection.classList.add('hide');
                if (typeof window.loadStreaks === 'function') window.loadStreaks();
            }
        });
    }
}

window.initAuth = initAuth;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.syncUserRegistry = syncUserRegistry;

if (authModalTrigger) authModalTrigger.addEventListener('click', openAuthModal);
if (closeAuthBtn) closeAuthBtn.addEventListener('click', closeAuthModal);
if (tabLogin) tabLogin.addEventListener('click', () => setAuthMode('login'));
if (tabSignup) tabSignup.addEventListener('click', () => setAuthMode('signup'));
if (forgotPasswordBtn) forgotPasswordBtn.addEventListener('click', () => forgotPasswordMsg.classList.toggle('hide'));

if (signupBtn && loginBtn) {
    signupBtn.addEventListener('click', async () => {
        const loginName = usernameInput.value.trim();
        const displayName = (displayUsernameInput ? displayUsernameInput.value.trim() : '') || loginName;
        const password = passwordInput.value;

        if (loginName.length < 3) {
            authError.innerText = 'Login Name must be at least 3 characters.';
            authError.classList.remove('hide');
            return;
        }
        if (password.length < 6) {
            authError.innerText = 'Password must be at least 6 characters.';
            authError.classList.remove('hide');
            return;
        }

        signupBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        const directEmail = getDirectEmail(loginName);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, directEmail, password);
            state.userProfileData.username = displayName;
            if (profileNameDisplay) profileNameDisplay.innerText = displayName;
            state.userStats = {};

            if (typeof window.lbModesList !== 'undefined') {
                for (const modeName of window.lbModesList) {
                    for (const item of window.lbLengthsList[modeName]) {
                        state.userStats[`${modeName}_${item}`] = { bestStreak: 0, bestWpm: 0 };
                        if (!isOffline && db) {
                            const ref = doc(db, 'artifacts', appId, 'public', 'data', `leaderboard_${modeName}_${item}`, userCredential.user.uid);
                            await setDoc(ref, { username: displayName, streak: 0, wpm: 0, updatedAt: Date.now(), uid: userCredential.user.uid }, { merge: true });
                        }
                    }
                }
            }

            if (!isOffline && db) {
                const profileRef = doc(db, 'artifacts', appId, 'users', userCredential.user.uid, 'profile', 'data');
                await setDoc(profileRef, { username: displayName, stats: state.userStats, updatedAt: Date.now() }, { merge: true });
                const registryRef = doc(db, 'artifacts', appId, 'public', 'data', 'userRegistry', userCredential.user.uid);
                await setDoc(registryRef, { uid: userCredential.user.uid, username: displayName, email: directEmail, lastActive: Date.now(), stats: state.userStats });
            }
        } catch (error) {
            authError.innerText = error.code === 'auth/email-already-in-use' ? 'Login Name already taken! Try logging in.' : error.message.replace('Firebase: ', '');
            authError.classList.remove('hide');
        } finally {
            signupBtn.innerText = 'Create Account';
        }
    });
}
// Add this right below the signupBtn logic in auth.js
if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const loginName = usernameInput.value.trim();
        const password = passwordInput.value;

        if (loginName.length < 3) {
            authError.innerText = 'Login Name must be at least 3 characters.';
            authError.classList.remove('hide');
            return;
        }
        if (!password) {
            authError.innerText = 'Please enter your password.';
            authError.classList.remove('hide');
            return;
        }

        loginBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';

        // Reconstruct the pseudo-email for authentication
        const directEmail = getDirectEmail(loginName);

        try {
            await signInWithEmailAndPassword(auth, directEmail, password);
            // Note: The onAuthStateChanged listener handles the UI transition automatically
        } catch (error) {
            authError.innerText = 'Invalid login credentials.';
            authError.classList.remove('hide');
        } finally {
            loginBtn.innerText = 'Login to Squad';
        }
    });
}
if (logoutBtn) logoutBtn.addEventListener('click', async () => { if (auth) await signOut(auth); });
if (toggleDeleteBtn) toggleDeleteBtn.addEventListener('click', () => { deleteConfirmBox.classList.remove('hide'); logoutBtn.classList.add('hidden'); toggleDeleteBtn.classList.add('hidden'); deletePasswordInput.value = ''; authError.classList.add('hide'); });
if (cancelDeleteBtn) cancelDeleteBtn.addEventListener('click', () => { deleteConfirmBox.classList.add('hide'); logoutBtn.classList.remove('hidden'); toggleDeleteBtn.classList.remove('hidden'); authError.classList.add('hide'); });

if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', async () => {
        const password = deletePasswordInput.value;
        if (!password) {
            authError.innerText = 'Please enter your password to confirm.';
            authError.classList.remove('hide');
            return;
        }

        confirmDeleteBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
        try {
            const credential = EmailAuthProvider.credential(state.currentUser.email, password);
            await reauthenticateWithCredential(state.currentUser, credential);

            if (!isOffline && db) {
                if (typeof window.lbModesList !== 'undefined') {
                    for (const modeName of window.lbModesList) {
                        for (const item of window.lbLengthsList[modeName]) {
                            try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', `leaderboard_${modeName}_${item}`, state.currentUser.uid)); } catch (e) { }
                        }
                    }
                }
                try { await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'userRegistry', state.currentUser.uid)); } catch (e) { }
                try { await deleteDoc(doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data')); } catch (e) { }
            }
            await deleteUser(state.currentUser);
        } catch (error) {
            authError.innerText = error.message.replace('Firebase: ', '');
            authError.classList.remove('hide');
        } finally {
            confirmDeleteBtn.innerText = 'Confirm Delete';
        }
    });
}

if (settingsModalTrigger) settingsModalTrigger.addEventListener('click', () => {
    if (!state.currentUser) {
        openAuthModal();
        return;
    }
    settingsCurrentPassword.value = '';
    settingsNewPassword.value = '';
    settingsConfirmPassword.value = '';
    settingsNewUsername.value = state.userProfileData.username !== 'Log In' ? state.userProfileData.username : '';
    if (settingsUsernamePassword) settingsUsernamePassword.value = ''; // Add this line

    settingsMessage.classList.add('hide');
    settingsModal.classList.remove('opacity-0', 'pointer-events-none');
    settingsModalCard.classList.remove('scale-95');
    settingsModalCard.classList.add('scale-100');
});

if (closeSettingsBtn) closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('opacity-0', 'pointer-events-none');
    settingsModalCard.classList.remove('scale-100');
    settingsModalCard.classList.add('scale-95');
});

if (btnSaveUsername) btnSaveUsername.addEventListener('click', async () => {
    const newName = settingsNewUsername.value.trim();
    const password = settingsUsernamePassword.value;

    if (!password) return showSettingsMsg('Please enter your password to confirm', true);
    if (!newName || newName.length < 3) return showSettingsMsg('Username must be at least 3 characters', true);
    if (newName === state.userProfileData.username) return showSettingsMsg('Username is unchanged', true);

    btnSaveUsername.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
        // 1. Reauthenticate the user with their password
        const credential = EmailAuthProvider.credential(state.currentUser.email, password);
        await reauthenticateWithCredential(state.currentUser, credential);

        // 2. Update Profile State
        state.userProfileData.username = newName;
        if (profileNameDisplay) profileNameDisplay.innerText = newName;

        // 3. Update Database Documents
        if (!isOffline && db && state.currentUser) {
            const profileRef = doc(db, 'artifacts', appId, 'users', state.currentUser.uid, 'profile', 'data');
            await setDoc(profileRef, { username: newName, updatedAt: Date.now() }, { merge: true });
            await syncUserRegistry();

            if (typeof window.lbModesList !== 'undefined') {
                for (const modeName of window.lbModesList) {
                    for (const item of window.lbLengthsList[modeName]) {
                        try {
                            const ref = doc(db, 'artifacts', appId, 'public', 'data', `leaderboard_${modeName}_${item}`, state.currentUser.uid);
                            await setDoc(ref, { username: newName }, { merge: true });
                        } catch (e) {
                            console.error(`Failed to update leaderboard doc for ${modeName}_${item}`, e);
                        }
                    }
                }
            }
        }

        settingsUsernamePassword.value = '';
        showSettingsMsg('Username updated successfully!');
        if (state.currentView === 'leaderboard' && typeof window.fetchLeaderboard === 'function') window.fetchLeaderboard();

    } catch (e) {
        console.error(e);
        let errorMsg = 'Failed to update username. Try re-logging in.';

        // This is the correct placement for the v11 password error checks
        if (e.code === 'auth/invalid-login-credentials' || e.code === 'auth/wrong-password' || e.code === 'auth/invalid-credential') {
            errorMsg = 'Incorrect password.';
        }
        showSettingsMsg(errorMsg, true);
    } finally {
        btnSaveUsername.innerText = 'Update Username';
    }
});
if (btnSavePassword) btnSavePassword.addEventListener('click', async () => {
    const currentPass = settingsCurrentPassword.value;
    const newPass = settingsNewPassword.value;
    const confirmPass = settingsConfirmPassword.value;

    if (!currentPass || !newPass || !confirmPass) return showSettingsMsg('Please fill in all password fields', true);
    if (newPass !== confirmPass) return showSettingsMsg('New passwords do not match', true);
    if (newPass.length < 6) return showSettingsMsg('New password must be at least 6 characters', true);

    btnSavePassword.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    try {
        const credential = EmailAuthProvider.credential(state.currentUser.email, currentPass);
        await reauthenticateWithCredential(state.currentUser, credential);
        await updatePassword(state.currentUser, newPass);
        showSettingsMsg('Password updated successfully!');
        settingsCurrentPassword.value = '';
        settingsNewPassword.value = '';
        settingsConfirmPassword.value = '';
    } catch (e) {
        let errorMsg = e.message.replace('Firebase: ', '');
        if (e.code === 'auth/invalid-login-credentials' || e.code === 'auth/wrong-password') errorMsg = 'Incorrect current password.';
        showSettingsMsg(errorMsg, true);
    } finally {
        btnSavePassword.innerText = 'Change Password';
    }
});

setAuthMode('login');
window.addEventListener('DOMContentLoaded', () => {
    initAuth();
});