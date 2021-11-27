import { parse } from 'papaparse';

/**
 * Tries to parse JSON and then CSV
 * @param {string} text
 * @return {any[]}
 */
export default function parseText(text) {
  try {
    return JSON.parse(text);
  } catch (e) {
    try {
      return parse(text, {
        header: true,
        skipEmptyLines: true,
        inferTypes: true,
      }).data;
    } catch (err) {
      console.error(err);
    }
  }
}
