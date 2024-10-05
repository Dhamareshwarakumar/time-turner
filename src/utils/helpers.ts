export function formatDate(date: Date, formatString: string): string {
    const pad = (num: number, length: number = 2): string => String(num).padStart(length, '0');

    const formats: { [key: string]: () => string } = {
        YYYY: () => String(date.getFullYear()),
        MM: () => pad(date.getMonth() + 1),
        DD: () => pad(date.getDate()),
        HH: () => pad(date.getHours()),
        mm: () => pad(date.getMinutes()),
        ss: () => pad(date.getSeconds()),
        SSS: () => pad(date.getMilliseconds(), 3),
        ZZ: () => {
            const offset = date.getTimezoneOffset();
            const absOffset = Math.abs(offset);
            const sign = offset > 0 ? '-' : '+';
            return `${sign}${pad(Math.floor(absOffset / 60))}:${pad(absOffset % 60)}`;
        },
    };

    return formatString.replace(/YYYY|MM|DD|HH|mm|ss|SSS|ZZ/g, (match) => formats[match]());
}
