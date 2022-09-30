import Queue from "bull";

const makeQueue = (name: string) => {
  return new Queue(name, {
    redis: {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379,
    },
    limiter: {
      max: 1000,
      duration: 5000,
    },
  });
};

export default makeQueue;
