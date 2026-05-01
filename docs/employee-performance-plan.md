# Employee Performance Plan

This document tracks future employee-related features for County Line Crew, including availability, assignments, customer reviews, tips, and performance quality scoring.

## Employee Availability

Employees should be able to submit when they are available to work.

Availability fields:

- Employee ID
- Employee name
- Available date
- Start time
- End time
- Service types willing to perform
- Work area or travel limits
- Notes
- Created date

Future improvements:

- Recurring availability
- Unavailable dates
- Time off requests
- Admin approval of availability

## Job Assignment

Admin should be able to assign employees to jobs.

Assignment fields:

- Job ID
- Employee ID
- Assigned by admin ID
- Assignment date
- Assignment status
- Employee accepted: yes or no
- Notes

Suggested assignment statuses:

- unassigned
- offered
- accepted
- declined
- assigned
- completed

## Customer Preferred Employee

Customers may eventually request a specific employee.

Important rule:

Customer preference should not guarantee assignment. Admin should make the final decision based on availability, service type, route efficiency, and business needs.

## Employee Reviews

Customer reviews should be tied to employees when possible.

Review metrics:

- Overall rating
- Quality of work
- Timeliness
- Communication
- Professionalism
- Would hire again
- Written customer feedback

## Employee Tips

Tips should be connected to the job and employee.

Tip fields:

- Job ID
- Employee ID
- Customer ID
- Tip amount
- Tip payment status
- Tip paid to employee: yes or no
- Date paid to employee

## Internal Quality Score

Admin may eventually need an internal employee quality score.

Possible score inputs:

- Average customer rating
- Number of completed jobs
- Repeat customer requests
- On-time percentage
- Customer complaints
- Follow-up issues
- Tips earned
- Admin notes

This score should be internal only and not shown to customers or employees unless intentionally designed later.

## Employee Portal

A future employee portal could include:

- Enter availability
- View assigned jobs
- Accept or decline job offers
- See job notes
- Upload before and after photos
- Mark job complete
- Submit internal notes

## Proof of Work

Employees may eventually upload proof of work.

Proof fields:

- Job ID
- Employee ID
- Before photos
- After photos
- Completion notes
- Completion time
- Customer present: yes or no

## Admin Controls

Admin should be able to:

- View all employee availability
- Assign employees to jobs
- Override customer employee preference
- View reviews by employee
- Track tips owed
- Track job completion performance
- Remove or deactivate employees

## Security Note

Employee features require real accounts before they should be used in production. Browser local storage is only acceptable for early prototype design.
