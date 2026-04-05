from PIL import Image
import os

def optimize_image(path, max_size=(1000, 1000)):
    try:
        with Image.open(path) as img:
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            img.save(path, quality=85, optimize=True)
            print(f"Optimized {path}")
    except Exception as e:
        print(f"Error optimizing {path}: {e}")

team_dir = "c:/Users/ALDRIN/golden-pushers/public/team"
for filename in os.listdir(team_dir):
    if filename.endswith(".jpg"):
        optimize_image(os.path.join(team_dir, filename))
