// ==========================================
// ASYNC PROGRAMMING
// ==========================================

console.log("=== ASYNC BASICS ===\n");

// 1. Callbacks
function getUserData(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: "Alice" });
  }, 1000);
}

getUserData(1, (err, user) => {
  if (err) return console.error("Error:", err);
  console.log("1. Callback:", user);
});

// 2. Promises
function getUserPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: userId, name: "Bob" });
    }, 1000);
  });
}

setTimeout(() => {
  getUserPromise(2)
    .then(user => console.log("2. Promise:", user))
    .catch(err => console.error("Error:", err));
}, 1100);

// 3. Async/Await (Best Practice)
async function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "Charlie" });
    }, 1000);
  });
}

async function main() {
  try {
    const user = await getUser(3);
    console.log("3. Async/Await:", user);
  } catch (err) {
    console.error("Error:", err);
  }
}

setTimeout(() => main(), 2200);

// 4. Multiple Promises
setTimeout(async () => {
  const promise1 = getUser(4);
  const promise2 = getUser(5);
  
  const users = await Promise.all([promise1, promise2]);
  console.log("4. Multiple:", users);
  
  console.log("\n✅ Completed!");
}, 3300);
