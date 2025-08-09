const randomShould = (chance: number = 10): boolean => {
    return Math.random() < chance / 100;
}

export default randomShould;