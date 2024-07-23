
const enum Colors {
    Good = '#84cc16',
    Bad = '#fb923c'
}

export const getRetrievabilityColor = (retrievability: number) => {
    if (retrievability >= 0.9) {
        return Colors.Good;
    } else {
        return Colors.Bad;
    }
}

export const getRemainingDaysToRememberColor = (remainingDaysToRemember: number) => {
    if (remainingDaysToRemember >= 1) {
        return Colors.Good;
    } else {
        return Colors.Bad;
    }
}