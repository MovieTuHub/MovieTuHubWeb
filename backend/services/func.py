from typing import List


def image_to_bytes(images:List[str],file_path:str) -> List[bytes]:
    image_data = []
    for image in images:
        with open(f"{file_path}/{image}","rb") as f:
            image_data.append(f.read())
    return image_data