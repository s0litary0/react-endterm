const compress = async (e) => {
    const file = e.data
    const prevSize = file.size

    const bitmap = await createImageBitmap(file)
    const MAX = 800;
    const scale = Math.min(MAX / bitmap.width, MAX / bitmap.height, 1);

    const w = bitmap.width * scale;
    const h = bitmap.height * scale;
    const canvas = new OffscreenCanvas(w, h);
    const ctx = canvas.getContext("2d")

    ctx.drawImage(bitmap, 0, 0, w, h)

    const blob = await canvas.convertToBlob({
        type: "image/jpg",
        quality: 0.6,
    })
    
    const compressedFile = new File([blob], file.name, { type: "image/jpeg"})
    console.log(compressedFile.name)
    console.log("Worker got message")
    console.log("Worker: original KB =", prevSize / 1024);
    console.log("Worker: compressed KB =", compressedFile.size / 1024);
    if (compressedFile.size > prevSize) {
        self.postMessage(file)
    }
    self.postMessage(compressedFile)
}


self.addEventListener("message", (e) => compress(e)) 