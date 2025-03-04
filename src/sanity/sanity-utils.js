import { client } from "./client";

export async function getConfig() {
  return client.fetch(
    `*[_type == "config"] {
      tituloDelSitio,
      audio {
        url,
        archivo {
        'url': asset->url,
        }
      },
    }`,
  );
}

export async function getSections() {
  return client.fetch(
    `*[_type in ['visual', 'sonoro', 'escrito', 'visceral', 'quienSoy']]{
      _id,
      slug,
      titulo,
      texto{
        es[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
        en[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
      },
      _type,
      links,
      icono {
        'url': asset->url,
      },
      imagen {
        'url': asset->url,
      },
    }`,
  );
}

export async function getQuienSoy() {
  return client.fetch(
    `*[_type == 'quienSoy'][0]{
      _id,
      slug,
      titulo,
      bio,
      comentarios[]{
        _key,
        autor,
        es,
        en
      },
      cv {
        file,
        url
      },
      portfolio {
        file,
        url
      },
      links[]{
        _key,
        url,
        titulo
      }
    }`,
  );
}

export async function getReleases() {
  return client.fetch(
    `*[_type == 'release'] | order(fecha desc){
      _id,
      titulo,
      slug,
      fecha,
      sello,
      artwork {
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      tipoDeRelease->{
        _id,
        tipoDeRelease
      },
    }`,
  );
}

export async function getTiposDeReleases() {
  return client.fetch(
    `*[_type == 'tipoDeRelease']{
      _id,
      tipoDeRelease
    }`,
  );
}

export async function getLives() {
  return client.fetch(
    `*[_type == 'live'] | order(fecha desc){
      _id,
      slug,
      titulo,
      fecha,
      texto,
      imagenes[]{
        _key,
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      embedVideo,
      embedAudio,
      links[]{
        url,
        titulo
      }
    }`,
  );
}

export async function getExposiciones() {
  return client.fetch(
    `*[_type == 'exposicion'] | order(fecha desc){
      _id,
      titulo,
      slug,
      fecha,
      lugar,
      texto,
      imagenes[]{
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      obras[]{
        titulo,
        fecha,
        medidas,
        materiales,
        descripcion,
        imagen {
          'url': asset->url,
          'dimensions': asset->metadata.dimensions,
        },
      },
      links[] {
        url,
        titulo
      }
    }`,
  );
}

export async function getInvestigacion() {
  return client.fetch(
    `*[_type == 'investigacion']{
      _id,
      titulo,
      slug,
      texto{
        es[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
        en[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
      },
    }`,
  );
}

export async function getArticulo() {
  return client.fetch(
    `*[_type == "articulo"] | order(fecha desc){
      _id,
      titulo,
      fecha,
      texto{
        es[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
        en[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
      },
    }`,
  );
}

export async function getBlogPosts() {
  return client.fetch(
    `*[_type == "blogPost"] | order(fecha desc){
      _id,
      titulo,
      slug,
      fecha,
      texto{
        es[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
        en[]{
        ...,
        _type == "image" => {
            ...,
            'url': asset->url,
          }
        },
      },
    }`,
  );
}

export async function getItem(slug) {
  return client.fetch(
    `*[_type in ['release', 'live', 'exposicion'] && slug.current == $slug]{
      _type,
      _id,
      titulo,
      slug,
      fecha,
      lugar,
      texto,
      imagenes[]{
        _key,
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      obras[]{
        titulo,
        fecha,
        medidas,
        materiales,
        descripcion,
        imagen {
          'url': asset->url,
          'dimensions': asset->metadata.dimensions,
        },
      },
      links[]{
        _key,
        url,
        titulo
      },
      sello,
      artwork {
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      tipoDeRelease->{
        _id,
        tipoDeRelease
      },
      embed,
      emdedAudio,
      embedVideo,
    }`,
    { slug },
  );
}

export async function getRelease(slug) {
  return client.fetch(
    `*[_type == 'release' && slug.current == $slug]{
      _id,
      titulo,
      slug,
      fecha,
      sello,
      artwork {
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      texto,
      tipoDeRelease->{
        _id,
        tipoDeRelease
      },
      embed,
      imagenes[]{
        _key,
        'url': asset->url,
        'dimensions': asset->metadata.dimensions,
      },
      links[]{
        _key,
        url,
        titulo
      }
    }`,
    { slug },
  );
}
