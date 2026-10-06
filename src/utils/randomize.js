/**
 * Fisher-Yates Shuffle to randomize array elements without mutating original
 */
export const shuffleArray = (array) => {
  if (!Array.isArray(array)) return [];
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

/**
 * Get N random items from an array
 */
export const getRandomItems = (array, n) => {
  const shuffled = shuffleArray(array);
  return shuffled.slice(0, Math.min(n, array.length));
};
