import dayjs from "dayjs";
import { CARD_EXPIRATION_DATE_FORMAT } from "../constants";

export function formatDateToCardExpirationDate(date) {
  return dayjs(date).format(CARD_EXPIRATION_DATE_FORMAT);
}
