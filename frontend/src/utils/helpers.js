export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // s ni olib tashladik
  return regex.test(email);
};
export const getInitials = (name) => {
  if (!name) return "";
  const words = name.trim().split(/\s+/); // Ortada bo'sh joylar bo'lsa, ularni olib tashlash
  let initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join(""); // faqat bosh harflar
  return initials;
};
