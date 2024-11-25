const bcrypt = require('bcryptjs');

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user1", password: "user123", role: "user" }
];

const hashPasswords = async () => {
  const hashedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return { ...user, password: hashedPassword };
    })
  );
  console.log(JSON.stringify({ users: hashedUsers }, null, 2));
};

hashPasswords();
