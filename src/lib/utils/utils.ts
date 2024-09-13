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

export function generateUniqueId(): string {
  const part1 = Math.floor(Math.random() * 100);
  const part2 = Math.floor(Math.random() * 100);
  const part3 = Math.floor(Math.random() * 100);
  const part4 = Math.floor(Math.random() * 100);
  const uniqueId = `${part1.toString().padStart(2, "0")}-${part2.toString().padStart(2, "0")}-${part3.toString().padStart(2, "0")}-${part4.toString().padStart(2, "0")}`;
  return uniqueId;
}
