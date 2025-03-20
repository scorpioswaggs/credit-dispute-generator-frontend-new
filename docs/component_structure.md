# CrediSure Frontend Component Structure

## Layout Components

### `App.js`
- Main application component
- Handles routing
- Manages authentication state
- Applies theme

### `Layout/MainLayout.js`
- Contains the main layout structure
- Header, footer, and navigation components
- Responsive container for content

### `Layout/Header.js`
- Application header with logo
- Navigation links
- User account menu
- Authentication buttons

### `Layout/Footer.js`
- Copyright information
- Links to terms, privacy policy
- Affiliate links

### `Layout/Sidebar.js`
- Navigation menu for authenticated users
- Links to dashboard, letters, account

## Authentication Components

### `Auth/Login.js`
- Login form
- Email/password inputs
- Form validation
- Error handling

### `Auth/Register.js`
- Registration form
- User information inputs
- Form validation
- Error handling

### `Auth/ForgotPassword.js`
- Password recovery form
- Email input
- Success/error messages

### `Auth/Profile.js`
- User profile management
- Update personal information
- Change password

## Dashboard Components

### `Dashboard/Dashboard.js`
- Overview of user activity
- Recent letters
- Subscription status
- Quick actions

### `Dashboard/LetterStats.js`
- Statistics on created letters
- Charts and metrics
- Status breakdown

## Dispute Letter Components

### `Letters/LetterList.js`
- List of user's dispute letters
- Filtering and sorting options
- Status indicators
- Action buttons

### `Letters/LetterForm.js`
- Multi-step form for creating/editing letters
- Personal information inputs
- Creditor information inputs
- Dispute details selection
- Letter format selection

### `Letters/PersonalInfoStep.js`
- Form step for personal information
- Name, address, contact inputs
- Form validation

### `Letters/CreditorInfoStep.js`
- Form step for creditor information
- Creditor name, address, account number
- Form validation

### `Letters/DisputeDetailsStep.js`
- Form step for dispute details
- Category and subcategory selection
- Reason input
- Additional details

### `Letters/FormatSelectionStep.js`
- Form step for letter format selection
- Metro 2 vs. Legal format options
- Format descriptions and examples

### `Letters/LetterPreview.js`
- Preview of generated letter
- Formatted display
- Edit button
- Download as PDF option

### `Letters/LetterDetail.js`
- Detailed view of a single letter
- All letter information
- Status updates
- Action buttons

## Subscription Components

### `Subscription/Plans.js`
- Display of available subscription plans
- Feature comparison
- Pricing information
- Subscribe buttons

### `Subscription/Checkout.js`
- Payment form
- Plan selection confirmation
- Payment method inputs
- Order summary

### `Subscription/SubscriptionStatus.js`
- Current subscription details
- Expiration date
- Renewal information
- Cancel subscription option

## Affiliate Components

### `Affiliate/AffiliateLinks.js`
- Display of affiliate service links
- Service descriptions
- Click tracking

## Shared Components

### `Shared/FormFields.js`
- Reusable form input components
- Text inputs, selects, checkboxes
- Validation handling

### `Shared/AlertMessage.js`
- Success/error message component
- Dismissible alerts

### `Shared/LoadingSpinner.js`
- Loading indicator
- Used during async operations

### `Shared/Modal.js`
- Reusable modal dialog
- Customizable content
- Action buttons

### `Shared/PrivateRoute.js`
- Route component for authenticated pages
- Redirects to login if not authenticated

## Letter Generation Components

### `LetterGeneration/TemplateSelector.js`
- Selection of letter templates
- Preview of template options
- Premium template indicators

### `LetterGeneration/LetterBuilder.js`
- Dynamic letter content generation
- Combines user inputs with templates
- Handles legal citations and formatting

### `LetterGeneration/PdfGenerator.js`
- Converts letter content to PDF
- Handles formatting and styling
- Download functionality
