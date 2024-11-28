import { API_ENDPOINTS } from "#shared/config/constants";
import { ApiClient } from "#shared/lib/services/ApiClient";

/**
 * Функция для отправки запроса на удаление метки
 * @param {string} markId - id метки
 * @return {Promise}
 */
export const deleteMark = async (markId) => {
  return await new ApiClient().delete(API_ENDPOINTS.marks.delete, {
    id: markId,
  });
};
