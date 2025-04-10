export function buildClassName(...classNames: Array<string | undefined>): string {
    return classNames.join(' ');
}
