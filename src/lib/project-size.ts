export type ProjectSizeUnit = "marla" | "kanal" | "acre";

export type ProjectSize =
  | {
      discriminant: "none";
      value: null;
    }
  | {
      discriminant: ProjectSizeUnit;
      value: number;
    };

function formatProjectSizeValue(value: number): string {
  return Number.isInteger(value) ? String(value) : String(value);
}

export function formatProjectSize(
  size?: ProjectSize | string | null,
): string | null {
  if (!size) return null;

  if (typeof size === "string") {
    return size;
  }

  if (size.discriminant === "none" || size.value == null) {
    return null;
  }

  return `${formatProjectSizeValue(size.value)} ${size.discriminant}`;
}
