#!/bin/bash

# Script to generate missing favicon and OG image assets for Gitgenix
# This script uses ImageMagick to convert SVG logos to various required formats

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null && ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "- On macOS: brew install imagemagick"
    echo "- On Ubuntu/Debian: sudo apt-get install imagemagick"
    echo "- On Windows: Download from https://imagemagick.org/script/download.php"
    exit 1
fi

# Set up directories
cd "$(dirname "$0")"
PUBLIC_DIR="../public"
LOGO_DIR="$PUBLIC_DIR/logo"

# Use the appropriate command based on ImageMagick version
CONVERT_CMD="magick"
if command -v convert &> /dev/null && ! command -v magick &> /dev/null; then
    CONVERT_CMD="convert"
fi

echo "Generating favicon files..."

# Generate favicon sizes from the main logo
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 16x16 "$PUBLIC_DIR/favicon-16x16.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 32x32 "$PUBLIC_DIR/favicon-32x32.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 96x96 "$PUBLIC_DIR/favicon-96x96.png"

# Generate Apple Touch Icon sizes
echo "Generating Apple Touch Icon files..."
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 180x180 "$PUBLIC_DIR/apple-touch-icon.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 152x152 "$PUBLIC_DIR/apple-touch-icon-152x152.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 144x144 "$PUBLIC_DIR/apple-touch-icon-144x144.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 120x120 "$PUBLIC_DIR/apple-touch-icon-120x120.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 114x114 "$PUBLIC_DIR/apple-touch-icon-114x114.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 76x76 "$PUBLIC_DIR/apple-touch-icon-76x76.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 72x72 "$PUBLIC_DIR/apple-touch-icon-72x72.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 60x60 "$PUBLIC_DIR/apple-touch-icon-60x60.png"
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 57x57 "$PUBLIC_DIR/apple-touch-icon-57x57.png"

# Generate Safari pinned tab icon
echo "Generating Safari pinned tab icon..."
$CONVERT_CMD "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 150x150 "$PUBLIC_DIR/safari-pinned-tab.svg"

# Generate OG images with text overlay
echo "Generating Open Graph images..."

# Main OG image
$CONVERT_CMD -size 1200x630 xc:"#ffffff" \
    \( "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 200x200 \) \
    -gravity center -geometry +0-50 -composite \
    -font Arial -pointsize 48 -fill "#1f2937" \
    -gravity center -geometry +0+100 -annotate +0+0 "GitHub Contribution Art Creator" \
    -font Arial -pointsize 24 -fill "#6b7280" \
    -gravity center -geometry +0+150 -annotate +0+0 "Create beautiful patterns for your GitHub profile" \
    "$PUBLIC_DIR/og-image.png"

# Examples OG image
$CONVERT_CMD -size 1200x630 xc:"#f8fafc" \
    \( "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 180x180 \) \
    -gravity center -geometry +0-60 -composite \
    -font Arial -pointsize 44 -fill "#1f2937" \
    -gravity center -geometry +0+80 -annotate +0+0 "Gitgenix Examples" \
    -font Arial -pointsize 22 -fill "#6b7280" \
    -gravity center -geometry +0+130 -annotate +0+0 "Discover amazing contribution art patterns" \
    "$PUBLIC_DIR/og-examples.png"

# Draw page OG image
$CONVERT_CMD -size 1200x630 xc:"#f0f9ff" \
    \( "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 180x180 \) \
    -gravity center -geometry +0-60 -composite \
    -font Arial -pointsize 44 -fill "#1f2937" \
    -gravity center -geometry +0+80 -annotate +0+0 "Create Your Art" \
    -font Arial -pointsize 22 -fill "#6b7280" \
    -gravity center -geometry +0+130 -annotate +0+0 "Design and generate GitHub contribution patterns" \
    "$PUBLIC_DIR/og-draw.png"

# Generate a basic screenshot placeholder
echo "Generating screenshot placeholder..."
$CONVERT_CMD -size 1920x1080 xc:"#ffffff" \
    \( "$LOGO_DIR/Gitgenix.svg" -background transparent -resize 300x300 \) \
    -gravity center -geometry +0-100 -composite \
    -font Arial -pointsize 64 -fill "#1f2937" \
    -gravity center -geometry +0+150 -annotate +0+0 "Gitgenix" \
    -font Arial -pointsize 32 -fill "#6b7280" \
    -gravity center -geometry +0+220 -annotate +0+0 "GitHub Contribution Art Creator" \
    "$PUBLIC_DIR/screenshot.png"

echo "All assets generated successfully!"
echo "Generated files:"
echo "- Favicon files (16x16, 32x32, 96x96)"
echo "- Apple Touch Icons (9 sizes)"
echo "- Safari pinned tab icon"
echo "- Open Graph images (og-image.png, og-examples.png, og-draw.png)"
echo "- Screenshot placeholder"
