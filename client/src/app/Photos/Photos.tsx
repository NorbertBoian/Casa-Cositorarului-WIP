import { PhotosClient } from "./PhotosClient";

export const Photos = async () => {
  const photosResult = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/resources/search`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${process.env.CLOUDINARY_API_KEY}:${process.env.CLOUDINARY_API_SECRET}`,
        ).toString("base64")}`,
      },
      body: JSON.stringify({
        expression: "folder:casaCositorarului/*",
      }),
      method: "POST",
    },
  );

  const { resources: photos } = await photosResult.json();

  const images = photos.map((photo) => {
    const { width, height } = photo;
    return {
      id: photo.asset_id,
      src: photo.secure_url,
      width,
      height,
    };
  });

  return (
    <section id="photos">
      <h1>Photos</h1>
      <PhotosClient images={images} />
    </section>
  );
};
