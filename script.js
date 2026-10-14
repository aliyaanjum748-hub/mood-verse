const moods = {
    Happy: {
        emoji: "😊",
        color: "#f59e0b",
        background: "linear-gradient(135deg, #3d260b, #171027)",
        quote: [
            "Happiness looks beautiful on you!",
            "Collect moments, not worries.",
            "Let your smile change your world."
        ],
        activity: "Listen to your favourite song, dance, or share a smile with someone.",
        music: "happy feel good songs"
    },

    Sad: {
        emoji: "🌧️",
        color: "#60a5fa",
        background: "linear-gradient(135deg, #152d53, #100c24)",
        quote: [
            "It's okay not to be okay.",
            "Even the darkest night will end.",
            "Give yourself the kindness you give others."
        ],
        activity: "Write down your feelings, listen to gentle music, or talk to someone you trust.",
        music: "soft relaxing music"
    },

    Angry: {
        emoji: "🔥",
        color: "#f87171",
        background: "linear-gradient(135deg, #491818, #100c24)",
        quote: [
            "Pause. Breathe. Protect your peace.",
            "You can choose your response.",
            "Let calmness be your strength."
        ],
        activity: "Take a short walk, stretch gently, and give yourself a moment before reacting.",
        music: "calming instrumental music"
    },

    Calm: {
        emoji: "🍃",
        color: "#6ee7b7",
        background: "linear-gradient(135deg, #123c36, #100c24)",
        quote: [
            "Peace begins within you.",
            "Slow down and enjoy this moment.",
            "A calm mind brings a beautiful perspective."
        ],
        activity: "Try mindful breathing, sit outside, or enjoy five quiet minutes.",
        music: "peaceful nature instrumental music"
    },

    Excited: {
        emoji: "🤩",
        color: "#c084fc",
        background: "linear-gradient(135deg, #452060, #100c24)",
        quote: [
            "Your energy is contagious!",
            "Dream big and take the first step.",
            "Turn your excitement into something amazing."
        ],
        activity: "Start a creative project, plan an adventure, or learn something new.",
        music: "upbeat energetic music"
    },

    Anxious: {
        emoji: "🦋",
        color: "#a5b4fc",
        background: "linear-gradient(135deg, #29275b, #100c24)",
        quote: [
            "You only need to take one step at a time.",
            "You do not have to solve everything today.",
            "Come back to this moment. Breathe."
        ],
        activity: "Breathe slowly, name five things you can see, and focus on one small task.",
        music: "gentle relaxing stress relief music"
    },

    Loved: {
        emoji: "🥰",
        color: "#f9a8d4",
        background: "linear-gradient(135deg, #54203e, #100c24)",
        quote: [
            "Love makes ordinary moments extraordinary.",
            "You deserve kindness and connection.",
            "Small acts of love can mean everything."
        ],
        activity: "Send someone a kind message or write down three things you appreciate.",
        music: "romantic acoustic love songs"
    },

    Tired: {
        emoji: "🌙",
        color: "#94a3b8",
        background: "linear-gradient(135deg, #252b45, #100c24)",
        quote: [
            "Rest is productive too.",
            "You are allowed to slow down.",
            "Tomorrow is another opportunity."
        ],
        activity: "Drink some water, step away from screens, and allow yourself time to rest.",
        music: "peaceful sleep ambient music"
    }
};

let currentMood = "";
let quoteIndex = 0;

const resultEmoji = document.getElementById("resultEmoji");
const resultTitle = document.getElementById("resultTitle");
const resultQuote = document.getElementById("resultQuote");
const resultActivity = document.getElementById("resultActivity");
const musicLink = document.getElementById("musicLink");

function selectMood(mood) {
    const data = moods[mood];

    if (!data) return;

    currentMood = mood;
    quoteIndex = 0;

    document.body.style.background = data.background;

    document.documentElement.style.setProperty(
        "--accent",
        data.color
    );

    document.documentElement.style.setProperty(
        "--accent2",
        data.color
    );

    resultEmoji.textContent = data.emoji;
    resultTitle.textContent = "Your Mood: " + mood;
    resultQuote.textContent = '"' + data.quote[quoteIndex] + '"';
    resultActivity.textContent = data.activity;

    document.getElementById("journalMood").value = mood;

    document.querySelectorAll(".mood-card").forEach(card => {
        card.classList.remove("active");
    });

    const selectedCard = document.querySelector(
        ".mood-card." + mood.toLowerCase()
    );

    if (selectedCard) {
        selectedCard.classList.add("active");
    }

    musicLink.hidden = true;

    document.getElementById("discover").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function newQuote() {
    if (!currentMood) {
        alert("Please select a mood first!");
        return;
    }

    const quotes = moods[currentMood].quote;

    quoteIndex = (quoteIndex + 1) % quotes.length;

    resultQuote.textContent = '"' + quotes[quoteIndex] + '"';
}

function getMusic() {
    if (!currentMood) {
        alert("Please select a mood first!");
        return;
    }

    const search = moods[currentMood].music;

    musicLink.href =
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(search);

    musicLink.hidden = false;
    musicLink.textContent = "🎧 Open Your Music Playlist";

    musicLink.click();
}

function surpriseMe() {
    const moodNames = Object.keys(moods);

    const randomMood =
        moodNames[Math.floor(Math.random() * moodNames.length)];

    selectMood(randomMood);
}

const intensity = document.getElementById("intensity");
const intensityValue = document.getElementById("intensityValue");

intensity.addEventListener("input", function () {
    intensityValue.textContent = this.value;
});

function saveMood() {
    const mood = document.getElementById("journalMood").value;
    const note = document.getElementById("journalNote").value.trim();
    const level = Number(intensity.value);

    const message = document.getElementById("saveMessage");

    if (!mood) {
        message.textContent = "Please select your mood first.";
        return;
    }

    const entry = {
        mood: mood,
        note: note,
        intensity: level,
        date: new Date().toLocaleString()
    };

    try {
        const entries = JSON.parse(
            localStorage.getItem("moodverseJournal") || "[]"
        );

        entries.unshift(entry);

        localStorage.setItem(
            "moodverseJournal",
            JSON.stringify(entries.slice(0, 50))
        );

        message.textContent = "💜 Your mood has been saved successfully!";

        document.getElementById("journalNote").value = "";

        displayHistory();
    } catch (error) {
        message.textContent =
            "Unable to save your mood. Check your browser storage.";
    }
}

function displayHistory() {
    const historyList = document.getElementById("historyList");

    historyList.replaceChildren();

    let entries;

    try {
        entries = JSON.parse(
            localStorage.getItem("moodverseJournal") || "[]"
        );
    } catch (error) {
        historyList.textContent = "Unable to load your journal.";
        return;
    }

    if (entries.length === 0) {
        historyList.textContent = "No entries yet. Save your first mood!";
        return;
    }

    entries.forEach(entry => {
        const card = document.createElement("div");
        card.className = "history-entry";

        const title = document.createElement("strong");
        title.textContent =
            (moods[entry.mood]?.emoji || "💜") +
            " " + entry.mood +
            " — " + entry.intensity + "/10";

        const note = document.createElement("p");
        note.textContent = entry.note || "No note added.";

        const date = document.createElement("small");
        date.textContent = entry.date;

        card.append(title, note, date);
        historyList.appendChild(card);
    });
}

function clearHistory() {
    const confirmed = confirm(
        "Are you sure you want to delete all your mood journal entries?"
    );

    if (!confirmed) return;

    localStorage.removeItem("moodverseJournal");

    displayHistory();

    document.getElementById("saveMessage").textContent =
        "Your journal has been cleared.";
}

displayHistory();