# Payment and Tips Plan

This document tracks future payment-related features for County Line Crew, including deposits, tips, referral credits, and pay-it-forward funds.

## Payment Goals

The app should eventually support:

- Customer deposits
- Full job payments
- Invoice payments
- Tips
- Pay-it-forward contributions
- Referral credits
- Payment status tracking

Payments should be handled through a real payment processor such as Stripe.

## Job Payments

Each job should track:

- Job amount
- Deposit required
- Deposit paid
- Balance due
- Total paid
- Payment status
- Payment date
- Stripe payment ID, later

Suggested payment statuses:

- unpaid
- deposit_paid
- partial
- paid
- refunded
- canceled

## Deposits

Deposits can help prevent no-shows and wasted scheduling time.

Possible deposit models:

- Fixed deposit, such as $25 or $50
- Percentage deposit, such as 20 percent
- No deposit for trusted repeat customers
- Admin override for special cases

Customer-facing language should clearly state whether the deposit is non-refundable.

## Tips

Customers should have the option to add a tip.

Suggested tip options:

- No tip
- $5
- $10
- $20
- Custom amount

Tip tracking fields:

- Job ID
- Customer ID
- Employee ID, if assigned
- Tip amount
- Tip payment status
- Tip paid to employee: yes or no
- Payment processor ID, later

Tips should be tracked separately from normal job revenue.

## Pay It Forward

Customers may choose to contribute toward someone else's job or to a community help fund.

Possible pay-it-forward options:

- Help a senior citizen
- Help a disabled veteran
- Help a family in need
- General community fund
- Specific approved customer or job

Contribution options:

- $10
- $25
- $50
- $100
- Custom amount

Pay-it-forward tracking fields:

- Donor name
- Anonymous donation: yes or no
- Donor phone or email, optional
- Amount contributed
- Fund category
- Date contributed
- Amount applied to jobs
- Remaining fund balance

## Applying Pay-it-forward Funds

Admin should control where funds are applied.

Admin actions:

- View available community balance
- Select job to assist
- Apply partial or full assistance
- Record reason
- Mark whether customer was notified

## Referral Credits

Referral rewards may be issued as credits.

Fields:

- Customer ID
- Referral ID
- Credit amount
- Credit status
- Credit applied to job ID
- Created date
- Expiration date, optional

## Future Payment Flow

Suggested flow:

```text
Customer books job
Admin approves estimate
Customer pays deposit
Job is completed
Customer pays balance
Customer may add tip
Customer may leave review
Customer may share referral link
```

## Security Note

Real payments should not be handled only in browser storage. Payment processing requires a backend and secure Stripe integration.
