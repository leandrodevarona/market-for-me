export function showLoaderOnContainer(containerId: string) {
  const container = document.getElementById(containerId);

  if (container) {
    const loaderSpan = container.getElementsByClassName("loader");

    if (loaderSpan && loaderSpan.length > 0) {
      loaderSpan[0].innerHTML = "Cargando...";

      return loaderSpan[0];
    } else {
      container.innerHTML = "Cargando...";
    }
  }

  return container;
}
