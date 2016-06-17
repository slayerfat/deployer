export default function appendDates(next) {
  const currentDate = new Date();

  // if createdAt doesn't exist, add to that field
  if (!this.createdAt) {
    this.createdAt = currentDate;
  }

  this.updatedAt = currentDate;

  next();
}
