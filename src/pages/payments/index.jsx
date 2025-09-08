import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './payments.css'
import { PaymentsSchema } from './schema';
import { CARD_EXPIRATION_DATE_FORMAT, PAYMENT_STATUSES, TRANSACTION_STATUSES, CARD_CVV_LENGTH, CARD_NUMBER_LENGTH } from '../../constants';
import { createPayment, completePayment } from '../../api';
import { formatDateToCardExpirationDate } from '../../utils';

function Payments() {
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    price: '',
    currency: '',
    cardNumber: '',
    cardHolderName: '',
    cardExpirationDate: '',
    cardCvv: ''
  };

  const onSubmit = async (values) => {
    try {
      setDisabled(true);
      const expirationDate = formatDateToCardExpirationDate(values.cardExpirationDate);
      const createPaymentPayload = {
        client: {
          email: 'test@test.com',
        },
        purchase: {
          currency: values.currency,
          products: [{
            price: values.price,
            name: 'Test Product',
          }
          ]
        },
      };

      const { directPostUrl } = await createPayment(createPaymentPayload);
      const completePaymentPayload = {
        directPostUrl,
        cardNumber: values.cardNumber,
        cardHolderName: values.cardHolderName,
        expires: expirationDate,
        cvc: values.cardCvv,
      };

      const { status, URL, PaReq, MD, callbackUrl } = await completePayment(completePaymentPayload);

      switch (status) {
        case PAYMENT_STATUSES.executed:
          navigate(`/payments/completed?status=${TRANSACTION_STATUSES.success}`);
          break;

        case PAYMENT_STATUSES.threeDSRequired:
          navigate("/payments/3ds",
            {
              state: { URL, PaReq, MD, callbackUrl },
            });
          break;

        default:
          navigate(`/payments/completed?status=${TRANSACTION_STATUSES.failure}`);
          break;
      }
    } catch {
      navigate(`/payments/completed?status=${TRANSACTION_STATUSES.failure}`);
    } finally {
      setDisabled(false);
    }
  };

  const changeCardNumber = (e, setFieldValue) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').slice(0, CARD_NUMBER_LENGTH);
    setFieldValue('cardNumber', formattedValue);
  };

  const changeCardCvv = (e, setFieldValue) => {
    const value = e.target.value;
    const formattedValue = value.replace(/\D/g, '').slice(0, CARD_CVV_LENGTH);
    setFieldValue('cardCvv', formattedValue);
  };

  return (
    <Formik className='payment-form' initialValues={initialValues} onSubmit={onSubmit} validationSchema={PaymentsSchema}>
      {({ setFieldValue }) => (
        <Form className='payment-form'>
          <h1>Payment Form</h1>
          <label htmlFor='price'>Price</label>
          <Field type='number' name='price' id='price' autoFocus placeholder='price' disabled={disabled} />
          <ErrorMessage component='span' className='payment-validation-error' name='price' />
          <label htmlFor='currency'>Currency</label>
          <Field as="select" name="currency" id="currency" disabled={disabled}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
          </Field>
          <ErrorMessage component='span' className='payment-validation-error' name='currency' />
          <label htmlFor='cardNumber'>Card Number</label>
          <Field type='string' onChange={e => changeCardNumber(e, setFieldValue)} name='cardNumber' id='cardNumber' placeholder='Card Number' disabled={disabled} />
          <ErrorMessage component='span' className='payment-validation-error' name='cardNumber' />
          <label htmlFor='cardHolderName'>Card Holder Name</label>
          <Field type='text' name='cardHolderName' id='cardHolderName' placeholder='Card Holder Name' disabled={disabled} />
          <ErrorMessage component='span' className='payment-validation-error' name='cardHolderName' />
          <label htmlFor="cardExpirationDate">Card Expiration Date</label>
          <Field name="cardExpirationDate" id="cardExpirationDate">
            {({ field, form }) => (
              <DatePicker
                disabled={disabled}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date) => {
                  form.setFieldValue('cardExpirationDate', date);
                }}
                dateFormat={CARD_EXPIRATION_DATE_FORMAT}
                placeholderText={CARD_EXPIRATION_DATE_FORMAT}
                showMonthYearPicker
                minDate={new Date()}
                maxDate={new Date(new Date().getFullYear() + 5, 11, 31)}
              />
            )}
          </Field>
          <ErrorMessage component='span' className='payment-validation-error' name='cardExpirationDate' />
          <label htmlFor='cardCvv'>Card CVV</label>
          <Field type='password' name='cardCvv' autoComplete='off' onChange={e => changeCardCvv(e, setFieldValue)} id='cardCvv' placeholder='Card CVV' disabled={disabled} />
          <ErrorMessage component='span' className='payment-validation-error' name='cardCvv' />
          <button className='payment-form-submit' type='submit' disabled={disabled}>Pay</button>
        </Form>
      )
      }
    </Formik >
  );
}

export default Payments;
