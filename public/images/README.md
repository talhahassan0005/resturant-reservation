# Restaurant Images Guide

## 📸 Image Organization

This folder contains all image assets for the TableNow platform:

### Folder Structure
```
images/
├── restaurants/      # Restaurant listing images
├── heroes/          # Hero section backgrounds
├── cuisines/        # Cuisine category icons
└── icons/           # General UI icons
```

---

## 🏪 Restaurant Images

Each restaurant has an image file named by its ID from the database.

### Current Restaurants

| Restaurant ID | Restaurant Name | Image Name | Dimensions |
|---|---|---|---|
| r1 | Brisket & Bowls | r1.jpg | 400×300px |
| r2 | Spice Route | r2.jpg | 400×300px |
| r3 | Sushi Station | r3.jpg | 400×300px |
| r4 | Lahori Darbar | r4.jpg | 400×300px |
| r5 | Casa Milano | r5.jpg | 400×300px |
| r6 | The Rooftop Grill | r6.jpg | 400×300px |

### Specifications
- **Format**: JPG (lossy) or PNG (lossless)
- **Size**: 400×300px (perfect for cards)
- **Aspect Ratio**: 4:3
- **Quality**: 85% compression for JPG
- **File Size**: 30-50KB per image

### Recommended Images
- **Brisket & Bowls**: Burger/BBQ ribs in rustic setting
- **Spice Route**: Colorful Pakistani biryani or karahi
- **Sushi Station**: Fresh nigiri/rolls on traditional plate
- **Lahori Darbar**: Steaming nihari in traditional bowl
- **Casa Milano**: Elegant pasta or Margherita pizza
- **The Rooftop Grill**: Sunset city skyline with grilled meat

### How to Add Images

1. **Download Quality Images**:
   - Use Unsplash, Pexels, or Pixabay for free high-quality images
   - Or take professional photos if available

2. **Resize & Optimize**:
   ```bash
   # Using ImageMagick
   convert input.jpg -resize 400x300! -quality 85 r1.jpg
   
   # Or online: tinypng.com, pixlr.com
   ```

3. **Place in Folder**:
   - Save to `/public/images/restaurants/`
   - Name as: `r1.jpg`, `r2.jpg`, etc.

4. **Update Component**:
   - Component already references `/images/restaurants/{id}.jpg`
   - No code changes needed!

---

## 🌟 Hero Section Images

Background images for the hero section (optional for current glass design):

- **Size**: 1920×1080px minimum
- **Format**: JPG (optimized)
- **Quality**: 70% compression
- **Usage**: Background image layer

### Current Setup
Hero section uses gradient background - images are optional. To add:

```jsx
<section className="rrs-hero" style={{
  backgroundImage: "url('/images/heroes/main.jpg')",
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}}>
```

---

## 🍽️ Cuisine Icons (Future)

Folder for cuisine category images:

- **Size**: 100×100px
- **Format**: PNG with transparency
- **Usage**: Category badges, cuisine filters

### Recommended Icons
- 🍔 American
- 🍛 Pakistani
- 🍱 Japanese
- 🍝 Italian
- 🥖 Continental
- 🌮 Mexican
- etc.

---

## 🎯 UI Icons

General icons and assets:

- **Location pin**: 48×48px
- **Rating star**: 24×24px
- **Payment methods**: 100×60px
- **App logos**: Various sizes

---

## 🔗 Free Image Resources

### High-Quality Food Photos
- **Unsplash**: https://unsplash.com (Premium)
- **Pexels**: https://pexels.com (Free)
- **Pixabay**: https://pixabay.com (Free)
- **Foodiesfeed**: https://foodiesfeed.com (Free)

### Optimization Tools
- **TinyPNG**: https://tinypng.com (PNG/JPG)
- **ImageOptim**: Local app (Mac)
- **Squoosh**: https://squoosh.app (Web-based)
- **ImageMagick**: Command-line tool

---

## 📋 Image Optimization Checklist

- [ ] Images are 400×300px (restaurants)
- [ ] File size < 50KB per image
- [ ] Format is JPG (85% quality) or PNG
- [ ] Aspect ratio is correct
- [ ] Named correctly (r1.jpg, r2.jpg, etc.)
- [ ] Placed in correct folder
- [ ] No sensitive/branded content
- [ ] Properly licensed or free to use

---

## 🚀 Next.js Image Optimization

The RestaurantCard component can be updated to use Next.js `Image`:

```jsx
import Image from 'next/image'

<Image
  src={`/images/restaurants/${r.id}.jpg`}
  alt={r.name}
  width={400}
  height={300}
  priority={false}
/>
```

Benefits:
- Automatic format conversion (WebP)
- Responsive image sizes
- Lazy loading by default
- Blur-up placeholder support

---

## 📊 Image Performance

### Current Stats
- Total images: 6 (restaurants)
- Total size: ~240KB
- Load time impact: Minimal

### After Full Implementation
- Optimize with WebP format
- Implement lazy loading
- Add blur placeholders
- Cache strategy: 1 month

---

## 🎨 Design Tips

### Best Practices
1. **Consistency**: Similar lighting and composition
2. **Quality**: Professional photography or high-quality stock
3. **Relevant**: Food/ambiance that matches restaurant type
4. **Safe**: SFW, appealing to all audiences
5. **Rights**: Confirm usage rights before using

### Color Harmony
- Keep images with warm colors for food appeal
- Avoid overly filtered/edited look
- Maintain restaurant brand colors if available
- Consider contrast with overlay text

---

## 📝 Adding Images via Code

Once images are added, they're automatically used:

```typescript
// In RestaurantCard.tsx
const getImagePath = (id: string) => `/images/restaurants/${id}.jpg`

// In HTML
<div className="rrs-rc-thumb">
  <img src={getImagePath(r.id)} alt={r.name} />
</div>
```

---

## ✅ TODO

- [ ] Download 6 restaurant images
- [ ] Optimize images to 400×300px @ 85% quality
- [ ] Place in `/public/images/restaurants/`
- [ ] Test on website - should appear automatically
- [ ] Add hero background image (optional)
- [ ] Create cuisine icons folder
- [ ] Add payment method icons

---

## 📞 Support

For image sizing and optimization questions:
- Refer to DESIGN_SYSTEM.md for specifications
- Use Squoosh.app for quick online optimization
- Command-line alternative: ImageMagick, FFmpeg

---

**Last Updated**: May 29, 2026
**Images Ready**: All placeholders configured
**Next Step**: Add actual restaurant images
