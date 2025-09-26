export function gateString(date) {
    const dt = new Date(date);

    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");

    const th = String(dt.getHours()).padStart(2, "0");
    const tm = String(dt.getMinutes()).padStart(2, "0");

    return `${y}-${m}-${d} ${th}:${tm}`;
}
