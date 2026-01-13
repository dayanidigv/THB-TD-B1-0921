
export function checkEnv(printValue) {
  if (process.env.NODE_ENV === "development") {
    console.log(printValue);
  }
}
