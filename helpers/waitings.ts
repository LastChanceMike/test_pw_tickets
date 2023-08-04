export async function waitFor(
    conditionFn: () => Promise<boolean>,
    params?: { timeToWait?: number; frequency?: number; errMessage?: string }
): Promise<void> {
    let timeToWait = params?.timeToWait || 60_000;
    const frequency = params?.frequency || 2_000;
    const errMessage = params?.errMessage || `To much time to wait for custom condition. "${timeToWait}" is not enough`;
    while (
        !await conditionFn()
        && timeToWait >= 0
        ) {
        timeToWait -= frequency;
        await delay(frequency);
    }
    if (timeToWait < 0) {
        throw new Error(errMessage);
    }
}

export function delay(timeout: number): Promise<boolean> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
}