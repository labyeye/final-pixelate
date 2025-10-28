# Reviews System Setup Instructions

## Overview
The testimonials/reviews system has been successfully implemented with the following features:

### Website Features (index.html):
1. ✅ Testimonial carousel section after FAQ (displays 3 cards at a time)
2. ✅ 5-star rating component in footer
3. ✅ Review submission modal with all required fields
4. ✅ Auto-rotating carousel (every 5 seconds)
5. ✅ Pause on hover functionality
6. ✅ Responsive design for all screen sizes

### Dashboard Features:
1. ✅ Reviews management page at `/dashboard/src/app/(crm)/reviews`
2. ✅ View all reviews (approved and pending)
3. ✅ Approve/Reject reviews
4. ✅ Edit review details (name, email, brand, service, rating, message)
5. ✅ Delete reviews
6. ✅ Filter by approval status

### API Endpoints Created:
- `GET /api/reviews` - Fetch reviews (with optional `approved` and `limit` query params)
- `POST /api/reviews` - Submit new review (auto-set to `approved: false`)
- `GET /api/reviews/[id]` - Get single review
- `PATCH /api/reviews/[id]` - Update review
- `DELETE /api/reviews/[id]` - Delete review

## Important Configuration

### For Local Development:

1. **Update API URL in website/index.html** (Line ~2633):
   ```javascript
   const API_URL = 'http://localhost:3000/api/reviews';
   ```

2. **For Production**: Update to your actual dashboard URL:
   ```javascript
   const API_URL = 'https://your-dashboard-domain.com/api/reviews';
   ```

### CORS Configuration:
The API already has CORS headers enabled in:
- `/dashboard/src/app/api/reviews/route.ts`
- `/dashboard/src/app/api/reviews/[id]/route.ts`

These allow cross-origin requests from your website to the dashboard API.

## Database Schema

Reviews are stored in MongoDB with this structure:
```javascript
{
  _id: ObjectId,
  name: String,           // Customer name
  email: String,          // Customer email
  brand: String,          // Company/Brand name
  workDone: String,       // Service type (Video Editing, Web Development, etc.)
  rating: Number,         // 1-5 stars
  message: String,        // Testimonial text
  approved: Boolean,      // false by default, needs manual approval
  createdAt: Date,        // Auto-generated
  updatedAt: Date         // Auto-generated on update
}
```

## How It Works

### User Flow:
1. User clicks on the 5-star rating in the website footer
2. Modal opens with review form
3. User fills in: Name, Email, Brand, Service Type, Rating (1-5 stars), and Message
4. On submit, review is saved to database with `approved: false`
5. User sees success message: "Thank you for your review! It will be published after our team approves it."

### Admin Flow (Dashboard):
1. Admin logs into dashboard and navigates to Reviews page
2. Sees all reviews with status badges (Approved/Pending)
3. Can approve, reject, edit, or delete reviews
4. Only approved reviews appear on the website carousel

### Website Display:
1. Carousel automatically loads approved reviews from API
2. Shows 3 testimonial cards at a time
3. Auto-rotates every 5 seconds
4. Pauses rotation on hover
5. Users can manually navigate with prev/next buttons
6. Fully responsive on all devices

## Testing

### To Test the System:

1. **Start the dashboard**:
   ```bash
   cd dashboard
   npm run dev
   ```

2. **Open website** (serve the website folder or open index.html)

3. **Submit a test review**:
   - Click stars in footer
   - Fill out the form
   - Submit

4. **Check dashboard**:
   - Go to http://localhost:3000/dashboard/reviews
   - You should see your review with "Pending" status

5. **Approve the review**:
   - Click the three dots menu
   - Click "Approve"
   - Badge changes to "Approved"

6. **Refresh website**:
   - The approved review should now appear in the carousel
   - It will auto-rotate with other approved reviews

## Styling

All styles are in `website/styles.css` at the bottom:
- Testimonials section styles
- Carousel animations
- Modal styles
- Star rating styles
- Responsive breakpoints

## Security Features

- ✅ XSS prevention with HTML escaping
- ✅ Form validation (client & server side)
- ✅ CORS configured properly
- ✅ Rate limiting recommended (add if needed)
- ✅ Reviews require approval before public display

## Next Steps

1. Update the API_URL in website/index.html with your production URL
2. Test the complete flow in production
3. Consider adding email notifications when reviews are submitted
4. Add analytics tracking for review submissions
5. Consider adding review count/average rating display

## Troubleshooting

**Reviews not loading on website:**
- Check API_URL is correct
- Verify dashboard is running
- Check browser console for errors
- Ensure at least one review is approved

**CORS errors:**
- Verify CORS headers in API routes
- Check if dashboard URL matches origin

**Reviews not saving:**
- Check MongoDB connection
- Verify API endpoint is accessible
- Check browser network tab for errors
