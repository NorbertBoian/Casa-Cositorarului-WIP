import { createClient } from "@sanity/client";

export const viewerClient = createClient({
  projectId: "dfis93y8",
  dataset: "production",
  apiVersion: "2023-01-30", // use current UTC date - see "specifying API version"!
  token:
    "skADJcSe8UJkA77bVjbgyJKCmVdgh3ubmLyf6bjEOdoyqEKzxu8I3MnNPuFL3bsB86p0Xp8FZhyWWZEay0fH8qO3YWBprZ4CIJF2Rz8Zv4fCDpzrVa8SNjigdNK25EVpvULgVta1W6ZLinAPJMZt81uktAQGijLhvgTxzSavzXqcNgKNDsBh", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});

export const editorClient = createClient({
  projectId: "dfis93y8",
  dataset: "production",
  apiVersion: "2023-01-30", // use current UTC date - see "specifying API version"!
  token:
    "skkp1TGajBT1MhCEUDeVJuV7QCTp218liUnwsVPW8qVcUthsR4V8rwj0SdFCmPvOn7iJ71PWkEdChSPrvEoMS6t1iND2DOOeNj83MkBvCCYZVn474Cuuda5crXzgrhzWR7dJhxo4R1nWNZUzMiN39e2XAn3rx3YeUyDCW116rY4IX5YkmI2h", // or leave blank for unauthenticated usage
  useCdn: false, // `false` if you want to ensure fresh data
});
