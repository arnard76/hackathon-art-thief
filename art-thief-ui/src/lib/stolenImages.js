// @ts-nocheck
import { writable } from "svelte/store";

const store = writable(
  [
    { id: 1, path: "/painting_picture/monalisa.jpg", vertical: true},
    { id: 2, path:"/painting_picture/scream.jpg", vertical: true},
    { id: 3, path:"/painting_picture/starry_night.jpg", vertical: false},
    { id: 4, path:"/painting_picture/guernica.jpg", vertical: false},
  ]
)

const currentArtworks = {
  ...store,
  updateArtwork(oldPath, {path, vertical}){
    store.update((current) => {
      const index = current.findIndex(artwork => artwork.path === oldPath);
      current[index] = {...current[index], path, vertical}
      return current;
    })
  }
}

export const selectedImage = writable(undefined);

export default currentArtworks;
