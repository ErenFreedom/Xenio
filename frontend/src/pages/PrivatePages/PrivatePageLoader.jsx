// src/pages/PrivatePages/PrivatePageLoader.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import AccountManagement from './AccountManagement';
import AuthenticationSecurity from './AuthenticationSecurity';
import TransactionsTransfer from './TransactionsTransfer';
import CardManagement from './CardManagement';
import LoanRepayment from './LoanRepayment';
import PaymentsRecurring from './PaymentsRecurring';
import FraudDisputeResolution from './FraudDisputeResolution';
import FeeManagement from './FeeManagement';
import SavingsTransactionLimits from './SavingsTransactionLimits';

function PrivatePageLoader() {
    const { pageName } = useParams();

    const pageComponents = {
        'account-management': <AccountManagement />,
        'authentication-security': <AuthenticationSecurity />,
        'transactions-transfer': <TransactionsTransfer />,
        'card-management': <CardManagement />,
        'loan-repayment': <LoanRepayment />,
        'payments-recurring': <PaymentsRecurring />,
        'fraud-dispute-resolution': <FraudDisputeResolution />,
        'fee-management': <FeeManagement />,
        'savings-transaction-limits': <SavingsTransactionLimits />
    };

    return (
        <div>
            {pageComponents[pageName] || <p>Page not found</p>}
        </div>
    );
}

export default PrivatePageLoader;
