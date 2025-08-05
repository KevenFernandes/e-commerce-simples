import bcrypt from "bcryptjs";

(async () => {
  const myHash = "my secret key";
  const hash = await bcrypt.hash(myHash, 10);
  const base64 = Buffer.from(hash).toString("base64");

  console.log(base64);
})();
