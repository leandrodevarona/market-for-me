export async function buildProject() {
  if (import.meta.env.BUILD_SITE === "false") return;

  try {
    const url = import.meta.env.BUILD_HOOK_CREATE;

    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
