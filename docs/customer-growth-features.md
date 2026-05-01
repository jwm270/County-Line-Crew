# Customer Growth Features

This document tracks future customer-facing features that help County Line Crew grow through reviews, referrals, satisfaction tracking, and repeat business.

## Customer Rating and Review

After a job is completed, the customer should be able to leave feedback.

Review fields:

- Job ID
- Customer ID
- Employee ID, when assigned
- Overall rating, 1 to 5 stars
- Quality of work rating
- Timeliness rating
- Communication rating
- Professionalism rating
- Written review
- Would hire again: yes or no
- Permission to use review publicly: yes or no
- Created date

Admin uses:

- View customer satisfaction by job
- Track employee performance
- Spot problems early
- Collect public testimonials
- Decide which employees should get repeat work

## Satisfaction Follow-up

After completion, the customer should receive a simple satisfaction check.

Question:

- Was everything completed to your satisfaction?

Options:

- Yes, everything looks good
- No, I need someone to follow up

If the customer selects no, the app should create an admin follow-up item before asking for a public review.

## Referral Share Link

Each customer should eventually have a shareable referral link.

Example:

```text
https://countylinecrew.com/book?ref=customer123
```

Referral tracking fields:

- Referring customer ID
- New customer ID
- Booking ID
- Job ID
- Referral date
- Referral reward status

Possible rewards:

- Dollar credit toward next job
- Free add-on service
- Priority scheduling
- Seasonal discount

## Favorite / Preferred Employee

Customers should eventually be able to request a specific employee.

Possible customer options:

- No preference
- Prefer previous employee
- Request a specific employee by name

Admin should still control final assignment based on availability, service type, and scheduling.

## Recurring Service

Customers should be able to request recurring work.

Options:

- One-time job
- Weekly
- Every two weeks
- Monthly
- Seasonal
- Custom schedule

This is especially important for mowing and routine property care.

## Before and After Photos

Photos help with proof of work, quality control, and marketing.

Photo types:

- Customer uploaded request photos
- Employee before photos
- Employee after photos
- Admin proof photos

Permission fields:

- Customer allows internal use
- Customer allows marketing use
- Customer does not allow public use

## Customer Job History

Later, customers may have a private portal where they can view:

- Past jobs
- Upcoming jobs
- Invoices
- Payment status
- Referral credits
- Reviews submitted
- Preferred employee

This requires real accounts and a backend database before it should be treated as secure.
