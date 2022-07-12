import AppError from "@shared/errors/AppError";

const removeParameterFromPathAndReturn = (
  imagePath: string,
  parameter: string,
) => {
  if(!imagePath || !parameter) throw new AppError('ImagePath and Parameter is required')

  const regex = new RegExp('[?&]' + parameter + '=([^&]*)');
  const value = imagePath.match(regex) || [];

  const path = imagePath.replace(regex, '');

  return { path, value: Number(value[1]) };
};

export default removeParameterFromPathAndReturn;
