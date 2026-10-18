# export-inquiry-contact Specification

## Purpose
Defines the international B2B export inquiry capability: the form, validation, delivery to Seinagro, and user feedback.

## Requirements

### Requirement: Inquiry form fields
The contact section SHALL provide a form capturing full name, company, country, business email, inquiry type (seeds, fertilizers, partnership/distribution, other), and message.

#### Scenario: Fields present
- **WHEN** the contact section renders
- **THEN** all six fields are shown with localized labels and inquiry-type options

### Requirement: Validation
The form SHALL validate fields client-side and server-side and show localized error messages.

#### Scenario: Invalid email
- **WHEN** a user submits a malformed email
- **THEN** submission is blocked and a localized error appears beside the field

#### Scenario: Server-side validation
- **WHEN** a request with missing or malformed fields reaches the server action
- **THEN** it is rejected and no email is sent

### Requirement: Delivery
A valid submission SHALL be emailed to the configured Seinagro inbox (`info@seinagro.com` via `CONTACT_TO`) with sender, company, country, inquiry type, and message, with the submitter set as reply-to. Sender and recipient MUST come from environment configuration, not hardcoded placeholders.

#### Scenario: Successful send
- **WHEN** a valid inquiry is submitted and the email provider succeeds
- **THEN** the action reports success and a localized success toast is shown

#### Scenario: Provider failure
- **WHEN** the email provider errors
- **THEN** the action reports failure and a localized failure toast is shown

### Requirement: Abuse resistance
The form SHALL include a spam-protection measure (honeypot field at minimum) and MUST NOT expose secrets to the client.

#### Scenario: Honeypot triggered
- **WHEN** the hidden field is filled
- **THEN** the submission is silently discarded

### Requirement: Official company contact details
The section and footer SHALL present Seinagro's verified company headquarters and contact channels:
- Country & City: Arab Republic of Egypt, Nubaria City (جمهورية مصر العربية – مدينة النوبارية)
- Phone: `+20 11 2222 8970`
- Email: `info@seinagro.com`

#### Scenario: Verified contact information
- **WHEN** the contact section renders in any locale (`ar`, `en`, `fr`)
- **THEN** the Nubaria City address, phone number, and official email are displayed with localized labels
