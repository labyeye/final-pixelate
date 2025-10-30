# Sample JSON Structure for City Services

## Complete City Entry Example (Delhi)

```json
{
  "city": "Delhi",
  "state": "Delhi",
  "title": "Web Development Agency in Delhi | Video Editing & App Development Services | Pixelate Nest",
  "metaDescription": "Leading web development agency in Delhi offering professional video editing, app development, and software solutions. Pixelate Nest - Your trusted digital partner in Delhi.",
  "heading": "Web Development Agency in Delhi - Pixelate Nest",
  "content": "Searching for a reliable web development agency in Delhi? Pixelate Nest is your premier website agency in Delhi, specializing in custom web development, professional video editing, app development, and software solutions. As a top-rated web development agency in Delhi, we serve businesses across the capital city with cutting-edge digital services. Our Delhi-based team of expert developers and creative professionals delivers comprehensive solutions including responsive website design, e-commerce development, mobile app creation, corporate video editing, and custom software development. Whether you need a business website, promotional videos, or enterprise software, our web development agency in Delhi has the expertise to bring your vision to life. We proudly serve clients in Connaught Place, Nehru Place, Karol Bagh, Lajpat Nagar, Saket, and throughout Delhi NCR. As a full-service website agency in Delhi, we understand the unique needs of Delhi's competitive market. Our video editing services include corporate videos, promotional content, social media videos, and YouTube content creation. Our app development services cover iOS, Android, and cross-platform solutions. Partner with the best web development agency in Delhi for innovative digital solutions, transparent pricing, and exceptional results. Contact Pixelate Nest Delhi today for a free consultation and discover why businesses across Delhi trust us as their preferred website agency for all digital needs.",
  "icon": "assets/cities/delhi.jpg",
  "landmark": "India Gate",
  "population": "32 million",
  "services": [
    "Web Development",
    "Video Editing",
    "App Development",
    "Software Development",
    "Digital Marketing"
  ],
  "latitude": "28.6139",
  "longitude": "77.2090"
}
```

---

## Field Descriptions

### Required Fields:

**1. city** (string)
- The name of the city
- Used in URLs and dynamic content
- Example: "Delhi", "Mumbai", "Bangalore"

**2. state** (string)
- The name of the state/union territory
- Used for state-level SEO keywords
- Example: "Delhi", "Maharashtra", "Karnataka"

**3. title** (string)
- Page title (50-60 characters recommended)
- Format: "Web Development Agency in [STATE] | [Services] | Pixelate Nest"
- Must include primary keyword

**4. metaDescription** (string)
- Meta description (150-160 characters)
- Should include primary and secondary keywords
- Format: "Top web development agency in [STATE] - [CITY]. Professional website agency for..."

**5. heading** (string)
- Main H1 heading on the page
- Format: "Web Development Agency in [STATE] - [CITY]"
- Short and keyword-focused

**6. content** (string)
- Main body content (300+ words)
- Must include:
  * Primary keyword: "web development agency in [STATE]" (3-5 times)
  * Secondary keyword: "website agency in [STATE]" (2-3 times)
  * All 4 services mentioned: Web Development, Video Editing, App Development, Software Development
  * Local areas served (5-7 localities)
  * Industries served (3-5 sectors)
  * Call to action at the end

**7. icon** (string)
- Path to city icon image
- Format: "assets/cities/[cityname].jpg"
- Must be .jpg format (not .svg)

**8. landmark** (string)
- Famous landmark of the city
- Used in meta information
- Example: "India Gate", "Gateway of India", "Charminar"

**9. population** (string)
- City population with unit
- Format: "X million" or "X.X million"
- Example: "32 million", "2.5 million"

**10. services** (array of strings)
- List of services offered in the city
- Must include first 4: Web Development, Video Editing, App Development, Software Development
- Can add 1-2 city-specific services as 5th/6th items
- Example: ["Web Development", "Video Editing", "App Development", "Software Development", "Digital Marketing"]

**11. latitude** (string)
- Geographic latitude coordinate
- Used for Google Maps and schema markup
- Format: "XX.XXXX"

**12. longitude** (string)
- Geographic longitude coordinate
- Used for Google Maps and schema markup
- Format: "XX.XXXX"

---

## Content Writing Guidelines

### Title Format:
```
Web Development Agency in [STATE] | [Service1] & [Service2] [CITY] | Pixelate Nest
```

**Examples:**
- "Web Development Agency in Delhi | Video Editing & App Development Services | Pixelate Nest"
- "Web Development Agency in Maharashtra | Website & App Development Mumbai | Pixelate Nest"
- "Web Development Agency in Karnataka | Website & Video Editing Bangalore | Pixelate Nest"

### Meta Description Format:
```
Top/Leading web development agency in [STATE] - [CITY]. Professional/Expert website agency for video editing, app development & software solutions [across/in] [STATE/region].
```

### Heading Format:
```
Web Development Agency in [STATE] - [CITY]
```

### Content Structure (300+ words):

**Paragraph 1 (Opening):**
- Welcome/Discover + Company name + City
- Primary keyword: "web development agency in [STATE]"
- List main services
- Mention state coverage

**Paragraph 2 (Services Details):**
- Expand on 4 core services
- Secondary keyword: "website agency in [STATE]"
- Specific service examples

**Paragraph 3 (Local Coverage):**
- List 5-7 local areas served
- Repeat primary keyword
- Mention local understanding

**Paragraph 4 (Industries):**
- State's main industries (3-5)
- Industry-specific solutions
- Cultural considerations (if any)

**Paragraph 5 (Service Breakdown):**
- Video editing: Types of videos, language support
- App development: Platforms covered
- Software development: Enterprise solutions

**Paragraph 6 (Closing CTA):**
- Call to action: "Choose the best web development agency in [STATE]"
- Value proposition
- "Contact Pixelate Nest [CITY] today!"

---

## Keyword Density Guidelines

### Primary Keywords:
- "web development agency in [STATE]" - 4-6 times
- "website agency in [STATE]" - 3-4 times

### Secondary Keywords:
- "web development" - 6-8 times
- "video editing" - 3-4 times
- "app development" - 3-4 times
- "software development" - 2-3 times

### Local Keywords:
- [CITY] - 8-12 times
- [STATE] - 12-15 times
- Local area names - 5-7 mentions

---

## Services Array Guidelines

### First 4 (Required):
1. "Web Development" - Always first
2. "Video Editing" - Always second
3. "App Development" - Always third
4. "Software Development" - Always fourth

### Optional 5th/6th Services (City-Specific):

**Metro Cities:**
- "Digital Marketing"
- "SEO Services"
- "UI/UX Design"
- "E-commerce Solutions"

**Industrial Cities:**
- "Industrial Solutions"
- "Manufacturing Software"
- "Logistics Solutions"

**Tourism Cities:**
- "Tourism Marketing"
- "Hospitality Solutions"

**IT Hubs:**
- "Cloud Solutions"
- "SaaS Development"
- "Enterprise Solutions"

**Government/Educational:**
- "E-learning Solutions"
- "Government Solutions"
- "Educational Technology"

**Healthcare/Tier-2:**
- "Healthcare Tech"
- "Smart City Solutions"

---

## State Coverage Examples

### Single City States:
- Delhi → "across the capital city", "throughout Delhi NCR"
- Chandigarh → "across Sector 17, Sector 35, Panchkula, Mohali"

### Large States (Multiple Major Cities):
- Maharashtra → "across Mumbai, Pune, Nagpur, Nashik"
- Gujarat → "across Ahmedabad, Surat, Vadodara, Rajkot"
- Uttar Pradesh → "across Lucknow, Noida, Kanpur, Varanasi, Agra"
- Karnataka → "across Bangalore, Mysore, Mangalore, Hubli"
- Tamil Nadu → "across Chennai, Coimbatore, Madurai, Salem"

### Regional States:
- Kerala → "throughout God's Own Country", "across Thiruvananthapuram, Kochi, Kozhikode"
- Rajasthan → "across Jaipur, Jodhpur, Udaipur, Kota"
- Assam/Northeast → "throughout Assam and Northeast India"

---

## Industry Mentions by State

### Financial/Commercial:
- Maharashtra: finance, manufacturing, entertainment, IT
- Gujarat: textile, diamond, pharmaceutical, chemicals
- Karnataka: IT, startups, biotech, aerospace

### Government/Education:
- Delhi: government, education, corporate, retail
- Uttar Pradesh: government, education, manufacturing
- Bihar: education, government, agriculture, healthcare

### Tourism/Hospitality:
- Rajasthan: tourism, hospitality, handicrafts, heritage
- Kerala: tourism, healthcare, IT, spices
- Goa: tourism, hospitality, IT

### Industrial:
- Tamil Nadu: automotive, textile, manufacturing, IT
- Andhra Pradesh: maritime, steel, manufacturing, IT
- Maharashtra: logistics, manufacturing, mining

### IT/Technology:
- Karnataka: IT, startups, software, innovation
- Telangana: IT, pharma, biotech, e-commerce
- Kerala: IT, healthcare, education, tourism

---

## Local Area Mentions

### Include 5-7 Major Localities:

**Examples:**

**Delhi:**
- Connaught Place, Nehru Place, Karol Bagh, Lajpat Nagar, Saket

**Mumbai:**
- Andheri, Bandra, Worli, Lower Parel, BKC, Dadar, Nariman Point

**Bangalore:**
- Koramangala, Indiranagar, Whitefield, Electronic City, HSR Layout, MG Road

**Chennai:**
- T. Nagar, Anna Nagar, Velachery, OMR, Guindy, Adyar, Porur

**Hyderabad:**
- HITEC City, Gachibowli, Madhapur, Banjara Hills, Jubilee Hills, Secunderabad

---

## Language Support Mentions

### Bilingual Cities:
- Delhi: Hindi/English
- Mumbai: Marathi/Hindi/English
- Bangalore: Kannada/English
- Chennai: Tamil/English
- Kolkata: Bengali/English
- Ahmedabad: Gujarati/English
- Jaipur: Hindi/Rajasthani
- Lucknow: Hindi/Urdu
- Patna: Hindi/Bhojpuri
- Guwahati: Assamese/Hindi/English
- Bhubaneswar: Odia/English
- Thiruvananthapuram: Malayalam/English
- Kochi: Malayalam/English/Hindi
- Visakhapatnam: Telugu/English

---

## Complete JSON Template

```json
{
  "city": "[CITY_NAME]",
  "state": "[STATE_NAME]",
  "title": "Web Development Agency in [STATE] | Website & [Service] [CITY] | Pixelate Nest",
  "metaDescription": "Top web development agency in [STATE] - [CITY]. Professional website agency for video editing, app & software development across [STATE].",
  "heading": "Web Development Agency in [STATE] - [CITY]",
  "content": "[300+ words with keywords - see structure above]",
  "icon": "assets/cities/[cityname].jpg",
  "landmark": "[Famous Landmark]",
  "population": "[X.X million]",
  "services": [
    "Web Development",
    "Video Editing",
    "App Development",
    "Software Development",
    "[City-Specific Service]"
  ],
  "latitude": "[XX.XXXX]",
  "longitude": "[XX.XXXX]"
}
```

---

## Quality Checklist

Before adding a new city, verify:

- [ ] City name spelled correctly
- [ ] State name accurate
- [ ] Title includes primary keyword
- [ ] Meta description 150-160 characters
- [ ] Content 300+ words
- [ ] Primary keyword used 4-6 times
- [ ] All 4 core services mentioned
- [ ] 5-7 local areas listed
- [ ] 3-5 industries mentioned
- [ ] Icon path correct (.jpg format)
- [ ] Services array starts with core 4
- [ ] Latitude/longitude accurate
- [ ] No duplicate content from other cities
- [ ] Grammar and spelling checked
- [ ] Local context appropriate

---

**Last Updated:** October 30, 2025  
**Version:** 2.0
