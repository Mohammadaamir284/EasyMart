export function GetTimeInfo() {
    const now = new Date

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = days[now.getDay()];

    const date = now.getDate();
    const month = now.toLocaleString('default', { month: 'long' });

    const formattedDate = `${day}, ${date} ${month}`;

    const endofDay = new Date
    endofDay.setHours(23, 59, 59, 999)

    const LeftTime = endofDay - now
    const hours = Math.floor(LeftTime / (1000 * 60 * 60))
    const minutes = Math.floor((LeftTime % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor(LeftTime % (1000 * 60) / 1000)

    const timeLeft = `${hours}h ${minutes}m ${seconds}s`;

    return {
        formattedDate,

        timeLeft
    };
}