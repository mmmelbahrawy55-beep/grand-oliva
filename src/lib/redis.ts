import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const OVERRIDES_KEY = "grand-oliva:products:overrides";

export async function getOverrides(): Promise<Record<string, any>> {
  try {
    const data = await redis.get(OVERRIDES_KEY);
    return (data as Record<string, any>) || {};
  } catch {
    return {};
  }
}

export async function setOverride(id: string, data: Record<string, any>): Promise<void> {
  const overrides = await getOverrides();
  overrides[id] = { ...(overrides[id] || {}), ...data };
  await redis.set(OVERRIDES_KEY, overrides);
}

export async function removeOverride(id: string): Promise<void> {
  const overrides = await getOverrides();
  delete overrides[id];
  await redis.set(OVERRIDES_KEY, overrides);
}

export async function resetOverrides(): Promise<void> {
  await redis.set(OVERRIDES_KEY, {});
}
