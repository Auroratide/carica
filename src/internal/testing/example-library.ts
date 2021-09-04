const location = (...dirs: string[]) =>
    `example-library/${dirs.join('/')}.svg`

export const library = {
    eyebrows: {
        neutral: location('eyebrows', 'neutral'),
    },
    eyelashes: {
        neutral: location('eyelashes', 'neutral'),
    },
    eyes: {
        neutral: location('eyes', 'neutral'),
    },
    hair: {
        medium: location('hair', 'medium'),
    },
    mouths: {
        smile: location('mouths', 'smile'),
    },
}
