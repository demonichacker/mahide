#!/usr/bin/env python3
"""
Remove white/near-white background from a product image using flood-fill.
Outputs a PNG with a transparent background.
"""
from PIL import Image
import sys

def remove_white_background(input_path: str, output_path: str, threshold: int = 30):
    img = Image.open(input_path).convert("RGBA")
    data = img.load()
    width, height = img.size

    # Use flood-fill from all 4 corners to mark background pixels
    from collections import deque

    visited = [[False] * height for _ in range(width)]
    queue = deque()

    # Seed corners
    corners = [(0, 0), (width - 1, 0), (0, height - 1), (width - 1, height - 1)]
    for cx, cy in corners:
        r, g, b, a = data[cx, cy]
        # Only seed if the corner is near-white
        if r > 255 - threshold and g > 255 - threshold and b > 255 - threshold:
            queue.append((cx, cy))
            visited[cx][cy] = True

    while queue:
        x, y = queue.popleft()
        r, g, b, a = data[x, y]
        # Make near-white pixel transparent
        if r > 255 - threshold and g > 255 - threshold and b > 255 - threshold:
            data[x, y] = (r, g, b, 0)
            for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    img.save(output_path, "PNG")
    print(f"Saved: {output_path}")

if __name__ == "__main__":
    input_path = sys.argv[1] if len(sys.argv) > 1 else "/Users/io/Desktop/mahide/public/essential-tee-white.jpg"
    output_path = sys.argv[2] if len(sys.argv) > 2 else "/Users/io/Desktop/mahide/public/essential-tee-white.png"
    remove_white_background(input_path, output_path, threshold=25)
