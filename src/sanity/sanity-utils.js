import { client } from "./client";

export async function getSections() {
  return client.fetch(
    `*[_type in ['visual', 'sonoro', 'escrito', 'visceral']] {
            _id,
            slug,
            titulo,
            text,
        }`,
  );
}
