import React from 'react';
import { useParams } from 'react-router-dom';
import AccountOpening from './AccountOpening';
import LoansMortgages from './LoansMortgages';
import SavingsFixedDeposit from './SavingsFixedDeposit';
import InternationalTransfers from './InternationalTransfers';
import CustomerSupport from './CustomerSupport';
import ATMBranchLocator from './ATMBranchLocator';
import MobileBanking from './MobileBanking';

function PublicPageLoader() {
    const { pageName } = useParams();

    // Map of page names to components
    const pageComponents = {
        'account-opening': <AccountOpening />,
        'loans-mortgages': <LoansMortgages />,
        'savings-fixed-deposit': <SavingsFixedDeposit />,
        'international-transfers': <InternationalTransfers />,
        'customer-support': <CustomerSupport />,
        'atm-branch-locator': <ATMBranchLocator />,
        'mobile-banking': <MobileBanking />
    };

    return (
        <div>
            {/* Dynamically render the correct component based on the pageName */}
            {pageComponents[pageName] || <p>Page not found</p>}
        </div>
    );
}

export default PublicPageLoader;
