const cars = {
  ranger: {
    engine: "2.0L Bi-Turbo 4 สูบ",
    transmission: "เกียร์อัตโนมัติ 10 สปีด",
    drive: "ระบบขับเคลื่อน 4 ล้อ",
    towing: "ลากจูงได้สูงสุด 3,500 กก.",
    fuel: "ดีเซล",
  },
  everest: {
    engine: "2.0L Turbo 4 สูบ",
    transmission: "เกียร์อัตโนมัติ 6 หรือ 10 สปีด",
    drive: "2WD / 4WD",
    seats: "7 ที่นั่ง",
    fuel: "ดีเซล",
  },
};

function getCarSpec(model) {
  const car = cars[model];
  if (!car) return "ไม่พบข้อมูลรุ่นนี้";

  return Object.entries(car)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

module.exports = { getCarSpec };
