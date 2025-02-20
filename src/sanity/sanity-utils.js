import { client } from "./client";

export async function getConfig() {
  return client.fetch(
    `*[_type == "config"] {
      tituloDelSitio,
    }`,
  );
}

export async function getSections() {
  return client.fetch(
    `*[_type in ['visual', 'sonoro', 'escrito', 'visceral', 'quienSoy']]{
            _id,
            slug,
            titulo,
            descripcion,
            texto,
            _type
        }`,
  );
}
