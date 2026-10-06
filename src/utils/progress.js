const STORAGE_KEY = 'io_learning_progress_v1';

const INITIAL_PROGRESS = {
  materials: {
    completed: [], // array of material topic IDs
    lastRead: null,
  },
  game: {
  completedCases: 0,
  score: 0,
  highScore: 0,
  },

  simulation: {
    completedCount: 0,
    testedTypes: [],
    isCompleted: false,
  },

  troubleshooter: {
    completedCases: 0,
    score: 0,
  },

  evaluation: {
    attempts: 0,
    lastScore: 0,
    highScore: 0,
    lastCategory: null,
  },
    audioMuted: false,
};

export const getProgress = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return INITIAL_PROGRESS;
    return { ...INITIAL_PROGRESS, ...JSON.parse(data) };
  } catch (error) {
    console.error('Failed to load progress from localStorage:', error);
    return INITIAL_PROGRESS;
  }
};

export const saveProgress = (newProgress) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
  } catch (error) {
    console.error('Failed to save progress to localStorage:', error);
  }
};

export const resetProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return INITIAL_PROGRESS;
  } catch (error) {
    console.error('Failed to reset progress:', error);
    return INITIAL_PROGRESS;
  }
};
