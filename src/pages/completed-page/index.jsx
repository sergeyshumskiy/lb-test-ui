import { useSearchParams } from 'react-router';
import { Link } from "react-router";
import { TRANSACTION_STATUSES } from '../../constants';

function CompletedPage() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  switch (status) {
    case TRANSACTION_STATUSES.success:
      return <Link to="/payments">Payment completed successfully, return to payments page</Link>;
    case TRANSACTION_STATUSES.failure:
      return <Link to="/payments">Payment failed, return to payments page</Link>;
    default:
      return <Link to="/payments">Payment status is unknown, return to payments page</Link>;
  }
}

export default CompletedPage;