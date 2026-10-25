// SERVER RESPONSE DTO - INTERACE
export type ServerResponseDTO<T> = {
  success: boolean;
  message: string;
  data: T;
};
// SUCCESS CASE
export function ok<T>(data: T, message = "OK"): ServerResponseDTO<T> {
  return { success: true, message, data };
}
// FAIL CASE
export function fail(message: string): ServerResponseDTO<null> {
  return { success: false, message, data: null };
}
