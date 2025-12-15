# Faculty Profile Images

This directory contains profile photos and other images used in faculty profile pages.

## Image Specifications

### Profile Photos

**Recommended Specifications:**
- **Dimensions**: 400×400px minimum (square aspect ratio)
- **Format**: JPG (for photos) or PNG (if transparency needed)
- **File Size**: < 200KB (optimize for web)
- **Quality**: 85% compression for JPG
- **Resolution**: @2x for retina displays (800×800px)

**Naming Convention:**
```
dr-firstname-lastname.jpg
```

**Examples:**
- `dr-rg-brajesh.jpg`
- `dr-john-doe.jpg`
- `dr-mary-smith.jpg`

### Image Optimization

**Before uploading, optimize images using:**

**Online Tools:**
- [TinyPNG](https://tinypng.com/) - PNG/JPG compression
- [Squoosh](https://squoosh.app/) - Advanced image optimization
- [Compressor.io](https://compressor.io/) - Lossy/lossless compression

**Command Line:**
```bash
# ImageMagick - Resize and optimize
convert input.jpg -resize 800x800 -quality 85 output.jpg

# For retina display
convert input.jpg -resize 800x800 -quality 85 dr-name@2x.jpg
convert input.jpg -resize 400x400 -quality 85 dr-name.jpg
```

## Current Images

### Dr. R G Brajesh
- **File**: `dr-rg-brajesh.jpg`
- **Status**: Placeholder (replace with actual photo)
- **Dimensions**: 400×400px
- **Format**: JPG

## Adding a New Profile Photo

1. **Prepare the image:**
   - Crop to square aspect ratio (1:1)
   - Resize to at least 400×400px
   - Optimize file size
   - Save with descriptive filename

2. **Upload the file:**
   - Place in this directory: `/src/assets/img/`
   - Use naming convention: `dr-firstname-lastname.jpg`

3. **Update the JSON:**
   ```json
   {
     "image": "src/assets/img/dr-firstname-lastname.jpg"
   }
   ```

4. **Test:**
   - Open profile page in browser
   - Verify image loads correctly
   - Check appearance on different devices
   - Test with slow network connection

## Image Quality Guidelines

### ✅ Good Profile Photos

- Professional quality
- Good lighting
- Clear face visibility
- Neutral or professional background
- Recent photo (within 2-3 years)
- Proper framing (head and shoulders)
- High resolution (sharp, not blurry)

### ❌ Avoid

- Low resolution images
- Excessive file sizes (> 500KB)
- Non-square aspect ratios (will be cropped)
- Poor lighting or blurry images
- Distracting backgrounds
- Very old photos

## Fallback Behavior

If a profile photo fails to load or is not provided:
- Default SVG avatar will be displayed
- No broken image icon shown
- Graceful fallback ensures page still looks professional

## Accessibility

**Alt Text:**
The faculty name is automatically used as alt text:
```html
<img src="path/to/image.jpg" alt="Dr. Faculty Name">
```

Ensure images have good contrast if overlaid with text.

## Copyright & Usage Rights

**Important:**
- Only use images you have rights to use
- Obtain permission from faculty member
- Respect copyright and licensing
- Consider privacy concerns
- Follow university image use policies

## File Structure

```
/src/assets/img/
├── README.md (this file)
├── dr-rg-brajesh.jpg
├── dr-another-faculty.jpg
└── (additional faculty photos)
```

## Responsive Behavior

Profile photos are displayed at different sizes based on device:

| Device | Display Size | Recommended Upload Size |
|--------|--------------|------------------------|
| Desktop | 180px | 400×400px (@2x = 800×800px) |
| Tablet | 140px | 400×400px |
| Mobile | 120px | 400×400px |

The CSS handles scaling automatically. Upload once at 400×400px (or 800×800px for retina) and it will work across all devices.

## Browser Caching

Images are cached by browsers for better performance. To force update:
- Change the filename
- Or add cache-busting query parameter in JSON:
  ```json
  "image": "src/assets/img/dr-name.jpg?v=2"
  ```

## Troubleshooting

### Image Not Displaying

**Check:**
1. File path in JSON is correct
2. Image file exists in this directory
3. Filename matches exactly (case-sensitive)
4. File format is JPG or PNG
5. File is not corrupted
6. Browser console for errors (F12)

**Common Issues:**
- **Wrong path**: Ensure path is relative from HTML file location
- **Wrong filename**: Check spelling and case sensitivity
- **File not uploaded**: Verify file is in `/src/assets/img/`
- **CORS issues**: Use a web server, not file:// protocol

### Image Quality Issues

**Too blurry:**
- Upload higher resolution image
- Ensure original is at least 400×400px

**Too large file size:**
- Compress using optimization tools
- Reduce quality to 80-85%
- Convert to JPG if currently PNG

**Wrong aspect ratio:**
- Crop to square before uploading
- Image will be cropped by CSS if not square

## Additional Assets

This directory can also contain:
- Department logos
- University emblems
- Background images
- Icons (if custom icons needed)

Name additional assets descriptively:
- `logo-university.png`
- `logo-department.svg`
- `background-hero.jpg`

---

**Need Help?**
See [DEVELOPER-GUIDELINES.md](../../../DEVELOPER-GUIDELINES.md) for more information.
