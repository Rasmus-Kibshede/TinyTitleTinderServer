import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async (
  unHashedPassword: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(unHashedPassword, hashedPassword);
};
