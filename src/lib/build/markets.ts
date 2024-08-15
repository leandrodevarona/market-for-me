export async function isDeployedMarket(marketUrl: string) {
  let isDeployed = false;

  try {
    const response = await fetch(marketUrl);
    if (response.status >= 200 && response.status <= 299) isDeployed = true;
  } catch (error) {
    console.error(error);
  }

  return isDeployed;
}
