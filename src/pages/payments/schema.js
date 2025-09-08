import { object, string, number, mixed } from 'yup';
import { CARD_NUMBER_LENGTH, CARD_CVV_LENGTH } from '../../constants';

export const PaymentsSchema = object().shape({
  price: number()
    .max(1000000, '1000000 is the maximum amount')
    .required('Required field'),
  currency: mixed().oneOf(['EUR', 'USD']),
  cardNumber: string()
    .length(CARD_NUMBER_LENGTH, 'Card number must be 16 digits')
    .required('Required field'),
  cardHolderName: string()
    .max(100, 'Max. 100 characters')
    .required('Required field'),
  cardExpirationDate: string()
    .required('Required field'),
  cardCvv: string()
    .length(CARD_CVV_LENGTH, 'Card CVV must be 3 digits')
    .required('Required field'),
});
