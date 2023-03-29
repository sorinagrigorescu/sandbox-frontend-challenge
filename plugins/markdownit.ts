import md from "markdown-it";

/* 
  Plugin enables converting markdown strings to html
  https://github.com/markdown-it/markdown-it
*/
export default defineNuxtPlugin(() => {
  const renderer = md();
  return {
    provide: {
      mdRenderer: renderer,
    },
  };
});
