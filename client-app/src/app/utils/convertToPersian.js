import provincesCoords from "../../../public/data/provincesCoords.json";
const conflictKeys = {
  download: "کاهش سرعت دانلود",
  upload: "کاهش سرعت آپلود",
  disconnect: "قطعی سرویس",
  packet_loss: "افزایش پکت لاس",
  ping: "پینگ",
};

const convertToPersian = (value) => {
  const lowerCaseValue = value.toLowerCase();
  if (provincesCoords[lowerCaseValue])
    return provincesCoords[lowerCaseValue].name;

  if (conflictKeys[lowerCaseValue]) return conflictKeys[lowerCaseValue];

  console.log(lowerCaseValue);
  switch (lowerCaseValue) {
    case "hamraheaval":
      return "همراه اول";
    case "hiweb":
      return "های وب";
    case "irancell":
      return "ایرانسل";
    case "mobinnet":
      return "مبین نت";
    case "mokhaberat":
      return "مخابرات";
    case "samantel":
      return "سامان تل";
    case "shatel":
      return "شاتل";
    case "zitel":
      return "زی تل";
    default:
      return value;
  }
};

export default convertToPersian;
