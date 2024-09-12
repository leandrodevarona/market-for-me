import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
});

type ResourceType = "image" | "video" | "raw" | "auto" | undefined;

export async function upload(
  file: File,
  tag?: string,
  resource_type: ResourceType = "image",
  format?: string
): Promise<{ fileUrl: string | null; publicId: string | null } | null> {
  let fileUrl = null;
  let publicId = null;
  try {
    if (file && !!file.size) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              tags: [tag || "default_tag"],
              resource_type,
              format,
            },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              fileUrl = result?.secure_url;
              publicId = result?.public_id;

              resolve(result);
            }
          )
          .end(buffer);
      });
    }
  } catch (error) {
    console.error("Hubo un error al subir el archivo.", error);
    return null;
  }

  return { fileUrl, publicId };
}

export async function uploadMarketImage(image: File) {
  let result = await upload(image, "market_images");
  return result?.fileUrl;
}

export async function uploadProductImage(image: File) {
  let result = await upload(image, "product_images");

  if (result?.fileUrl) {
    result.fileUrl = cloudinary.url(result.fileUrl, {
      fetch_format: "auto",
      quality: "auto",
    });

    result.fileUrl = cloudinary.url(result?.fileUrl, {
      crop: "auto",
      gravity: "auto",
      width: 500,
      height: 500,
    });
  }

  return result?.fileUrl;
}

export async function deleteImage(imageUrl?: string | null) {
  try {
    if (imageUrl) {
      const imagePath = imageUrl.split("/");
      if (imagePath) {
        const imageUrl = imagePath.pop();
        if (imageUrl) {
          const publicId = imageUrl.split(".")[0]; // Extraer el ID público de la URL
          await cloudinary.uploader.destroy(publicId);
        }
      }
    }
  } catch (error) {
    console.error("Error al eliminar imagen de avatar.", error);
  }
}

export async function deleteMultipleImages(imageUrls?: (string | null)[]) {
  try {
    if (imageUrls && !!imageUrls.length) {
      const publicIds: string[] = [];
      imageUrls.forEach((url) => {
        if (url) {
          const imagePath = url.split("/");
          if (imagePath) {
            const imageUrl = imagePath.pop();
            if (imageUrl) {
              const publicId = imageUrl.split(".")[0];
              publicIds.push(publicId);
            }
          }
        }
      });

      if (!!publicIds.length) {
        cloudinary.api.delete_resources(publicIds, (error) => {
          if (error) {
            console.error(
              "Error al eliminar los recursos de Cloudinary:",
              error
            );
          }
        });
      }
    }
  } catch (error) {
    console.error("Error al eliminar los recursos de Cloudinary:", error);
  }
}
