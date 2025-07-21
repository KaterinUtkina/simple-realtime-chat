export const getAudioDataUrl = (audio: HTMLAudioElement): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(audio.src)
      .then((res) => res.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};
