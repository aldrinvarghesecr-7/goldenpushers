from PIL import Image

def remove_background(image_path, output_path):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for item in data:
        # If the pixel is very light (high R, G, B), make it transparent
        # Pure white is (255, 255, 255)
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)

    img.putdata(new_data)
    img.save(output_path, "PNG")

if __name__ == "__main__":
    remove_background("c:/Users/ALDRIN/golden-pushers/public/logo.png", "c:/Users/ALDRIN/golden-pushers/public/logo.png")
