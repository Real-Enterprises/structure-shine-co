# Real Enterprises — Admin Guide

## How to add a new project

1. Upload project photos to Cloudinary (see CLOUDINARY_GUIDE.md)
2. (Optional) Upload video to YouTube as Unlisted
3. Go to [site]/keystatic
4. Click Projects → Add Entry
5. Fill in all fields; paste Cloudinary URLs for images
6. Paste only the YouTube video ID if there is a video
   (e.g. for youtube.com/watch?v=abc123 → paste abc123)
7. Toggle "Show on Homepage" ON if this should be featured
8. Click Save
9. Site rebuilds automatically in ~30 seconds ✅

## How to add a blog post

1. Upload cover photo to Cloudinary
2. Go to [site]/keystatic → Blog Posts → Add Entry
3. Write content using the editor (bold, headings, links all work)
4. Set Status to "Published" when ready to go live
5. Click Save → site rebuilds in ~30 seconds ✅

## How to update company phone/address/social links

1. Go to [site]/keystatic → Company Info
2. Edit any field
3. Click Save ✅

## How to hide a testimonial

1. Go to [site]/keystatic → Testimonials
2. Click the testimonial → uncheck "Show on website"
3. Click Save ✅

## YouTube Video ID — where to find it

Go to your YouTube video. The URL looks like:
`youtube.com/watch?v=XXXXXXXXXXX`

The ID is the part after `v=` → copy only that part.

## Why is my change not showing yet?

After saving in Keystatic, Vercel rebuilds the site.
This takes about 30 seconds. Refresh the live site
after 30–60 seconds and your change will be there.
