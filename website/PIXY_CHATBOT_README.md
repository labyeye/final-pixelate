# Pixy Chatbot - Website Consultant Widget

## Overview
Pixy is an AI-powered website consultant chatbot that helps convert visitors into qualified leads by understanding their requirements and providing personalized website package recommendations with tentative pricing.

## Features
- 🤖 **Conversational Interface**: Natural, friendly conversation flow
- 💬 **Smart Questioning**: Intelligent follow-up questions based on user responses
- 💰 **Pricing Calculator**: Automatic tentative price estimation
- 📊 **Lead Capture**: Seamless lead collection and CRM integration
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🎨 **Beautiful UI**: Modern, gradient-based design with smooth animations
- ♿ **Accessible**: ARIA labels and keyboard navigation support

## Files Structure
```
website/
├── pixy-chatbot.css           # Chatbot styles
├── js/
│   └── pixy-chatbot.js        # Chatbot logic and conversation flow
└── pixy-chatbot-snippet.html  # Integration snippet

dashboard/src/app/api/
└── pixy-lead/
    └── route.ts               # Backend API endpoint for lead capture
```

## Installation

### 1. Frontend Integration

Add the following to your HTML pages:

**Before closing `</head>` tag:**
```html
<link href="pixy-chatbot.css" rel="stylesheet" type="text/css" />
```

**Before closing `</body>` tag:**
```html
<script src="js/pixy-chatbot.js"></script>
```

### 2. Backend Setup

The backend API endpoint is already configured at:
- **Endpoint**: `https://backend.pixelatenest.com/api/pixy-lead`
- **Method**: POST
- **Authentication**: Public (no auth required)

## How It Works

### Conversation Flow

1. **Greeting**: Pixy introduces itself
2. **Project Type Identification**: Determines type of website needed
3. **Website Type**: Static vs Dynamic clarification
4. **Page Count**: Asks about number of pages
5. **Domain Status**: Checks if domain is owned
6. **Hosting**: Asks about hosting requirements
7. **CMS**: Content management system needs
8. **Add-ons**: Optional features (SEO, maintenance, etc.)
9. **Timeline**: Project urgency
10. **Summary**: Shows project summary with estimated pricing
11. **Lead Capture**: Collects contact information

### Session State Management

The chatbot maintains the following session data:
- `project_type`: information/business/ecommerce/portfolio/webapp
- `website_type`: static/dynamic
- `number_of_pages`: 1-3, 4-6, 7-10
- `domain_status`: yes/no
- `hosting_status`: yes/no
- `cms_required`: yes/no
- `addons_selected`: array of selected add-ons
- `timeline`: urgent/normal/flexible
- `chatHistory`: complete conversation log

### Pricing Logic

**Base Pricing:**
- Static Website: ₹15,000 - ₹30,000
- Dynamic Website: ₹30,000 - ₹60,000
- Portfolio: ₹20,000 - ₹40,000
- E-commerce: ₹60,000 - ₹1,50,000
- Web Application: Custom quote

**Add-on Pricing:**
- Domain & Hosting: +₹3,000 - ₹6,000
- SEO: +₹5,000 - ₹15,000
- Maintenance: +₹2,000/month
- Content Writing: +₹3,000 - ₹10,000
- Custom UI/UX: +₹10,000+

## API Documentation

### POST /api/pixy-lead

Create or update a lead from Pixy chatbot.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91-9876543210",
  "project_type": "ecommerce",
  "website_type": "dynamic",
  "number_of_pages": "7-10",
  "addons": ["seo", "maintenance"],
  "timeline": "urgent",
  "conversation_history": [
    {"role": "bot", "message": "Hi, I'm Pixy..."},
    {"role": "user", "message": "E-commerce website"}
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lead created successfully",
  "leadId": "507f1f77bcf86cd799439011"
}
```

**Lead Data Stored:**
- All conversation details
- Calculated priority (high for urgent projects)
- Source marked as 'pixy-chatbot'
- Status set to 'new'
- Timestamp with creation/update dates

## Customization

### Changing Colors

Edit `pixy-chatbot.css` and modify the gradient colors:

```css
.pixy-chat-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Modifying Conversation Flow

Edit `pixy-chatbot.js` and update the `processUserInput()` function to add/modify conversation steps.

### Adjusting Pricing

Update the pricing ranges in `pixy-chatbot.js`:

```javascript
const pricingRanges = {
  static: { min: 15000, max: 30000 },
  dynamic: { min: 30000, max: 60000 },
  // ... modify as needed
};
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility

- ARIA labels for all interactive elements
- Keyboard navigation support
- Screen reader compatible
- Reduced motion support for animations

## Performance

- Minimal JavaScript footprint (~15KB minified)
- CSS animations use GPU acceleration
- Lazy initialization (loads on user interaction)
- Optimized for mobile networks

## Testing Checklist

- [ ] Chat button appears in bottom right corner
- [ ] Modal opens/closes smoothly
- [ ] Quick reply buttons work
- [ ] Text input and send button functional
- [ ] Conversation flow completes successfully
- [ ] Pricing calculation is accurate
- [ ] Lead submission works
- [ ] API endpoint responds correctly
- [ ] Mobile responsive design
- [ ] Notification badge displays

## Troubleshooting

### Chatbot doesn't appear
- Check if CSS file is loaded
- Verify JS file path is correct
- Check browser console for errors

### API calls failing
- Verify API endpoint URL is correct
- Check CORS settings
- Ensure backend server is running

### Styling issues
- Clear browser cache
- Check for CSS conflicts with existing styles
- Verify CSS file is loaded after other stylesheets

## Future Enhancements

- Multi-language support
- Chat history persistence
- AI-powered responses using GPT
- Integration with calendar for scheduling
- File upload support for project references
- Voice input capability
- Analytics dashboard for chat metrics

## Support

For issues or questions:
- Email: support@pixelatenest.com
- GitHub Issues: [Repository Link]

## License

Proprietary - Pixelate Nest © 2025
