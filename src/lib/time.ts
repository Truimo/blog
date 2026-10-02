import dayjs from "dayjs";
import "dayjs/locale/zh-cn.js";

dayjs.locale("zh-cn");

export const formatDate = (
  dateStr: string,
  format: string = "YYYY-MM-DD",
): string => {
  const date = dayjs(dateStr);
  if (!date.isValid()) return "";
  return date.format(format);
};
