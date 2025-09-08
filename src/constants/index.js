const CARD_EXPIRATION_DATE_FORMAT = 'MM/YY';
const CARD_NUMBER_LENGTH = 16;
const CARD_CVV_LENGTH = 3;
const PAYMENT_STATUSES = {
    executed: 'executed',
    threeDSRequired: '3DS_required',
}
const TRANSACTION_STATUSES = {
    success: 'success',
    failure: 'failure',
}
export { CARD_EXPIRATION_DATE_FORMAT, CARD_NUMBER_LENGTH, CARD_CVV_LENGTH, PAYMENT_STATUSES, TRANSACTION_STATUSES };
