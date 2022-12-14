export function jsTestAlert(element: HTMLButtonElement, message: string) {
  element.addEventListener("click", () => alert(message));
}

// WASM Test - provide an image as a Base64 String
// 1. Applies the "radio" style filter to the image
// 2. Returns as a Base64 String
export async function jsWasmTest(
  buttonElement: HTMLButtonElement,
  afterImageElement: HTMLImageElement,
  base64Image: string,
  width: number,
  height: number
) {
  buttonElement.addEventListener("click", async () => {
    console.log(`Starting photon.`);

    let result = new Promise<string>((resolve, reject) => {
      import("@silvia-odwyer/photon")
        .then((photon) => {
          console.log(`Photon started.`);

          // Test base64 of a cat
          base64Image =
            "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";

          // Get the image type from the Base64 String
          const imageTypeId = base64Image.charAt(0);
          let getImageType = () => {
            switch (imageTypeId) {
              case "/":
                return "image/jpeg";
              case "i":
                return "image/png";
              case "R":
                return "image/gif";
              case "U":
                return "image/webp";
              default:
                return "image/jpeg";
            }
          };

          const imageType = getImageType();

          // Set up image
          const originalImage = new Image();
          originalImage.src = `data:${imageType};base64,${base64Image}`;

          originalImage.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;

            var ctx = canvas.getContext("2d")!;

            // Draw the image element onto the canvas
            ctx.drawImage(originalImage, 0, 0);

            // Convert the ImageData found in the canvas to a PhotonImage (so that it can communicate with the core Rust library)
            let image = photon.open_image(canvas, ctx);

            // Filter the image, the PhotonImage's raw pixels are modified
            photon.filter(image, "oceanic");

            // Place the modified image back on the canvas
            photon.putImageData(canvas, ctx, image);

            // Convert to a base64 string
            const dataURL = canvas.toDataURL(imageType, 0.8);

            // Remove the canvas from the DOM
            canvas.remove();

            // Log the new image string
            console.log(`Processed image:\n${dataURL}`);

            resolve(dataURL);
          };
        })
        .catch((e) => {
          console.error("Error loading photon module", e);
          reject(e);
        });
    });

    // Set the image received to the after image
    const newImageBase64 = await result;
    afterImageElement.src = newImageBase64;
  });
}
