# Data Model

This file describes the first simple data structure for County Line Crew.

## Customer

A customer is a person or organization that requests work.

Fields:

- id
- name
- phone
- email
- billing_address
- notes
- created_at

## Job

A job is a scheduled piece of work.

Fields:

- id
- customer_id
- service_type
- job_location
- scheduled_date
- scheduled_time
- description
- internal_notes
- amount_charged
- status
- paid_status
- created_at
- updated_at

## Invoice

An invoice represents the amount charged for a job.

Fields:

- id
- job_id
- customer_id
- invoice_number
- invoice_date
- due_date
- amount
- payment_status
- notes

## Service Type

A service type is the kind of work being requested.

Examples:

- Mowing
- Cleanup
- Handyman
- Hauling
- Property check
- Custom work

## Job Status Values

Suggested job status values:

- requested
- scheduled
- in_progress
- completed
- canceled

## Payment Status Values

Suggested payment status values:

- unpaid
- partial
- paid
