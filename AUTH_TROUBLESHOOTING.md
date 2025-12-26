# Authentication Troubleshooting Guide

## Fixed Issues (v1.1.0)

### 1. Email Formatting ✓
**Issue**: Login failing with "Invalid login credentials" even with correct email/password
**Root Cause**: Email case sensitivity and whitespace
**Fix Applied**:
- SignIn component now trims and lowercases email before sending
- SignUp component trims email before creating account
- AuthContext handles normalization in both signIn and signUp methods

### 2. Input Validation ✓
**Issue**: Form accepted invalid inputs before sending to Supabase
**Fix Applied**:
- Added email format validation (regex pattern)
- Added password minimum length check (6 characters)
- Displays validation errors before API call

### 3. Improved Error Messages ✓
**Issue**: Generic error messages didn't help users understand the problem
**Fix Applied**:
- Validation errors shown in amber alert before submission
- Server errors shown in rose/red alert after submission
- Clear, user-friendly messages

---

## Common Login Issues & Solutions

### "Invalid login credentials"
**Possible Causes**:
1. User account doesn't exist yet - need to signup first
2. Email address case mismatch (fixed by normalization)
3. Password is incorrect
4. Email has leading/trailing whitespace (fixed by trimming)
5. Spaces in password (intentional - preserve spaces in passwords)

**Solution**:
- Verify you created an account with this email (check signup flow)
- Double-check password spelling (passwords are case-sensitive)
- Ensure email is correct and has no typos
- No extra spaces before/after email

### "User already registered"
**What it means**: This account already exists

**Why it happens**:
- You already signed up with this email
- Email was registered in a previous session

**Solution**:
- Use "Sign In" instead of "Sign Up"
- If you forgot password, use "Forgot Password" link (coming soon)

### "Invalid email address"
**Possible Causes**:
1. Email format is invalid (must have @ and domain)
2. Email exceeds 255 characters

**Solution**:
- Valid formats: user@example.com, name.surname@company.co.uk
- Invalid formats: noatsign, @nodomain, user@.com

### "Password too weak"
**Possible Causes**:
- Password less than 8 characters
- Missing uppercase letter
- Missing number
- Missing lowercase letter

**Requirements**:
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)

**Examples**:
- ✓ Valid: Password123
- ✗ Invalid: password123 (no uppercase)
- ✗ Invalid: PASSWORD123 (no lowercase)
- ✗ Invalid: Password (no number)
- ✗ Invalid: Pass12 (too short)

### "Session expired"
**What it means**: You were logged in but lost connection

**Solution**:
- Sign in again (session will be restored)
- Check your internet connection
- Try refreshing the page

---

## Sign Up Flow Issues

### Can't Create Account
**Step 1**: Verify email format
- Must be a valid email (has @)
- Must have a domain (.com, .co.uk, etc)

**Step 2**: Check password strength
- At least 8 characters
- Must have uppercase, lowercase, and number
- You'll see requirements as you type

**Step 3**: Confirm passwords match
- Both password fields must be identical
- Case-sensitive (Password123 ≠ password123)

**Step 4**: Accept terms
- Check the checkbox to agree to terms

**Step 5**: Wait for confirmation
- Account creation takes 1-2 seconds
- Don't refresh or navigate away
- You'll be directed to dashboard on success

---

## Sign In Flow Issues

### Email Not Found in Database
**What to do**:
1. Check email spelling
2. Verify you signed up (not just tried to sign in)
3. Try a different account if you have multiple
4. Use exact same email from signup

### Password Incorrect
**What to do**:
1. Passwords are case-sensitive
2. Check Caps Lock is off
3. Verify no accidental spaces
4. Try password reset (coming soon)

---

## Technical Details

### What Happens on Signup
1. Client validates inputs locally
2. Email/password sent to Supabase Auth
3. Account created in auth.users table
4. Trigger creates entry in profiles table
5. User preferences created
6. Prayer streak initialized
7. User redirected to dashboard

### What Happens on Sign In
1. Client validates inputs locally
2. Email/password normalized (lowercase, trimmed)
3. Credentials sent to Supabase Auth
4. If valid: session token created
5. User profile loaded
6. User redirected to dashboard
7. Session maintained for 1 hour (auto-refresh)

### Session Management
- **Auto-refresh**: Token refreshes automatically before expiry
- **Persist**: Session saved in browser localStorage
- **Duration**: 1 hour default
- **Recovery**: Closes browser = new login required

---

## Error Messages Reference

### Client-Side Validation Errors
These appear before sending data to server (yellow alert):

| Error | Cause | Fix |
|-------|-------|-----|
| "Email is required" | Blank email field | Enter an email |
| "Please enter a valid email address" | Email format invalid | Use format: user@domain.com |
| "Password is required" | Blank password field | Enter a password |
| "Password must be at least 6 characters" | Password too short | For signup, min 8 required |
| "Name is required" | Blank name field | Enter your name |

### Server-Side Authentication Errors
These appear after form submission (red alert):

| Error | Cause | Fix |
|-------|-------|-----|
| "Invalid login credentials" | Wrong password or email doesn't exist | Check email/password or signup |
| "User already registered" | Email already has account | Use Sign In or reset password |
| "User creation failed" | Server error during signup | Try again or contact support |
| "Session error" | Lost connection to server | Refresh and try again |

---

## Browser Compatibility

Tested and working on:
- ✓ Chrome 90+
- ✓ Firefox 88+
- ✓ Safari 14+
- ✓ Edge 90+
- ✓ Mobile browsers (iOS Safari, Chrome Mobile)

### Troubleshooting Browser Issues
1. **Clear cache**: Ctrl+Shift+Delete (Windows) or Cmd+Shift+Delete (Mac)
2. **Clear cookies**: Settings → Cookies and site data → Clear all
3. **Try incognito/private**: Opens without cached data
4. **Try different browser**: Rules out browser-specific issues

---

## Network Issues

### "Request failed" or "Network error"
**Cause**: No internet connection or Supabase service down

**Solution**:
1. Check internet connection
2. Disable VPN if active
3. Try again in 30 seconds
4. Check Supabase status: https://status.supabase.com

### Slow Login
**Possible Causes**:
1. Slow internet connection
2. Supabase region far from your location
3. Browser too many extensions
4. Device low on memory

**Solution**:
1. Close other browser tabs
2. Disable browser extensions temporarily
3. Try different network (WiFi vs mobile data)
4. Restart device

---

## Recovery Options

### Forgot Password (Coming Soon)
Feature will be available in next update:
1. Click "Forgot Password" on Sign In page
2. Enter your email
3. Check email for reset link
4. Create new password
5. Sign in with new password

### Account Locked (Coming Soon)
If too many failed login attempts:
1. Wait 15 minutes
2. Try again
3. Or use password reset when available

---

## Debug Information

### Enable Debug Logging
To see detailed auth information:

1. Open browser Developer Tools (F12)
2. Go to Console tab
3. Look for "Auth:" messages
4. Screenshot relevant errors
5. Share with support team

### What to Include in Bug Report
- Email used
- Exact error message
- Steps taken
- Browser/OS info
- Screenshot of error
- Network tab showing request/response

---

## Getting Help

### Before Contacting Support
1. Clear browser cache and cookies
2. Try different browser or incognito mode
3. Check this guide for solution
4. Verify internet connection
5. Try again after 5 minutes

### Support Contact
- Email: support@theolyte.com
- Include: error message, email used, steps taken, screenshot

---

## Version Notes

**v1.1.0** (Current)
- Fixed email case sensitivity
- Added input validation before API calls
- Improved error messages
- Added validation error display

**v1.0.0**
- Initial authentication system
- Supabase integration
- Signup and signin flows
