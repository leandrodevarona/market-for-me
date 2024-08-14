export async function buildProject() {
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
