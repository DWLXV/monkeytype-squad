<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Monkeytype - Squad Leaderboard</title>

    <!-- External Scripts and Fonts -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Link to your local CSS file -->
    <link rel="stylesheet" href="style.css">
    <link
        href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Alex+Brush&family=Amatic+SC:wght@400;700&family=Anton&family=Bebas+Neue&family=Caveat:wght@400;700&family=Cinzel:wght@400;700&family=Comfortaa:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&family=Dancing+Script:wght@400;700&family=Fira+Code&family=Fredoka:wght@400;700&family=Great+Vibes&family=Inconsolata:wght@400;700&family=Indie+Flower&family=Inter:wght@400;700&family=JetBrains+Mono&family=Lato:wght@400;700&family=Lobster&family=Lora:ital,wght@0,400;1,400&family=Merriweather:ital,wght@0,400;1,400&family=Montserrat:wght@400;700&family=Nothing+You+Could+Do&family=Nunito:wght@400;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;700&family=PT+Serif:ital,wght@0,400;1,400&family=Pacifico&family=Parisienne&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400;1,400&family=Poppins:ital,wght@0,400;1,400&family=Raleway:ital,wght@0,400;1,400&family=Righteous&family=Roboto:wght@400;700&family=Rock+Salt&family=Satisfy&family=Shadows+Into+Light&family=Space+Mono&family=Special+Elite&display=swap"
        rel="stylesheet">
</head>

<body class="antialiased selection:bg-cyan-600/30">

    <div class="max-w-[1000px] mx-auto w-full px-6 py-6 flex flex-col min-h-screen">

        <header class="flex justify-between items-center mb-8 w-full flex-wrap gap-4">
            <div class="flex items-center gap-6">
                <div id="logo-btn" class="flex items-center gap-2 group cursor-pointer">
                    <div
                        class="relative flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--sub-alt-color)] text-[var(--main-color)] transition-transform group-hover:scale-105">
                        <i class="fa-solid fa-keyboard text-lg"></i>
                    </div>
                    <div class="text-2xl font-bold tracking-tighter text-[var(--text-color)] flex items-baseline">
                        mt<span class="text-[var(--main-color)] transition-colors">.</span>
                    </div>
                </div>

                <nav class="flex items-center gap-2 bg-[var(--sub-alt-color)] p-1 rounded-lg">
                    <button id="nav-test-btn"
                        class="px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--main-color)] bg-[var(--bg-color)] transition-all flex items-center gap-1.5 shadow-sm">
                        <i class="fa-solid fa-keyboard"></i> Test
                    </button>
                    <button id="nav-leaderboard-btn"
                        class="px-3 py-1.5 rounded-md text-xs font-semibold text-[var(--sub-color)] hover:text-[var(--text-color)] transition-all flex items-center gap-1.5">
                        <i class="fa-solid fa-trophy"></i> Leaderboard
                    </button>
                </nav>
            </div>

            <div class="flex items-center gap-4 text-sm text-[var(--sub-color)]">
                <div id="streak-display" class="streak-counter group relative cursor-help">
                    <i class="fa-solid fa-fire text-lg"></i>
                    <span class="tracking-wider text-xs uppercase hidden sm:inline">Streak:</span>
                    <span id="streak-value" class="text-lg font-bold">0</span>

                    <div class="border-l border-[var(--sub-color)] pl-2 flex items-baseline">
                        <span
                            class="tracking-wider text-[10px] uppercase text-[var(--sub-color)] hidden sm:inline">Best:</span>
                        <span id="best-streak-value" class="text-xs font-bold text-[var(--text-color)]">0</span>
                    </div>

                    <div
                        class="absolute top-10 right-0 w-max bg-[var(--sub-alt-color)] text-[var(--text-color)] text-xs py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-lg border border-theme">
                        100% Accuracy Required. Resets on first typo.
                    </div>
                </div>

                <button id="settings-modal-trigger"
                    class="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] transition-colors shadow-sm">
                    <i class="fa-solid fa-gear"></i>
                </button>

                <button id="auth-modal-trigger"
                    class="flex items-center gap-2 bg-[var(--sub-alt-color)] hover:brightness-110 text-[var(--text-color)] px-3 py-1.5 rounded-lg text-xs font-semibold transition-all shadow-sm">
                    <i class="fa-solid fa-user-astronaut text-[var(--main-color)] transition-colors"></i>
                    <span id="profile-name-display">Loading...</span>
                </button>
            </div>
        </header>

        <div id="config-bar" class="config-bar-container w-full relative z-40">
            <div class="config-group">
                <span class="config-item active" data-mode="time"><i class="fa-solid fa-clock mr-1"></i> time</span>
                <span class="config-item" data-mode="words"><i class="fa-solid fa-font mr-1"></i> words</span>
                <!-- 1. Add the new Song mode button -->
                <span class="config-item" data-mode="song"><i class="fa-solid fa-music mr-1"></i> song</span>
            </div>

            <div class="config-group" id="config-lengths">
                <span class="config-item" data-val="15">15</span>
                <span class="config-item active" data-val="30">30</span>
                <span class="config-item" data-val="60">60</span>
                <span class="config-item" data-val="120">120</span>
            </div>

            <!-- 2. Add the Song Selection Dropdown (Hidden by default) -->
            <div class="config-group hide relative" id="config-songs">
                <!-- Custom Trigger Button -->
                <button id="song-dropdown-btn"
                    class="flex items-center gap-2 text-[var(--sub-color)] hover:text-[var(--text-color)] transition-colors outline-none font-mono text-xs pr-2">
                    <span id="selected-song-name">Select Song</span>
                    <i class="fa-solid fa-chevron-down text-[10px]"></i>
                </button>

                <!-- Custom Hidden Menu -->
                <div id="song-dropdown-list"
                    class="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-max min-w-[160px] bg-[var(--sub-alt-color)] border border-theme rounded-xl shadow-xl opacity-0 pointer-events-none transition-all z-50 flex flex-col overflow-hidden max-h-48 overflow-y-auto">
                    <!-- Options injected via JS -->
                </div>
                <!-- Your existing add song button -->
                <button id="add-song-modal-trigger"
                    class="text-[var(--sub-color)] hover:text-[var(--main-color)] transition-colors ml-2"
                    title="Add a new song">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        </div>

        <main class="flex-grow flex flex-col relative w-full pt-2">

            <div id="view-test" class="w-full flex flex-col">
                <div class="flex justify-center text-[var(--sub-color)] mb-4 text-xs transition-opacity duration-300"
                    id="language-indicator">
                    <span class="cursor-pointer hover:text-[var(--text-color)] transition-colors"><i
                            class="fa-solid fa-globe mr-1.5"></i>english</span>
                </div>

                <div id="live-stats"
                    class="text-[1.5rem] text-[var(--main-color)] font-medium mb-2 h-8 transition-opacity duration-300 text-left transition-colors">
                    30
                </div>

                <div id="typing-test-container" class="relative w-full">
                    <div id="focus-overlay" class="hidden">
                        <div
                            class="text-[var(--text-color)] text-sm md:text-base flex items-center gap-2 bg-[var(--sub-alt-color)] px-6 py-3 rounded-xl shadow-lg border border-theme">
                            <i class="fa-solid fa-arrow-pointer text-[var(--main-color)] transition-colors"></i> Click
                            here or press any key to focus
                        </div>
                    </div>

                    <div id="typing-test" tabindex="0" class="outline-none">
                        <div id="caret"></div>
                        <div id="words-container"></div>
                    </div>
                </div>

                <div id="restart-btn-container"
                    class="mt-8 flex flex-col items-center justify-center w-full transition-opacity duration-300">
                    <button id="restart-btn"
                        class="text-[var(--sub-color)] hover:text-[var(--text-color)] transition-colors py-3 px-5 rounded-lg outline-none focus:text-[var(--text-color)]">
                        <i class="fa-solid fa-rotate-right text-xl"></i>
                    </button>
                    <span class="text-xs text-[var(--sub-color)] mt-1 font-mono">Press Tab to quick restart</span>
                </div>

                <div id="results-screen" class="hide w-full flex flex-col pt-2">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-[var(--sub-alt-color)] p-6 rounded-2xl border border-theme shadow-lg">
                        <div class="flex flex-col gap-6 justify-center">
                            <div class="stat-group">
                                <span class="stat-title">wpm</span>
                                <span class="stat-val" id="result-wpm">00</span>
                            </div>
                            <div class="stat-group">
                                <span class="stat-title">acc</span>
                                <span class="stat-val" id="result-acc">100%</span>
                            </div>
                        </div>

                        <div class="flex flex-col gap-3 justify-center text-[var(--text-color)] text-sm">
                            <div class="flex justify-between w-full border-b border-theme pb-2">
                                <span class="text-[var(--sub-color)]">test type</span>
                                <span id="result-type" class="font-semibold">time 30</span>
                            </div>
                            <div class="flex justify-between w-full border-b border-theme pb-2">
                                <span class="text-[var(--sub-color)]">characters</span>
                                <span id="result-chars" class="font-mono">0/0/0/0</span>
                            </div>
                            <div class="flex justify-between w-full border-b border-theme pb-2">
                                <span class="text-[var(--sub-color)]">time</span>
                                <span id="result-time" class="font-semibold">30s</span>
                            </div>
                            <div class="flex justify-between w-full pt-1">
                                <span class="text-[var(--main-color)] font-bold transition-colors"><i
                                        class="fa-solid fa-fire mr-1"></i> streak</span>
                                <span id="result-streak"
                                    class="text-[var(--main-color)] font-bold transition-colors">0</span>
                            </div>
                            <div class="flex justify-between w-full">
                                <span class="text-[var(--sub-color)] text-xs"><i class="fa-solid fa-trophy mr-1"></i>
                                    best streak</span>
                                <span id="result-best-streak"
                                    class="text-[var(--text-color)] text-xs font-bold">0</span>
                            </div>
                        </div>
                    </div>

                    <div class="flex justify-center">
                        <button id="next-test-btn"
                            class="nav-button bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:bg-[var(--main-color)] hover:text-black font-bold text-lg px-8 py-3 rounded-xl transition-all flex items-center gap-2 border border-theme">
                            <span>Next Test</span> <i class="fa-solid fa-arrow-right text-sm"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div id="view-leaderboard" class="hide w-full flex flex-col">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                    <div>
                        <h2 class="text-2xl font-bold text-[var(--text-color)] flex items-center gap-2">
                            <i class="fa-solid fa-trophy text-[var(--main-color)] transition-colors"></i> Squad
                            Leaderboard
                        </h2>
                        <p class="text-[var(--sub-color)] text-xs mt-1" id="lb-category-title">Top Streaks for Time 30
                        </p>
                    </div>
                    <div id="lb-status"
                        class="text-xs text-[var(--sub-color)] font-mono bg-[var(--sub-alt-color)] px-3 py-1.5 rounded-lg border border-theme">
                        Live Sync
                    </div>
                </div>

                <div
                    class="flex flex-wrap items-center justify-between gap-3 mb-6 bg-[var(--sub-alt-color)] p-2 rounded-xl border border-theme text-xs">
                    <div class="flex items-center gap-1 bg-[var(--bg-color)] p-1 rounded-lg" id="lb-mode-tabs">
                        <button
                            class="lb-mode-btn active px-3 py-1 rounded-md transition-all font-semibold text-[var(--main-color)] bg-[var(--sub-alt-color)]"
                            data-mode="time">time</button>
                        <button
                            class="lb-mode-btn px-3 py-1 rounded-md transition-all font-semibold text-[var(--sub-color)] hover:text-[var(--text-color)]"
                            data-mode="words">words</button>
                    </div>
                    <div class="flex items-center gap-1.5 overflow-x-auto py-0.5" id="lb-length-tabs"></div>
                </div>

                <div class="bg-[var(--sub-alt-color)] rounded-2xl border border-theme overflow-hidden shadow-xl">
                    <div
                        class="grid grid-cols-12 gap-2 px-6 py-3 bg-[var(--bg-color)] opacity-90 text-[var(--sub-color)] text-xs font-bold uppercase tracking-wider border-b border-theme">
                        <div class="col-span-1 text-center">#</div>
                        <div class="col-span-5 md:col-span-6">User</div>
                        <div class="col-span-3 md:col-span-3 text-right">Best Streak</div>
                        <div class="col-span-3 md:col-span-2 text-right">Best WPM</div>
                    </div>

                    <div id="leaderboard-list"
                        class="divide-y divide-[var(--border-color)] max-h-[450px] overflow-y-auto">
                        <div class="p-8 text-center text-[var(--sub-color)] text-sm">
                            <i class="fa-solid fa-circle-notch fa-spin mr-2"></i> Loading scores...
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>

    <div id="auth-modal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-[var(--bg-color)] border border-theme w-full max-w-md rounded-2xl p-6 shadow-2xl relative transform scale-95 transition-transform duration-300"
            id="auth-modal-card">

            <button id="close-auth-modal"
                class="absolute top-4 right-4 text-[var(--sub-color)] hover:text-[var(--text-color)] text-lg w-8 h-8 rounded-lg flex items-center justify-center transition-colors hidden">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <div class="text-center mb-6">
                <div
                    class="w-14 h-14 rounded-full bg-[var(--sub-alt-color)] text-[var(--main-color)] mx-auto flex items-center justify-center text-2xl mb-3 border border-theme transition-colors">
                    <i class="fa-solid fa-user-ninja"></i>
                </div>
                <h2 class="text-xl font-bold text-[var(--text-color)]">Squad Auth</h2>
                <p class="text-[var(--sub-color)] text-xs mt-1">An account is required to play and save scores.</p>
            </div>

            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-3" id="auth-forms-container">

                    <div id="auth-inputs-section" class="flex flex-col gap-3">
                        <div class="flex bg-[var(--sub-alt-color)] p-1 rounded-lg border border-theme mb-2">
                            <button id="tab-login"
                                class="flex-1 py-1.5 text-sm font-bold rounded-md bg-[var(--bg-color)] text-[var(--main-color)] shadow-sm transition-all">Login</button>
                            <button id="tab-signup"
                                class="flex-1 py-1.5 text-sm font-bold rounded-md text-[var(--sub-color)] hover:text-[var(--text-color)] transition-all">Sign
                                Up</button>
                        </div>

                        <div id="login-name-group">
                            <label id="login-label"
                                class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1.5">Login
                                Name</label>
                            <input type="text" id="username-input"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[var(--main-color)] font-mono text-sm transition-all border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="e.g. typemaster99" maxlength="15" autocomplete="off">
                        </div>

                        <div id="display-name-group" class="hide">
                            <label
                                class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1.5">Display
                                Username</label>
                            <input type="text" id="display-username-input"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[var(--main-color)] font-mono text-sm transition-all border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="e.g. TypeMaster" maxlength="15" autocomplete="off">
                        </div>

                        <div>
                            <label
                                class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1.5">Password</label>
                            <input type="password" id="password-input"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2.5 rounded-lg outline-none focus:ring-2 focus:ring-[var(--main-color)] text-sm transition-all border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="••••••••">
                        </div>

                        <div id="signup-warning"
                            class="hide mt-1 p-3 bg-amber-900/10 border border-amber-900/30 rounded-lg">
                            <p class="text-amber-500 text-[10px] leading-relaxed font-mono">
                                <i class="fa-solid fa-triangle-exclamation mr-1"></i>
                                <strong>WARNING:</strong> Since we don't ask for a real email address, <strong>password
                                    recovery is impossible!</strong> Write your password down. If you lose it, your
                                account and stats are gone forever.
                            </p>
                        </div>

                        <div class="mt-2" id="auth-action-buttons">
                            <button id="login-btn"
                                class="w-full bg-[var(--sub-alt-color)] hover:brightness-110 text-[var(--text-color)] font-bold py-2.5 rounded-lg transition-all text-sm border border-theme flex justify-center items-center shadow-sm">Login
                                to Squad</button>
                            <button id="signup-btn"
                                class="w-full bg-[var(--main-color)] text-black font-bold py-2.5 rounded-lg hover:opacity-90 transition-all text-sm shadow-md flex justify-center items-center hide">Create
                                Account</button>
                        </div>

                        <div class="text-center mt-2" id="forgot-password-container">
                            <button id="forgot-password-btn"
                                class="text-[var(--sub-color)] hover:text-[var(--text-color)] text-xs transition-colors underline decoration-[var(--border-color)] underline-offset-4">Forgot
                                Password?</button>
                            <div id="forgot-password-msg"
                                class="hide mt-3 p-3 bg-red-900/10 border border-red-900/30 rounded-lg text-left">
                                <p class="text-[var(--text-color)] text-[11px] leading-relaxed">
                                    <i class="fa-solid fa-circle-info text-red-400 mr-1"></i> Because you sign up with
                                    just a Username instead of a real email address, <strong>we cannot email you a
                                        password reset link.</strong><br><br>
                                    Please ask the Squad Admin to delete your old account so you can recreate it.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div id="logged-in-section" class="flex flex-col gap-2.5 hidden">
                        <button id="logout-btn"
                            class="w-full bg-[var(--sub-alt-color)] hover:brightness-110 text-[var(--text-color)] font-bold py-2.5 rounded-lg transition-all text-sm flex justify-center items-center gap-2 border border-theme">
                            <i class="fa-solid fa-right-from-bracket"></i> Sign Out
                        </button>
                        <button id="toggle-delete-btn"
                            class="w-full bg-red-900/20 hover:bg-red-900/40 text-red-500 hover:text-red-400 border border-red-900/40 font-medium py-2 rounded-lg transition-all text-xs flex justify-center items-center gap-2">
                            <i class="fa-solid fa-trash-can"></i> Delete Account
                        </button>

                        <div id="delete-confirm-box"
                            class="hide flex flex-col gap-2.5 p-3 mt-1 bg-red-900/10 border border-red-900/30 rounded-xl">
                            <p class="text-xs text-red-500 font-medium leading-relaxed">
                                <i class="fa-solid fa-triangle-exclamation mr-1"></i> Warning: This will permanently
                                delete your account and all saved scores from the leaderboard.
                            </p>
                            <div>
                                <label
                                    class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1">Confirm
                                    Password</label>
                                <input type="password" id="delete-password-input"
                                    class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-red-500 text-xs border border-theme"
                                    placeholder="Enter password to confirm">
                            </div>
                            <div class="flex gap-2 mt-1">
                                <button id="cancel-delete-btn"
                                    class="w-1/2 bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] py-1.5 rounded-lg text-xs font-semibold border border-theme">Cancel</button>
                                <button id="confirm-delete-btn"
                                    class="w-1/2 bg-red-600 hover:bg-red-500 text-white font-bold py-1.5 rounded-lg text-xs transition-all flex justify-center items-center shadow-md">Confirm
                                    Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="auth-error"
                    class="text-[var(--error-color)] text-xs text-center hide font-medium mt-1 bg-red-900/20 py-2 rounded-lg border border-red-900/30">
                </div>
            </div>
        </div>
    </div>

    <div id="settings-modal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-[var(--bg-color)] border border-theme w-full max-w-md rounded-2xl p-6 shadow-2xl relative transform scale-95 transition-transform duration-300 max-h-[90vh] overflow-y-auto"
            id="settings-modal-card">
            <button id="close-settings-modal"
                class="absolute top-4 right-4 text-[var(--sub-color)] hover:text-[var(--text-color)] text-lg w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h2 class="text-xl font-bold text-[var(--text-color)] mb-6 flex items-center gap-2">
                <i class="fa-solid fa-gear text-[var(--main-color)] transition-colors"></i> Settings
            </h2>

            <div class="flex flex-col gap-6">
                <div>
                    <h3 class="text-xs text-[var(--sub-color)] uppercase font-bold tracking-wider mb-3">Appearance</h3>
                    <div class="flex flex-col gap-3">
                        <div class="flex gap-2">
                            <button
                                class="theme-btn active bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2 rounded-lg text-sm font-semibold flex-1 border border-theme"
                                data-theme="dark">Dark Mode</button>
                            <button
                                class="theme-btn bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2 rounded-lg text-sm font-semibold flex-1 border border-theme"
                                data-theme="light">Light Mode</button>
                        </div>
                        <div
                            class="flex gap-3 justify-center bg-[var(--sub-alt-color)] p-3 rounded-lg border border-theme">
                            <button class="color-btn bg-[#13C9C9] active" data-color="#13C9C9"></button>
                            <button class="color-btn bg-[#ca4754]" data-color="#ca4754"></button>
                            <button class="color-btn bg-[#4ade80]" data-color="#4ade80"></button>
                            <button class="color-btn bg-[#a855f7]" data-color="#a855f7"></button>
                            <button class="color-btn bg-[#eab308]" data-color="#eab308"></button>
                        </div>
                    </div>
                </div>

                <div>
                    <h3 class="text-xs text-[var(--sub-color)] uppercase font-bold tracking-wider mb-3">Font Size (Zoom)
                    </h3>
                    <div class="flex gap-2 bg-[var(--sub-alt-color)] p-2 rounded-lg border border-theme">
                        <button
                            class="font-btn flex-1 py-1.5 rounded-md text-sm text-[var(--sub-color)] bg-[var(--bg-color)] hover:text-[var(--text-color)]"
                            data-size="2">2 (Small)</button>
                        <button
                            class="font-btn flex-1 py-1.5 rounded-md text-sm text-[var(--sub-color)] bg-[var(--bg-color)] hover:text-[var(--text-color)] active"
                            data-size="3">3 (Normal)</button>
                        <button
                            class="font-btn flex-1 py-1.5 rounded-md text-sm text-[var(--sub-color)] bg-[var(--bg-color)] hover:text-[var(--text-color)]"
                            data-size="4">4 (Large)</button>
                    </div>
                </div>

                <div id="settings-account-section" class="hide flex flex-col gap-6 border-t border-theme pt-4">
                    <!-- Update Change Username section to include password confirmation -->
                    <div>
                        <h3 class="text-xs text-[var(--sub-color)] uppercase font-bold tracking-wider mb-2">Change
                            Username</h3>
                        <div class="flex flex-col gap-2">
                            <input type="password" id="settings-username-password"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[var(--main-color)] text-sm border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="Confirm Current Password">
                            <input type="text" id="settings-new-username"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[var(--main-color)] text-sm border border-theme placeholder:text-[var(--sub-color)] font-mono"
                                placeholder="New Username" maxlength="15">
                            <button id="btn-save-username"
                                class="w-full bg-[var(--sub-alt-color)] hover:brightness-110 text-[var(--text-color)] font-bold px-4 py-2 rounded-lg transition-all text-sm border border-theme">Update
                                Username</button>
                        </div>
                    </div>

                    <div>
                        <h3 class="text-xs text-[var(--sub-color)] uppercase font-bold tracking-wider mb-2">Change
                            Password</h3>
                        <div class="flex flex-col gap-2">
                            <input type="password" id="settings-current-password"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[var(--main-color)] text-sm border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="Current Password">
                            <input type="password" id="settings-new-password"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[var(--main-color)] text-sm border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="New Password (min 6 chars)">
                            <input type="password" id="settings-confirm-password"
                                class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-3 py-2 rounded-lg outline-none focus:ring-1 focus:ring-[var(--main-color)] text-sm border border-theme placeholder:text-[var(--sub-color)]"
                                placeholder="Confirm New Password">
                            <button id="btn-save-password"
                                class="w-full bg-[var(--sub-alt-color)] hover:brightness-110 text-[var(--text-color)] font-bold px-4 py-2 rounded-lg transition-all text-sm border border-theme mt-1">Change
                                Password</button>
                        </div>
                    </div>
                </div>

                <div id="settings-message" class="text-xs text-center font-medium py-2 rounded-lg hide border"></div>
            </div>
        </div>
    </div>
    <!-- Add Song Modal -->
    <div id="add-song-modal"
        class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 opacity-0 pointer-events-none transition-opacity duration-300">
        <div class="bg-[var(--bg-color)] border border-theme w-full max-w-lg rounded-2xl p-6 shadow-2xl relative transform scale-95 transition-transform duration-300"
            id="add-song-modal-card">
            <button id="close-song-modal"
                class="absolute top-4 right-4 text-[var(--sub-color)] hover:text-[var(--text-color)] text-lg w-8 h-8 rounded-lg flex items-center justify-center transition-colors">
                <i class="fa-solid fa-xmark"></i>
            </button>

            <h2 id="modal-title-text" class="text-xl font-bold text-[var(--text-color)] mb-4 flex items-center gap-2">
                <i class="fa-solid fa-music text-[var(--main-color)]"></i> Add Custom Song
            </h2>

            <div class="flex flex-col gap-4">
                <div>
                    <label
                        class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1.5">Song
                        Title</label>
                    <input type="text" id="new-song-title"
                        class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[var(--main-color)] font-mono text-sm border border-theme"
                        placeholder="e.g. Bohemian Rhapsody">
                </div>
                <div>
                    <label
                        class="block text-[var(--sub-color)] text-[10px] uppercase font-bold tracking-wider mb-1.5">Lyrics</label>
                    <textarea id="new-song-lyrics"
                        class="w-full bg-[var(--sub-alt-color)] text-[var(--text-color)] px-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-[var(--main-color)] font-mono text-sm border border-theme h-32 resize-none"
                        placeholder="Paste lyrics here..."></textarea>
                    <label for="fontSelect"
                        class="block text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] mb-2">
                        FONT
                    </label>
                    <!-- Notice the border-transparent, focus:ring-0, and the new onchange event -->
                    <select id="fontSelect" onchange="this.style.fontFamily = this.value"
                        class="w-full p-3 rounded-lg bg-[var(--bg-color)] text-[var(--text-color)] text-sm border-2 border-transparent focus:border-transparent focus:ring-0 outline-none cursor-pointer">
                        <option value="'Roboto', sans-serif" style="font-family: 'Roboto', sans-serif">Roboto
                            (Sans-Serif)</option>
                        <option value="'Open Sans', sans-serif" style="font-family: 'Open Sans', sans-serif">Open Sans
                            (Sans-Serif)</option>
                        <option value="'Lato', sans-serif" style="font-family: 'Lato', sans-serif">Lato (Sans-Serif)
                        </option>
                        <option value="'Montserrat', sans-serif" style="font-family: 'Montserrat', sans-serif">
                            Montserrat (Sans-Serif)</option>
                        <option value="'Comfortaa', cursive" style="font-family: 'Comfortaa', cursive">Comfortaa
                            (Rounded)</option>
                        <option value="'Oswald', sans-serif" style="font-family: 'Oswald', sans-serif">Oswald
                            (Condensed)</option>
                        <option value="'Playfair Display', serif" style="font-family: 'Playfair Display', serif">
                            Playfair Display (Serif)</option>
                        <option value="'Merriweather', serif" style="font-family: 'Merriweather', serif">Merriweather
                            (Serif)</option>
                        <option value="'Lora', serif" style="font-family: 'Lora', serif">Lora (Serif)</option>
                        <option value="'Cormorant Garamond', serif" style="font-family: 'Cormorant Garamond', serif">
                            Cormorant Garamond (Serif)</option>
                        <option value="'Cinzel', serif" style="font-family: 'Cinzel', serif">Cinzel (Classic Serif)
                        </option>
                        <option value="'Abril Fatface', display" style="font-family: 'Abril Fatface', display">Abril
                            Fatface (Bold Display)</option>
                        <option value="'Great Vibes', cursive" style="font-family: 'Great Vibes', cursive">Great Vibes
                            (Calligraphy)</option>
                        <option value="'Parisienne', cursive" style="font-family: 'Parisienne', cursive">Parisienne
                            (Calligraphy)</option>
                        <option value="'Dancing Script', cursive" style="font-family: 'Dancing Script', cursive">Dancing
                            Script (Handwriting)</option>
                        <option value="'Alex Brush', cursive" style="font-family: 'Alex Brush', cursive">Alex Brush
                            (Calligraphy)</option>
                        <option value="'Caveat', cursive" style="font-family: 'Caveat', cursive">Caveat (Handwriting)
                        </option>
                        <option value="'Satisfy', cursive" style="font-family: 'Satisfy', cursive">Satisfy (Script)
                        </option>
                        <option value="'Pacifico', cursive" style="font-family: 'Pacifico', cursive">Pacifico (Fun
                            Script)</option>
                        <option value="'Lobster', cursive" style="font-family: 'Lobster', cursive">Lobster (Bold Script)
                        </option>
                        <option value="'Shadows Into Light', cursive"
                            style="font-family: 'Shadows Into Light', cursive">Shadows Into Light (Handwriting)</option>
                        <option value="'Permanent Marker', cursive" style="font-family: 'Permanent Marker', cursive">
                            Permanent Marker (Marker)</option>
                        <option value="'Fira Code', monospace" style="font-family: 'Fira Code', monospace">Fira Code
                            (Monospace)</option>
                        <option value="'JetBrains Mono', monospace" style="font-family: 'JetBrains Mono', monospace">
                            JetBrains Mono (Monospace)</option>
                        <option value="'Space Mono', monospace" style="font-family: 'Space Mono', monospace">Space Mono
                            (Monospace)</option>
                        <option value="'Special Elite', monospace" style="font-family: 'Special Elite', monospace">
                            Special Elite (Distressed Typewriter)</option>
                        <option value="'Nothing You Could Do', cursive"
                            style="font-family: 'Nothing You Could Do', cursive">Nothing You Could Do (Scratchy
                            Handwriting)</option>
                        <option value="'Rock Salt', cursive" style="font-family: 'Rock Salt', cursive">Rock Salt (Gritty
                            Marker)</option>
                        <option value="'Cormorant Garamond', serif" style="font-family: 'Cormorant Garamond', serif">
                            Cormorant Garamond (Serif)</option>
                        <option value="'Oswald', sans-serif" style="font-family: 'Oswald', sans-serif">Oswald
                            (Condensed)</option>
                        <!-- Modern & Clean Sans-Serifs -->
                        <option value="'Poppins', sans-serif" style="font-family: 'Poppins', sans-serif">Poppins (Modern
                            Sans)</option>
                        <option value="'Inter', sans-serif" style="font-family: 'Inter', sans-serif">Inter (Clean UI
                            Sans)</option>
                        <option value="'Nunito', sans-serif" style="font-family: 'Nunito', sans-serif">Nunito (Rounded
                            Sans)</option>
                        <option value="'Raleway', sans-serif" style="font-family: 'Raleway', sans-serif">Raleway
                            (Elegant Sans)</option>

                        <!-- Bold & Impactful Display -->
                        <option value="'Bebas Neue', sans-serif" style="font-family: 'Bebas Neue', sans-serif">Bebas
                            Neue (Tall Headline)</option>
                        <option value="'Anton', sans-serif" style="font-family: 'Anton', sans-serif">Anton (Heavy
                            Impact)</option>
                        <option value="'Righteous', display" style="font-family: 'Righteous', display">Righteous (Retro
                            Pop)</option>
                        <option value="'Fredoka', sans-serif" style="font-family: 'Fredoka', sans-serif">Fredoka
                            (Friendly & Chunky)</option>

                        <!-- Handwriting & Quirky -->
                        <option value="'Indie Flower', cursive" style="font-family: 'Indie Flower', cursive">Indie
                            Flower (Casual Marker)</option>
                        <option value="'Amatic SC', cursive" style="font-family: 'Amatic SC', cursive">Amatic SC (Quirky
                            Hand)</option>

                        <!-- Classic Serif & Monospace -->
                        <option value="'PT Serif', serif" style="font-family: 'PT Serif', serif">PT Serif (Classic Book)
                        </option>
                        <option value="'Inconsolata', monospace" style="font-family: 'Inconsolata', monospace">
                            Inconsolata (Clean Monospace)</option>
                    </select>
                    <button id="save-song-btn"
                        class="w-full bg-[var(--main-color)] text-black font-bold py-2.5 rounded-lg hover:opacity-90 transition-all text-sm shadow-md mt-2">Save
                        Song</button>
                </div>
            </div>
        </div>

        <script type="module" src="Js/app.js"></script>

</body>

</html>
