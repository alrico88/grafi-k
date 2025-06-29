import Papa from 'papaparse';

type ParseResult = {
  columns: string[];
  data: Record<string, any>[];
  format: 'json' | 'csv' | 'unknown';
};

export function parseInput(input: string): ParseResult {
  const trimmed = input.trim();

  // Try JSON
  try {
    const parsed = JSON.parse(trimmed);
    if (
      Array.isArray(parsed) &&
      parsed.every((item) => typeof item === 'object' && item !== null)
    ) {
      const columns = Array.from(
        new Set(parsed.flatMap((obj) => Object.keys(obj))),
      );
      return { columns, data: parsed, format: 'json' };
    }
  } catch {
    // continue to CSV
  }

  // Try CSV with PapaParse
  const csvResult = Papa.parse<Record<string, any>>(trimmed, {
    header: true,
    skipEmptyLines: true,
  });

  if (!csvResult.errors.length && Array.isArray(csvResult.data)) {
    const columns = csvResult.meta.fields ?? [];
    return {
      columns,
      data: csvResult.data,
      format: 'csv',
    };
  }

  return { columns: [], data: [], format: 'unknown' };
}
