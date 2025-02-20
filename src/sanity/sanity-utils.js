import { client } from "./client";

export async function getSections() {
  return client.fetch(
    `*[_type in ['visual', 'sonoro', 'escrito', 'visceral', 'quienSoy']]{
            _id,
            slug,
            titulo,
            text,
            _type
        }`,
  );
}
