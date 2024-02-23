function filterAnagrams(word: string, words: string[]): string[] {
    return words.filter(item => isAnagram(word, item));
}

function isAnagram(word1: string, word2: string): boolean {
    const sortedWord1 = word1.toLowerCase().split('').sort().join('');
    const sortedWord2 = word2.toLowerCase().split('').sort().join('');
    return sortedWord1 === sortedWord2;
}

export default filterAnagrams;