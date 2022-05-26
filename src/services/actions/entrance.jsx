export const DIRECT_ENTER = 'DIRECT_ENTER';

export function setIfDirectEnter(status) {
    return {
        type: DIRECT_ENTER,
        status: status
    }
}
