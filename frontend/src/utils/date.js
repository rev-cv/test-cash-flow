export function gateString(date) {
    const dt = new Date(date);

    const y = dt.getFullYear();
    const m = String(dt.getMonth() + 1).padStart(2, "0");
    const d = String(dt.getDate()).padStart(2, "0");

    const th = String(dt.getHours()).padStart(2, "0");
    const tm = String(dt.getMinutes()).padStart(2, "0");

    // return `${y}-${m}-${d} ${th}:${tm}`;
    return `${y}-${m}-${d}`;
}

export function getDateForInput(d) {
    // const today = new Date(d);
    // const year = today.getFullYear();
    // const month = String(today.getMonth() + 1).padStart(2, "0");
    // const day = String(today.getDate()).padStart(2, "0");
    // return `${year}-${month}-${day}`;

    return d ? new Date(d).toISOString().split("T")[0] : "";
}
