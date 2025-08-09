export default (chance: number = 10): boolean => {
    return Math.random() < chance / 100;
}