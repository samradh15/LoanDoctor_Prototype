const I = { plus: undefined };
try {
  const result = I.plus({ color: "red" });
} catch (e) {
  console.log("Error type:", e.message);
}
