# 🖼 Restaurant Reservation System — Image Setup Guide

## 📁 Folder Structure

```
public/images/
├── restaurants/          # Restaurant images (220x180px recommended)
│   ├── r1.jpg           # Brisket & Bowls
│   ├── r2.jpg           # Spice Route
│   ├── r3.jpg           # Sushi Station
│   ├── r4.jpg           # Lahori Darbar
│   ├── r5.jpg           # Casa Milano
│   └── r6.jpg           # The Rooftop Grill
├── heroes/              # Hero section background images
│   ├── hero-1.jpg       # Main hero background
│   └── food-bg.jpg      # Food category background
└── IMAGES_SETUP.md     # This file
```

## 🍽 Restaurant Images

Each restaurant needs an image file. Use high-quality food photography:

### Naming Convention
- **r1.jpg** - Brisket & Bowls (American BBQ)
- **r2.jpg** - Spice Route (Pakistani Cuisine)
- **r3.jpg** - Sushi Station (Japanese Cuisine)
- **r4.jpg** - Lahori Darbar (Traditional Pakistani)
- **r5.jpg** - Casa Milano (Italian)
- **r6.jpg** - The Rooftop Grill (Continental)

### Image Specifications
- **Format:** JPG/PNG
- **Recommended Size:** 220x180px (aspect ratio ~1.2:1)
- **Optimization:** Compress to ~30-50KB per image
- **Quality:** Use high-quality food photography for best results

### Free Image Sources
1. **Unsplash** (https://unsplash.com)
   - Search: "restaurant food photography", "burger", "sushi", etc.
   
2. **Pexels** (https://pexels.com)
   - Professional food photography collection
   
3. **Pixabay** (https://pixabay.com)
   - Restaurant and food images

4. **Styled Food Photography:**
   - Professional food photography gives better UX
   - Ensure consistent lighting and angles

## 🏞 Hero Section Images

### Background Images
- **hero-1.jpg** - Main landing page hero background
- Recommended size: 1920x1080px or larger
- Use blurred/dimmed effect in CSS for text readability

### Image Recommendations
- Professional restaurant interior or food photography
- Dark images work well for the blue gradient overlay
- Ensure good contrast with white text

## 🎨 Current Setup (Using Emojis)

Currently, the system uses emojis as placeholders:
- 🍔 = Brisket & Bowls
- 🍛 = Spice Route
- 🍱 = Sushi Station
- 🥘 = Lahori Darbar
- 🍝 = Casa Milano
- 🌆 = The Rooftop Grill

Replace these with actual images by:
1. Adding images to `public/images/restaurants/`
2. Updating RestaurantCard.tsx if using actual image tags
3. Update CSS to display images instead of emojis

## 📝 Quick Setup Steps

1. **Download/Create Images**
   - Find suitable food photography
   - Resize to 220x180px
   - Save as r1.jpg, r2.jpg, etc.

2. **Add to Project**
   ```
   cp your-images/* public/images/restaurants/
   ```

3. **Update Component** (if using Next.js Image)
   ```tsx
   import Image from "next/image";
   
   <Image
     src={`/images/restaurants/${restaurantId}.jpg`}
     alt={restaurantName}
     width={220}
     height={180}
   />
   ```

4. **Test**
   - Run `npm run dev`
   - Images should appear in restaurant cards

## 🚀 Performance Tips

1. **Image Optimization**
   - Use WebP format for better compression
   - Compress images using TinyPNG or ImageOptim
   - Target 30-50KB per image

2. **Lazy Loading**
   - Next.js automatically lazy-loads images
   - Images load only when visible on screen

3. **CDN Integration**
   - Consider Cloudinary for image serving
   - Automatic optimization and resizing

## 🎯 Design Recommendations

- **Consistency:** Use similar photography style and lighting
- **Resolution:** Ensure crisp, clear images
- **Colors:** Match brand colors (Blue #003580, Yellow #febb02)
- **Branding:** Add restaurant logo overlay if possible

---

*Last updated: May 2026*
