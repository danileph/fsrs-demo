
const enum ProgressColors {
    Good = '#84cc16',
    Bad = '#fb923c'
}

export const getProgressColor = (retrievability: number) => {
    if (retrievability >= 0.9) {
        return ProgressColors.Good;
    } else {
        return ProgressColors.Bad;
    }
}