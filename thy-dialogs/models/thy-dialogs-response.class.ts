export const RESPONSE_CODES = [{
    code: 13,
    value: 'valid'
}, {
    code: 12,
    value: 'cancel'
}, {
    code: 11,
    value: 'yes'
}, {
    code: 10,
    value: 'no'
}];

/**
 * Response in the dialogs callback
 */
export interface IDialogsCallbackResponse {
    status: string;
    state: boolean;
    data?: any;
}
